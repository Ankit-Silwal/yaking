"use client";

import { useEffect } from "react";
import socket from "@/lib/socket";
import { useChatStore } from "@/store/chatStore";

export function useChatSocket(chatId: string | null)
{
  const addMessage = useChatStore((s) => s.addMessage);

  useEffect(() =>
  {
    if (!chatId) return;
    console.log("Joining chat:", chatId);
    socket.emit("join-chat", { chatId });
    socket.on("joined-chat", ({ chatId }) =>
    {
      console.log("Joined chat:", chatId);
    });
    socket.on("new-message", (msg) =>
    {
      console.log("Received:", msg);
      addMessage(msg.chat_id, msg);
    });
    socket.on("error", (err) =>
    {
      console.log("Socket error:", err);
    });

    return () =>
    {
      socket.off("joined-chat");
      socket.off("new-message");
      socket.off("error");
    };
  }, [chatId, addMessage]);
}