import type { Socket, Server } from "socket.io";
import { pool } from "@repo/shared";

export function joinChatSocket(io: Server, socket: Socket) {

  socket.on("join-chat", async (data) => {
    try {
      const { chatId } = data;
      const userId = (socket as any).userId;

      if (!chatId) {
        return socket.emit("error", {
          message: "chatId required"
        });
      }

      const membershipCheck = await pool.query(
        `SELECT 1 FROM memberships WHERE user_id = $1 AND chat_id = $2`,
        [userId, chatId]
      );

      if (membershipCheck.rowCount === 0) {
        return socket.emit("error", {
          message: "Not a member of this chat"
        });
      }
      socket.join(chatId);
      socket.emit("joined-chat", {
        chatId
      });
    } catch {
      socket.emit("error", {
        message: "Failed to join chat"
      });
    }
  });

}