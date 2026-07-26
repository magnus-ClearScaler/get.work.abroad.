import type { Metadata } from "next";
import { Container, Button } from "@/components/ui";
import { PhotoHeader } from "@/components/PageHeader";
import { Process } from "@/components/home/Process";
import { HomeFaq } from "@/components/home/HomeFaq";
import { ArrowRight, Plane } from "@/components/Icons";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "From your CV to your first day in four steps. We are paid by the employer, so it is free for you: flights, accommodation and paid training covered in Spain, Portugal and Greece.",
  openGraph: {
    title: "How it works · Get Work Abroad",
    description:
      "From your CV to your first day in four steps. Free for candidates — the employer pays. Permanent roles on the Mediterranean.",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
  },
};

export default function HowItWorksPage() {
  return (
    <>
      <PhotoHeader
        photo="/photos/mediterranean-cliff-town.jpg"
        alt="A clifftop dining terrace over the sea in a golden-lit Mediterranean town"
        focal="center 40%"
        eyebrow="How it works"
        title="From your CV to your first day, in four steps"
        intro="We are paid by the employer when you are hired, which is the only reason this is free for you. It also means we have no interest in sending you somewhere you will leave in three months."
      >
        <div className="mt-7 flex flex-wrap gap-3">
          <Button href="/apply" variant="sun" size="lg">
            <Plane className="h-4 w-4" />
            Send your CV
          </Button>
          <Button href="/jobs" variant="ghostLight" size="lg">
            See open roles
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </PhotoHeader>

      <Process showHead={false} />

      <HomeFaq />

      {/* Closing CTA: the two things a reader can do next, side by side. */}
      <section className="bg-[color:var(--color-sea-950)] py-16 sm:py-24">
        <Container className="text-center">
          <p className="eyebrow text-[color:var(--color-sun-400)]">Ready when you are</p>
          <h2 className="h-section mt-3 text-[clamp(1.9rem,4.6vw,3rem)] text-balance text-white">
            Take a look, or put your name in
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-pretty text-[color:var(--color-sea-200)]/85">
            Browse the roles open right now, or send your CV and we will come
            back to you with the ones that actually fit.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/jobs" variant="sun" size="lg">
              See open roles
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="/apply" variant="ghostLight" size="lg">
              <Plane className="h-4 w-4" />
              Send your CV
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
