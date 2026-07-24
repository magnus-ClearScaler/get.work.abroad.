import Image from "next/image";
import { Container, SectionHead } from "@/components/ui";

/**
 * The homepage sells the practical case well — package, process, contracts —
 * but the reason anyone actually goes is not logistics, it is who they become.
 * This is that beat: the growth and the life, in the brand's own plain voice,
 * lifted and tightened from the About page's principles so the feeling reaches
 * someone who never clicks through.
 */
const points = [
  {
    n: "01",
    title: "The fastest two years of growth you will get",
    body: "New country, new language, new job, all at once. It is genuinely hard for about a month and then it is not, and you come out the other side more capable than you had any idea you were.",
  },
  {
    n: "02",
    title: "A Tuesday that looks like other people's holiday",
    body: "Work the shift, then the sea is a ten-minute walk and dinner is three courses for fifteen euros. The job pays the bills. The place is the reason you remember the year.",
  },
  {
    n: "03",
    title: "A circle that stops looking like you",
    body: "Your team ends up Dutch, Greek, Portuguese and Norwegian in the same room. You leave with friends across a dozen countries and a permanent list of places you now have a reason to visit.",
  },
];

export function TheLife() {
  return (
    <section className="bg-[color:var(--color-sea-950)] py-14 sm:py-20">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <SectionHead
              eyebrow="Why people actually go"
              title="You are not just taking a job. You are getting a couple of years you will talk about forever."
              tone="light"
            />

            <ul className="mt-10 space-y-8">
              {points.map((p) => (
                <li key={p.n} className="flex gap-5">
                  <span
                    aria-hidden="true"
                    className="font-[family-name:var(--font-display)] text-[1.5rem] leading-none font-semibold tracking-[-0.03em] text-[color:var(--color-sun-400)]"
                  >
                    {p.n}
                  </span>
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-[1.15rem] font-semibold tracking-[-0.015em] text-white">
                      {p.title}
                    </h3>
                    <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-pretty text-[color:var(--color-sea-200)]/85">
                      {p.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] shadow-[var(--shadow-photo)] lg:aspect-[4/4.6]">
            <Image
              src="/photos/greece-mykonos.jpg"
              alt="Whitewashed waterfront tavernas on the edge of turquoise water in the Greek islands"
              fill
              sizes="(max-width: 1024px) 92vw, 44vw"
              className="object-cover"
            />
            <div className="scrim-b absolute inset-0" />
            <p className="absolute inset-x-0 bottom-0 p-6 font-[family-name:var(--font-display)] text-[1.35rem] leading-snug font-semibold tracking-[-0.02em] text-white sm:p-7">
              Nobody we know who has done it
              <br />
              wishes they had stayed.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
