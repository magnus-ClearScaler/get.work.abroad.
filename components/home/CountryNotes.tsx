import Link from "next/link";
import { Container, SectionHead } from "@/components/ui";
import { ArrowRight } from "@/components/Icons";
import { destinations } from "@/lib/destinations";

/**
 * The one-liners that used to sit on top of the country photographs.
 *
 * On a phone they turned each card into a wall of text with the picture buried
 * behind it. They read better here, as plain type on paper, further down the
 * page — by which point someone has seen the countries, the package and the
 * roles, and a sentence about each place is context rather than clutter.
 */
export function CountryNotes() {
  return (
    <section className="border-t border-[color:var(--color-line)] bg-white py-14 sm:py-20">
      <Container>
        <SectionHead
          eyebrow="The short version"
          title="What each country is actually like"
        />

        <ul className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-3">
          {destinations.map((d) => (
            <li key={d.slug}>
              <h3 className="flex items-center gap-2 font-[family-name:var(--font-display)] text-[1.25rem] font-semibold tracking-[-0.02em] text-[color:var(--color-ink)]">
                <span aria-hidden="true">{d.flag}</span>
                {d.country}
              </h3>
              <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-pretty text-[color:var(--color-body)]">
                {d.card.blurb}
              </p>
              <Link
                href={`/destinations/${d.slug}`}
                className="mt-3 inline-flex items-center gap-1.5 text-[0.875rem] font-semibold text-[color:var(--color-sea-700)]"
              >
                Living in {d.country}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
