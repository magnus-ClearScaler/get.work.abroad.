import { Container, SectionHead, Button } from "@/components/ui";
import { JobCard } from "@/components/JobCard";
import { ArrowRight } from "@/components/Icons";
import { featuredJobs, jobs } from "@/lib/jobs";

export function FeaturedJobs() {
  return (
    <section className="border-y border-[color:var(--color-line)] bg-white py-20 sm:py-28">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHead
            eyebrow="Hiring now"
            title="A few of the roles open this month"
            intro="Every listing states the contract, the working model and exactly what the employer covers to get you there. No vague packages, no bait."
          />
          <Button href="/jobs" variant="outline" className="shrink-0">
            All {jobs.length} jobs
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {featuredJobs.map((job, i) => (
            <JobCard key={job.slug} job={job} priority={i < 2} />
          ))}
        </div>
      </Container>
    </section>
  );
}
