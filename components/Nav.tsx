"use client";

export default function Nav() {
  function scrollToHero() {
    const el = document.querySelector(".hero");
    if (el) el.scrollIntoView({ behavior: "smooth" });
    const input = document.getElementById("wl-email") as HTMLInputElement | null;
    if (input) input.focus();
  }

  return (
    <nav>
      <a className="nav-logo" href="#">
        <svg width="28" height="32" viewBox="0 0 148 170" fill="none">
          <rect y="11" width="148" height="148" rx="30" fill="#9B5CFF" />
          <path
            d="M74.5608 130.077C92.271 130.077 106.628 115.72 106.628 98.0102C106.628 80.2999 92.271 65.9429 74.5608 65.9429"
            stroke="white"
            strokeWidth="20"
            strokeLinecap="round"
          />
          <path
            d="M74.0673 104.135C56.357 104.135 42 89.7776 42 72.0673C42 54.357 56.357 40 74.0673 40"
            stroke="white"
            strokeWidth="20"
            strokeLinecap="round"
          />
        </svg>
        <span>Signal Studio</span>
      </a>
      <button className="nav-cta" onClick={scrollToHero}>
        Join waitlist →
      </button>
    </nav>
  );
}
