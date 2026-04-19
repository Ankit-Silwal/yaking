"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SideBar } from "../components/chatSidebar";
import { ChatHeader } from "../components/chatHeader";
import { MessageInput } from "../components/messageInput";
import { MessageList } from "../components/messageList";
import { useChatStore } from "@/store/chatStore";
import { fetchMessage } from "@/lib/api/messages";
import { useChatSocket } from "@/hooks/useSocketListeners";
import socket from "@/lib/socket";

export default function ChatPage()
{
  const params = useParams();
  const chatId = params.chatId as string;

  const [input, setInput] = useState("");

  const setActiveChat = useChatStore((s) => s.setActiveChat);
  const setMessages = useChatStore((s) => s.setMessages);
  const activeChatId = useChatStore((s) => s.activeChatId);

  const userId = "bbd01f12-5d26-4e90-81be-81afb095e6aa";
  useChatSocket(chatId);
  useEffect(() =>
  {
    if (!chatId) return;

    const load = async () =>
    {
      const msgs = await fetchMessage(chatId, userId);
      setMessages(chatId, msgs);
    };

    load();
  }, [chatId, setMessages]);
  useEffect(() =>
  {
    if (!chatId) return;
    setActiveChat(chatId);
  }, [chatId, setActiveChat]);
  function handleSend()
  {
    if (!input.trim() || !activeChatId) return;

    const payload = {
      chatId: activeChatId,
      content: input,
      clientId: crypto.randomUUID(),
      type: "text" as const,
    };

    socket.emit("send-message", payload, (res: any) =>
    {
      if (res?.error)
      {
        console.error("Send failed:", res.error);
      }
    });

    setInput("");
  }
  return (
    <div className="flex h-screen bg-[#F8F9FD]">
      <SideBar />

      <div className="flex-1 flex flex-col">
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