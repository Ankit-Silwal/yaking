import { Chat } from "./mockData";
interface ChatItemProps {
  chat: Chat;
  isSelected: boolean;
  onClick: (chatId: string) => void;
}

function formatTime(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  if (isToday) {
    return date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
  }
  return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const avatarColors: Record<number, string> = {
  0: "from-indigo-500 to-violet-600",
  1: "from-cyan-500 to-blue-600",
  2: "from-rose-500 to-pink-600",
  3: "from-amber-500 to-orange-600",
  4: "from-emerald-500 to-teal-600",
  5: "from-fuchsia-500 to-purple-600",
  6: "from-sky-500 to-indigo-600",
};

export default function ChatItem({ chat, isSelected, onClick }: ChatItemProps) {
  const colorKey = parseInt(chat.id.replace(/\D/g, ""), 10) % 7;

  return (
    <button
      onClick={() => onClick(chat.id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-150 text-left group
        ${isSelected
          ? "bg-indigo-500/15 border border-indigo-500/25"
          : "hover:bg-white/5 border border-transparent"
        }`}
    >
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${avatarColors[colorKey]} flex items-center justify-center text-white text-sm font-semibold tracking-wide shadow-lg`}>
          {getInitials(chat.name)}
        </div>
        {chat.type === "direct" && (
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#0f1117]" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-0.5">
          <span className={`text-sm font-semibold truncate ${isSelected ? "text-indigo-200" : "text-slate-100"}`}>
            {chat.name}
          </span>
          <span className="text-[10px] text-slate-500 flex-shrink-0 font-mono">
            {formatTime(chat.last_message_at)}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {chat.type === "group" && (
            <svg className="w-3 h-3 text-slate-600 flex-shrink-0" fill="none" viewBox="0 0 16 16">
              <path d="M6 7a3 3 0 100-6 3 3 0 000 6zM2 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H2zM10.5 6a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM14 13s1 0 1-1-1-3.5-4.5-3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          )}
          <p className="text-xs text-slate-500 truncate">{chat.last_message_content}</p>
        </div>
      </div>
    </button>
  );
}
