"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Full-bleed background video for the hero.
 *
 * - The poster JPG is the first paint (and the LCP candidate), so the section
 *   looks complete before a single video byte lands, and stays complete if the
 *   video is blocked or never loads.
 * - The clip is fetched only after mount, at a resolution matched to the
 *   viewport: 720p on phones (~3 MB), 1080p on wider screens (~7-8 MB).
 * - Two codecs: VP9/WebM first (smaller, and the only option on browsers built
 *   without the proprietary H.264 decoder), H.264/MP4 as the universal
 *   fallback for Safari and iOS.
 * - prefers-reduced-motion: never loaded or played. The poster stands in.
 * - Muted autoplay is allowed without a gesture on real browsers; if the first
 *   play() is refused we retry on the first interaction, then detach.
 */
const SOURCES = {
  desktop: [
    { src: "/video/coast-1080.webm", type: "video/webm" },
    { src: "/video/coast-1080.mp4", type: "video/mp4" },
  ],
  mobile: [
    { src: "/video/coast-720.webm", type: "video/webm" },
    { src: "/video/coast-720.mp4", type: "video/mp4" },
  ],
} as const;

export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [tier, setTier] = useState<keyof typeof SOURCES | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const pick = () =>
      setTier(
        window.matchMedia("(min-width: 768px)").matches ? "desktop" : "mobile",
      );
    // Defer the video fetch until the page has painted and the network is
    // quiet, so several MB of video never competes with the hero text for LCP.
    const w = window as typeof window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    };
    const idle = w.requestIdleCallback
      ? w.requestIdleCallback(pick, { timeout: 2500 })
      : window.setTimeout(pick, 1200);
    return () => {
      const cancel = (window as typeof window & {
        cancelIdleCallback?: (id: number) => void;
      }).cancelIdleCallback;
      if (cancel) cancel(idle);
      else clearTimeout(idle);
    };
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!tier || !v) return;

    v.load();

    let cleanup = () => {};
    v.play().catch(() => {
      const events = ["pointerdown", "touchstart", "keydown", "scroll"] as const;
      const start = () => {
        v.play().catch(() => {});
        cleanup();
      };
      events.forEach((e) =>
        window.addEventListener(e, start, { once: true, passive: true }),
      );
      cleanup = () =>
        events.forEach((e) => window.removeEventListener(e, start));
    });

    return () => cleanup();
  }, [tier]);

  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover"
      poster="/video/coast-poster.jpg"
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      tabIndex={-1}
    >
      {tier
        ? SOURCES[tier].map((s) => (
            <source key={s.src} src={s.src} type={s.type} />
          ))
        : null}
    </video>
  );
}
