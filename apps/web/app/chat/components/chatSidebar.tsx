"use client"
import { useRouter } from "next/navigation"
import type { Chat } from "./types"
import { useChatStore } from "@/store/chatStore"
type Props={
  chatId:string,
  chats:Chat[]
}
export function SideBar(){
  const chats=useChatStore((s)=>s.chats)
  const activeChatId=useChatStore((s)=>s.activeChatId)
  const setActiveChat=useChatStore((s)=>s.setActiveChat)
  const router=useRouter()
  return(
    <div className="w-80 flex flex-col bg-white border-r border-gray-100 shadow-sm z-20">
        <div className="p-6 pb-4">
          <h1 className="text-2xl font-black tracking-tight text-gray-900">Chats</h1>
        </div>

        <div className="flex-1 overflow-y-auto px-3 space-y-1">
          {chats.map((chat) => (
            <div
            key={chat.id}
              onClick={() =>{
                  setActiveChat(chat.id)
                 router.push(`/chat/${chat.id}`)}}
              className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all ${
                activeChatId === chat.id ? "bg-black text-white shadow-lg shadow-black/10" : "hover:bg-gray-50 text-gray-700"
              }`}
            >
              <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold shrink-0 ${
                activeChatId === chat.id ? "bg-white/20" : "bg-gray-100 text-gray-600"
              }`}>
                {chat.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold truncate text-sm">{chat.name}</div>
                <div className={`text-xs truncate ${activeChatId === chat.id ? "text-white/70" : "text-gray-400"}`}>
                  {chat.last}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
  )
}