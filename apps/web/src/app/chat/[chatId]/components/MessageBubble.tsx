import { Message, CURRENT_USER_ID, mockSenderNames, mockSenderColors, mockSenderInitials } from "./mockData";

interface MessageBubbleProps {
  message: Message;
  showSenderInfo: boolean;
}

function formatTime(isoString: string): string {
  return new Date(isoString).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function PDFAttachment({ filename }: { filename: string }) {
  return (
    <div className="flex items-center gap-3 bg-white/[0.06] border border-white/[0.08] rounded-xl px-4 py-3 min-w-[220px] cursor-pointer hover:bg-white/[0.09] transition-colors group">
      <div className="w-10 h-10 rounded-lg bg-rose-500/15 border border-rose-500/25 flex items-center justify-center flex-shrink-0">
        <svg className="w-5 h-5 text-rose-400" fill="none" viewBox="0 0 20 20">
          <path d="M4 2h8l5 5v11a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
          <path d="M12 2v5h5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
          <path d="M6 13h8M6 10h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-200 truncate">{filename}</p>
        <p className="text-[10px] text-slate-500 font-mono mt-0.5">PDF Document</p>
      </div>
      <svg className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-colors flex-shrink-0" fill="none" viewBox="0 0 16 16">
        <path d="M8 3v8M4 8l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 13h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    </div>
  );
}

function VideoAttachment({ filename }: { filename: string }) {
  return (
    <div className="rounded-xl overflow-hidden border border-white/[0.08] cursor-pointer group relative min-w-[240px]">
      <div className="bg-slate-800/80 h-32 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-black/40 border border-white/20 flex items-center justify-center group-hover:scale-105 transition-transform">
          <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 16 16">
            <path d="M6 4l7 4-7 4V4z"/>
          </svg>
        </div>
      </div>
      <div className="px-3 py-2 bg-white/[0.05] flex items-center gap-2">
        <svg className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" fill="none" viewBox="0 0 16 16">
          <rect x="1" y="3" width="10" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.3"/>
          <path d="M11 5.5l4-1.5v6l-4-1.5" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
        </svg>
        <p className="text-xs text-slate-300 truncate">{filename}</p>
      </div>
    </div>
  );
}

export default function MessageBubble({ message, showSenderInfo }: MessageBubbleProps) {
  const isMine = message.sender_id === CURRENT_USER_ID;
  const isSystem = message.type === "system";

  // System message
  if (isSystem) {
    return (
      <div className="flex justify-center my-3">
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06]">
          <svg className="w-3 h-3 text-slate-600" fill="none" viewBox="0 0 12 12">
            <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M6 4v3M6 8.5v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          <span className="text-[11px] text-slate-500">{message.content}</span>
        </div>
      </div>
    );
  }

  const senderName = mockSenderNames[message.sender_id] ?? "Unknown";
  const senderColor = mockSenderColors[message.sender_id] ?? "#64748b";
  const senderInitials = mockSenderInitials[message.sender_id] ?? "??";

  return (
    <div className={`flex gap-2.5 group ${isMine ? "flex-row-reverse" : "flex-row"}`}>
      {/* Avatar */}
      <div className="flex-shrink-0 self-end mb-1">
        {showSenderInfo ? (
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-[11px] font-bold shadow"
            style={{ background: `linear-gradient(135deg, ${senderColor}cc, ${senderColor})` }}
          >
            {senderInitials}
          </div>
        ) : (
          <div className="w-8" />
        )}
      </div>

      {/* Bubble content */}
      <div className={`flex flex-col max-w-[70%] ${isMine ? "items-end" : "items-start"}`}>
        {showSenderInfo && !isMine && (
          <span className="text-[11px] font-semibold mb-1.5 px-1" style={{ color: senderColor }}>
            {senderName}
          </span>
        )}

        <div className="relative">
          {/* Text bubble */}
          {message.type === "text" && (
            <div
              className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm
                ${isMine
                  ? "bg-indigo-600 text-white rounded-br-sm"
                  : "bg-[#1a2030] text-slate-200 border border-white/[0.06] rounded-bl-sm"
                }`}
            >
              {message.content}
            </div>
          )}

          {/* PDF */}
          {message.type === "pdf" && <PDFAttachment filename={message.content} />}

          {/* Video */}
          {message.type === "video" && <VideoAttachment filename={message.content} />}
        </div>

        {/* Timestamp + delivery status */}
        <div className={`flex items-center gap-1 mt-1 px-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${isMine ? "flex-row-reverse" : ""}`}>
          <span className="text-[10px] text-slate-600 font-mono">{formatTime(message.created_at)}</span>
          {isMine && (
            <svg className="w-3 h-3 text-indigo-400" fill="none" viewBox="0 0 12 8">
              <path d="M1 4l3 3 7-6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5 4l3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}
