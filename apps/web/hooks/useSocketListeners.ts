import { useEffect } from "react";
import { useChatStore } from "@/store/chatStore";
import socket from "@/lib/socket";

export function useSocketListeners(){
  useEffect(()=>{
    const addMessage=useChatStore.getState().addMessage
    socket.on("new-message",(msg)=>{
      addMessage(msg.chatId,msg)
    })
    return ()=>{
      socket.off("new-message")
    }
  },[])
}