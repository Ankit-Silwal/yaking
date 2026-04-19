"use client";

import { useState } from "react";
import { Chat } from "./mockData";
import ChatItem from "./ChatItem";

interface ChatSidebarProps {
  chats: Chat[];
  selectedChatId: string;
  onSelectChat: (chatId: string) => void;
}

export default function ChatSidebar({ chats, selectedChatId, onSelectChat }: ChatSidebarProps) {
  const [search, setSearch] = useState("");

  const filtered = chats.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (chatId: string) => {
    console.log("Selected chat:", chatId);
    onSelectChat(chatId);
  };

  return (
    <aside className="w-80 flex-shrink-0 h-full flex flex-col border-r border-white/[0.06] bg-[#0d1117]">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-white/[0.06]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 16 16">
                <path d="M2 4.5A2.5 2.5 0 014.5 2h7A2.5 2.5 0 0114 4.5v5a2.5 2.5 0 01-2.5 2.5H9l-3 2.5V12H4.5A2.5 2.5 0 012 9.5v-5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-base font-bold text-slate-100 tracking-tight">Gatherly</span>
          </div>
          <button
            onClick={() => console.log("New chat clicked")}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-200 hover:bg-white/8 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
              <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 16 16">
            <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.4"/>
            <path d="M10.5 10.5l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            placeholder="Search conversations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-white/[0.05] border border-white/[0.08] rounded-lg text-slate-300 placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.07] transition-all"
          />
        </div>
      </div>

      {/* Section label */}
      <div className="px-5 pt-4 pb-2 flex items-center justify-between">
        <span className="text-[10px] font-semibold text-slate-600 uppercase tracking-widest font-mono">
          Messages
        </span>
        <span className="text-[10px] font-mono text-slate-700">{filtered.length}</span>
      </div>

      {/* Chat list */}
      <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-0.5 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 gap-2">
            <svg className="w-8 h-8 text-slate-700" fill="none" viewBox="0 0 24 24">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
            <p className="text-xs text-slate-600">No conversations found</p>
          </div>
        ) : (
          filtered.map((chat) => (
            <ChatItem
              key={chat.id}
              chat={chat}
              isSelected={chat.id === selectedChatId}
              onClick={handleSelect}
            />
          ))
        )}
      </div>

      {/* Bottom profile bar */}
      <div className="px-4 py-3 border-t border-white/[0.06] flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold">
          YO
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-slate-300 truncate">You</p>
          <p className="text-[10px] text-slate-600 font-mono">Active now</p>
        </div>
        <button
          onClick={() => console.log("Settings clicked")}
          className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-300 hover:bg-white/8 transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 16 16">
            <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.4"/>
            <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.1 3.1l1.4 1.4M11.5 11.5l1.4 1.4M3.1 12.9l1.4-1.4M11.5 4.5l1.4-1.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
    </aside>
  );
}
