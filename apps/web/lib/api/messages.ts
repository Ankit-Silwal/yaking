import api from "@/lib/api";

export const fetchMessage = async (chatId: string, userId: string) =>
{
  const res = await api.get(`/messages/${chatId}/messages`);

  return res.data.messages.map((msg: any) => ({
    id: msg.id,
    text: msg.content,
    sender: msg.sender_id === userId ? "me" : "other",
    status: "Delivered",
  }));
};