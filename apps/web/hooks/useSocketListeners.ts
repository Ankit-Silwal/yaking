"use client";

import { useEffect } from "react";
import socket from "@/lib/socket";
import { useChatStore } from "@/store/chatStore";

export function useSocketListeners()
{
  useEffect(() =>
  {
    const addMessage = useChatStore.getState().addMessage;
    socket.on("new-message", (msg) =>
    {
      addMessage(msg.chat_id, msg);
    });
    return () =>
    {
      socket.off("new-message");
    };
  }, []);
}