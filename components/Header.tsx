"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { Close, Menu, Whatsapp } from "./Icons";
import { site } from "@/lib/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  /* The drawer remembers which route it was opened on, so any navigation
     (including back and forward) closes it without an effect. */
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const open = openedOn === pathname;
  const setOpen = (next: boolean) => setOpenedOn(next ? pathname : null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* Every route but the privacy notice opens on a full-bleed photo (or the
     hero video) that runs underneath this bar, so at the top of the page the
     header carries no background and its contents flip to white. Scrolling
     away, or opening the drawer, brings the solid bar back. */
  const solid = scrolled || open;
  const onPhoto = !pathname.startsWith("/privacy") && !solid;

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 ${
        solid
          ? "border-b border-[color:var(--color-line)] bg-[color:var(--color-sand-50)]/85 shadow-[0_1px_0_rgba(6,32,43,0.04)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-[84rem] items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" aria-label="Get Work Abroad, home" className="shrink-0">
          <Logo tone={onPhoto ? "light" : "dark"} />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {site.nav.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-3.5 py-2 text-[0.875rem] font-medium transition-colors ${
                  onPhoto
                    ? active
                      ? "bg-white/15 text-white"
                      : "text-white/85 hover:bg-white/10 hover:text-white"
                    : active
                      ? "bg-[color:var(--color-sea-100)] text-[color:var(--color-sea-700)]"
                      : "text-[color:var(--color-body)] hover:bg-[color:var(--color-sand-100)] hover:text-[color:var(--color-ink)]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2.5">
          <a
            href={site.whatsappLink}
            target="_blank"
            rel="noreferrer noopener"
            className={`hidden items-center gap-2 rounded-full border px-4 py-2.5 text-[0.8125rem] font-semibold transition-colors sm:inline-flex ${
              onPhoto
                ? "border-white/30 bg-white/10 text-white backdrop-blur-sm hover:border-white/60 hover:bg-white/15"
                : "border-[color:var(--color-line)] bg-white text-[color:var(--color-ink)] hover:border-[color:var(--color-sea-300)] hover:text-[color:var(--color-sea-700)]"
            }`}
          >
            <Whatsapp className="h-4 w-4 text-[#25D366]" />
            WhatsApp
          </a>
          <Link
            href="/apply"
            className={`inline-flex items-center whitespace-nowrap rounded-full px-4 py-2.5 text-[0.8125rem] font-semibold shadow-[var(--shadow-soft)] transition-colors sm:px-5 ${
              onPhoto
                ? "bg-white text-[color:var(--color-sea-900)] hover:bg-[color:var(--color-sand-100)]"
                : "bg-[color:var(--color-sea-700)] text-white hover:bg-[color:var(--color-sea-800)]"
            }`}
          >
            Apply now
          </Link>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors lg:hidden ${
              onPhoto
                ? "border-white/30 bg-white/10 text-white backdrop-blur-sm"
                : "border-[color:var(--color-line)] bg-white text-[color:var(--color-ink)]"
            }`}
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-x-0 top-[4.5rem] bottom-0 z-40 origin-top overflow-y-auto border-t border-[color:var(--color-line)] bg-[color:var(--color-sand-50)] px-5 pt-4 pb-10 transition duration-200 lg:hidden ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <nav className="flex flex-col" aria-label="Mobile">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="border-b border-[color:var(--color-line-soft)] py-4 font-[family-name:var(--font-display)] text-[1.35rem] font-semibold tracking-[-0.02em] text-[color:var(--color-ink)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-7 flex flex-col gap-3">
          <Link
            href="/apply"
            className="inline-flex items-center justify-center rounded-full bg-[color:var(--color-sea-700)] px-6 py-3.5 text-[0.9375rem] font-semibold text-white"
          >
            Apply now
          </Link>
          <a
            href={site.whatsappLink}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--color-line)] bg-white px-6 py-3.5 text-[0.9375rem] font-semibold text-[color:var(--color-ink)]"
          >
            <Whatsapp className="h-4.5 w-4.5 text-[#25D366]" />
            Message us on WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}
