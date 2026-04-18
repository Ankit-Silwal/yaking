import type { Message } from "./types";

type Props = {
  msg: Message;
};
export function MessageItem({ msg }: Props) {
  const isMe = msg.sender_id === "me"; // This should be compared with the actual logged-in user's ID

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`flex flex-col ${
          isMe ? "items-end" : "items-start"
        } max-w-[50%]`}
      >
        {/* MESSAGE BUBBLE */}
        <div
          className={`px-4 py-3 rounded-2xl text-[14px] leading-relaxed shadow-sm ${
            isMe
              ? "bg-black text-white rounded-tr-none"
              : "bg-white text-gray-800 border border-gray-100 rounded-tl-none"
          }`}
        >
          {msg.content}
        </div>
        {/* STATUS */}
        {isMe && (
          <div className="flex items-center gap-1 mt-1.5 px-1">
            <span
              className={`text-[10px] font-bold ${
                msg.delivered_to.length > 0
                  ? "text-blue-500"
                  : "text-gray-400"
              }`}
            >
              {msg.delivered_to.length > 0 ? "Delivered" : "Sent"}
            </span>
            <svg
              className={`w-3 h-3 ${
                msg.delivered_to.length > 0
                  ? "text-blue-500"
                  : "text-gray-400"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}