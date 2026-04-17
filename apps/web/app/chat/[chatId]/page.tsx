"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SideBar } from "../components/chatSidebar";
import { ChatHeader } from "../components/chatHeader";
import { MessageInput } from "../components/messageInput";
import { MessageList } from "../components/messageList";
import { useChatStore } from "@/store/chatStore";

type Chat = {
  id: string;
  name: string;
  last: string;
};

type Message = {
  id: string;
  text: string;
  sender: "me" | "other";
  status?: "Seen" | "Delivered";
};

export default function ChatPage()
{
  const params = useParams();
  const chatId = params.chatId as string;

  const [input, setInput] = useState<string>("");

  const setActiveChat = useChatStore((s) => s.setActiveChat);
  const setChats = useChatStore((s) => s.setChats);
  const setMessages = useChatStore((s) => s.setMessages);
  const addMessage = useChatStore((s) => s.addMessage);
  const activeChatId = useChatStore((s) => s.activeChatId);

  const chats: Chat[] = [
    { id: "1", name: "Ankit", last: "Hey bro" },
    { id: "2", name: "Dev Group", last: "Meeting at 5" },
    { id: "3", name: "Rahul", last: "Where are you?" },
  ];

  const messages: Record<string, Message[]> = {
    "1": [
      { id: "m1", text: "Hey bro 👋", sender: "other" },
      { id: "m2", text: "Yo! What’s up?", sender: "me", status: "Seen" },
    ],
    "2": [
      { id: "m5", text: "Meeting at 5 guys", sender: "other" },
    ],
    "3": [
      { id: "m7", text: "Where are you?", sender: "other" },
    ],
  };

  useEffect(() =>
  {
    setActiveChat(chatId);
    setChats(chats);
    setMessages(chatId, messages[chatId] || []);
  }, [chatId]);

  function handleSend(): void
  {
    if (!input.trim() || !activeChatId) return;

    const msg: Message = {
      id: crypto.randomUUID(),
      text: input,
      sender: "me",
    };

    addMessage(activeChatId, msg);
    setInput("");
  }

  return (
    <div className="flex h-screen bg-[#F8F9FD] font-sans antialiased overflow-hidden">
      <SideBar />
      <div className="flex-1 flex flex-col relative bg-[#F8F9FD]">
        <ChatHeader />
        <MessageList />
        <MessageInput
          input={input}
          setInput={setInput}
          handleSend={handleSend}
        />
      </div>
    </div>
  );
}