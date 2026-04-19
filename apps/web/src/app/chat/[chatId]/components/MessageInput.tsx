"use client";

import { useState, useRef } from "react";

interface MessageInputProps {
  onSend?: (message: string) => void;
}

export default function MessageInput({ onSend }: MessageInputProps) {
  const [value, setValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    console.log("Sending message:", trimmed);
    onSend?.(trimmed);
    setValue("");
    setIsTyping(false);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    setIsTyping(e.target.value.length > 0);
    // Auto resize
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
  };

  const toolbarButtons = [
    {
      label: "Attach file",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
          <path d="M14 7.5L7.5 14a4.5 4.5 0 01-6.364-6.364l7-7A3 3 0 0112.38 4.88l-7.071 7.07a1.5 1.5 0 01-2.121-2.12l6.364-6.365" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      label: "Upload image",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
          <rect x="1.5" y="2.5" width="13" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
          <circle cx="5.5" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.3"/>
          <path d="M1.5 11l4-4 3 3 2-2 3.5 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      label: "Emoji",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
          <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3"/>
          <path d="M5.5 9.5s.833 1.5 2.5 1.5 2.5-1.5 2.5-1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
          <circle cx="6" cy="6.5" r="0.75" fill="currentColor"/>
          <circle cx="10" cy="6.5" r="0.75" fill="currentColor"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="px-6 py-4 border-t border-white/[0.06] bg-[#0d1117] flex-shrink-0">
      <div className={`flex items-end gap-3 bg-[#1a2030] border rounded-2xl px-4 py-3 transition-all duration-200 ${isTyping ? "border-indigo-500/40 shadow-[0_0_0_3px_rgba(99,102,241,0.08)]" : "border-white/[0.08]"}`}>
        {/* Toolbar */}
        <div className="flex items-center gap-0.5 pb-0.5">
          {toolbarButtons.map(({ label, icon }) => (
            <button
              key={label}
              onClick={() => console.log(`${label} clicked`)}
              title={label}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-300 hover:bg-white/[0.07] transition-all duration-150"
            >
              {icon}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="w-px h-5 bg-white/[0.08] self-center flex-shrink-0" />

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Write a message..."
          rows={1}
          className="flex-1 bg-transparent text-sm text-slate-200 placeholder-slate-600 resize-none focus:outline-none leading-relaxed min-h-[24px] max-h-[120px] self-center py-0.5"
          style={{ scrollbarWidth: "none" }}
        />

        {/* Send button */}
        <button
          onClick={handleSend}
          disabled={!value.trim()}
          className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200 self-end
            ${value.trim()
              ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 hover:scale-105 active:scale-95"
              : "bg-white/[0.05] text-slate-600 cursor-not-allowed"
            }`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
            <path d="M14 8H2M14 8l-5 5M14 8l-5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <p className="text-[10px] text-slate-700 text-center mt-2 font-mono">
        Press Enter to send · Shift+Enter for new line
      </p>
    </div>
  );
}
