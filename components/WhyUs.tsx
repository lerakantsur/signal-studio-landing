"use client";

import { motion } from "framer-motion";

const cards = [
  {
    icon: "🎯",
    title: "Brand-accurate, every time",
    text: "AI reads your brandbook, extracts your exact colors, fonts and tone — then locks them into every single banner. No off-brand output ever.",
  },
  {
    icon: "⚡",
    title: "100+ banners in one session",
    text: "Upload once, generate at scale. What takes a designer 2 weeks takes Signal Studio 24 hours — with more variety and zero briefing time.",
  },
  {
    icon: "🛍️",
    title: "Static ads + marketplace creatives",
    text: "Performance banners for Meta and Google. Product cards for Amazon and major international marketplaces. All formats, all sizes — everywhere except Russia.",
  },
  {
    icon: "✏️",
    title: "Review, edit, translate",
    text: "Approve or decline each banner. Request AI edits with one sentence. Translate your creatives into any language in one click.",
  },
  {
    icon: "📐",
    title: "Every ratio, every platform",
    text: "1:1, 4:5, 9:16, 16:9, 2:1 — all covered. Download production-ready files for Meta Ads, Google Display, and any marketplace format.",
  },
  {
    icon: "💸",
    title: "10x cheaper than an agency",
    text: "Agencies charge $500–2000 per banner set. Signal Studio delivers 100 banners starting at $259/month. Same quality, fraction of the cost.",
  },
];

const viewport = { once: true, margin: "-80px" };

export default function WhyUs() {
  return (
    <section className="why">
      <motion.div
        className="section-head"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.6 }}
      >
        <div className="eyebrow">Why Signal Studio</div>
        <h2 className="sec-h2">
          What makes us <span className="grad">different.</span>
        </h2>
        <p className="sec-sub">
          Not just another AI tool. A full creative production system built for
          performance marketing.
        </p>
      </motion.div>
      <div className="why-grid">
        {cards.map((c, i) => (
          <motion.div
            className="why-card"
            key={c.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div className="why-icon">{c.icon}</div>
            <h3>{c.title}</h3>
            <p>{c.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
