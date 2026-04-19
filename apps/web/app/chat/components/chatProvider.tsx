"use client";
import { useEffect } from "react"
import { useChatStore } from "@/store/chatStore"
import { fetchChat } from "@/lib/api/chat"

export default function ChatProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const setChats = useChatStore((s) => s.setChats);
  useEffect(() => {
    async function load() {
      const chats = await fetchChat();
      setChats(chats);
    }
    load();
  }, [setChats]);
  return <>{children}</>;
}