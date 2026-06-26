"use client";

import { motion } from "framer-motion";

const viewport = { once: true, margin: "-80px" as const };

export default function MacbookScene() {
  return (
    <div style={{ background: "#fff", padding: "100px 24px 80px" }}>
      <motion.div
        style={{ textAlign: "center", marginBottom: 52 }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.6 }}
      >
        <div className="eyebrow">See it in action</div>
        <h2 className="sec-h2">
          Watch how it <span className="grad">works.</span>
        </h2>
        <p className="sec-sub" style={{ marginTop: 10 }}>
          From brand upload to finished banners — in one seamless flow.
        </p>
      </motion.div>

      <div style={{
        maxWidth: 900,
        margin: "0 auto",
        aspectRatio: "16/9",
        background: "linear-gradient(135deg, #1a0533 0%, #0d1a33 100%)",
        borderRadius: 16,
        boxShadow: "0 24px 80px rgba(0,0,0,0.18)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 40% 50%, rgba(155,92,255,0.18) 0%, transparent 65%)",
          pointerEvents: "none",
        }} />
        <div style={{
          width: 72,
          height: 72,
          background: "#9B5CFF",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 0 20px rgba(155,92,255,0.15), 0 8px 32px rgba(155,92,255,0.4)",
          cursor: "pointer",
          position: "relative",
          zIndex: 1,
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
