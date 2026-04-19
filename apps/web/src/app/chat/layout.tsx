"use client";

import { useEffect, useState } from "react";
import { getMe } from "@/lib/api/auth";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useChatStore } from "@/store/chatStore";
import { getChats } from "@/lib/api/chat";

export default function ChatLayout({ children }: { children: React.ReactNode })
{
  const setUser = useAuthStore((s) => s.setUser);
  const setChats = useChatStore((s) => s.setChats);
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }
      try {
        const res = await getMe();
        setUser(res.user);
        const chats = await getChats();
        setChats(chats);

        setLoading(false);
      } catch {
        localStorage.removeItem("token");
        router.push("/login");
      }
    };

    init();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-950 text-gray-500">
        <div className="flex items-center space-x-2">
          <svg
            className="h-5 w-5 animate-spin text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>Gathering your messages...</span>
        </div>
      </div>
    );
  }
  return <>{children}</>;
}