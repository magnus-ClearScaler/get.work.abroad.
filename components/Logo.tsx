import Image from "next/image";

/**
 * Get Work Abroad brand lockup.
 *
 * The mark is the supplied artwork (globe, compass, rising arrow and olive
 * branch) cut to transparency. The wordmark is set in the site's display face
 * in the brand blue and orange so the header lockup stays horizontal and
 * crisp at any size, rather than scaling down the stacked original.
 */

export function LogoMark({ className = "h-10 w-auto" }: { className?: string }) {
  return (
    <Image
      src="/logo-mark.png"
      alt=""
      aria-hidden="true"
      width={400}
      height={272}
      priority
      className={className}
    />
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
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-9 w-auto shrink-0 sm:h-10" />
      <span className="flex flex-col justify-center">
        <span className="font-[family-name:var(--font-display)] text-[1.0625rem] leading-none font-bold tracking-[-0.02em] sm:text-[1.2rem]">
          <span
            className={
              tone === "light" ? "text-white" : "text-[color:var(--color-sea-700)]"
            }
          >
            Get Work
          </span>{" "}
          <span
            className={
              tone === "light"
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
