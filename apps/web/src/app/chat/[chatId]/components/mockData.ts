export type MessageType = "text" | "video" | "pdf" | "system";
export type ChatType = "group" | "direct";
export type ChatRole = "admin" | "member";

export interface Message {
  id: string;
  chat_id: string;
  sender_id: string;
  content: string;
  type: MessageType;
  sequence_number: string;
  client_id: string;
  created_at: string;
  delivered_to: string;
}

export interface Chat {
  id: string;
  name: string;
  type: ChatType;
  role: ChatRole;
  created_at: string;
  last_message_content: string;
  last_message_at: string;
}

export const CURRENT_USER_ID = "user-001";

export const mockChats: Chat[] = [
  {
    id: "chat-001",
    name: "Design Team",
    type: "group",
    role: "admin",
    created_at: "2024-01-10T08:00:00Z",
    last_message_content: "Can you review the new mockups?",
    last_message_at: "2025-04-20T14:32:00Z",
  },
  {
    id: "chat-002",
    name: "Aryan Mehta",
    type: "direct",
    role: "member",
    created_at: "2024-02-14T10:00:00Z",
    last_message_content: "The build is passing now ✓",
    last_message_at: "2025-04-20T13:55:00Z",
  },
  {
    id: "chat-003",
    name: "Product Sync",
    type: "group",
    role: "member",
    created_at: "2024-03-01T09:00:00Z",
    last_message_content: "Sprint planning is moved to Thursday",
    last_message_at: "2025-04-20T11:20:00Z",
  },
  {
    id: "chat-004",
    name: "Sneha Patel",
    type: "direct",
    role: "member",
    created_at: "2024-01-20T12:00:00Z",
    last_message_content: "Sent you the PDF report",
    last_message_at: "2025-04-19T18:45:00Z",
  },
  {
    id: "chat-005",
    name: "Engineering",
    type: "group",
    role: "admin",
    created_at: "2023-12-01T08:00:00Z",
    last_message_content: "Deploying to prod at 6PM today",
    last_message_at: "2025-04-19T15:10:00Z",
  },
  {
    id: "chat-006",
    name: "Rohan Verma",
    type: "direct",
    role: "member",
    created_at: "2024-04-05T11:00:00Z",
    last_message_content: "Let's catch up tomorrow?",
    last_message_at: "2025-04-18T20:30:00Z",
  },
  {
    id: "chat-007",
    name: "Marketing",
    type: "group",
    role: "member",
    created_at: "2024-02-28T09:00:00Z",
    last_message_content: "Campaign goes live Monday",
    last_message_at: "2025-04-17T09:00:00Z",
  },
];

export const mockMessages: Message[] = [
  {
    id: "msg-001",
    chat_id: "chat-001",
    sender_id: "user-002",
    content: "Hey team, just pushed the new component library updates.",
    type: "text",
    sequence_number: "1",
    client_id: "cl-001",
    created_at: "2025-04-20T13:00:00Z",
    delivered_to: "user-001",
  },
  {
    id: "msg-002",
    chat_id: "chat-001",
    sender_id: "user-001",
    content: "Nice! Which components were updated?",
    type: "text",
    sequence_number: "2",
    client_id: "cl-002",
    created_at: "2025-04-20T13:02:00Z",
    delivered_to: "user-002",
  },
  {
    id: "msg-003",
    chat_id: "chat-001",
    sender_id: "user-002",
    content: "Button, Input, and the new Modal system. Also fixed the dark mode tokens.",
    type: "text",
    sequence_number: "3",
    client_id: "cl-003",
    created_at: "2025-04-20T13:03:00Z",
    delivered_to: "user-001",
  },
  {
    id: "msg-004",
    chat_id: "chat-001",
    sender_id: "user-003",
    content: "Aryan added Meera to the chat",
    type: "system",
    sequence_number: "4",
    client_id: "cl-004",
    created_at: "2025-04-20T13:05:00Z",
    delivered_to: "all",
  },
  {
    id: "msg-005",
    chat_id: "chat-001",
    sender_id: "user-001",
    content: "design-system-v2.pdf",
    type: "pdf",
    sequence_number: "5",
    client_id: "cl-005",
    created_at: "2025-04-20T13:08:00Z",
    delivered_to: "user-002",
  },
  {
    id: "msg-006",
    chat_id: "chat-001",
    sender_id: "user-003",
    content: "Can you review the new mockups I added to Figma?",
    type: "text",
    sequence_number: "6",
    client_id: "cl-006",
    created_at: "2025-04-20T13:15:00Z",
    delivered_to: "user-001",
  },
  {
    id: "msg-007",
    chat_id: "chat-001",
    sender_id: "user-001",
    content: "On it. Give me 20 minutes.",
    type: "text",
    sequence_number: "7",
    client_id: "cl-007",
    created_at: "2025-04-20T13:16:00Z",
    delivered_to: "user-003",
  },
  {
    id: "msg-008",
    chat_id: "chat-001",
    sender_id: "user-002",
    content: "walkthrough-demo.mp4",
    type: "video",
    sequence_number: "8",
    client_id: "cl-008",
    created_at: "2025-04-20T13:20:00Z",
    delivered_to: "user-001",
  },
  {
    id: "msg-009",
    chat_id: "chat-001",
    sender_id: "user-001",
    content: "Great walkthrough! The transitions feel much smoother now.",
    type: "text",
    sequence_number: "9",
    client_id: "cl-009",
    created_at: "2025-04-20T13:25:00Z",
    delivered_to: "user-002",
  },
  {
    id: "msg-010",
    chat_id: "chat-001",
    sender_id: "user-003",
    content: "Agreed. Should we ship this in next sprint or wait for QA?",
    type: "text",
    sequence_number: "10",
    client_id: "cl-010",
    created_at: "2025-04-20T13:28:00Z",
    delivered_to: "user-001",
  },
  {
    id: "msg-011",
    chat_id: "chat-001",
    sender_id: "user-001",
    content: "Let's get QA to sign off first. I'll create the ticket now.",
    type: "text",
    sequence_number: "11",
    client_id: "cl-011",
    created_at: "2025-04-20T13:29:00Z",
    delivered_to: "user-003",
  },
  {
    id: "msg-012",
    chat_id: "chat-001",
    sender_id: "user-002",
    content: "Sounds good. I'll update the changelog in the meantime.",
    type: "text",
    sequence_number: "12",
    client_id: "cl-012",
    created_at: "2025-04-20T13:30:00Z",
    delivered_to: "user-001",
  },
  {
    id: "msg-013",
    chat_id: "chat-001",
    sender_id: "user-001",
    content: "Can you review the new mockups?",
    type: "text",
    sequence_number: "13",
    client_id: "cl-013",
    created_at: "2025-04-20T14:32:00Z",
    delivered_to: "user-002",
  },
];

export const mockSenderNames: Record<string, string> = {
  "user-001": "You",
  "user-002": "Aryan",
  "user-003": "Meera",
};

export const mockSenderInitials: Record<string, string> = {
  "user-001": "YO",
  "user-002": "AM",
  "user-003": "MP",
};

export const mockSenderColors: Record<string, string> = {
  "user-001": "#6366f1",
  "user-002": "#06b6d4",
  "user-003": "#f43f5e",
};
