"use client";

export default function AuthButtons()
{
  return (
    <div>

      <button
        onClick={() => console.log("login")}
        className="w-full bg-black text-white py-3 rounded-xl mb-4"
      >
        Log In
      </button>

      <button
        onClick={() => console.log("signup")}
        className="w-full border border-gray-300 py-3 rounded-xl text-black"
      >
        Sign Up
      </button>

    </div>
  );
}