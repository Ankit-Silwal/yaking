"use client";

import { useState } from "react";
import { mockMessages,mockChats } from "./components/mockData";
import ChatSidebar from "./components/ChatSidebar";
import ChatHeader from "./components/ChatHeader";
import MessageList from "./components/MessageList";
import MessageInput from "./components/MessageInput";
export default function ChatPage() {
  const [selectedChatId, setSelectedChatId] = useState<string>(mockChats[0].id);

  const selectedChat = mockChats.find((c) => c.id === selectedChatId) ?? mockChats[0];
  const chatMessages = mockMessages.filter((m) => m.chat_id === selectedChatId);

  const handleSelectChat = (chatId: string) => {
    setSelectedChatId(chatId);
  };

  return (
    <div
      className="flex h-screen w-screen overflow-hidden bg-[#080d14] text-white"
      style={{ fontFamily: "'Sora', 'Inter', sans-serif" }}
    >
      {/* Sidebar */}
      <ChatSidebar
        chats={mockChats}
        selectedChatId={selectedChatId}
        onSelectChat={handleSelectChat}
      />

      {/* Main chat area */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#0d1117]">
        <ChatHeader chat={selectedChat} />
        <MessageList messages={chatMessages} />
        <MessageInput />
      </main>
    </div>
  );
}
