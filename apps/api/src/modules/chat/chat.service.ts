import { pool } from "@repo/shared";

class ChatService {

  private io: any;

  setIO(io: any) {
    this.io = io;
  }

  async createSystemMessage(chatId: string, content: string) {
    const seqRes = await pool.query(
      `SELECT COALESCE(MAX(sequence_number), 0) + 1 AS seq
       FROM messages
       WHERE chat_id = $1`,
      [chatId]
    );
    const sequenceNumber = seqRes.rows[0].seq;
    const res = await pool.query(
      `INSERT INTO messages (chat_id, content, sequence_number, type, client_id)
       VALUES ($1, $2, $3, 'system', gen_random_uuid())
       RETURNING *`,
      [chatId, content, sequenceNumber]
    );

    return res.rows[0];
  }

  async createChat(userId: string, data: { name?: string; type: "direct" | "group"; memberIds?: string[] }) {
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      const chatRes = await client.query(
        `INSERT INTO chats (name, type, created_by)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [data.name || null, data.type, userId]
      );

      const chat = chatRes.rows[0];

      await client.query(
        `INSERT INTO memberships (user_id, chat_id, role)
         VALUES ($1, $2, 'admin')`,
        [userId, chat.id]
      );

      if (data.memberIds?.length) {
        for (const memberId of data.memberIds) {
          if (memberId === userId) continue;

          await client.query(
            `INSERT INTO memberships (user_id, chat_id)
             VALUES ($1, $2)
             ON CONFLICT DO NOTHING`,
            [memberId, chat.id]
          );
        }
      }

      await client.query("COMMIT");

      return chat;

    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }
  }

  async addMember(requesterId: string, chatId: string, targetUserId: string) {
    const chatRes = await pool.query(
      `SELECT * FROM chats WHERE id = $1`,
      [chatId]
    );

    if (!chatRes.rowCount) throw new Error("CHAT_NOT_FOUND");

    const memberRes = await pool.query(
      `SELECT role FROM memberships WHERE user_id = $1 AND chat_id = $2`,
      [requesterId, chatId]
    );

    if (!memberRes.rowCount) throw new Error("NOT_A_MEMBER");

    if (memberRes.rows[0].role !== "admin") {
      throw new Error("ONLY_ADMIN_CAN_ADD");
    }

    await pool.query(
      `INSERT INTO memberships (user_id, chat_id)
       VALUES ($1, $2)
       ON CONFLICT DO NOTHING`,
      [targetUserId, chatId]
    );

    const message = await this.createSystemMessage(
      chatId,
      `User ${targetUserId} was added`
    );

    this.io.to(chatId).emit("new_message", message);

    this.io.to(targetUserId).emit("added_to_chat", { chatId });

    return { success: true };
  }

  async removeMember(requesterId: string, chatId: string, targetUserId: string) {
    const memberRes = await pool.query(
      `SELECT role FROM memberships WHERE user_id = $1 AND chat_id = $2`,
      [requesterId, chatId]
    );

    if (!memberRes.rowCount) throw new Error("NOT_A_MEMBER");

    if (memberRes.rows[0].role !== "admin") {
      throw new Error("ONLY_ADMIN_CAN_REMOVE");
    }

    if (requesterId === targetUserId) {
      throw new Error("USE_LEAVE");
    }

    await pool.query(
      `DELETE FROM memberships WHERE user_id = $1 AND chat_id = $2`,
      [targetUserId, chatId]
    );

    const message = await this.createSystemMessage(
      chatId,
      `User ${targetUserId} was removed`
    );

    this.io.to(chatId).emit("new_message", message);

    this.io.to(targetUserId).emit("removed_from_chat", { chatId });

    return { success: true };
  }

  async leaveChat(userId: string, chatId: string) {
    const memberRes = await pool.query(
      `SELECT role FROM memberships WHERE user_id = $1 AND chat_id = $2`,
      [userId, chatId]
    );

    if (!memberRes.rowCount) throw new Error("NOT_A_MEMBER");

    const role = memberRes.rows[0].role;

    if (role === "admin") {
      const adminCountRes = await pool.query(
        `SELECT COUNT(*) FROM memberships WHERE chat_id = $1 AND role = 'admin'`,
        [chatId]
      );

      const adminCount = parseInt(adminCountRes.rows[0].count);

      if (adminCount <= 1) {
        throw new Error("CANNOT_LEAVE_AS_ONLY_ADMIN");
      }
    }

    await pool.query(
      `DELETE FROM memberships WHERE user_id = $1 AND chat_id = $2`,
      [userId, chatId]
    );

    const message = await this.createSystemMessage(
      chatId,
      `User ${userId} left the chat`
    );

    this.io.to(chatId).emit("new_message", message);

    return { success: true };
  }

}

export const chatService = new ChatService();