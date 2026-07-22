/**
 * Get Work Abroad — brand mark.
 *
 * A Mediterranean arch (the whitewashed doorway you find from Lisbon to
 * Mykonos) framing a sun setting into the sea. Doorway = the move, the sun
 * on the water = where you land. It holds up at 24px and at 240px.
 */

export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      role="presentation"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="gwa-arch" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#15566e" />
          <stop offset="100%" stopColor="#06202b" />
        </linearGradient>
        <linearGradient id="gwa-sun" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f4bd5e" />
          <stop offset="100%" stopColor="#d2872a" />
        </linearGradient>
        <clipPath id="gwa-clip">
          <path d="M20 3.2a13.2 13.2 0 0 1 13.2 13.2V34a2.8 2.8 0 0 1-2.8 2.8H9.6A2.8 2.8 0 0 1 6.8 34V16.4A13.2 13.2 0 0 1 20 3.2Z" />
        </clipPath>
      </defs>

      {/* the arch */}
      <path
        d="M20 3.2a13.2 13.2 0 0 1 13.2 13.2V34a2.8 2.8 0 0 1-2.8 2.8H9.6A2.8 2.8 0 0 1 6.8 34V16.4A13.2 13.2 0 0 1 20 3.2Z"
        fill="url(#gwa-arch)"
      />

      {/* sun half-sunk into the sea, clipped to the arch opening */}
      <g clipPath="url(#gwa-clip)">
        <circle cx="20" cy="24.6" r="7.4" fill="url(#gwa-sun)" />
        <rect x="4" y="24.6" width="32" height="14" fill="#1f7fa0" />
        <rect x="4" y="24.6" width="32" height="0.9" fill="#86c2d6" opacity="0.9" />
        {/* two swells on the water */}
        <path
          d="M4 29.4c3.2 0 3.2 1.5 6.4 1.5s3.2-1.5 6.4-1.5 3.2 1.5 6.4 1.5 3.2-1.5 6.4-1.5 3.2 1.5 6.4 1.5"
          fill="none"
          stroke="#bfdee8"
          strokeWidth="0.9"
          strokeLinecap="round"
          opacity="0.55"
        />
        <path
          d="M4 33c3.2 0 3.2 1.5 6.4 1.5s3.2-1.5 6.4-1.5 3.2 1.5 6.4 1.5 3.2-1.5 6.4-1.5 3.2 1.5 6.4 1.5"
          fill="none"
          stroke="#bfdee8"
          strokeWidth="0.9"
          strokeLinecap="round"
          opacity="0.35"
        />
      </g>
    </svg>
  );
}

export function Logo({
  className = "",
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-9 w-9 shrink-0" />
      <span
        className={`font-[family-name:var(--font-display)] text-[1.0625rem] leading-none font-semibold tracking-[-0.035em] sm:text-[1.15rem] ${
          tone === "light" ? "text-white" : "text-[color:var(--color-ink)]"
        }`}
      >
        Get Work
        <span
          className={
            tone === "light"
              ? "text-[color:var(--color-sun-400)]"
              : "text-[color:var(--color-sea-500)]"
          }
        >
          {" "}
          Abroad
        </span>
      </span>
    </span>
  );
}
