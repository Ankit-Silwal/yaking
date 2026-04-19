import {create} from "zustand"
import type {Chat} from "../types/chatTypes"

type ChatStore={
  chats:Chat[],
  setChats:(chats:Chat[])=>void;
}

export const useChatStore=create<ChatStore>((set)=>({
  chats:[],

  setChats:(chats)=>set({chats})
}))