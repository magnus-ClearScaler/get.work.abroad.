import Link from "next/link";
import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[84rem] px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-full text-[0.9375rem] font-semibold transition-all duration-200 whitespace-nowrap";

const variants = {
  primary:
    "bg-[color:var(--color-sea-700)] text-white shadow-[var(--shadow-soft)] hover:bg-[color:var(--color-sea-800)] hover:shadow-[var(--shadow-lift)]",
  sun: "bg-[color:var(--color-sun-400)] text-[color:var(--color-sea-950)] shadow-[var(--shadow-soft)] hover:bg-[color:var(--color-sun-500)]",
  dark: "bg-[color:var(--color-ink)] text-white hover:bg-[color:var(--color-sea-900)]",
  outline:
    "border border-[color:var(--color-line)] bg-white text-[color:var(--color-ink)] hover:border-[color:var(--color-sea-300)] hover:text-[color:var(--color-sea-700)]",
  ghostLight:
    "border border-white/25 text-white hover:border-white/60 hover:bg-white/5",
} as const;

const sizes = {
  md: "px-5 py-3",
  lg: "px-7 py-3.5 sm:px-8 sm:py-4",
} as const;

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  external,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  external?: boolean;
  className?: string;
}) {
  const cls = `${buttonBase} ${variants[variant]} ${sizes[size]} ${className}`;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export function SectionHead({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "dark",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div
      className={`${align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}
    >
      {eyebrow ? (
        <p
          className={`eyebrow ${tone === "light" ? "text-[color:var(--color-sun-400)]" : ""}`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`h-section mt-3 text-[clamp(1.9rem,4.4vw,3rem)] text-balance ${
          tone === "light" ? "text-white" : ""
        }`}
      >
        {title}
      </h2>
      {intro ? (
        <p
          className={`mt-4 text-[1.0625rem] leading-relaxed text-pretty ${
            tone === "light"
              ? "text-[color:var(--color-sea-200)]/85"
              : "text-[color:var(--color-body)]"
          }`}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}

export function Chip({
  children,
  tone = "sea",
}: {
  children: ReactNode;
  tone?: "sea" | "sand" | "sun" | "glass";
}) {
  const tones = {
    sea: "bg-[color:var(--color-sea-50)] text-[color:var(--color-sea-700)] border-[color:var(--color-sea-100)]",
    sand: "bg-[color:var(--color-sand-100)] text-[color:var(--color-body)] border-[color:var(--color-line)]",
    sun: "bg-[color:var(--color-sun-100)] text-[color:var(--color-sun-600)] border-[color:var(--color-sun-200)]",
    glass: "bg-white/15 text-white border-white/25 backdrop-blur-sm",
  } as const;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.75rem] font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-[color:var(--color-line)] border-y border-[color:var(--color-line)]">
      {items.map((item) => (
        <details key={item.q} className="group">
          <summary className="flex items-start justify-between gap-6 py-6">
            <span className="font-[family-name:var(--font-display)] text-[1.0625rem] font-semibold tracking-[-0.015em] text-[color:var(--color-ink)] sm:text-[1.15rem]">
              {item.q}
            </span>
            <span className="faq-sign mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-[color:var(--color-line)] text-[color:var(--color-sea-600)] transition-transform duration-300">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
                <path
                  d="M12 5v14M5 12h14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </summary>
          <p className="max-w-3xl pb-6 text-[0.9375rem] leading-relaxed text-pretty text-[color:var(--color-body)]">
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );
}
