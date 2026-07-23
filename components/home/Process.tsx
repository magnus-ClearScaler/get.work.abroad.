import Image from "next/image";
import { Container, SectionHead } from "@/components/ui";

const steps = [
  {
    n: "01",
    title: "Send us your CV",
    body: "Two minutes, one file. No account to create and no forms that ask for your life story.",
    photo: "/photos/lisbon-tram.jpg",
    alt: "A yellow tram on a sunlit street in Lisbon",
  },
  {
    n: "02",
    title: "Talk to a real recruiter",
    body: "A fifteen-minute call to work out which country, which city and which role actually suits you.",
    photo: "/photos/porto-waterfront.jpg",
    alt: "The colourful Ribeira waterfront in Porto",
  },
  {
    n: "03",
    title: "We introduce you directly",
    body: "Your profile goes straight to the hiring team, and we prepare you properly for the interview.",
    photo: "/photos/greece-mykonos.jpg",
    alt: "Whitewashed houses above turquoise water in Mykonos",
  },
  {
    n: "04",
    title: "You land",
    body: "Offer, contract, flight, keys. We stay reachable until you are through your first week at work.",
    photo: "/photos/user-alicante-explanada.jpg",
    alt: "Palms and the Explanada promenade in Alicante under a Spanish flag",
  },
];

export function Process() {
  return (
    <section className="bg-[color:var(--color-sand-100)] py-20 sm:py-28">
      <Container>
        <SectionHead
          eyebrow="How it works"
          title="From your CV to your first day, in four steps"
          intro="We are paid by the employer when you are hired, which is the only reason this is free for you. It also means we have no interest in sending you somewhere you will leave in three months."
          align="center"
        />

        <ol className="mt-14 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {steps.map((s) => (
            <li
              key={s.n}
              className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-[1.35rem] shadow-[var(--shadow-card)] transition-transform duration-300 hover:-translate-y-1.5 lg:aspect-[3/4]"
            >
              <Image
                src={s.photo}
                alt={s.alt}
                fill
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 23vw"
                className="object-cover transition-transform duration-[900ms] group-hover:scale-[1.06]"
              />
              <div className="scrim-full absolute inset-0" />

              <span
                aria-hidden="true"
                className="absolute top-5 right-6 z-10 font-[family-name:var(--font-display)] text-[3.25rem] leading-none font-bold tracking-[-0.04em] text-white/25"
              >
                {s.n}
              </span>

              <div className="relative z-10 p-6">
                <h3 className="font-[family-name:var(--font-display)] text-[1.3rem] leading-tight font-semibold tracking-[-0.02em] text-white">
                  {s.title}
                </h3>
                <p className="mt-2.5 text-[0.9rem] leading-relaxed text-pretty text-white/80">
                  {s.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
