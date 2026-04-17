"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();

  const chatId = params.chatId as string;
  const [input, setInput] = useState("");

  const chats = [
    { id: "1", name: "Ankit", last: "Hey bro" },
    { id: "2", name: "Dev Group", last: "Meeting at 5" },
    { id: "3", name: "Rahul", last: "Where are you?" },
  ];

  const messages: Record<string, { id: string; text: string; sender: string; status?: string }[]> = {
    "1": [
      { id: "m1", text: "Hey bro 👋", sender: "other" },
      { id: "m2", text: "Yo! What’s up?", sender: "me", status: "Seen" },
      { id: "m3", text: "Nothing much, coding all day", sender: "other" },
      { id: "m4", text: "Same here 😂", sender: "me", status: "Delivered" },
    ],
    "2": [
      { id: "m5", text: "Meeting at 5 guys", sender: "other" },
      { id: "m6", text: "Got it 👍", sender: "me", status: "Seen" },
    ],
    "3": [
      { id: "m7", text: "Where are you?", sender: "other" },
      { id: "m8", text: "On my way", sender: "me", status: "Delivered" },
    ],
  };

  const currentChat = chats.find(c => c.id === chatId);

  const handleSend = () => {
    if (!input.trim()) return;
    console.log("Send:", input);
    setInput("");
  };

  return (
    <div className="flex h-screen bg-[#F8F9FD] font-sans antialiased overflow-hidden">
      
      {/* SIDEBAR */}
      <div className="w-80 flex flex-col bg-white border-r border-gray-100 shadow-sm z-20">
        <div className="p-6 pb-4">
          <h1 className="text-2xl font-black tracking-tight text-gray-900">Chats</h1>
        </div>

        <div className="flex-1 overflow-y-auto px-3 space-y-1">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => router.push(`/chat/${chat.id}`)}
              className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all ${
                chatId === chat.id ? "bg-black text-white shadow-lg shadow-black/10" : "hover:bg-gray-50 text-gray-700"
              }`}
            >
              <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold shrink-0 ${
                chatId === chat.id ? "bg-white/20" : "bg-gray-100 text-gray-600"
              }`}>
                {chat.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold truncate text-sm">{chat.name}</div>
                <div className={`text-xs truncate ${chatId === chat.id ? "text-white/70" : "text-gray-400"}`}>
                  {chat.last}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CHAT AREA */}
      <div className="flex-1 flex flex-col relative bg-[#F8F9FD]">
        
        {/* HEADER */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center px-8 justify-between z-10 sticky top-0">
          {currentChat ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm">
                {currentChat.name.charAt(0)}
              </div>
              <div>
                <div className="font-bold text-gray-900">{currentChat.name}</div>
                <div className="text-[10px] text-green-500 font-bold uppercase tracking-wider">Active Now</div>
              </div>
            </div>
          ) : <div className="text-gray-400 font-medium">Select a conversation</div>}
        </header>

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {(messages[chatId] || []).map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
              <div className={`flex flex-col ${msg.sender === "me" ? "items-end" : "items-start"} max-w-[50%]`}>
                
                {/* Message Bubble */}
                <div className={`px-4 py-3 rounded-2xl text-[14px] leading-relaxed shadow-sm ${
                  msg.sender === "me" 
                    ? "bg-black text-white rounded-tr-none" 
                    : "bg-white text-gray-800 border border-gray-100 rounded-tl-none"
                }`}>
                  {msg.text}
                </div>

                {/* Status Indicator with Gap */}
                {msg.sender === "me" && msg.status && (
                  <div className="flex items-center gap-1 mt-1.5 px-1">
                    <span className={`text-[10px] font-bold uppercase tracking-tighter ${
                      msg.status === "Seen" ? "text-blue-500" : "text-gray-400"
                    }`}>
                      {msg.status}
                    </span>
                    {/* Tiny Checkmark Icon */}
                    <svg className={`w-3 h-3 ${msg.status === "Seen" ? "text-blue-500" : "text-gray-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                       <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* INPUT AREA */}
        <div className="p-6 bg-transparent">
          <div className="max-w-3xl mx-auto flex items-center gap-3 bg-white p-2 rounded-[24px] shadow-xl shadow-black/5 border border-gray-100">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Write a message..."
              className="flex-1 bg-transparent px-4 py-2 outline-none text-sm text-gray-800 placeholder:text-gray-400"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="bg-black text-white h-10 px-6 rounded-full text-xs font-bold hover:bg-gray-800 transition-all active:scale-95 disabled:opacity-20"
            >
              SEND
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}