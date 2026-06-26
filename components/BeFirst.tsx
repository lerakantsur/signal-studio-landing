"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";

const viewport = { once: true, margin: "-80px" };

export default function BeFirst() {
  const [submitted, setSubmitted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

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
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleSubmit();
  }

  return (
    <section className="final">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.6 }}
      >
        <div className="eyebrow">Ready?</div>
        <h2>
          Be <span className="grad-w">first</span> in line.
        </h2>
        <p>
          Waitlist closes when we hit capacity. Join now and lock in your early
          access discount.
        </p>
      </motion.div>
      <motion.div
        className="wl-wrap"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {!submitted ? (
          <div className="wl-form">
            <input
              type="email"
              ref={inputRef}
              placeholder="your@company.com"
              onKeyDown={handleKeyDown}
            />
            <button onClick={handleSubmit}>Join waitlist →</button>
          </div>
        ) : (
          <div className="wl-success show">
            🎉 You&apos;re in! Check your inbox — your exclusive discount is on
            its way.
          </div>
        )}
        <p className="wl-note">
          10% off your first month on any plan · Sent to your inbox after signup
        </p>
        <div className="fomo">
          Only 23 early access spots left — don&apos;t miss it
        </div>
        <div
          className="count-row"
          style={{ justifyContent: "center", marginTop: 6 }}
        >
          <div className="avs">
            <div className="av">S</div>
            <div className="av">M</div>
            <div className="av">J</div>
            <div className="av">A</div>
            <div className="av">K</div>
            <div className="av">R</div>
          </div>
          <span>
            <strong>Sarah, Marco, Julia</strong> and 44 others just joined
          </span>
        </div>
      </motion.div>
    </section>
  );
}
