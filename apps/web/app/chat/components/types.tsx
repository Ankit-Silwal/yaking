import { Timestamp } from "next/dist/server/lib/cache-handlers/types";

export type Chat = {
  id: string;
  name: string;
  last: string;
};

export type Message = {
  id: string;
  chat_id: string;
  sender_id: string;
  content: string;
  type: "system" | "pdf" | "text" | "image";
  sequence_number: string;
  client_id: string;
  created_at: string; 
  delivered_to: string[]; 
};

export type MessagesMap = Record<string, Message[]>;