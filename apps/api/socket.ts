import { Server } from "socket.io";
import { Server as httpServer } from "node:http";
import { joinChatSocket } from "./src/modules/chat/chat.socket.js";

let io:Server;

export async function initilizeSocket(HttpServer:httpServer){
  io=new Server(
    HttpServer,{
      cors:{
        origin:"*"
      }
    }
  )
  io.on("connection",(socket)=>{
    console.log("User connected to the socket",socket.id)
    joinChatSocket(io,socket);

    socket.on("disconnect",async()=>{
      console.log("Socket disconected",socket.id)
    })
  })
}