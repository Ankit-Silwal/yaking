import type { Socket,Server } from "socket.io"
import { messageService } from "./messages.service.js";
import type { messagePayload } from "./message.type.js";

export function messageSocket(io:Server,socket:Socket){
  socket.on("send-message",async (data:messagePayload,callback)=>{
    try{
      if(!socket.userId){
        return callback?.({error:"Unauthorized"})
      }
      const userId = socket.userId;
      if(typeof userId !== "string"){
        return socket.emit("error",{
          message:"Unauthorized"
        });
      }
      const message=await messageService.sendMessage(
        userId,
        data
      );
      io.to(data.chatId).emit("new-message",message);
      callback?.({
        success:true,message
      })
    }catch(error:any){
      return callback?.({
        error:error.message
      })
    }
  });
}