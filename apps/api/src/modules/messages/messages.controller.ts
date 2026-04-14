import { pool } from "@repo/shared";
import type { messagePayload } from "./message.type.js";

class MessageService {

  async sendMessage(userId: string, payload: messagePayload)
  {
    const { chatId, content, clientId, type = "text" } = payload;

    const client = await pool.connect();

    try
    {
      await client.query("BEGIN");

      const member = await client.query(
        `SELECT 1 FROM memberships WHERE user_id = $1 AND chat_id = $2`,
        [userId, chatId]
      );

      if (!member.rowCount) throw new Error("NOT_A_MEMBER");

      if (type === "text" && (!content || content.trim() === ""))
      {
        throw new Error("EMPTY_MESSAGE");
      }

      if ((type === "image" || type === "pdf") && !content)
      {
        throw new Error("FILE_URL_REQUIRED");
      }

      await client.query(
        `SELECT id FROM chats WHERE id = $1 FOR UPDATE`,
        [chatId]
      );

      const seqRes = await client.query(
        `SELECT COALESCE(MAX(sequence_number), 0) + 1 AS seq
         FROM messages
         WHERE chat_id = $1`,
        [chatId]
      );

      const sequenceNumber = Number(seqRes.rows[0].seq);

      const res = await client.query(
        `INSERT INTO messages (chat_id, sender_id, content, sequence_number, client_id, type)
         VALUES ($1, $2, $3, $4, $5, $6)
         ON CONFLICT (client_id) DO NOTHING
         RETURNING *`,
        [chatId, userId, content, sequenceNumber, clientId, type]
      );

      let message = res.rows[0];

      if (!message)
      {
        const existing = await client.query(
          `SELECT * FROM messages WHERE client_id = $1`,
          [clientId]
        );
        message = existing.rows[0];
      }

      await client.query("COMMIT");

      return message;
    }
    catch (err)
    {
      await client.query("ROLLBACK");
      throw err;
    }
    finally
    {
      client.release();
    }
  }

  async getLatestMessages({
    userId,
    chatId,
    limit
  }: {
    userId: string;
    chatId: string;
    limit: number;
  })
  {
    const client = await pool.connect();

    try
    {
      const membershipRes = await client.query(
        `SELECT join_sequence_number
         FROM memberships
         WHERE user_id = $1 AND chat_id = $2`,
        [userId, chatId]
      );

      if (!membershipRes.rowCount) throw new Error("NOT_A_MEMBER");

      const joinSeq = Number(membershipRes.rows[0].join_sequence_number);

      const res = await client.query(
        `SELECT *
         FROM messages
         WHERE chat_id = $1
         AND sequence_number > $2
         ORDER BY sequence_number DESC
         LIMIT $3`,
        [chatId, joinSeq, limit]
      );

      return res.rows.reverse();
    }
    finally
    {
      client.release();
    }
  }

  async getMessages({
    userId,
    chatId,
    cursor,
    limit
  }: {
    userId: string;
    chatId: string ;
    cursor: number;
    limit: number;
  })
  {
    const client = await pool.connect();

    try
    {
      const membershipRes = await client.query(
        `SELECT join_sequence_number
         FROM memberships
         WHERE user_id = $1 AND chat_id = $2`,
        [userId, chatId]
      );

      if (!membershipRes.rowCount) throw new Error("NOT_A_MEMBER");

      const joinSeq = Number(membershipRes.rows[0].join_sequence_number);

      if (cursor <= joinSeq) return [];

      const res = await client.query(
        `SELECT *
         FROM messages
         WHERE chat_id = $1
         AND sequence_number > $2
         AND sequence_number < $3
         ORDER BY sequence_number DESC
         LIMIT $4`,
        [chatId, joinSeq, cursor, limit]
      );

      return res.rows.reverse();
    }
    finally
    {
      client.release();
    }
  }
}

export const messageService = new MessageService();