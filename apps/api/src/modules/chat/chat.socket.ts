import type { Socket,Server } from "socket.io";
import { pool } from "@repo/shared";
export function joinChatSocket(io:Server,socket:Socket){
  socket.on("join-chat",async(data)=>{
    const {chatId,userId}=data;
    if(!chatId || !userId){
      return socket.emit("error",{
        message:"Provide correct chatId and userId"
      })
    }
    const membershipCheck=await pool.query(
      `
      select 1 from memberships where
      user_id=$1 and chat_id=$2
      `,[userId,chatId]
    );
    if(membershipCheck.rowCount===0){
      socket.emit("error",{
        message:"You arent the part of this conversation"
      })
    }
    socket.join(chatId)
  })
}