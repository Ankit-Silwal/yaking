import { Server } from "socket.io";
import { Server as httpServer } from "node:http";
import jwt  from "jsonwebtoken";
import { joinChatSocket } from "./src/modules/chat/chat.socket.js";
import { pool } from "@repo/shared";
import type { Decoded } from "./src/types/decoded.js";
import { chatService } from "./src/modules/chat/chat.service.js";

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
    }catch(err){
      next(new Error(`Authentication failed:${err}`))
    }
  })
  io.on("connection",async (socket)=>{
    console.log("User connected to the socket",socket.id)
      const chats=await pool.query(`
        Select chat_id from memberships where user_id=$1`,
      [socket.userId]);
      for(const row of chats.rows){
        socket.join(row.chat_id)
      }
    joinChatSocket(io,socket);
    chatService.setIO(io);
    socket.on("disconnect",async()=>{
      console.log("Socket disconnected",socket.id)
    })
  })
}