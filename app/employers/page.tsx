import type { Metadata } from "next";
import Image from "next/image";
import { Container, Button, SectionHead, Faq } from "@/components/ui";
import { PageHeader } from "@/components/PageHeader";
import { ArrowRight, Check, Whatsapp } from "@/components/Icons";
import { site, languages } from "@/lib/site";

export const metadata: Metadata = {
  title: "For employers",
  description:
    "We source native language speakers for service, sales and support teams in Spain, Portugal and Greece, through our own channels rather than a job board.",
};

const how = [
  {
    title: "We build the pipeline before you ask",
    body: "Our candidates come from our own social channels, not from reposting your advert on a job board. That means we usually have people warm in the languages you struggle to fill.",
  },
  {
    title: "Screened for the move, not just the CV",
    body: "The hard part of hiring internationally is not finding a Dutch speaker. It is finding one who will still be there in six months. We screen for intent to relocate first.",
  },
  {
    title: "One point of contact",
    body: "You brief us once. We come back with a shortlist, arrange the interviews and stay on it until the candidate has started.",
  },
  {
    title: "Paid on placement",
    body: "No retainers and no upfront fees. We are paid when someone you hired through us starts work.",
  },
];

const faq = [
  {
    q: "Which languages can you actually deliver?",
    a: `We regularly place native speakers of ${languages.slice(0, 8).join(", ")} and several others. If you need something unusual, ask. Our reach is strongest across northern and central Europe.`,
  },
  {
    q: "How quickly can you send a shortlist?",
    a: "For the languages we hold a live pipeline in, days rather than weeks. For scarcer languages it depends on how much notice you give us, and we will tell you honestly at briefing.",
  },
  {
    q: "Which markets do you cover?",
    a: "Spain, Portugal and Greece. We stay narrow on purpose. It is the only way to know the packages, the cities and the practical realities of relocating someone well enough to be useful.",
  },
  {
    q: "What do you charge?",
    a: "A placement fee, agreed before we start and payable when the candidate starts. Get in touch and we will send you the current terms.",
  },
];

export default function EmployersPage() {
  return (
    <>
      <PageHeader
        eyebrow="For employers"
        title="The languages you cannot fill locally"
        intro="We source native speakers for service, sales and support teams across Spain, Portugal and Greece. Our candidates come from channels we own, which is why we can move on the roles everyone else leaves open."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={`mailto:${site.email}?subject=Vacancy%20brief`} size="lg">
            Send us a vacancy
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button href={site.whatsappLink} external variant="outline" size="lg">
            <Whatsapp className="h-4 w-4 text-[#25D366]" />
            Talk it through
          </Button>
        </div>
      </PageHeader>

      {/* ── How we work ─────────────────────────────────────────── */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <SectionHead
                eyebrow="How we work"
                title="Recruitment that is built around the move, not the job board"
              />
              <div className="mt-10 divide-y divide-[color:var(--color-line)] border-y border-[color:var(--color-line)]">
                {how.map((h) => (
                  <div key={h.title} className="py-6">
                    <h3 className="font-[family-name:var(--font-display)] text-[1.15rem] font-semibold tracking-[-0.015em] text-[color:var(--color-ink)]">
                      {h.title}
                    </h3>
                    <p className="mt-2 max-w-xl text-[0.9375rem] leading-relaxed text-pretty text-[color:var(--color-body)]">
                      {h.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] shadow-[var(--shadow-photo)] lg:sticky lg:top-28">
              <Image
                src="/photos/porto-azulejo.jpg"
                alt="A blue azulejo-tiled wall in Porto"
                fill
                sizes="(max-width: 1024px) 92vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ── Languages ───────────────────────────────────────────── */}
      <section className="border-y border-[color:var(--color-line)] bg-white py-16 sm:py-20">
        <Container>
          <SectionHead
            eyebrow="Coverage"
            title="Languages we recruit in"
            align="center"
          />
          <ul className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-2.5">
            {languages.map((l) => (
              <li
                key={l}
                className="rounded-full border border-[color:var(--color-line)] bg-[color:var(--color-sand-50)] px-4 py-2 font-[family-name:var(--font-display)] text-[0.9375rem] font-medium text-[color:var(--color-ink)]"
              >
                {l}
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-6 max-w-xl text-center text-[0.9375rem] text-[color:var(--color-mute)]">
            Not on the list? Ask anyway. Our network moves faster than this page
            does.
          </p>
        </Container>
      </section>

      {/* ── Brief us ────────────────────────────────────────────── */}
      <section className="bg-[color:var(--color-sea-950)] py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHead
                eyebrow="Brief us"
                tone="light"
                title="Tell us the role and we will tell you honestly whether we can fill it"
                intro="Send the language, the city, the contract and the package. If it is not something we can deliver well, we will say so rather than waste a month of your time."
              />
              <ul className="mt-8 space-y-3.5">
                {[
                  "Language and level required",
                  "City, and whether the role is on-site or hybrid",
                  "Salary band and what the relocation package covers",
                  "How many hires, and by when",
                ].map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[color:var(--color-sun-400)]/15 text-[color:var(--color-sun-400)]">
                      <Check className="h-3 w-3" />
                    </span>
                    <span className="text-[0.9375rem] text-[color:var(--color-sea-200)]/90">
                      {p}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="h-fit rounded-2xl border border-white/10 bg-white/[0.04] p-8">
              <h3 className="font-[family-name:var(--font-display)] text-[1.35rem] font-semibold tracking-[-0.02em] text-white">
                Get in touch
              </h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-[color:var(--color-sea-200)]/85">
                Email the brief or message us. We reply the same working day.
              </p>
              <div className="mt-7 space-y-3">
                <Button
                  href={`mailto:${site.email}?subject=Vacancy%20brief`}
                  variant="sun"
                  className="w-full"
                  size="lg"
                >
                  {site.email}
                </Button>
                <Button
                  href={site.whatsappLink}
                  external
                  variant="ghostLight"
                  className="w-full"
                  size="lg"
                >
                  <Whatsapp className="h-4 w-4" />
                  {site.whatsappNumber}
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <SectionHead eyebrow="Questions" title="What employers ask us" />
            <Faq items={faq} />
          </div>
        </Container>
      </section>
    </>
  );
}
