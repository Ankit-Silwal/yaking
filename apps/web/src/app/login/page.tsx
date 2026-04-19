"use client";

import { getMe } from "@/lib/api/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const check = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const res = await getMe();
        if (res) router.push("/chat");
      } catch (err) {
        console.log("Not authenticated", err);
      }
    };
    check();
  }, []);

  const handleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

  return (
    <div className="relative flex min-h-screen overflow-hidden font-sans" style={{ background: "#080B14", fontFamily: "'Sora', sans-serif" }}>
      {/* Ambient orbs */}
      <div className="pointer-events-none absolute" style={{ width: 500, height: 500, borderRadius: "50%", background: "rgba(99,102,241,0.18)", filter: "blur(80px)", top: -120, right: -80, animation: "drift1 8s ease-in-out infinite" }} />
      <div className="pointer-events-none absolute" style={{ width: 400, height: 400, borderRadius: "50%", background: "rgba(6,182,212,0.12)", filter: "blur(80px)", bottom: -100, left: -60, animation: "drift2 10s ease-in-out infinite" }} />
      <div className="pointer-events-none absolute" style={{ width: 250, height: 250, borderRadius: "50%", background: "rgba(168,85,247,0.1)", filter: "blur(80px)", top: "50%", left: "40%", animation: "drift3 7s ease-in-out infinite" }} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        @keyframes drift1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-30px,40px)} }
        @keyframes drift2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(40px,-30px)} }
        @keyframes drift3 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-20px,20px)} }
        @keyframes slideUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn { from{opacity:0;transform:scale(0.9)} to{opacity:1;transform:scale(1)} }
        @keyframes pulse-dot { 0%,100%{box-shadow:0 0 0 3px rgba(34,197,94,0.2)} 50%{box-shadow:0 0 0 6px rgba(34,197,94,0.1)} }
        @keyframes bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-6px)} }
        .msg-row { display:flex; gap:10px; align-items:flex-end; animation:slideUp 0.5s ease both; }
        .msg-row.me { flex-direction:row-reverse; }
        .bubble-them { padding:10px 14px; border-radius:18px; border-bottom-left-radius:4px; font-size:13px; line-height:1.5; max-width:240px; background:rgba(255,255,255,0.07); color:#cbd5e1; }
        .bubble-me { padding:10px 14px; border-radius:18px; border-bottom-right-radius:4px; font-size:13px; line-height:1.5; max-width:240px; background:linear-gradient(135deg,#6366f1,#8b5cf6); color:#fff; }
        .feat { display:flex; align-items:center; gap:14px; padding:14px 16px; background:rgba(255,255,255,0.025); border:1px solid rgba(255,255,255,0.06); border-radius:12px; animation:slideUp 0.4s ease both; }
        .pill { padding:6px 12px; border-radius:20px; font-size:11px; font-weight:500; display:flex; align-items:center; gap:6px; animation:fadeIn 0.6s ease both; }
        .google-btn:hover { background:rgba(255,255,255,0.09) !important; border-color:rgba(255,255,255,0.16) !important; transform:translateY(-1px); box-shadow:0 8px 28px rgba(99,102,241,0.18); }
        .google-btn:active { transform:translateY(0) !important; }
        .dot { width:6px; height:6px; background:#64748b; border-radius:50%; }
        .dot:nth-child(1){animation:bounce 1.2s 0s infinite}
        .dot:nth-child(2){animation:bounce 1.2s 0.2s infinite}
        .dot:nth-child(3){animation:bounce 1.2s 0.4s infinite}
      `}</style>

      {/* Left panel */}
      <div className="relative z-10 flex flex-1 flex-col justify-center px-12 py-12">
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#6366f1", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12, opacity: 0.8 }}>
            Live preview
          </div>
          <div style={{ fontSize: 36, fontWeight: 700, color: "#f1f5f9", lineHeight: 1.2, marginBottom: 12 }}>
            Where conversations<br />
            <span style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              come alive.
            </span>
          </div>
          <div style={{ fontSize: 14, color: "#475569", maxWidth: 340, lineHeight: 1.7 }}>
            Real-time messaging for teams and friends. Fast, secure, and built for how you actually communicate.
          </div>
        </div>

        {/* Chat preview */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 420 }}>
          {/* Chat header */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "14px 18px", marginBottom: 8 }}>
            <div style={{ display: "flex" }}>
              {[{ label: "A", from: "#6366f1", to: "#8b5cf6" }, { label: "S", from: "#06b6d4", to: "#0ea5e9" }, { label: "M", from: "#f43f5e", to: "#ec4899" }].map((av, i) => (
                <div key={i} style={{ width: 36, height: 36, borderRadius: "50%", border: "2px solid #080B14", marginLeft: i === 0 ? 0 : -10, background: `linear-gradient(135deg,${av.from},${av.to})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, color: "#fff" }}>
                  {av.label}
                </div>
              ))}
            </div>
            <div>
              <div style={{ color: "#e2e8f0", fontSize: 14, fontWeight: 600 }}>Design Team</div>
              <div style={{ color: "#64748b", fontSize: 12, marginTop: 2 }}>3 members active</div>
            </div>
            <div style={{ width: 8, height: 8, background: "#22c55e", borderRadius: "50%", marginLeft: "auto", animation: "pulse-dot 2s ease-in-out infinite" }} />
          </div>

          {/* Messages */}
          {[
            { me: false, av: { label: "A", from: "#6366f1", to: "#8b5cf6" }, text: "Hey, check out the new dashboard design!", time: "2:41 PM", delay: "0.2s" },
            { me: true,  av: { label: "S", from: "#06b6d4", to: "#0ea5e9" }, text: "This looks amazing. Love the dark mode.", time: "2:42 PM", delay: "0.5s" },
            { me: false, av: { label: "M", from: "#f43f5e", to: "#ec4899" }, text: "Shipping it today — just got approval.", time: "2:43 PM", delay: "0.8s" },
          ].map((msg, i) => (
            <div key={i} className={`msg-row${msg.me ? " me" : ""}`} style={{ animationDelay: msg.delay }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, background: `linear-gradient(135deg,${msg.av.from},${msg.av.to})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "#fff" }}>
                {msg.av.label}
              </div>
              <div>
                <div className={msg.me ? "bubble-me" : "bubble-them"}>{msg.text}</div>
                <div style={{ fontSize: 10, color: "#475569", margin: "4px 4px 0" }}>{msg.time}</div>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          <div className="msg-row" style={{ animationDelay: "1.2s" }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "#fff" }}>A</div>
            <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: 18, borderBottomLeftRadius: 4, padding: "12px 16px", display: "flex", gap: 4, alignItems: "center" }}>
              <div className="dot" /><div className="dot" /><div className="dot" />
            </div>
          </div>
        </div>

        {/* Feature pills */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 20 }}>
          {[
            { label: "End-to-end encrypted", bg: "rgba(34,197,94,0.1)", color: "#4ade80", border: "rgba(34,197,94,0.2)", delay: "0.1s" },
            { label: "Real-time sync",        bg: "rgba(99,102,241,0.1)", color: "#a5b4fc", border: "rgba(99,102,241,0.2)", delay: "0.2s" },
            { label: "File sharing",           bg: "rgba(6,182,212,0.1)",  color: "#67e8f9", border: "rgba(6,182,212,0.2)",  delay: "0.3s" },
            { label: "Reactions",              bg: "rgba(244,63,94,0.1)",  color: "#fb7185", border: "rgba(244,63,94,0.2)",  delay: "0.4s" },
          ].map((p, i) => (
            <div key={i} className="pill" style={{ background: p.bg, color: p.color, border: `1px solid ${p.border}`, animationDelay: p.delay }}>
              {p.label}
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="relative z-10 flex flex-shrink-0 flex-col justify-center px-12 py-12" style={{ width: 420 }}>
        <div style={{ background: "rgba(15,20,35,0.85)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 24, padding: "40px 36px", backdropFilter: "blur(20px)", position: "relative", overflow: "hidden" }}>
          {/* Card glow */}
          <div style={{ position: "absolute", inset: 0, borderRadius: 24, background: "linear-gradient(135deg,rgba(99,102,241,0.06) 0%,transparent 60%)", pointerEvents: "none" }} />

          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
            <div style={{ width: 40, height: 40, borderRadius: 11, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2C5.58 2 2 5.36 2 9.5c0 2.1.9 4 2.36 5.36L3.5 18l3.3-1.58A8.27 8.27 0 0010 17c4.42 0 8-3.36 8-7.5S14.42 2 10 2z" fill="rgba(255,255,255,0.9)" />
              </svg>
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, background: "linear-gradient(135deg,#e2e8f0,#94a3b8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Gatherly
            </div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, background: "rgba(99,102,241,0.15)", color: "#a5b4fc", borderRadius: 4, padding: "2px 6px", border: "1px solid rgba(99,102,241,0.25)", marginLeft: 4, letterSpacing: "0.06em" }}>
              BETA
            </div>
          </div>

          <div style={{ fontSize: 24, fontWeight: 700, color: "#f1f5f9", lineHeight: 1.3, marginBottom: 8 }}>Sign in to get started</div>
          <div style={{ fontSize: 13, color: "#64748b", lineHeight: 1.65, marginBottom: 32 }}>
            Join thousands of teams already using Gatherly for seamless, secure communication.
          </div>

          {/* Features */}
          <div style={{ marginBottom: 32, display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              {
                iconBg: "rgba(99,102,241,0.12)",
                icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="3" fill="#818cf8"/><path d="M8 1v2M8 13v2M1 8h2M13 8h2" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round"/></svg>,
                title: "Instant delivery",
                desc: "Messages arrive in milliseconds, globally",
                stat: "< 50ms",
                delay: "0.1s",
              },
              {
                iconBg: "rgba(6,182,212,0.12)",
                icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="5" cy="8" r="2.5" stroke="#22d3ee" strokeWidth="1.4"/><circle cx="11" cy="5" r="2" stroke="#22d3ee" strokeWidth="1.4"/><circle cx="11" cy="11" r="2" stroke="#22d3ee" strokeWidth="1.4"/><line x1="7.4" y1="7" x2="9.2" y2="6" stroke="#22d3ee" strokeWidth="1.2"/><line x1="7.4" y1="9" x2="9.2" y2="10" stroke="#22d3ee" strokeWidth="1.2"/></svg>,
                title: "Group channels",
                desc: "Teams, communities, and direct messages",
                stat: "Unlimited",
                delay: "0.2s",
              },
              {
                iconBg: "rgba(34,197,94,0.12)",
                icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="3" y="7" width="10" height="7" rx="1.5" stroke="#4ade80" strokeWidth="1.4"/><path d="M5 7V5a3 3 0 016 0v2" stroke="#4ade80" strokeWidth="1.4" strokeLinecap="round"/></svg>,
                title: "End-to-end encrypted",
                desc: "Your messages are always private",
                stat: "256-bit",
                delay: "0.3s",
              },
            ].map((f, i) => (
              <div key={i} className="feat" style={{ animationDelay: f.delay }}>
                <div style={{ width: 36, height: 36, borderRadius: 9, flexShrink: 0, background: f.iconBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {f.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#e2e8f0" }}>{f.title}</div>
                  <div style={{ fontSize: 11, color: "#475569", marginTop: 2 }}>{f.desc}</div>
                </div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 500, color: "#818cf8", background: "rgba(99,102,241,0.1)", borderRadius: 6, padding: "3px 8px", whiteSpace: "nowrap" }}>
                  {f.stat}
                </div>
              </div>
            ))}
          </div>

          {/* Google button */}
          <button
            onClick={handleLogin}
            className="google-btn"
            style={{ width: "100%", padding: 14, borderRadius: 13, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "#e2e8f0", fontFamily: "'Sora',sans-serif", fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, cursor: "pointer", transition: "all 0.22s ease" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <div style={{ textAlign: "center", marginTop: 16, fontSize: 11, color: "#334155", lineHeight: 1.6 }}>
            By continuing you agree to our{" "}
            <a href="#" style={{ color: "#6366f1", textDecoration: "none" }}>Terms of Service</a>{" "}
            and{" "}
            <a href="#" style={{ color: "#6366f1", textDecoration: "none" }}>Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
}