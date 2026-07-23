import Image from "next/image";
import Link from "next/link";
import { Container, SectionHead } from "@/components/ui";
import { ArrowUpRight } from "@/components/Icons";
import { destinations } from "@/lib/destinations";
import { jobsByCountry } from "@/lib/jobs";

export function Destinations() {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHead
            eyebrow="Where you could be"
            title="Three countries. One coastline."
            intro="We keep our focus narrow on purpose. These are the three markets where the packages are real, the contracts are permanent and we know the employers by name."
          />
        </div>

        <div className="mt-12 grid gap-5 sm:gap-6 lg:grid-cols-3">
          {destinations.map((d, i) => {
            const count = jobsByCountry(d.slug).length;
            return (
              <Link
                key={d.slug}
                href={`/destinations/${d.slug}`}
                className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-[1.5rem] shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)] sm:aspect-[3/4] lg:aspect-[3/4.2]"
              >
                <Image
                  src={d.card.photo}
                  alt={d.card.alt}
                  fill
                  sizes="(max-width: 1024px) 92vw, 31vw"
                  priority={i === 0}
                  className="object-cover transition-transform duration-[900ms] group-hover:scale-[1.06]"
                />
                <div className="scrim-full absolute inset-0" />

                <div className="relative z-10 p-6 sm:p-7">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/15 px-2.5 py-1 text-[0.75rem] font-medium text-white backdrop-blur-sm">
                    <span aria-hidden="true">{d.flag}</span>
                    {count} open {count === 1 ? "role" : "roles"}
                  </span>

                  <h3 className="mt-4 font-[family-name:var(--font-display)] text-[2rem] leading-none font-semibold tracking-[-0.03em] text-white sm:text-[2.25rem]">
                    {d.country}
                  </h3>

                  <p className="mt-3 max-w-xs text-[0.9375rem] leading-relaxed text-pretty text-white/80">
                    {d.card.blurb}
                  </p>

                  <span className="mt-5 inline-flex items-center gap-2 text-[0.875rem] font-semibold text-white">
                    Explore {d.country}
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-white/15 transition-colors group-hover:bg-[color:var(--color-sun-400)] group-hover:text-[color:var(--color-sea-950)]">
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
