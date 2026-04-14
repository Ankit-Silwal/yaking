import { pool } from "@repo/shared";

class MessageService {

  async sendMessage(
    userId: string,
    chatId: string,
    content: string,
    clientId: string
  ) {
    const member = await pool.query(
      `SELECT 1 FROM memberships WHERE user_id = $1 AND chat_id = $2`,
      [userId, chatId]
    );

    if (!member.rowCount) {
      throw new Error("NOT_A_MEMBER");
    }

    const seqRes = await pool.query(
      `SELECT COALESCE(MAX(sequence_number), 0) + 1 AS seq
       FROM messages
       WHERE chat_id = $1`,
      [chatId]
    );

    const sequenceNumber = seqRes.rows[0].seq;

    const res = await pool.query(
      `INSERT INTO messages (chat_id, sender_id, content, sequence_number, client_id)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (client_id) DO NOTHING
       RETURNING *`,
      [chatId, userId, content, sequenceNumber, clientId]
    );

    return res.rows[0];
  }

}

export const messageService = new MessageService();