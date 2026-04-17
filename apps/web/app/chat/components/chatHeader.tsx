import type { Chat } from "./types"
type props={
  currentChat:Chat|undefined
}
export function ChatHeader({currentChat}:props){
  return(
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center px-8 justify-between z-10 sticky top-0">
          {currentChat ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm">
                {currentChat.name.charAt(0)}
              </div>
              <div>
                <div className="font-bold text-gray-900">{currentChat.name}</div>
                <div className="text-[10px] text-green-500 font-bold uppercase tracking-wider">Active Now</div>
              </div>
            </div>
          ) : <div className="text-gray-400 font-medium">Select a conversation</div>}
        </header>
  )
}