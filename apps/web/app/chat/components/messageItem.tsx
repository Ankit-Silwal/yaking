import type { Message } from "./types";

type Props = {
  msg: Message;
};
export function MessageItem({ msg }: Props)
{
  return (
    <div className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
      <div className={`flex flex-col ${msg.sender === "me" ? "items-end" : "items-start"} max-w-[50%]`}>
        {/* MESSAGE BUBBLE */}
        <div
          className={`px-4 py-3 rounded-2xl text-[14px] leading-relaxed shadow-sm ${
            msg.sender === "me"
              ? "bg-black text-white rounded-tr-none"
              : "bg-white text-gray-800 border border-gray-100 rounded-tl-none"
          }`}
        >
          {msg.text}
        </div>
        {/* STATUS */}
        {msg.sender === "me" && msg.status && (
          <div className="flex items-center gap-1 mt-1.5 px-1">
            <span
              className={`text-[10px] font-bold ${
                msg.status === "Seen"
                  ? "text-blue-500"
                  : "text-gray-400"
              }`}
            >
              {msg.status}
            </span>
            <svg
              className={`w-3 h-3 ${
                msg.status === "Seen"
                  ? "text-blue-500"
                  : "text-gray-400"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>

          </div>
        )}

      </div>

    </div>
  );
}