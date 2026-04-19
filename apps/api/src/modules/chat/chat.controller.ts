import type { Request, Response } from "express";
import { chatService } from "./chat.service.js";

export const createChat = async (req: Request, res: Response) => {
  try {
    if (!req.userId) return res.status(401).json({ error: "Unauthorized" });

    const chat = await chatService.createChat(req.userId, req.body);
    res.json(chat);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const addMember = async (req: Request, res: Response) => {
  try {
    if (!req.userId) return res.status(401).json({ error: "Unauthorized" });

    const result = await chatService.addMember(
      req.userId,
      req.body.chatId,
      req.body.targetUserId
    );

    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const removeMember = async (req: Request, res: Response) => {
  try {
    if (!req.userId) return res.status(401).json({ error: "Unauthorized" });

    const result = await chatService.removeMember(
      req.userId,
      req.body.chatId,
      req.body.targetUserId
    );

    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const leaveChat = async (req: Request, res: Response) => {
  try {
    if (!req.userId) return res.status(401).json({ error: "Unauthorized" });

    const result = await chatService.leaveChat(
      req.userId,
      req.body.chatId
    );

    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getChats = async (req: Request, res: Response) => {
  try {
    if (!req.userId) return res.status(401).json({ error: "Unauthorized" });

    const chats = await chatService.getChats(req.userId);
    res.json(chats);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};