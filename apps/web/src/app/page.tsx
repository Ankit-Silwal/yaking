"use client";

import { useEffect } from "react";

export default function Home()
{
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      window.location.href = "/chat"; // move to app
    }
    if(!token){
      window.location.href="/login"
    }
  }, []);

  return <div>Loading...</div>;
}