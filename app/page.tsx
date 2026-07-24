import { Hero } from "@/components/home/Hero";
import { LanguageBand } from "@/components/home/LanguageBand";
import { FeaturedJobs } from "@/components/home/FeaturedJobs";
import { Package } from "@/components/home/Package";
import { Destinations } from "@/components/home/Destinations";
import { TheLife } from "@/components/home/TheLife";
import { CountryNotes } from "@/components/home/CountryNotes";
import { Process } from "@/components/home/Process";
import { EmployerBand } from "@/components/home/EmployerBand";
import { HomeFaq } from "@/components/home/HomeFaq";
import { FinalCta } from "@/components/home/FinalCta";
import { FaqSchema } from "@/components/StructuredData";
import { Reveal } from "@/components/Reveal";

/*
 * Order carries the argument. The hero already points at open roles twice, so
 * the page opens on the easier, more emotional decision — which country — then
 * builds: where you could be, what it costs you (nothing), who you become, the
 * roles themselves, how it works, and finally the ask. The hero stays outside
 * Reveal so nothing above the fold is ever held at opacity 0.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <FaqSchema />
      <Reveal>
        <Destinations />
      </Reveal>
      <LanguageBand />
      <Reveal>
        <Package />
      </Reveal>
      <Reveal>
        <TheLife />
      </Reveal>
      <Reveal>
        <FeaturedJobs />
      </Reveal>
      <Reveal>
        <CountryNotes />
      </Reveal>
      <Reveal>
        <Process />
      </Reveal>
      <Reveal>
        <EmployerBand />
      </Reveal>
      <Reveal>
        <HomeFaq />
      </Reveal>
      <Reveal>
        <FinalCta />
      </Reveal>
    </>
  );
}
