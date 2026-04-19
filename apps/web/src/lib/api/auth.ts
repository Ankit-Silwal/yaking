import api from "../api"

export async function getMe() {
  const res=await api.get('/auth/me')
  return res.data;
}