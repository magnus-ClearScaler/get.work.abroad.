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
    title: "You find out who you are without the scaffolding",
    body: "At home you are held up by people who have known you for years. Move, and none of that comes with you. What is left is you, and almost everybody discovers they are considerably more capable than they had assumed.",
  },
  {
    title: "You stop being a tourist in other people's lives",
    body: "There is a difference between visiting a country and having a landlord in it, a local bar, a colleague whose mother sends food. You start understanding how other people actually live, and your own upbringing stops looking like the default setting.",
  },
  {
    title: "Your circle stops looking like you",
    body: "In these offices your team is Dutch, Greek, Portuguese, Brazilian, Italian and Norwegian in the same room. You will end up with friends across a dozen countries and a permanent list of places you now have a reason to visit.",
  },
  {
    title: "It is the fastest two years of growth you will get",
    body: "New country, new language, new job, new everything, all at once. It is genuinely hard for the first month and then it is not. Nobody we know who has done it regrets it, and most of them stayed far longer than they planned to.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="Moving abroad is the easiest hard thing you will ever do"
        intro="We place native language speakers into permanent roles across Spain, Portugal and Greece. We do it because we have made the move ourselves, and because we have yet to meet anyone who did it and wished they had not."
      />

      {/* ── Story ───────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <SectionHead
                eyebrow="Why we exist"
                title="We are not selling you a job. We are selling you a couple of years you will talk about forever."
              />
              <div className="mt-8 space-y-5 text-[1.0625rem] leading-relaxed text-pretty text-[color:var(--color-body)]">
                <p>
                  We moved abroad ourselves. We know the specific feeling of
                  landing somewhere with two suitcases and no idea where the
                  supermarket is, and we know what happens about six weeks
                  later, when the city stops being foreign and starts being
                  yours.
                </p>
                <p>
                  That is the part nobody puts in a job advert. You learn a
                  language by embarrassing yourself in it. You get a group of
                  friends from eight countries. You come back able to handle
                  the kind of thing that would have floored you a year earlier,
                  because you have already sorted out a tax number in a
                  language you do not speak.
                </p>
                <p>
                  Every expat we know personally loves it, and the ones who
                  planned on a year are mostly still there. So we built the
                  company we would have wanted: real roles, honest numbers on
                  what a room actually costs, and someone on the other end of
                  the phone who has done the move themselves.
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
                  src="/photos/greek-taverna-table.jpg"
                  alt="A taverna table with blue chairs set right beside the sea"
                  fill
                  sizes="(max-width: 1024px) 46vw, 22vw"
                  className="object-cover"
                />
              </div>
              <div className="relative mt-8 aspect-[3/4] overflow-hidden rounded-[1.25rem] shadow-[var(--shadow-photo)]">
                <Image
                  src="/photos/portugal-surf.jpg"
                  alt="A surfer walking out at a Portuguese beach break"
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
            eyebrow="The real reason to do it"
            title="What actually happens when you go"
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
