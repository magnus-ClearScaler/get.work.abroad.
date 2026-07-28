import { Container, Button } from "@/components/ui";
import { ArrowRight, Plane } from "@/components/Icons";
import { HeroVideo } from "./HeroVideo";

export function Hero() {
  return (
    /* -mt-[4.5rem] pulls the section up under the sticky header, which goes
       transparent on this route, so the footage runs edge to edge from the top
       of the viewport. The header still paints over it at z-50. */
    <section className="relative -mt-[4.5rem] flex h-[100svh] min-h-[600px] items-center justify-center overflow-hidden bg-[color:var(--color-sea-950)]">
      {/* Background video, poster-first */}
      <HeroVideo />

      {/* Scrim: keeps the centred type legible over bright water while letting
          the colour of the footage still read through. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_45%,rgba(6,32,43,0.48),rgba(6,32,43,0.7)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[color:var(--color-sea-950)]/55 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[color:var(--color-sea-950)]/70 to-transparent"
      />

      {/* Centred content */}
      {/* Extra top padding equal to the header height keeps the block optically
          centred in the space below the header rather than the whole viewport. */}
      <Container className="relative z-10 flex flex-col items-center pt-[10.5rem] pb-24 text-center">
        <h1 className="h-display max-w-[20ch] text-[clamp(2.25rem,5vw,3.75rem)] text-balance text-white [text-shadow:0_2px_30px_rgba(6,32,43,0.55)]">
          Live on the Mediterranean.{" "}
          <span className="text-[color:var(--color-sun-300)]">
            Get paid to speak your own language.
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-[1.0625rem] leading-relaxed text-pretty text-white [text-shadow:0_1px_16px_rgba(6,32,43,0.6)]">
          Permanent roles for Dutch, German and Scandinavian speakers, with a
          relocation package and help with the paperwork. You bring the
          language. The coast, the people, and the version of you that comes
          back come with it.
        </p>

        <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
          <Button href="/jobs" variant="sun" size="lg">
            See open roles
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button href="/apply" variant="ghostLight" size="lg">
            <Plane className="h-4 w-4" />
            Send an open application
          </Button>
        </div>
      </Container>
    </section>
  );
}
