"use client";

import { useEffect, useRef } from "react";
import { useChatStore } from "@/store/chatStore";
import { MessageItem } from "./messageItem";

type Props = {
  currentUserId: string;
};
export function MessageList({ currentUserId }: Props)
{
  const activeChatId = useChatStore((s) => s.activeChatId);
  const messagesMap = useChatStore((s) => s.messages);

  const messages = activeChatId ? messagesMap[activeChatId] || [] : [];

  const containerRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto p-8 space-y-6"
    >

      {messages.length === 0 && (
        <div className="text-center text-gray-400">
          No messages yet
        </div>
      )}
      {messages.map((msg) => (
        <MessageItem
          key={msg.id}
          msg={msg}
          currentUserId={currentUserId}
        />
      ))}

      <div ref={bottomRef} />

    </div>
  );
}