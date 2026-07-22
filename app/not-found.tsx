import Image from "next/image";
import { Container, Button } from "@/components/ui";
import { ArrowRight } from "@/components/Icons";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden">
      <Image
        src="/photos/greece-milos-cove.jpg"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="scrim-full absolute inset-0" />
      <Container className="relative z-10 py-24 text-center">
        <p className="eyebrow text-[color:var(--color-sun-400)]">404</p>
        <h1 className="h-display mx-auto mt-4 max-w-2xl text-[clamp(2.2rem,6vw,3.8rem)] text-balance text-white">
          This one has already been filled
        </h1>
        <p className="mx-auto mt-5 max-w-md text-[1.0625rem] leading-relaxed text-white/85">
          The page you were after is not here. The jobs still are.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/jobs" variant="sun" size="lg">
            See open jobs
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button href="/" variant="ghostLight" size="lg">
            Back home
          </Button>
        </div>
      </Container>
    </section>
  );
}
