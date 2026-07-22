import Image from "next/image";
import { Container, Button } from "@/components/ui";
import { ArrowRight, Check, Plane } from "@/components/Icons";
import { jobs } from "@/lib/jobs";

const proof = [
  "Free for candidates",
  "Permanent EU contracts",
  "Relocation covered",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-10 pb-16 sm:pt-14 sm:pb-24">
      {/* warm horizon wash behind the type */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-40 h-[38rem] bg-[radial-gradient(60%_55%_at_18%_38%,rgba(233,161,59,0.16),transparent_70%),radial-gradient(55%_50%_at_78%_20%,rgba(31,127,160,0.14),transparent_70%)]"
      />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* ── Copy ─────────────────────────────────────────────── */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-line)] bg-white/70 px-3.5 py-1.5 text-[0.8125rem] font-medium text-[color:var(--color-sea-700)] backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--color-sun-400)] opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--color-sun-500)]" />
              </span>
              {`${jobs.length} open roles · Spain, Portugal & Greece`}
            </span>

            <h1 className="h-display mt-6 max-w-[13ch] text-[clamp(2.5rem,5.8vw,4rem)] text-balance">
              Work in your language.{" "}
              <span className="text-[color:var(--color-sea-600)]">
                Live on the Mediterranean.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-pretty text-[color:var(--color-body)] sm:text-[1.15rem]">
              Permanent roles in Spain, Portugal and Greece for native speakers.
              The employer covers your flight, your first weeks of
              accommodation and your training. We do not charge you a cent.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="/jobs" size="lg">
                See open jobs
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="/apply" variant="outline" size="lg">
                <Plane className="h-4 w-4 text-[color:var(--color-sea-600)]" />
                Send an open application
              </Button>
            </div>

            <ul className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-2.5">
              {proof.map((p) => (
                <li
                  key={p}
                  className="flex items-center gap-2 text-[0.875rem] font-medium text-[color:var(--color-body)]"
                >
                  <Check className="h-4 w-4 text-[color:var(--color-sea-500)]" />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* ── Photo composition ────────────────────────────────── */}
          <div>
            <div className="grid grid-cols-5 grid-rows-6 gap-3 sm:gap-4 lg:h-[34rem]">
              <figure className="relative col-span-3 row-span-6 overflow-hidden rounded-[1.25rem] shadow-[var(--shadow-photo)]">
                <Image
                  src="/photos/user-greece-cove.jpg"
                  alt="A turquoise cove with umbrellas on a white pebble beach in Greece"
                  fill
                  priority
                  sizes="(max-width: 1024px) 55vw, 30vw"
                  className="object-cover"
                />
                <figcaption className="absolute bottom-0 left-0 w-full scrim-b p-4 pt-12">
                  <span className="text-[0.8125rem] font-semibold tracking-[0.02em] text-white">
                    Greece
                  </span>
                  <span className="ml-2 text-[0.8125rem] text-white/70">
                    a ferry from Athens
                  </span>
                </figcaption>
              </figure>

              <figure className="relative col-span-2 row-span-3 overflow-hidden rounded-[1.25rem] shadow-[var(--shadow-photo)]">
                <Image
                  src="/photos/user-malaga-aerial.jpg"
                  alt="Málaga from above, the bullring and the port meeting the Mediterranean"
                  fill
                  priority
                  sizes="(max-width: 1024px) 40vw, 20vw"
                  className="object-cover"
                />
              </figure>

              <figure className="relative col-span-2 row-span-3 overflow-hidden rounded-[1.25rem] shadow-[var(--shadow-photo)]">
                <Image
                  src="/photos/user-lisbon-golden.jpg"
                  alt="Lisbon at golden hour, the castle above the rooftops and the Tagus beyond"
                  fill
                  priority
                  sizes="(max-width: 1024px) 40vw, 20vw"
                  className="object-cover"
                />
              </figure>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
