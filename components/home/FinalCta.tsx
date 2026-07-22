import Image from "next/image";
import { Container, Button } from "@/components/ui";
import { ArrowRight, Whatsapp } from "@/components/Icons";
import { site } from "@/lib/site";

export function FinalCta() {
  return (
    <section className="pb-20 sm:pb-28">
      <Container>
        <div className="relative overflow-hidden rounded-[1.75rem] px-6 py-16 text-center sm:px-12 sm:py-24">
          <Image
            src="/photos/user-greece-cove.jpg"
            alt=""
            aria-hidden="true"
            fill
            sizes="(max-width: 1400px) 100vw, 84rem"
            className="object-cover"
          />
          <div className="scrim-center absolute inset-0" />

          <h2 className="h-section relative z-10 mx-auto max-w-3xl text-[clamp(2rem,5vw,3.4rem)] text-balance text-white">
            The role is not the hard part. Deciding to go is.
          </h2>
          <p className="relative z-10 mx-auto mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-pretty text-white/85">
            Send your CV and we will come back to you with the roles that
            actually match, in the countries you actually want.
          </p>

          <div className="relative z-10 mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/apply" variant="sun" size="lg">
              Send your CV
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              href={site.whatsappLink}
              external
              variant="ghostLight"
              size="lg"
            >
              <Whatsapp className="h-4 w-4" />
              Ask us anything
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
