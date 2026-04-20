import { create } from "zustand";

import type { Message } from "@/types/messageTypes";

type MessageStore = {
  messages: Record<string, Message[]>;
  setMessages: (chatId: string, msgs: Message[]) => void;
  addMessage: (chatId: string, msg: Message) => void;
  clearMessages: (chatId: string) => void;
};

export const useMessageStore = create<MessageStore>((set) => ({
  messages: {},

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

  clearMessages: (chatId) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [chatId]: [],
      },
    })),
}));