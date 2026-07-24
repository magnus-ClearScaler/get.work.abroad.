import { Hero } from "@/components/home/Hero";
import { LanguageBand } from "@/components/home/LanguageBand";
import { FeaturedJobs } from "@/components/home/FeaturedJobs";
import { Package } from "@/components/home/Package";
import { Destinations } from "@/components/home/Destinations";
import { CountryNotes } from "@/components/home/CountryNotes";
import { Process } from "@/components/home/Process";
import { EmployerBand } from "@/components/home/EmployerBand";
import { HomeFaq } from "@/components/home/HomeFaq";
import { FinalCta } from "@/components/home/FinalCta";

/*
 * Order matters here. The hero already says "see open roles" twice, so the
 * page does not need a wall of job cards straight after it — on a phone that
 * was four full-height cards before anything else. Picking a country is the
 * easier first decision and the one that sells the move, so Destinations comes
 * first and the roles sit further down, once the package has been made.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Destinations />
      <LanguageBand />
      <Package />
      <FeaturedJobs />
      <CountryNotes />
      <Process />
      <EmployerBand />
      <HomeFaq />
      <FinalCta />
    </>
  );
}
