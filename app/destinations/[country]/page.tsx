import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container, Button, SectionHead } from "@/components/ui";
import { PhotoHeader, Breadcrumb } from "@/components/PageHeader";
import { JobCard } from "@/components/JobCard";
import { ArrowRight } from "@/components/Icons";
import { destinations, byCountry } from "@/lib/destinations";
import { jobsByCountry } from "@/lib/jobs";
import { FinalCta } from "@/components/home/FinalCta";

export function generateStaticParams() {
  return destinations.map((d) => ({ country: d.slug }));
}

export async function generateMetadata(
  props: PageProps<"/destinations/[country]">,
): Promise<Metadata> {
  const { country } = await props.params;
  const d = byCountry(country);
  if (!d) return { title: "Not found" };
  return {
    title: `Working in ${d.country}`,
    description: d.intro.slice(0, 155),
    openGraph: {
      title: `Working in ${d.country} · Get Work Abroad`,
      description: d.intro.slice(0, 155),
      images: [{ url: d.hero.photo }],
    },
  };
}

export default async function DestinationPage(
  props: PageProps<"/destinations/[country]">,
) {
  const { country } = await props.params;
  const d = byCountry(country);
  if (!d) notFound();

  const openJobs = jobsByCountry(d.slug);
  const others = destinations.filter((x) => x.slug !== d.slug);

  return (
    <>
      <PhotoHeader
        photo={d.hero.photo}
        alt={d.hero.alt}
        eyebrow={`${d.flag} Destination`}
        title={`Working in ${d.headline}`}
        intro={d.intro}
      >
        <div className="mt-7 flex flex-wrap gap-3">
          <Button href="#jobs" variant="sun">
            {openJobs.length} open {openJobs.length === 1 ? "role" : "roles"}
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button href="/apply" variant="ghostLight">
            Send your CV
          </Button>
        </div>
      </PhotoHeader>

      {/* ── Facts ───────────────────────────────────────────────── */}
      <section className="border-b border-[color:var(--color-line)] bg-white py-12 sm:py-16">
        <Container>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Destinations" },
              { label: d.country },
            ]}
          />
          <dl className="grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
            {d.facts.map((f) => (
              <div
                key={f.label}
                className="border-t border-[color:var(--color-line)] pt-4"
              >
                <dt className="text-[0.75rem] font-semibold tracking-[0.12em] text-[color:var(--color-sea-600)] uppercase">
                  {f.label}
                </dt>
                <dd className="mt-2 font-[family-name:var(--font-display)] text-[1.15rem] leading-snug font-medium tracking-[-0.015em] text-[color:var(--color-ink)]">
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>


      {/* ── Why people move here ────────────────────────────────── */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHead
            eyebrow="Why people go"
            title={`What actually makes ${d.country} worth the move`}
            intro="Not the brochure version. The things people who moved here bring up unprompted a year later."
          />
          <div className="mt-14 space-y-16 sm:space-y-24">
            {d.whyMove.map((w, i) => (
              <div
                key={w.title}
                className={`grid items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16 ${
                  i % 2 === 1 ? "lg:[&>figure]:order-last" : ""
                }`}
              >
                <figure className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] shadow-[var(--shadow-photo)]">
                  <Image
                    src={w.photo}
                    alt={w.alt}
                    fill
                    sizes="(max-width: 1024px) 92vw, 46vw"
                    className="object-cover"
                  />
                </figure>
                <div>
                  <span className="font-[family-name:var(--font-display)] text-[0.8125rem] font-bold tracking-[0.14em] text-[color:var(--color-sun-500)] uppercase">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="h-section mt-3 text-[clamp(1.4rem,3vw,1.9rem)] text-balance">
                    {w.title}
                  </h3>
                  <p className="mt-4 text-[1.0625rem] leading-relaxed text-pretty text-[color:var(--color-body)]">
                    {w.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── What it actually costs ──────────────────────────────── */}
      <section className="border-y border-[color:var(--color-line)] bg-white py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div>
              <SectionHead
                eyebrow="Real numbers"
                title={`What a month in ${d.country} actually costs`}
                intro="Current 2026 prices, not figures copied from a five-year-old guide. If anything here turns out to be wrong, tell us and we will fix it."
              />
              <p className="mt-6 rounded-2xl bg-[color:var(--color-sand-100)] p-5 text-[0.9375rem] leading-relaxed text-pretty text-[color:var(--color-body)]">
                {d.costNote}
              </p>
            </div>
            <dl className="divide-y divide-[color:var(--color-line)] border-y border-[color:var(--color-line)]">
              {d.costs.map((c) => (
                <div
                  key={c.item}
                  className="flex items-baseline justify-between gap-6 py-4"
                >
                  <dt className="text-[0.9375rem] text-[color:var(--color-body)]">
                    {c.item}
                  </dt>
                  <dd className="shrink-0 font-[family-name:var(--font-display)] text-[1.0625rem] font-semibold tracking-[-0.015em] text-[color:var(--color-ink)]">
                    {c.price}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      {/* ── Cities ──────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHead
            eyebrow="Where the roles are"
            title={`The cities we place into in ${d.country}`}
          />
          <div className="mt-12 grid gap-5 sm:gap-6 lg:grid-cols-3">
            {d.cities.map((c) => (
              <article
                key={c.name}
                className="overflow-hidden rounded-[1.35rem] border border-[color:var(--color-line)] bg-white shadow-[var(--shadow-card)]"
              >
                <div className="relative aspect-[16/11] overflow-hidden">
                  <Image
                    src={c.photo}
                    alt={c.alt}
                    fill
                    sizes="(max-width: 1024px) 92vw, 31vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative z-10 p-6">
                  <h3 className="font-[family-name:var(--font-display)] text-[1.35rem] font-semibold tracking-[-0.02em] text-[color:var(--color-ink)]">
                    {c.name}
                  </h3>
                  <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-pretty text-[color:var(--color-body)]">
                    {c.note}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Living there ────────────────────────────────────────── */}
      <section className="bg-[color:var(--color-sand-100)] py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <SectionHead
              eyebrow="Before you go"
              title={`What living in ${d.country} is actually like`}
              intro="The parts of the move nobody puts in the job advert."
            />
            <div className="divide-y divide-[color:var(--color-line)] border-y border-[color:var(--color-line)]">
              {d.living.map((l) => (
                <div key={l.title} className="py-6 first:pt-0 last:pb-0">
                  <h3 className="font-[family-name:var(--font-display)] text-[1.15rem] font-semibold tracking-[-0.015em] text-[color:var(--color-ink)]">
                    {l.title}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-pretty text-[color:var(--color-body)]">
                    {l.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14 border-t border-[color:var(--color-line)] pt-10">
            <p className="eyebrow">Most commonly hired for</p>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {d.hiringFor.map((r) => (
                <li
                  key={r}
                  className="rounded-full border border-[color:var(--color-line)] bg-white px-4 py-2 text-[0.9375rem] font-medium text-[color:var(--color-ink)]"
                >
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* ── Jobs here ───────────────────────────────────────────── */}
      <section id="jobs" className="scroll-mt-24 py-20 sm:py-28">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHead
              eyebrow="Hiring now"
              title={`Open roles in ${d.country}`}
            />
            <Button href="/jobs" variant="outline" className="shrink-0">
              All destinations
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {openJobs.map((job) => (
              <JobCard key={job.slug} job={job} />
            ))}
          </div>
        </Container>
      </section>

      {/* ── Other countries ─────────────────────────────────────── */}
      <section className="border-t border-[color:var(--color-line)] bg-white py-16 sm:py-20">
        <Container>
          <h2 className="h-section text-[clamp(1.5rem,3.4vw,2.1rem)]">
            Or look somewhere else
          </h2>
          <div className="mt-8 grid gap-5 sm:gap-6 md:grid-cols-2">
            {others.map((o) => (
              <a
                key={o.slug}
                href={`/destinations/${o.slug}`}
                className="group relative flex aspect-[16/9] flex-col justify-end overflow-hidden rounded-[1.35rem]"
              >
                <Image
                  src={o.card.photo}
                  alt={o.card.alt}
                  fill
                  sizes="(max-width: 768px) 92vw, 46vw"
                  className="object-cover transition-transform duration-[900ms] group-hover:scale-[1.06]"
                />
                <div className="scrim-full absolute inset-0" />
                <div className="relative z-10 p-6">
                  <h3 className="font-[family-name:var(--font-display)] text-[1.75rem] leading-none font-semibold tracking-[-0.03em] text-white">
                    {o.country}
                  </h3>
                  <p className="mt-2 max-w-sm text-[0.9375rem] text-white/80">
                    {o.card.blurb}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </Container>
      </section>

      <FinalCta />
    </>
  );
}
