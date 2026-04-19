import {create} from "zustand"
import type { User } from "@/types/userTypes"

type AuthStore={
  user:User |null,
  setUser:(user:User)=>void;
  logout:()=>void;
}

export const useAuthStore=create<AuthStore>((set)=>({
  user:null,
  setUser:(user)=>set({user}),
  logout:()=>{
    localStorage.removeItem("token");
    set({user:null})
  }
}))