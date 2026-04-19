import api from "../api";

export async function getChats(){
  const res=await api.get('/chat');
  return res.data;
}