"use client";

import { useState } from "react";

function Overlay({
  id,
  title,
  open,
  onClose,
  children,
}: {
  id: string;
  title: string;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`ov-bd${open ? " open" : ""}`}
      id={id}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="ov-box">
        <div className="ov-title">{title}</div>
        <div className="ov-body">{children}</div>
        <div className="ov-actions">
          <button className="ov-disagree" onClick={onClose}>
            Close
          </button>
          <button className="ov-agree" onClick={onClose}>
            Got it →
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Footer() {
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  return (
    <>
      <footer>
        <div className="footer-l">
          © 2026 Signal Studio · AI-Powered Banner Generation
        </div>
        <div className="footer-r">
          <a href="mailto:hello@signal-studio.app">hello@signal-studio.app</a>
          <a onClick={() => setPrivacyOpen(true)}>Privacy</a>
          <a onClick={() => setTermsOpen(true)}>Terms</a>
        </div>
      </footer>

      <Overlay
        id="ov-privacy"
        title="Privacy Policy"
        open={privacyOpen}
        onClose={() => setPrivacyOpen(false)}
      >
        <p>
          <strong>Last updated: June 2026</strong>
        </p>
        <p>
          Signal Studio is committed to protecting your privacy. We collect your
          company name, email and usage data solely to provide our service.
        </p>
        <p>
          <strong>What we collect:</strong> Email address, company name, banner
          usage data, and brand assets you upload.
        </p>
        <p>
          <strong>How we use it:</strong> To deliver banners, send service
          emails, and improve the product. We never sell your data.
        </p>
        <p>
          <strong>Your assets:</strong> Logos, brandbooks and product photos are
          stored securely and used only to generate your banners.
        </p>
        <p>
          <strong>Payments:</strong> Processed by Stripe. We never store card
          details.
        </p>
        <p>
          <strong>Deletion:</strong> Request account deletion anytime at{" "}
          <a href="mailto:hello@signal-studio.app" style={{ color: "#9B5CFF" }}>
            hello@signal-studio.app
          </a>
          . Data removed within 7 days.
        </p>
      </Overlay>

      <Overlay
        id="ov-terms"
        title="Terms of Service"
        open={termsOpen}
        onClose={() => setTermsOpen(false)}
      >
        <p>
          <strong>Last updated: June 2026</strong>
        </p>
        <p>By using Signal Studio, you agree to these terms.</p>
        <p>
          <strong>Service:</strong> AI-powered banner generation. You submit
          brand assets and campaign details; we deliver production-ready static
          banners.
        </p>
        <p>
          <strong>Subscriptions:</strong> Billed monthly. Cancel anytime —
          access continues to end of billing period. No refunds for partial
          months.
        </p>
        <p>
          <strong>Free trial:</strong> 20 free banners. No credit card required
          during trial.
        </p>
        <p>
          <strong>Your IP:</strong> You retain full ownership of your brand
          assets and all generated banners.
        </p>
        <p>
          <strong>Acceptable use:</strong> No illegal, misleading or harmful
          content. We may terminate accounts that violate this policy.
        </p>
        <p>
          <strong>Liability:</strong> Service provided &quot;as is&quot;. We are
          not liable for indirect or consequential damages.
        </p>
        <p>
          Questions?{" "}
          <a href="mailto:hello@signal-studio.app" style={{ color: "#9B5CFF" }}>
            hello@signal-studio.app
          </a>
        </p>
      </Overlay>
    </>
  );
}
