export type MessageType="text"|"pdf"|"image"

export interface messagePayload{
  chatId: string,
  content: string,
  clientId: string,
  type: MessageType
}