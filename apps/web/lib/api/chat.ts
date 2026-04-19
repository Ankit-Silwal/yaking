import api from "../api";

export async function fetchChat(){
  const res=await api.get('/chat')
  return res.data
}