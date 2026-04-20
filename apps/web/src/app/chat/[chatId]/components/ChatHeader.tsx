"use client";
import { Chat } from "./mockData";
interface ChatHeaderProps {
  chat: Chat;
}

function getInitials(name: string): string {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
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

export default function ChatHeader({ chat }: ChatHeaderProps) {
  const colorKey = parseInt(chat.id.replace(/\D/g, ""), 10) % 7;

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06] bg-[#0d1117]/80 backdrop-blur-sm flex-shrink-0">
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${avatarColors[colorKey]} flex items-center justify-center text-white text-sm font-semibold shadow-lg`}>
            {getInitials(chat.name)}
          </div>
          {chat.type === "direct" && (
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#0d1117]" />
          )}
        </div>

        {/* Name & status */}
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-slate-100">{chat.name}</h2>
            {chat.type === "group" && (
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-500/15 text-indigo-400 border border-indigo-500/20">
                GROUP
              </span>
            )}
            {chat.role === "admin" && (
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                ADMIN
              </span>
            )}
          </div>
          <p className="text-xs text-emerald-400 font-medium flex items-center gap-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
            {chat.type === "direct" ? "Online" : "3 members active"}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1">
        {[
          {
            label: "Search",
            icon: (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.4"/>
                <path d="M10.5 10.5l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            ),
          },
          {
            label: "Call",
            icon: (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                <path d="M5.5 1.5h-2A1.5 1.5 0 002 3c0 6.075 4.925 11 11 11a1.5 1.5 0 001.5-1.5v-2a1.5 1.5 0 00-1.5-1.5c-.828 0-1.652-.138-2.42-.394a1.5 1.5 0 00-1.544.366l-.95.95A11.037 11.037 0 016.478 7.422l.95-.95a1.5 1.5 0 00.366-1.544A9.983 9.983 0 017 3a1.5 1.5 0 00-1.5-1.5z" stroke="currentColor" strokeWidth="1.3"/>
              </svg>
            ),
          },
          {
            label: "Video",
            icon: (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                <rect x="1" y="4" width="10" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
                <path d="M11 6.5l4-2v7l-4-2" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
              </svg>
            ),
          },
          {
            label: "More",
            icon: (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                <circle cx="8" cy="3" r="1" fill="currentColor"/>
                <circle cx="8" cy="8" r="1" fill="currentColor"/>
                <circle cx="8" cy="13" r="1" fill="currentColor"/>
              </svg>
            ),
          },
        ].map(({ label, icon }) => (
          <button
            key={label}
            onClick={() => console.log(`${label} clicked`)}
            title={label === "Call" || label === "Video" ? "Under Construction" : label}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-200 hover:bg-white/[0.07] transition-all duration-150"
          >
            {icon}
          </button>
        ))}
      </div>
    </header>
  );
}
