"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A single, restrained entrance: content fades and rises 14px the first time it
 * scrolls into view, then never animates again. This is the motion the design
 * system asks for — below the fold only, so nothing above the fold is ever held
 * at opacity 0 (that would defer Largest Contentful Paint by the whole
 * duration). prefers-reduced-motion opts out entirely and shows content plainly.
 *
 * `as` lets a caller keep the semantic element (a <section>, say) rather than
 * wrapping everything in an extra div that could disturb a full-bleed layout.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    /* Reduced motion is handled in CSS (globals.css forces .reveal fully
       visible), so there is nothing to observe or animate for those users. */
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        shown ? "translate-y-0 opacity-100" : "translate-y-3.5 opacity-0"
      } ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
