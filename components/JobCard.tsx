import Image from "next/image";
import Link from "next/link";
import type { Job } from "@/lib/jobs";
import { ArrowUpRight, Pin, Translate } from "./Icons";

export function JobCard({ job, priority }: { job: Job; priority?: boolean }) {
  return (
    <Link
      href={`/jobs/${job.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[color:var(--color-line)] bg-white shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:border-[color:var(--color-sea-200)] hover:shadow-[var(--shadow-lift)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={job.photo}
          alt={job.alt}
          fill
          priority={priority}
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 scrim-b opacity-70" />
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[0.75rem] font-semibold text-[color:var(--color-ink)] backdrop-blur-sm">
            <span aria-hidden="true">{job.flag}</span>
            {job.city}
          </span>
          <span className="rounded-full bg-[color:var(--color-sea-950)]/70 px-2.5 py-1 text-[0.75rem] font-medium text-white backdrop-blur-sm">
            {job.model}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--color-sea-100)] bg-[color:var(--color-sea-50)] px-2.5 py-1 text-[0.75rem] font-semibold text-[color:var(--color-sea-700)]">
            <Translate className="h-3.5 w-3.5" />
            {job.language}
          </span>
          <span className="text-[0.75rem] font-medium text-[color:var(--color-mute)]">
            {job.category}
          </span>
          {job.openings ? (
            <span className="ml-auto rounded-full border border-[color:var(--color-sun-200)] bg-[color:var(--color-sun-100)] px-2 py-0.5 text-[0.6875rem] font-semibold whitespace-nowrap text-[color:var(--color-sun-600)]">
              Several seats
            </span>
          ) : null}
        </div>

        <h3 className="mt-3 font-[family-name:var(--font-display)] text-[1.2rem] leading-tight font-semibold tracking-[-0.02em] text-balance text-[color:var(--color-ink)]">
          {job.title}
        </h3>

        <p className="mt-2.5 line-clamp-2 text-[0.9rem] leading-relaxed text-[color:var(--color-body)]">
          {job.summary}
        </p>

        <div className="mt-auto pt-5">
          <div className="flex items-center justify-between gap-3 border-t border-[color:var(--color-line-soft)] pt-4">
            <div className="min-w-0">
              <p className="text-[0.8125rem] leading-snug font-semibold text-balance text-[color:var(--color-ink)]">
                {job.packageHighlight}
              </p>
              <p className="mt-1 flex items-center gap-1 text-[0.75rem] text-[color:var(--color-mute)]">
                <Pin className="h-3.5 w-3.5 shrink-0" />
                {job.contract} · {job.start}
              </p>
            </div>
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[color:var(--color-sand-100)] text-[color:var(--color-sea-700)] transition-colors group-hover:bg-[color:var(--color-sea-700)] group-hover:text-white">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
