"use client"
import api from "@/lib/api";
import AuthButtons from "./homepage/authButton";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function Home()
{
  const router=useRouter()
  useEffect(()=>{
    const initAuth=async ()=>{
      const params=new URLSearchParams(window.location.search)
      const token=params.get("token")
      if(token){
        localStorage.setItem("token",token)
        window.history.replaceState({},"","/");
      }
      try{
        await api.get('/auth/me')
        router.push("/chat")
      }catch{
        console.log("User not authenticated")
      }
    };
    initAuth();
  },[router])

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300">

      <div className="flex w-full max-w-6xl rounded-3xl overflow-hidden shadow-2xl">
        <div className="hidden md:flex flex-1 flex-col justify-center p-14 bg-black text-white relative">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-gray-800 opacity-90" />
          <div className="relative z-10">
            <h1 className="text-5xl font-bold mb-6 tracking-tight">
              Gatherly
            </h1>
            <p className="text-xl text-gray-300 mb-4">
              A place for meaningful conversations
            </p>
            <p className="text-sm text-gray-400 leading-relaxed max-w-md">
              Build communities, chat in real-time, and stay connected with people that matter.
            </p>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center bg-white p-10">
          <div className="w-full max-w-sm">
            <h2 className="text-2xl font-semibold text-center text-black mb-2">
              Welcome to Gatherly
            </h2>
            <p className="text-center text-gray-500 text-sm mb-8">
              Start chatting in real-time
            </p>
            {/* CLIENT COMPONENT */}
            <AuthButtons />
            <p className="text-xs text-gray-400 text-center mt-6 leading-relaxed">
              By continuing, you agree to Gatherly’s Terms and Privacy Policy.
            </p>

          </div>

        </div>

      </div>
      <div className="absolute bottom-4 text-xs text-gray-500 text-center w-full">
        © 2026 Gatherly · Privacy · Terms
      </div>

    </main>
  );
}