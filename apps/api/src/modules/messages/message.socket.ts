import type { Socket,Server } from "socket.io"
import { messageService } from "./messages.service.js";

export function messageSocket(io:Server,socket:Socket){
  socket.on("send-message",async (data)=>{
    try{
      if(!socket.userId){
        return socket.emit("error",{
          message:"Unauthorized"
        });
      }
      const {chatId,content,clientId}=data;
      const userId = socket.userId;
      if(typeof userId !== "string"){
        return socket.emit("error",{
          message:"Unauthorized"
        });
      }
      const message=await messageService.sendMessage(
        userId,
        chatId,
        content,
        clientId
      );
      io.to(chatId).emit("new-messgae",message);
    }catch{
      return socket.emit("error",{
        message:"Failed to load the messages"
      });
    }
  });
}