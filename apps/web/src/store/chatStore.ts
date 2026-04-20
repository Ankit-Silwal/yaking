import {create} from "zustand"
import type {Chat} from "../types/chatTypes"

type ChatStore={
  chats:Chat[],
  setChats:(chats:Chat[])=>void,
  selectedChatId:string|null,
  setSelectedChatId:(chatId:string)=>void
}

export const useChatStore=create<ChatStore>((set)=>({
  chats:[],
  selectedChatId:null,

  setChats:(chats)=>set({chats}),
  setSelectedChatId:(chatId)=>set({selectedChatId:chatId})
}))