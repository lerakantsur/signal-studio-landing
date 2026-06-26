"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";

const viewport = { once: true, margin: "-80px" };

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const companyRef = useRef<HTMLInputElement>(null);
  const msgRef = useRef<HTMLTextAreaElement>(null);

  async function handleSubmit() {
    const email = emailRef.current?.value.trim();
    const msg = msgRef.current?.value.trim();
    if (!email || !msg) return;
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nameRef.current?.value || "",
          email,
          company: companyRef.current?.value || "",
          message: msg,
        }),
      });
    } catch {}
    setSubmitted(true);
  }

  return (
    <div style={{ background: "var(--white)" }}>
      <section className="contact-section">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.6 }}
        >
          <div className="eyebrow">Contact</div>
          <h2 className="sec-h2">
            Got <span className="grad">questions?</span>
          </h2>
          <p className="sec-sub" style={{ marginTop: 10 }}>
            Fill out the form or email us directly.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {!submitted ? (
            <div className="contact-form">
              <input type="text" ref={nameRef} placeholder="Your name" />
              <input type="email" ref={emailRef} placeholder="your@company.com" />
              <input
                type="text"
                ref={companyRef}
                placeholder="Company (optional)"
              />
              <textarea ref={msgRef} placeholder="Your message..." />
              <button onClick={handleSubmit}>Send message →</button>
            </div>
          ) : (
            <div className="contact-success show">
              ✅ Message sent! We&apos;ll reply within 24 hours.
            </div>
          )}
        </motion.div>

        <motion.p
          className="contact-email"
          style={{ marginTop: 18 }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Or email us:{" "}
          <a href="mailto:hello@signal-studio.app">hello@signal-studio.app</a>
        </motion.p>
      </section>
    </div>
  );
}
