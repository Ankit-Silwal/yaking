import api from "../api";
export async function getMessage(chatId:string){
  const res=await api.get(`/messages/${chatId}`)
  return res.data;
}