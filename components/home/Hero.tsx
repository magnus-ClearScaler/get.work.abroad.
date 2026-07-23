import Image from "next/image";
import { Container, Button } from "@/components/ui";
import { ArrowRight, Plane } from "@/components/Icons";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 sm:pt-12 sm:pb-24">
      {/* soft brand wash behind the type */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-40 h-[40rem] bg-[radial-gradient(58%_55%_at_16%_36%,rgba(239,138,36,0.14),transparent_70%),radial-gradient(52%_50%_at_82%_18%,rgba(30,123,176,0.13),transparent_72%)]"
      />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
          {/* ── Copy: minimal on purpose. The rest of the site explains. ── */}
          <div>
            <p className="flex items-center gap-2.5 text-[0.75rem] font-semibold tracking-[0.16em] text-[color:var(--color-sea-700)] uppercase">
              <span
                aria-hidden="true"
                className="h-px w-8 bg-[color:var(--color-sun-500)]"
              />
              Language recruitment · Spain · Portugal · Greece
            </p>

            <h1 className="h-display mt-6 max-w-[15ch] text-[clamp(2.75rem,6.4vw,4.5rem)] text-balance">
              Work in your language,{" "}
              <span className="text-[color:var(--color-sea-600)]">
                on the Mediterranean.
              </span>
            </h1>

            <p className="mt-6 max-w-md text-[1.15rem] leading-relaxed text-pretty text-[color:var(--color-body)]">
              Permanent roles for Dutch, German and Scandinavian speakers.
              Relocation covered.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="/jobs" size="lg">
                See open roles
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="/apply" variant="outline" size="lg">
                <Plane className="h-4 w-4 text-[color:var(--color-sea-600)]" />
                Send an open application
              </Button>
            </div>
          </div>

          {/* ── Photo composition ────────────────────────────────── */}
          <div>
            <div className="grid grid-cols-1 grid-rows-1 gap-3 sm:grid-cols-5 sm:grid-rows-6 sm:gap-4 lg:h-[35rem]">
              <HeroPhoto
                src="/photos/user-greece-cove.jpg"
                alt="A turquoise cove with umbrellas on a white pebble beach in Greece"
                place="Greece"
                note="a ferry from Athens"
                priority
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 55vw, 30vw"
                className="aspect-[4/5] sm:col-span-3 sm:row-span-6 sm:aspect-auto"
              />
              <HeroPhoto
                src="/photos/user-malaga-aerial.jpg"
                alt="Málaga from above, the bullring and the port meeting the Mediterranean"
                place="Spain"
                note="Málaga"
                priority
                sizes="(max-width: 1024px) 40vw, 20vw"
                className="hidden sm:col-span-2 sm:row-span-3 sm:block"
              />
              <HeroPhoto
                src="/photos/lisbon-dusk-city.jpg"
                alt="Lisbon at dusk from above, the castle lit and the Tagus beyond"
                place="Portugal"
                note="Lisbon"
                sizes="(max-width: 1024px) 40vw, 20vw"
                className="hidden sm:col-span-2 sm:row-span-3 sm:block"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function HeroPhoto({
  src,
  alt,
  place,
  note,
  sizes,
  className,
  priority,
}: {
  src: string;
  alt: string;
  place: string;
  note: string;
  sizes: string;
  className: string;
  priority?: boolean;
}) {
  return (
    <figure
      className={`group relative overflow-hidden rounded-[1.25rem] shadow-[var(--shadow-photo)] ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]"
      />
      <figcaption className="absolute inset-x-0 bottom-0 scrim-b p-4 pt-12">
        <span className="text-[0.8125rem] font-semibold tracking-[0.02em] text-white">
          {place}
        </span>
        <span className="ml-2 text-[0.8125rem] text-white/70">{note}</span>
      </figcaption>
    </figure>
  );
}
