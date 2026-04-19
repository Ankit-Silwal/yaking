"use client";

import { useEffect } from "react";

export default function Home()
{
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get("token");

    if (tokenFromUrl) {
      localStorage.setItem("token", tokenFromUrl);
      window.location.href = "/chat";
      return;
    }

    const existingToken = localStorage.getItem("token");

    if (!existingToken) {
      window.location.href = "/login";
    } else {
      window.location.href = "/chat";
    }
  }, []);

  return <div>Loading...</div>;
}