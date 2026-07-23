import Image from "next/image";
import { Container, Button } from "@/components/ui";
import { ArrowRight, Check } from "@/components/Icons";

const points = [
  "Native speakers across northern and central Europe, sourced and screened",
  "Candidates who already want to relocate, not ones you have to convince",
  "Shortlists in days, because we build the pipeline before you ask",
];

export function EmployerBand() {
  return (
    <section className="relative overflow-hidden bg-[color:var(--color-sea-950)]">
      <Image
        src="/photos/porto-azulejo.jpg"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="object-cover opacity-[0.14]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_75%_15%,rgba(31,127,160,0.35),transparent_70%)]"
      />

      <Container className="relative z-10 py-14 sm:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <p className="eyebrow text-[color:var(--color-sun-400)]">
              For employers
            </p>
            <h2 className="h-section mt-3 text-[clamp(1.9rem,4.4vw,3rem)] text-balance text-white">
              You need a Dutch speaker in Lisbon by the end of the month.
            </h2>
            <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-pretty text-[color:var(--color-sea-200)]/85">
              We build the candidate pipeline through our own channels rather
              than buying it from a job board, which is why we can move fast on
              the languages everyone else struggles to fill.
            </p>

            <ul className="mt-8 space-y-3.5">
              {points.map((p) => (
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

            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="/employers" variant="sun" size="lg">
                Submit a vacancy
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="/about" variant="ghostLight" size="lg">
                How we source
              </Button>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] shadow-[var(--shadow-photo)] lg:aspect-[4/4.4]">
            <Image
              src="/photos/lisbon-azulejo.jpg"
              alt="A tiled azulejo façade in Lisbon"
              fill
              sizes="(max-width: 1024px) 92vw, 38vw"
              className="object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
