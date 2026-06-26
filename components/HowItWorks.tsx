"use client";

import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Upload your brand",
    text: "Drop your logo, brandbook and product photos. AI extracts your exact colors, fonts and tone of voice — no manual setup needed.",
  },
  {
    num: "02",
    title: "AI writes the prompts",
    text: "Our engine generates unique, brand-accurate image prompts for every banner. No briefing, no back-and-forth, no guesswork.",
  },
  {
    num: "03",
    title: "Review & download",
    text: "Approve, decline, or request edits. Download production-ready static banners for Meta, Google, Amazon and major international marketplaces.",
  },
];

const viewport = { once: true, margin: "-80px" };

export default function HowItWorks() {
  return (
    <section className="how">
      <motion.div
        className="section-head"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.6 }}
      >
        <div className="eyebrow">How it works</div>
        <h2 className="sec-h2">
          Three steps.
          <br />
          <span className="grad">100 banners.</span>
        </h2>
        <p className="sec-sub">
          From brand upload to ready-to-ship creatives in one seamless flow.
        </p>
      </motion.div>
      <div className="steps">
        {steps.map((s, i) => (
          <motion.div
            className="step"
            key={s.num}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div className="step-num">{s.num}</div>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
