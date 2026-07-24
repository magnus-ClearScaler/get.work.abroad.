import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { PhotoHeader } from "@/components/PageHeader";
import { JobsBrowser } from "@/components/JobsBrowser";
import { FinalCta } from "@/components/home/FinalCta";
import { jobs } from "@/lib/jobs";

export const metadata: Metadata = {
  title: "Open jobs in Spain, Portugal & Greece",
  description:
    "Every language role we are currently hiring for on the Mediterranean. Salary, contract and relocation package listed on each one.",
};

export default async function JobsPage(props: PageProps<"/jobs">) {
  const sp = await props.searchParams;
  const first = (v: string | string[] | undefined) =>
    Array.isArray(v) ? v[0] : (v ?? "");

  return (
    <>
      <PhotoHeader
        photo="/photos/porto-ribeira.jpg"
        alt="The painted houses of the Ribeira waterfront in Porto, rabelo boats moored on the Douro below"
        eyebrow={`${jobs.length} live roles · hiring now`}
        title="Open jobs"
        intro="These are live needs, not a job board. Employers are hiring for them now, intakes run every couple of weeks, and most starts are within a month. If you can move soon, this is the fast route in. Each listing states the contract, the working model and exactly what the employer covers to get you there."
      />

      <Container className="pt-8 pb-20 sm:pb-28">
        <JobsBrowser
          initialCategory={first(sp.category)}
          initialCountry={first(sp.country)}
          initialLanguage={first(sp.language)}
        />
      </Container>

      <FinalCta />
    </>
  );
}
