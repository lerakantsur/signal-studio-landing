"use client";

import { useState, useRef } from "react";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const companyRef = useRef<HTMLInputElement>(null);

  async function handleSubmit() {
    const email = emailRef.current?.value.trim();
    const name = nameRef.current?.value.trim();
    if (!email || !email.includes("@")) {
      if (emailRef.current) emailRef.current.style.borderColor = "#EF4444";
      return;
    }
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name: name || "",
          company: companyRef.current?.value || "",
        }),
      });
    } catch {}
    setSubmitted(true);
  }

  return (
    <>
      <nav>
        <a className="nav-logo" href="#">
          <svg width="28" height="32" viewBox="0 0 148 170" fill="none">
            <rect y="11" width="148" height="148" rx="30" fill="#9B5CFF" />
            <path
              d="M74.5608 130.077C92.271 130.077 106.628 115.72 106.628 98.0102C106.628 80.2999 92.271 65.9429 74.5608 65.9429"
              stroke="white" strokeWidth="20" strokeLinecap="round"
            />
            <path
              d="M74.0673 104.135C56.357 104.135 42 89.7776 42 72.0673C42 54.357 56.357 40 74.0673 40"
              stroke="white" strokeWidth="20" strokeLinecap="round"
            />
          </svg>
          <span>Signal Studio</span>
        </a>
        <button className="nav-cta" onClick={() => setOpen(true)}>
          Join waitlist →
        </button>
      </nav>

      {open && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) { setOpen(false); setSubmitted(false); } }}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
            zIndex: 1000, display: "flex", alignItems: "center",
            justifyContent: "center", padding: 20,
          }}
        >
          <div style={{
            background: "#fff", borderRadius: 24, padding: "40px 36px",
            maxWidth: 480, width: "100%", position: "relative",
            boxShadow: "0 24px 80px rgba(0,0,0,0.18)",
          }}>
            <button
              onClick={() => { setOpen(false); setSubmitted(false); }}
              style={{
                position: "absolute", top: 16, right: 16,
                background: "#F4F4F5", border: "none", borderRadius: "50%",
                width: 32, height: 32, cursor: "pointer", fontSize: 16,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#6B6B80",
              }}
            >✕</button>

            {!submitted ? (
              <>
                <div className="eyebrow" style={{ marginBottom: 8 }}>Early access</div>
                <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 6, letterSpacing: "-0.03em" }}>
                  Join the waitlist
                </h2>
                <p style={{ fontSize: 14, color: "#6B6B80", marginBottom: 28, lineHeight: 1.6 }}>
                  We launch July 25th. Sign up now and get <strong style={{ color: "#9B5CFF" }}>10% off your first month</strong> — code sent to your inbox.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <input
                    ref={nameRef}
                    type="text"
                    placeholder="Your name"
                    style={{
                      background: "#fff", border: "1.5px solid #DDD6F0", borderRadius: 12,
                      padding: "13px 18px", fontSize: 14, color: "#0A0A0B",
                      fontFamily: "inherit", outline: "none", width: "100%",
                    }}
                    onFocus={e => e.target.style.borderColor = "#9B5CFF"}
                    onBlur={e => e.target.style.borderColor = "#DDD6F0"}
                  />
                  <input
                    ref={emailRef}
                    type="email"
                    placeholder="your@company.com *"
                    style={{
                      background: "#fff", border: "1.5px solid #DDD6F0", borderRadius: 12,
                      padding: "13px 18px", fontSize: 14, color: "#0A0A0B",
                      fontFamily: "inherit", outline: "none", width: "100%",
                    }}
                    onFocus={e => e.target.style.borderColor = "#9B5CFF"}
                    onBlur={e => e.target.style.borderColor = "#DDD6F0"}
                    onKeyDown={e => e.key === "Enter" && handleSubmit()}
                  />
                  <input
                    ref={companyRef}
                    type="text"
                    placeholder="Company (optional)"
                    style={{
                      background: "#fff", border: "1.5px solid #DDD6F0", borderRadius: 12,
                      padding: "13px 18px", fontSize: 14, color: "#0A0A0B",
                      fontFamily: "inherit", outline: "none", width: "100%",
                    }}
                    onFocus={e => e.target.style.borderColor = "#9B5CFF"}
                    onBlur={e => e.target.style.borderColor = "#DDD6F0"}
                  />
                  <button
                    onClick={handleSubmit}
                    style={{
                      background: "#9B5CFF", color: "#fff", border: "none",
                      borderRadius: 12, padding: "14px", fontSize: 15,
                      fontWeight: 700, fontFamily: "inherit", cursor: "pointer",
                      boxShadow: "0 4px 16px #9B5CFF30", marginTop: 4,
                    }}
                  >
                    Get early access →
                  </button>
                </div>
                <p style={{ fontSize: 12, color: "#B0A8C0", textAlign: "center", marginTop: 12 }}>
                  No spam. Unsubscribe anytime.
                </p>
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
                <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 10 }}>You&apos;re in!</h2>
                <p style={{ fontSize: 15, color: "#6B6B80", lineHeight: 1.7 }}>
                  Check your inbox — your exclusive discount code <strong style={{ color: "#9B5CFF" }}>EARLY10</strong> is on its way.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
