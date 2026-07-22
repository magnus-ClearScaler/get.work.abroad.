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

/** Full-bleed photographic header for destination pages. */
export function PhotoHeader({
  photo,
  alt,
  eyebrow,
  title,
  intro,
  children,
}: {
  photo: string;
  alt: string;
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative flex min-h-[26rem] flex-col justify-end overflow-hidden sm:min-h-[34rem]">
      <Image
        src={photo}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="scrim-b absolute inset-0" />
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
