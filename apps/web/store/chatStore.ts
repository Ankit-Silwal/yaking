import { create } from "zustand";

export type BackendMessage = {
  id: string;
  chat_id: string;
  sender_id: string;
  content: string;
  type: "text" | "pdf" | "image";
  sequence_number: string;
  client_id: string;
  created_at: string;
  delivered_to: string[];
};

export type SendMessagePayload = {
  chatId: string;
  content: string;
  clientId: string;
  type: "text" | "pdf" | "image";
};

type Chat = {
  id:string,
  name:string,
  type:"direct"|"group",
  created_at:string,
  role:"admin"|"member"
  last_message_content:"string",
  last_message_at:"string"
};

type ChatStore = {
  messages: Record<string, BackendMessage[]>;
  chats: Chat[];
  activeChatId: string | null;

  setActiveChat: (chatId: string) => void;
  setMessages: (chatId: string, msgs: BackendMessage[]) => void;
  addMessage: (chatId: string, msg: BackendMessage) => void;
  setChats: (chats: Chat[]) => void;
};

export const useChatStore = create<ChatStore>((set) => ({
  messages: {},
  chats: [],
  activeChatId: null,

  setActiveChat: (chatId) =>
    set(() => ({ activeChatId: chatId })),

  setMessages: (chatId, msgs) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [chatId]: msgs,
      },
    })),

  addMessage: (chatId, msg) =>
  set((state) =>
  {
    const existing = state.messages[chatId] || [];
    const alreadyExists = existing.some(
      (m) => m.client_id === msg.client_id
    );
    if (alreadyExists) return state;
    const updated = [...existing, msg];
    updated.sort(
      (a, b) =>
        Number(a.sequence_number) - Number(b.sequence_number)
    );
    return {
      messages: {
        ...state.messages,
        [chatId]: updated,
      },
    };
  }),
  setChats: (chats) =>
    set(() => ({ chats })),
}));