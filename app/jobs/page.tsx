import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { PageHeader } from "@/components/PageHeader";
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
      <PageHeader
        eyebrow={`${jobs.length} roles open`}
        title="Open jobs"
        intro="Permanent roles for native language speakers in Spain, Portugal and Greece. Each listing states the contract, the working model and exactly what the employer covers to get you there. We confirm the salary with you on the first call."
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
