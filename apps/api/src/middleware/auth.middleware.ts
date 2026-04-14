import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { Decoded } from "../types/decoded.js";

export interface AuthRequest extends Request {
  user?: any;
  userId?: string;
}

export const requireAuth = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) =>
{
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer "))
  {
    return res.status(401).json({ error: "Unauthorized: No token" });
  }
  try
  {
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: Token missing" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    console.log('Decoded JWT:', decoded); // Debug log
    req.user = decoded;
    if (typeof decoded === 'object' && decoded && 'id' in decoded) {
      req.userId = (decoded as Decoded).id;
    } else {
      console.warn('JWT does not contain id:', decoded);
    }
    next();
  }
  catch (err)
  {
    console.error("Token verification failed:", err);
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};