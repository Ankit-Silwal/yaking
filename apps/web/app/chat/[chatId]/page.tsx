"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { SideBar } from "../components/chatSidebar";
import { ChatHeader } from "../components/chatHeader";
import { MessageInput } from "../components/messageInput";
import { MessageItem } from "../components/messageItem";
import { MessageList } from "../components/messageList";

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
      <SideBar 
      chatId={chatId}
      chats={chats}
      />

      {/* CHAT AREA */}
      <div className="flex-1 flex flex-col relative bg-[#F8F9FD]">
        
        {/* HEADER */}
        <ChatHeader 
        currentChat={currentChat}
        />
        {/* MESSAGES */}
        <MessageList 
        messages={messages[chatId] || []}
        />

        {/* INPUT AREA */}
        <MessageInput 
        input={input}
        setInput={setInput}
        handleSend={handleSend}
        />

      </div>
    </div>
  );
}