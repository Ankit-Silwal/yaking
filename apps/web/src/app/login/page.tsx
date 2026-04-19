"use client";
import { getMe } from "@/lib/api/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function LoginPage() {
  const router = useRouter();
  useEffect(() => {
    const check = async () => {
      const res = await getMe();
      if (res) {
        router.push(`/chat`);
      }
    };
    check()
  }, []);
  const handleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Welcome to Gatherly</h1>
          <p className="mt-2 text-gray-400">Sign in to continue</p>
        </div>
        <button
          onClick={handleLogin}
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
        >
          Login with Google
        </button>
      </div>
    </div>
  );
}
