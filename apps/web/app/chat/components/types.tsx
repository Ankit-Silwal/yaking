export type Chat = {
  id: string;
  name: string;
  last: string;
};

export type Message = {
  id: string;
  text: string;
  sender: string;
  status?: string;
};

export type MessagesMap = Record<string, Message[]>;