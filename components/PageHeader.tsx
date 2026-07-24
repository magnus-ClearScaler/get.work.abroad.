import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "./ui";

/** Light page header for content pages. */
export function PageHeader({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-[color:var(--color-line)] bg-[color:var(--color-sand-100)] py-14 sm:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_15%_0%,rgba(233,161,59,0.14),transparent_70%)]"
      />
      <Container className="relative">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1 className="h-display mt-3 max-w-3xl text-[clamp(2.2rem,5.6vw,3.8rem)] text-balance">
          {title}
        </h1>
        {intro ? (
          <p className="mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-pretty text-[color:var(--color-body)]">
            {intro}
          </p>
        ) : null}
        {children}
      </Container>
    </section>
  );
}

/** Full-bleed photographic header for destination and job pages. */
export function PhotoHeader({
  photo,
  alt,
  eyebrow,
  title,
  intro,
  children,
  focal = "center",
}: {
  photo: string;
  alt: string;
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  /** object-position, e.g. "center 30%", to control what the crop keeps. */
  focal?: string;
}) {
  return (
    /* Pulled up under the sticky header, which goes transparent on every route
       that opens on a photo, so the image runs from the top of the viewport.
       The min-heights carry the header's 4.5rem so the visible band is
       unchanged. Taller than a strip on purpose: the photograph is the sell. */
    <section className="relative -mt-[4.5rem] flex min-h-[33rem] flex-col justify-end overflow-hidden sm:min-h-[42rem]">
      <Image
        src={photo}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: focal }}
      />
      <div className="scrim-hero absolute inset-0" />
      {/* Keeps the white nav legible where a photo is bright at the top. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[color:var(--color-sea-950)]/45 to-transparent"
      />
      <Container className="relative z-10 pt-32 pb-12 sm:pb-16">
        {eyebrow ? (
          <p className="eyebrow text-[color:var(--color-sun-400)]">{eyebrow}</p>
        ) : null}
        <h1 className="h-display mt-3 max-w-3xl text-[clamp(2.6rem,8vw,5rem)] text-balance text-white">
          {title}
        </h1>
        {intro ? (
          <p className="mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-pretty text-white/85">
            {intro}
          </p>
        ) : null}
        {children}
      </Container>
    </section>
  );
}

export function Breadcrumb({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-[0.8125rem] text-[color:var(--color-mute)]">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1.5">
            {item.href ? (
              <Link
                href={item.href}
                className="transition-colors hover:text-[color:var(--color-sea-700)]"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-[color:var(--color-body)]">{item.label}</span>
            )}
            {i < items.length - 1 ? <span aria-hidden="true">/</span> : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
