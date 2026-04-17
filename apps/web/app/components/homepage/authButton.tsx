"use client";
import { useEffect } from "react";


export default function AuthButtons()
{
  const backendUrl=process.env.NEXT_PUBLIC_API_URL

  const handleLogin=()=>{
    window.location.href=`${backendUrl}/auth/google`
  }
  const handleSignup=()=>{
    window.location.href=`${backendUrl}/auth/google`
  }
  return (
    <div>

      <button
        onClick={handleLogin}
        className="w-full bg-black text-white py-3 rounded-xl mb-4"
      >
        Log In
      </button>

      <button
        onClick={handleSignup}
        className="w-full border border-gray-300 py-3 rounded-xl text-black"
      >
        Sign Up
      </button>

    </div>
  );
}