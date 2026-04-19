import { Server } from "socket.io";
import { Server as httpServer } from "node:http";
import jwt  from "jsonwebtoken";
import { joinChatSocket } from "./src/modules/chat/chat.socket.js";
import { messageSocket } from "./src/modules/messages/message.socket.js";
import { pool } from "@repo/shared";
import type { Decoded } from "./src/types/decoded.js";
import { chatService } from "./src/modules/chat/chat.service.js";
import { setUpRedisAdapter } from "./src/configs/redis.js";
import {redis} from "./src/configs/redis.js"
let io:Server;

export async function initilizeSocket(HttpServer:httpServer){
  io=new Server(
    HttpServer,{
      cors:{
        origin:"http://localhost:3000"
      }
    }
  )
  await setUpRedisAdapter(io);
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
    const userId=socket.userId;
    if(userId){
      const count=await redis.incr(`user:${userId}:connections`)
      if(count==1){
        await redis.sadd("online-users",userId)
        const chatRes=await pool.query(`
          select chat_id from memberships where user_id=$1
          `,[userId])
        for(const row of chatRes.rows){
          io.to(row.chat_id).emit("user-online",{userId})
        }
      }
      socket.onAny((event,...args)=>{
        console.log("Event received ",event,args)
      })
      socket.join(userId) 
    }
    console.log("User connected to the socket",socket.id)
      const chats=await pool.query(`
        Select chat_id from memberships where user_id=$1`,
      [socket.userId]);
      for(const row of chats.rows){
        socket.join(row.chat_id)
      }
    joinChatSocket(io,socket);
    messageSocket(io, socket);
    chatService.setIO(io);
    socket.on("disconnect",async()=>{
      const userId=socket.userId;
      if(!userId) return;
      const count=await redis.decr(`user:${userId}:connections`);
      if(count==0){
        await redis.srem("online-users",userId)
        const chatRes=await pool.query(`
          select chat_id from memberships where user_id=$1
          `,[userId])
        for(const row of chatRes.rows){
          io.to(row.chat_id).emit("user-offline",{userId})
        }
      }
      console.log("Socket disconnected",socket.id)
    })
  })
}