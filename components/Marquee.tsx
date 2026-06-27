/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";

const images = [
  "/portfolio/hf_20260624_110441_d15dc873-cbfe-4972-843d-3a5ffd0600d5.jpg",
  "/portfolio/hf_20260624_110217_0f791b0a-7740-4081-af89-d500e6eb19e9.jpg",
  "/portfolio/hf_20260624_110101_25348ddd-5750-44da-8dbf-0bd3ef518588.jpg",
  "/portfolio/hf_20260624_105907_4fa5c4f6-8481-4948-9c53-5481b5b80ad3.jpg",
  "/portfolio/hf_20260624_105805_a5c112df-f04a-4dca-9b8e-be173d689f5d.jpg",
  "/portfolio/hf_20260624_102623_772bc1c9-b1ea-4dac-a7a1-20ea27bdc07b.jpg",
  "/portfolio/Frame_31.jpg",
  "/portfolio/hf_20260624_105641_f705ee3d-64dc-4274-882e-78009dc13163.jpg",
  "/portfolio/hf_20260624_105530_8cad9264-c6fa-4909-aa8c-7d3fef5538d0.jpg",
  "/portfolio/hf_20260624_105600_55fbdf80-6a85-4d9b-9188-8ab5f91357d0.jpg",
  "/portfolio/hf_20260624_105202_e9354a25-9362-4bde-9a9e-fffa5dae85b8.jpg",
  "/portfolio/hf_20260624_111616_efab004e-7718-41d1-a98f-8f4eefd064d7.jpg",
  "/portfolio/Frame_62.jpg",
];

const viewport = { once: true, margin: "-80px" };

export default function Marquee() {
  return (
    <section className="portfolio">
      <motion.div
        className="section-head"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.6 }}
      >
        <div className="eyebrow">Our work</div>
        <h2 className="sec-h2">
          Banners that <span className="grad">convert.</span>
        </h2>
        <p className="sec-sub">
          Static ads for Meta, Google, Amazon and other marketplaces — all AI-generated.
        </p>
      </motion.div>

      <div className="marquee-wrap">
        <div className="marquee-track">
          {[...images, ...images].map((src, i) => (
            <div className="m-card" key={i}>
              <img src={src} alt="" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
