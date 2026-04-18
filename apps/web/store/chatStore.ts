import { create } from "zustand";

type Message = {
  id: string;
  text: string;
  sender: "me" | "other";
  status?: "Seen" | "Delivered";
};

type Chat = {
  id: string;
  name: string;
  last: string;
};

type ChatStore = {
  messages: Record<string, Message[]>;
  chats: Chat[];
  activeChatId: string | null;

  setActiveChat: (chatId: string) => void;
  setMessages: (chatId: string, msgs: Message[]) => void;
  addMessage: (chatId: string, msg: Message) => void;
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
    set((state) => ({
      messages: {
        ...state.messages,
        [chatId]: [...(state.messages[chatId] || []), msg],
      },
    })),

  setChats: (chats) =>
    set(() => ({ chats })),
}));