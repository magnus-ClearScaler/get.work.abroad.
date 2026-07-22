import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Button, Chip } from "@/components/ui";
import { PhotoHeader, Breadcrumb } from "@/components/PageHeader";
import { JobCard } from "@/components/JobCard";
import { ArrowRight, Check, Euro, Pin, Plane, Shield, Translate, Whatsapp } from "@/components/Icons";
import { jobs, jobBySlug } from "@/lib/jobs";
import { site } from "@/lib/site";

/*
 * Note: no JobPosting structured data on this page on purpose. The listings in
 * lib/jobs.ts are placeholders, and marking them up would push them into Google
 * for Jobs as if they were live vacancies. Add the schema once the array holds
 * real, confirmed roles.
 */

export function generateStaticParams() {
  return jobs.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata(
  props: PageProps<"/jobs/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const job = jobBySlug(slug);
  if (!job) return { title: "Job not found" };
  return {
    title: `${job.title} · ${job.city}`,
    description: job.summary,
    openGraph: {
      title: `${job.title} · ${job.city}, ${job.countryName}`,
      description: job.summary,
      images: [{ url: job.photo }],
    },
  };
}

export default async function JobPage(props: PageProps<"/jobs/[slug]">) {
  const { slug } = await props.params;
  const job = jobBySlug(slug);
  if (!job) notFound();

  const related = jobs
    .filter((j) => j.slug !== job.slug)
    .sort((a, b) => {
      const score = (j: typeof a) =>
        (j.language === job.language ? 2 : 0) + (j.country === job.country ? 1 : 0);
      return score(b) - score(a);
    })
    .slice(0, 3);

  const meta = [
    { Icon: Pin, label: "Location", value: `${job.city}, ${job.countryName}` },
    { Icon: Translate, label: "Language", value: job.language },
    { Icon: Shield, label: "You would work for", value: job.employer },
    { Icon: Plane, label: "Contract", value: `${job.contract} · ${job.model}` },
    { Icon: Euro, label: "Package", value: job.packageHighlight },
  ];

  return (
    <>
      <PhotoHeader
        photo={job.photo}
        alt={job.alt}
        eyebrow={`${job.flag} ${job.city}, ${job.countryName}`}
        title={job.title}
      >
        <div className="mt-6 flex flex-wrap gap-2">
          <Chip tone="glass">{job.category}</Chip>
          <Chip tone="glass">{job.contract}</Chip>
          <Chip tone="glass">{job.model}</Chip>
          <Chip tone="glass">{job.start}</Chip>
        </div>
      </PhotoHeader>

      <Container className="py-12 sm:py-16">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Open jobs", href: "/jobs" },
            { label: job.title },
          ]}
        />

        <div className="grid gap-12 lg:grid-cols-[1.35fr_0.65fr] lg:gap-16">
          {/* ── Detail ─────────────────────────────────────────── */}
          <article>
            <p className="text-[1.15rem] leading-relaxed text-pretty text-[color:var(--color-ink)]">
              {job.summary}
            </p>

            <Block title="What you will be doing">
              <ul className="space-y-3">
                {job.responsibilities.map((r) => (
                  <Bullet key={r}>{r}</Bullet>
                ))}
              </ul>
            </Block>

            <Block title="What you need">
              <ul className="space-y-3">
                {job.requirements.map((r) => (
                  <Bullet key={r}>{r}</Bullet>
                ))}
              </ul>
            </Block>

            <Block title="What the employer covers">
              <ul className="grid gap-3 sm:grid-cols-2">
                {job.package.map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-3 rounded-xl border border-[color:var(--color-line)] bg-white p-4"
                  >
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[color:var(--color-sea-50)] text-[color:var(--color-sea-600)]">
                      <Check className="h-3 w-3" />
                    </span>
                    <span className="text-[0.9375rem] leading-snug text-[color:var(--color-body)]">
                      {p}
                    </span>
                  </li>
                ))}
              </ul>
            </Block>

            <div className="mt-12 rounded-2xl border border-[color:var(--color-line)] bg-[color:var(--color-sand-100)] p-6 sm:p-8">
              <h2 className="h-section text-[1.35rem]">
                Not quite the right one?
              </h2>
              <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-[color:var(--color-body)]">
                Send an open application. We will match you against everything
                on our desk, including the roles that never make it to the site.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button href="/apply" variant="outline">
                  Open application
                </Button>
                <Button
                  href={`/destinations/${job.country}`}
                  variant="outline"
                >
                  Living in {job.countryName}
                </Button>
              </div>
            </div>
          </article>

          {/* ── Apply card ─────────────────────────────────────── */}
          <aside>
            <div className="lg:sticky lg:top-28">
              <div className="overflow-hidden rounded-2xl border border-[color:var(--color-line)] bg-white shadow-[var(--shadow-card)]">
                <div className="border-b border-[color:var(--color-line-soft)] bg-[color:var(--color-sea-950)] p-6">
                  <p className="text-[0.6875rem] font-semibold tracking-[0.16em] text-[color:var(--color-sun-400)] uppercase">
                    Apply for this role
                  </p>
                  <p className="mt-2 font-[family-name:var(--font-display)] text-[1.25rem] leading-tight font-semibold tracking-[-0.02em] text-white">
                    {job.title}
                  </p>
                </div>

                <dl className="divide-y divide-[color:var(--color-line-soft)]">
                  {meta.map(({ Icon, label, value }) => (
                    <div key={label} className="flex gap-3.5 px-6 py-4">
                      <Icon className="mt-0.5 h-4.5 w-4.5 shrink-0 text-[color:var(--color-sea-500)]" />
                      <div>
                        <dt className="text-[0.75rem] font-medium tracking-wide text-[color:var(--color-mute)] uppercase">
                          {label}
                        </dt>
                        <dd className="mt-0.5 text-[0.9375rem] font-medium text-[color:var(--color-ink)]">
                          {value}
                        </dd>
                      </div>
                    </div>
                  ))}
                </dl>

                <div className="space-y-3 p-6 pt-5">
                  <Button
                    href={`/apply?role=${encodeURIComponent(job.title)}`}
                    className="w-full"
                    size="lg"
                  >
                    Apply now
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button
                    href={site.whatsappLink}
                    external
                    variant="outline"
                    className="w-full"
                  >
                    <Whatsapp className="h-4 w-4 text-[#25D366]" />
                    Ask about this role
                  </Button>
                  <p className="pt-1 text-center text-[0.8125rem] text-[color:var(--color-mute)]">
                    Free for candidates. Always.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </Container>

      {/* ── Related ─────────────────────────────────────────────── */}
      <section className="border-t border-[color:var(--color-line)] bg-white py-16 sm:py-20">
        <Container>
          <div className="flex items-end justify-between gap-6">
            <h2 className="h-section text-[clamp(1.5rem,3.4vw,2.1rem)]">
              Similar roles
            </h2>
            <Link
              href="/jobs"
              className="inline-flex shrink-0 items-center gap-1.5 text-[0.9375rem] font-semibold text-[color:var(--color-sea-700)]"
            >
              All jobs
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {related.map((j) => (
              <JobCard key={j.slug} job={j} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-11">
      <h2 className="h-section text-[1.35rem] sm:text-[1.55rem]">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span
        aria-hidden="true"
        className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--color-sun-400)]"
      />
      <span className="text-[0.9875rem] leading-relaxed text-pretty text-[color:var(--color-body)]">
        {children}
      </span>
    </li>
  );
}
