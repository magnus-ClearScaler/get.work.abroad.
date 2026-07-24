/**
 * Get Work Abroad brand lockup.
 *
 * The mark is the redesign from the Claude Design system: a rising sun over
 * two Mediterranean waves — career and coastline in one figure — replacing the
 * original globe/compass/arrow/olive-branch composite, which is still in
 * `public/logo-mark.png` and `public/logo-full.png`.
 *
 * It is inlined rather than served as a file so the strokes take brand tokens
 * (and can lift on dark backgrounds), and so the header costs no extra request.
 */

export function LogoMark({ className = "h-10 w-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className={`${className} shrink-0`}
    >
      {/* Sun */}
      <circle cx="32" cy="27" r="11" fill="var(--color-sun-500)" />
      <g stroke="var(--color-sun-400)" strokeWidth="3" strokeLinecap="round">
        <line x1="32" y1="6" x2="32" y2="10.5" />
        <line x1="16.5" y1="11.5" x2="19.7" y2="14.7" />
        <line x1="47.5" y1="11.5" x2="44.3" y2="14.7" />
        <line x1="10" y1="27" x2="14.5" y2="27" />
        <line x1="54" y1="27" x2="49.5" y2="27" />
      </g>
      {/* Waves. The tones come from CSS custom properties the light variant
          overrides, so the blues lift clear of a dark photo or the footer. */}
      <path
        d="M6 44 C 16 38, 22 50, 32 44 C 42 38, 48 50, 58 42"
        stroke="var(--logo-wave-far, var(--color-sea-700))"
        strokeWidth="4.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M6 55 C 16 49, 22 61, 32 55 C 42 49, 48 61, 58 53"
        stroke="var(--logo-wave-near, var(--color-sea-500))"
        strokeWidth="4.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function Logo({
  className = "",
  tone = "dark",
  showTagline = false,
}: {
  className?: string;
  tone?: "dark" | "light";
  showTagline?: boolean;
}) {
  const light = tone === "light";
  return (
    <span
      className={`inline-flex items-center gap-2.5 ${className}`}
      style={
        light
          ? ({
              "--logo-wave-far": "var(--color-sea-300)",
              "--logo-wave-near": "#ffffff",
            } as React.CSSProperties)
          : undefined
      }
    >
      <LogoMark className="h-9 w-auto sm:h-10" />
      <span className="flex flex-col justify-center">
        <span className="font-[family-name:var(--font-display)] text-[1.0625rem] leading-none font-bold tracking-[-0.02em] sm:text-[1.2rem]">
          <span
            className={
              light ? "text-white" : "text-[color:var(--color-sea-700)]"
            }
          >
            Get Work
          </span>{" "}
          <span
            className={
              light
                ? "text-[color:var(--color-sun-400)]"
                : "text-[color:var(--color-sun-650)]"
            }
          >
            Abroad
          </span>
        </span>
        {showTagline ? (
          <span className="mt-1.5 text-[0.5625rem] font-semibold tracking-[0.18em] text-[color:var(--color-olive-500)] uppercase sm:text-[0.625rem]">
            Recruiting for Southern Europe
          </span>
        ) : null}
      </span>
    </span>
  );
}
