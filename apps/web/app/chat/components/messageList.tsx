"use client";

import { useChatStore } from "@/store/chatStore";
import { MessageItem } from "./messageItem";

export function MessageList()
{
  const activeChatId = useChatStore((s) => s.activeChatId);
  const messagesMap = useChatStore((s) => s.messages);

  const messages = activeChatId ? messagesMap[activeChatId] || [] : [];

  return (
    <div className="flex-1 overflow-y-auto p-8 space-y-6">

      {messages.length === 0 && (
        <div className="text-center text-gray-400">
          No messages yet
        </div>
      )}

      {messages.map((msg) => (
        <MessageItem key={msg.id} msg={msg} />
      ))}

    </div>
  );
}