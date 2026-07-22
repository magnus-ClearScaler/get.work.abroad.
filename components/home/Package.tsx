import Image from "next/image";
import { Container, SectionHead, Button } from "@/components/ui";
import { ArrowRight, Euro, Keys, Plane, Shield, Sun, Translate } from "@/components/Icons";

const included = [
  {
    Icon: Plane,
    title: "Your flight, paid",
    body: "Booked for you or reimbursed once you arrive. Getting there should not cost you anything.",
  },
  {
    Icon: Keys,
    title: "Somewhere to land",
    body: "Two to four weeks of accommodation on arrival, and genuine help finding a flat after that.",
  },
  {
    Icon: Shield,
    title: "A permanent local contract",
    body: "A Spanish, Portuguese or Greek contract from day one, with social security, private health cover and paid holiday.",
  },
  {
    Icon: Euro,
    title: "Training on full pay",
    body: "Three to four weeks of paid training before you take your first customer. No experience needed.",
  },
  {
    Icon: Translate,
    title: "Language classes",
    body: "Most employers pay for Spanish, Portuguese or Greek lessons once you are settled in.",
  },
  {
    Icon: Sun,
    title: "The paperwork handled",
    body: "NIE, NIF or AFM numbers, social security registration, bank account. Someone books the appointments with you.",
  },
];

export function Package() {
  return (
    <section className="bg-[color:var(--color-sand-100)] py-20 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] shadow-[var(--shadow-photo)] lg:sticky lg:top-28">
              <Image
                src="/photos/greece-taverna-alley.jpg"
                alt="Bougainvillea hanging over a taverna terrace in a whitewashed Greek alley"
                fill
                sizes="(max-width: 1024px) 92vw, 38vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 scrim-b p-6 pt-20">
                <p className="font-[family-name:var(--font-display)] text-[1.35rem] leading-snug font-semibold tracking-[-0.02em] text-white">
                  The job pays the bills.
                  <br />
                  The place is the reason.
                </p>
              </div>
            </div>
          </div>

          <div>
            <SectionHead
              eyebrow="What is actually included"
              title="You should not have to fund your own move."
              intro="These roles exist because employers in Spain, Portugal and Greece need native speakers they cannot find locally. That is why the relocation package looks the way it does, and why none of it comes out of your pocket."
            />

            <ul className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {included.map(({ Icon, title, body }) => (
                <li key={title}>
                  <span className="inline-grid h-11 w-11 place-items-center rounded-xl bg-white text-[color:var(--color-sea-600)] shadow-[var(--shadow-soft)]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-[family-name:var(--font-display)] text-[1.0625rem] font-semibold tracking-[-0.015em] text-[color:var(--color-ink)]">
                    {title}
                  </h3>
                  <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-pretty text-[color:var(--color-body)]">
                    {body}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button href="/jobs">
                Browse the roles
                <ArrowRight className="h-4 w-4" />
              </Button>
              <p className="text-[0.875rem] text-[color:var(--color-mute)]">
                Packages vary by employer. Every listing spells out its own.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
