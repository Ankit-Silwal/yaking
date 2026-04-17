import {create} from "zustand"

type Message={
  id:string,
  text:string,
  sender:string,
  status?:string
}

type Chat={
  id:string,
  name:string,
  last:string
}

type ChatStore={
  messages:Record<string,Message[]>
  chats:Chat[]
  activeChatId:string|null

  setActiveChat:(chatId:string)=>void
  setMessages:(chatId:string,msg:Message[])=>void
  addMessage:(chatId:string,msg:Message)=>void
}

export const useChatStore=create<ChatStore>((set)=>({
  messages:{},
  chats:[],
  activeChatId:null,

  setActiveChat:(chatId:string)=>
    set(()=>({activeChatId:chatId})),

  setMessages:(chatId,msgs)=>
    set((state)=>({
      messages:{
        ...state.messages,
        [chatId]:msgs,
      }
    })),

    addMessage:(chatId,msg)=>
      set((state)=>({
        messages:{
          ...state.messages,
          [chatId]:[...(state.messages[chatId]||[]),msg]
        }
      }))

}))