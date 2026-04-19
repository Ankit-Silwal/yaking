"use client"
import { useEffect } from "react"
import socket from "@/lib/socket"

export default function SocketProvider({children}:{children:React.ReactNode}){
  useEffect(()=>{
    const token=localStorage.getItem("token");

    if(!token){
      console.log("No token error connecting to the socket");
      return;
    }
    socket.auth={token};
    socket.connect();
    socket.on("connect",()=>{
      console.log("Socket was connected successfully")
    })
    socket.on("error",(err)=>{
      console.error("Error",err.message)
    })
    return()=>{
      socket.disconnect()
    }
  },[]);
  return <>{children}</>
}