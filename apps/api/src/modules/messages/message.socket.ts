import type { Socket, Server } from "socket.io";
import { messageService } from "./messages.controller.js";
import type { messagePayload } from "./message.type.js";
import { pool } from "@repo/shared";

export function messageSocket(io: Server, socket: Socket)
{
  socket.on("send-message", async (data: messagePayload, callback) =>
  {
    try
    {
      if (!socket.userId || typeof socket.userId !== "string")
      {
        return callback?.({ error: "Unauthorized" });
      }

      const userId = socket.userId;

      const message = await messageService.sendMessage(userId, data);

      io.to(data.chatId).emit("new-message", message);

      callback?.({
        success: true,
        message
      });
    }
    catch (error: any)
    {
      return callback?.({
        error: error.message
      });
    }
  });
  socket.on("sync-messages", async ({ chatId }, callback) =>
  {
    try
    {
      if (!socket.userId || typeof socket.userId !== "string")
      {
        return callback?.({ error: "Unauthorized" });
      }

      if (!chatId)
      {
        return callback?.({ error: "chatId required" });
      }

      const userId = socket.userId;

      const client = await pool.connect();

      try
      {
        const memberships = await client.query(
          `SELECT last_seen_sequence_number
           FROM memberships
           WHERE user_id = $1 AND chat_id = $2`,
          [userId, chatId]
        );

        if (!memberships.rowCount)
        {
          return callback?.({ error: "NOT_A_MEMBER" });
        }

        const lastSeen = Number(
          memberships.rows[0].last_seen_sequence_number
        );

        const res = await client.query(
          `SELECT *
           FROM messages
           WHERE chat_id = $1
           AND sequence_number > $2
           ORDER BY sequence_number ASC
           LIMIT 50`,
          [chatId, lastSeen]
        );

        return callback?.({
          success: true,
          messages: res.rows
        });
      }
      finally
      {
        client.release();
      }
    }
    catch (error: any)
    {
      return callback?.({
        error: error.message
      });
    }
  });
}