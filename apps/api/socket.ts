import { Server } from "socket.io";
import { Server as httpServer } from "node:http";
import jwt  from "jsonwebtoken";
import { joinChatSocket } from "./src/modules/chat/chat.socket.js";
import type { Socket } from "node:dgram";
import type { Decoded } from "./src/types/decoded.js";

let io:Server;

export async function initilizeSocket(HttpServer:httpServer){
  io=new Server(
    HttpServer,{
      cors:{
        origin:"*"
      }
    }
  )
  io.use((socket,next)=>{
    try{
      const token=socket.handshake.auth?.token;
      if(!token){
        return next(new Error("Unauthorized"))
      }
      const decoded=jwt.verify(token,process.env.JWT_SECRET!)
      if(typeof decoded!=="object" || !("id" in decoded)){
        return next(new Error("Invalid token"))
      }
      socket.userId=(decoded as Decoded).id;
      next();
    }catch(err:any){
      next(new Error("Authentication failed",err?.message))
    }
  })
  io.on("connection",(socket)=>{
    console.log("User connected to the socket",socket.id)
    joinChatSocket(io,socket);

    socket.on("disconnect",async()=>{
      console.log("Socket disconected",socket.id)
    })
  })
}