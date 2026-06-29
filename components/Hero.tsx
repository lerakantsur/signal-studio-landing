"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const LAUNCH_DATE = new Date("2026-07-25T09:00:00+02:00");

function getTimeLeft() {
  const diff = LAUNCH_DATE.getTime() - Date.now();
  if (diff <= 0) return { d: "00", h: "00", m: "00", s: "00" };
  const pad = (n: number) => String(n).padStart(2, "0");
  return {
    d: pad(Math.floor(diff / 86400000)),
    h: pad(Math.floor((diff % 86400000) / 3600000)),
    m: pad(Math.floor((diff % 3600000) / 60000)),
    s: pad(Math.floor((diff % 60000) / 1000)),
  };
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState({ d: "00", h: "00", m: "00", s: "00" });
  const [submitted, setSubmitted] = useState(false);
  const [count, setCount] = useState(47);
  const inputRef = useRef<HTMLInputElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const orb1Y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const orb1X = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const orb2X = useTransform(scrollYProgress, [0, 1], [0, -30]);

  useEffect(() => {
    setMounted(true);
    setTime(getTimeLeft());
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  async function handleSubmit() {
    const email = inputRef.current?.value.trim();
    if (!email || !email.includes("@")) {
      if (inputRef.current) inputRef.current.style.borderColor = "#EF4444";
      return;
    }
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch {}
    setSubmitted(true);
    setCount((c) => c + 1);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleSubmit();
  }

  return (
    <section className="hero" ref={sectionRef}>
      <motion.div className="hero-orb1" style={{ y: orb1Y, x: orb1X }} />
      <motion.div className="hero-orb2" style={{ y: orb2Y, x: orb2X }} />
      <div className="hero-inner">
        <motion.div
          className="hero-tag"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="dot" />
          Launching July 25th · 9:00 AM CET
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Your designer
          <br />
          just got <span className="grad">replaced.</span>
        </motion.h1>
        <motion.p
          className="hero-sub"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Upload your brand. AI reads your DNA, writes the prompts, and delivers
          100+ on-brand static banners and marketplace creatives — zero
          designers needed.
        </motion.p>

        <motion.div
          className="cd-label"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Doors open in
        </motion.div>
        <motion.div
          className="countdown"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="cd-block">
            <div className="cd-num" suppressHydrationWarning>{mounted ? time.d : "00"}</div>
            <div className="cd-lbl">Days</div>
          </div>
          <div className="cd-sep">:</div>
          <div className="cd-block">
            <div className="cd-num" suppressHydrationWarning>{mounted ? time.h : "00"}</div>
            <div className="cd-lbl">Hours</div>
          </div>
          <div className="cd-sep">:</div>
          <div className="cd-block">
            <div className="cd-num" suppressHydrationWarning>{mounted ? time.m : "00"}</div>
            <div className="cd-lbl">Min</div>
          </div>
          <div className="cd-sep">:</div>
          <div className="cd-block">
            <div className="cd-num" suppressHydrationWarning>{mounted ? time.s : "00"}</div>
            <div className="cd-lbl">Sec</div>
          </div>
        </motion.div>

        <motion.div
          className="wl-wrap"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {!submitted ? (
            <div className="wl-form">
              <input
                type="email"
                id="wl-email"
                ref={inputRef}
                placeholder="your@company.com"
                onKeyDown={handleKeyDown}
              />
              <button onClick={handleSubmit}>Get early access →</button>
            </div>
          ) : (
            <div className="wl-success show">
              🎉 You&apos;re in! Check your inbox — your exclusive discount
              code is on its way.
            </div>
          )}
          <p className="wl-note">
            Join early · receive <strong>10% off your first month</strong> on
            any plan via email
          </p>
          <div className="fomo">Only 23 early access spots left</div>
          <div className="count-row">
            <div className="avs">
              <div className="av">M</div>
              <div className="av">S</div>
              <div className="av">A</div>
              <div className="av">K</div>
            </div>
            <span>
              <strong>{count}</strong> marketers already waiting
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
