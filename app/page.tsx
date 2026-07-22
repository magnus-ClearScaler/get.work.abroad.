import { Hero } from "@/components/home/Hero";
import { LanguageBand } from "@/components/home/LanguageBand";
import { FeaturedJobs } from "@/components/home/FeaturedJobs";
import { Package } from "@/components/home/Package";
import { Destinations } from "@/components/home/Destinations";
import { Process } from "@/components/home/Process";
import { EmployerBand } from "@/components/home/EmployerBand";
import { HomeFaq } from "@/components/home/HomeFaq";
import { FinalCta } from "@/components/home/FinalCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <LanguageBand />
      <FeaturedJobs />
      <Package />
      <Destinations />
      <Process />
      <EmployerBand />
      <HomeFaq />
      <FinalCta />
    </>
  );
}
