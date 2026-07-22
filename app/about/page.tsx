import type { Metadata } from "next";
import Image from "next/image";
import { Container, Button, SectionHead } from "@/components/ui";
import { PageHeader } from "@/components/PageHeader";
import { ArrowRight, Check } from "@/components/Icons";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata: Metadata = {
  title: "About",
  description:
    "Get Work Abroad places native language speakers into permanent roles in Spain, Portugal and Greece. Free for candidates, paid by the employer.",
};

const principles = [
  {
    title: "Free for the candidate, always",
    body: "We are paid by the employer when you are hired. If a recruiter ever asks you to pay a placement fee, for any reason, that is not how this industry is supposed to work.",
  },
  {
    title: "The package in writing, up front",
    body: "Every listing states the salary, the contract type and exactly what the employer covers. You should know what you are agreeing to before the first interview, not after.",
  },
  {
    title: "Three countries, properly",
    body: "Spain, Portugal and Greece. We turn down work outside them. Knowing three markets well beats knowing fifteen badly when someone is about to move their life.",
  },
  {
    title: "We would rather lose the placement",
    body: "If a role is wrong for you we will say so, even when it costs us the fee. A person who leaves after two months is worse for everybody than a placement we never made.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="Moving abroad is the easiest hard thing you will ever do"
        intro="Get Work Abroad places native language speakers into permanent roles across Spain, Portugal and Greece. We started it because the jobs are genuinely good and almost nobody explains them properly."
      />

      {/* ── Story ───────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <SectionHead eyebrow="Why we exist" title="The jobs are real. The marketing around them usually is not." />
              <div className="mt-8 space-y-5 text-[1.0625rem] leading-relaxed text-pretty text-[color:var(--color-body)]">
                <p>
                  Across the Mediterranean there are thousands of permanent
                  roles that need a native Dutch, German, Finnish or Hebrew
                  speaker and cannot find one locally. To bridge that, employers
                  pay for your flight, put you up when you land and train you on
                  full salary.
                </p>
                <p>
                  It is one of the few genuinely good deals left in entry-level
                  hiring. And it is buried under recruiters who will not tell
                  you the salary, agencies charging candidates fees they should
                  never pay, and adverts written by people who have never seen
                  the city they are selling.
                </p>
                <p>
                  So we built the opposite. Every role on this site states what
                  it pays, what the contract is and what the employer covers.
                  Every destination page tells you what a room costs and what
                  the paperwork involves. Then you decide.
                </p>
              </div>

              <div className="mt-9 flex flex-wrap gap-3">
                <Button href="/jobs">
                  See open jobs
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button href="/employers" variant="outline">
                  For employers
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 lg:sticky lg:top-28 lg:h-fit">
              <div className="relative aspect-[3/4] overflow-hidden rounded-[1.25rem] shadow-[var(--shadow-photo)]">
                <Image
                  src="/photos/greece-mykonos.jpg"
                  alt="Whitewashed houses above turquoise water in Mykonos"
                  fill
                  sizes="(max-width: 1024px) 46vw, 22vw"
                  className="object-cover"
                />
              </div>
              <div className="relative mt-8 aspect-[3/4] overflow-hidden rounded-[1.25rem] shadow-[var(--shadow-photo)]">
                <Image
                  src="/photos/malaga-sunset.jpg"
                  alt="Sunset over the harbour in Málaga"
                  fill
                  sizes="(max-width: 1024px) 46vw, 22vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Principles ──────────────────────────────────────────── */}
      <section className="border-y border-[color:var(--color-line)] bg-white py-20 sm:py-28">
        <Container>
          <SectionHead
            eyebrow="How we work"
            title="Four things we will not compromise on"
            align="center"
          />
          <div className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2">
            {principles.map((p) => (
              <div
                key={p.title}
                className="border-t border-[color:var(--color-line)] pt-6"
              >
                <span className="grid h-9 w-9 place-items-center rounded-full bg-[color:var(--color-sea-50)] text-[color:var(--color-sea-600)]">
                  <Check className="h-4 w-4" />
                </span>
                <h3 className="mt-4 font-[family-name:var(--font-display)] text-[1.2rem] font-semibold tracking-[-0.02em] text-[color:var(--color-ink)]">
                  {p.title}
                </h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-pretty text-[color:var(--color-body)]">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <div className="pt-20 sm:pt-28">
        <FinalCta />
      </div>
    </>
  );
}
