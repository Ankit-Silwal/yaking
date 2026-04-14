export type ChatType = "direct" | "group";
export type MemberRole = "admin" | "member";

export interface CreateChatInput {
  name?: string;
  type: ChatType;
  memberIds?: string[];
}

export interface AddMemberInput {
  chatId: string;
  userId: string;
}