import type { Request, Response } from "express";
import { messageService } from "./messages.service.js";

type Params = {
  chatId: string;
};

type Query = {
  cursor?: string;
  limit?: string;
};

export const getMessages = async (
  req: Request<Params, {}, {}, Query>,
  res: Response
) =>
{
  const userId = req.userId as string;
  const { chatId } = req.params;
  const { cursor, limit } = req.query;

  if (!userId)
  {
    return res.status(401).json({ error: "Unauthorized" });
  }
  if (!chatId)
  {
    return res.status(400).json({ error: "chatId required" });
  }
  const parsedLimit = limit ? Number(limit) : 50;
  const parsedCursor = cursor ? Number(cursor) : null;
  if (parsedLimit <= 0 || parsedLimit > 100)
  {
    return res.status(400).json({ error: "invalid limit" });
  }
  if (parsedCursor !== null && isNaN(parsedCursor))
  {
    return res.status(400).json({ error: "invalid cursor" });
  }
  try
  {
    let messages;

    if (parsedCursor !== null)
    {
      messages = await messageService.getMessages({
        userId,
        chatId,
        cursor: parsedCursor,
        limit: parsedLimit
      });
    }
    else
    {
      messages = await messageService.getLatestMessages({
        userId,
        chatId,
        limit: parsedLimit
      });
    }

    return res.json({ messages });
  }
  catch (err: any)
  {
    if (err.message === "NOT_A_MEMBER")
    {
      return res.status(403).json({ error: err.message });
    }

    return res.status(500).json({ error: "Internal server error" });
  }
  
};

export const getUnreadCounts = async (req: Request, res: Response) =>
{
  const userId = req.userId as string;

  if (!userId)
  {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try
  {
    const unread = await messageService.getUnreadCount(userId);

    return res.json({ unread });
  }
  catch
  {
    return res.status(500).json({ error: "Internal server error" });
  }
};