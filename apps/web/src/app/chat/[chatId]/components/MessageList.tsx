"use client";

import { useEffect, useRef } from "react";
import { CURRENT_USER_ID,Message } from "./mockData";
import MessageBubble from "./MessageBubble";

interface MessageListProps {
  messages: Message[];
}

function groupMessagesByDate(messages: Message[]): { date: string; messages: Message[] }[] {
  const groups: Record<string, Message[]> = {};

  for (const msg of messages) {
    const date = new Date(msg.created_at).toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
    if (!groups[date]) groups[date] = [];
    groups[date].push(msg);
  }

  return Object.entries(groups).map(([date, messages]) => ({ date, messages }));
}

export default function MessageList({ messages }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const groups = groupMessagesByDate(messages);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-8">
        <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
          <svg className="w-8 h-8 text-slate-600" fill="none" viewBox="0 0 24 24">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-400">No messages yet</p>
          <p className="text-xs text-slate-600 mt-1">Send the first message to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-6 py-4 space-y-1 scroll-smooth">
      {groups.map(({ date, messages: dayMsgs }) => (
        <div key={date}>
          {/* Date divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-white/[0.05]" />
            <span className="text-[10px] font-mono text-slate-600 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.05]">
              {date}
            </span>
            <div className="flex-1 h-px bg-white/[0.05]" />
          </div>

          <div className="space-y-1">
            {dayMsgs.map((msg, idx) => {
              const prevMsg = dayMsgs[idx - 1];
              const showSenderInfo =
                msg.type !== "system" &&
                (!prevMsg || prevMsg.sender_id !== msg.sender_id || prevMsg.type === "system");

              return (
                <div key={msg.id} className={showSenderInfo && idx !== 0 ? "mt-4" : "mt-0.5"}>
                  <MessageBubble message={msg} showSenderInfo={showSenderInfo} />
                </div>
              );
            })}
          </div>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
