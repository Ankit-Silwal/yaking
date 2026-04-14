import { pool } from "@repo/shared";

type MessageType = "text" | "image" | "pdf";

class MessageService {
  async sendMessage(
    userId: string,
    chatId: string,
    content: string,
    clientId: string,
    type: MessageType = "text"
  ) {
    const member = await pool.query(
      `SELECT 1 FROM memberships WHERE user_id = $1 AND chat_id = $2`,
      [userId, chatId]
    );

    if (!member.rowCount) {
      throw new Error("NOT_A_MEMBER");
    }
    if (type === "text") {
      if (!content || content.trim() === "") {
        throw new Error("EMPTY_MESSAGE");
      }
    }

    if (type === "image" || type === "pdf") {
      if (!content) {
        throw new Error("FILE_URL_REQUIRED");
      }
    }
    const seqRes = await pool.query(
      `SELECT COALESCE(MAX(sequence_number), 0) + 1 AS seq
       FROM messages
       WHERE chat_id = $1`,
      [chatId]
    );

    const sequenceNumber = seqRes.rows[0].seq;

    const res = await pool.query(
      `INSERT INTO messages (chat_id, sender_id, content, sequence_number, client_id, type)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (client_id) DO NOTHING
       RETURNING *`,
      [chatId, userId, content, sequenceNumber, clientId, type]
    );

    return res.rows[0];
  }

}

export const messageService = new MessageService();