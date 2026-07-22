"use client";

import { useMemo, useState } from "react";
import { JobCard } from "./JobCard";
import { Search, Close } from "./Icons";
import { Button } from "./ui";
import { jobs, jobCategories, jobLanguages } from "@/lib/jobs";
import { destinations } from "@/lib/destinations";

const ANY = "";

export function JobsBrowser({
  initialCategory = ANY,
  initialCountry = ANY,
  initialLanguage = ANY,
}: {
  initialCategory?: string;
  initialCountry?: string;
  initialLanguage?: string;
}) {
  const [q, setQ] = useState("");
  const [language, setLanguage] = useState(initialLanguage);
  const [country, setCountry] = useState(initialCountry);
  const [category, setCategory] = useState(initialCategory);

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return jobs.filter((job) => {
      if (language && job.language !== language) return false;
      if (country && job.country !== country) return false;
      if (category && job.category !== category) return false;
      if (!needle) return true;
      return [job.title, job.city, job.countryName, job.language, job.category, job.summary]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [q, language, country, category]);

  const active = Boolean(q || language || country || category);

  const reset = () => {
    setQ("");
    setLanguage(ANY);
    setCountry(ANY);
    setCategory(ANY);
  };

  return (
    <>
      {/* ── Filter bar ───────────────────────────────────────────── */}
      <div className="sticky top-[4.5rem] z-30 -mx-5 border-b border-[color:var(--color-line)] bg-[color:var(--color-sand-50)]/90 px-5 py-4 backdrop-blur-xl sm:-mx-8 sm:px-8">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <label className="relative flex-1">
            <span className="sr-only">Search jobs</span>
            <Search className="pointer-events-none absolute top-1/2 left-4 h-4.5 w-4.5 -translate-y-1/2 text-[color:var(--color-mute)]" />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by role, city or language"
              className="w-full rounded-full border border-[color:var(--color-line)] bg-white py-3 pr-4 pl-11 text-[0.9375rem] text-[color:var(--color-ink)] placeholder:text-[color:var(--color-mute)] focus:border-[color:var(--color-sea-300)]"
            />
          </label>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:flex lg:shrink-0">
            <Select
              label="Language"
              value={language}
              onChange={setLanguage}
              options={jobLanguages.map((l) => ({ value: l, label: l }))}
              anyLabel="Any language"
            />
            <Select
              label="Country"
              value={country}
              onChange={setCountry}
              options={destinations.map((d) => ({
                value: d.slug,
                label: `${d.flag} ${d.country}`,
              }))}
              anyLabel="Any country"
            />
            <Select
              label="Role type"
              value={category}
              onChange={setCategory}
              options={jobCategories.map((c) => ({ value: c, label: c }))}
              anyLabel="Any role"
            />
          </div>
        </div>

        <div className="mt-3 flex items-center gap-3">
          <p className="text-[0.875rem] text-[color:var(--color-mute)]">
            <span className="font-semibold text-[color:var(--color-ink)]">
              {results.length}
            </span>{" "}
            {results.length === 1 ? "role" : "roles"}
            {active ? " matching" : " open right now"}
          </p>
          {active ? (
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--color-line)] bg-white px-3 py-1 text-[0.8125rem] font-medium text-[color:var(--color-body)] transition-colors hover:text-[color:var(--color-ink)]"
            >
              <Close className="h-3 w-3" />
              Clear filters
            </button>
          ) : null}
        </div>
      </div>

      {/* ── Results ──────────────────────────────────────────────── */}
      {results.length > 0 ? (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {results.map((job, i) => (
            <JobCard key={job.slug} job={job} priority={i < 3} />
          ))}
        </div>
      ) : (
        <div className="mt-12 rounded-2xl border border-dashed border-[color:var(--color-line)] bg-white px-6 py-16 text-center">
          <h2 className="h-section text-[1.5rem]">Nothing matches that yet</h2>
          <p className="mx-auto mt-3 max-w-md text-[0.9375rem] leading-relaxed text-[color:var(--color-body)]">
            Vacancies change weekly. Send us an open application and we will
            come back to you the moment something fits.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/apply">Send an open application</Button>
            <button
              type="button"
              onClick={reset}
              className="text-[0.9375rem] font-semibold text-[color:var(--color-sea-700)] underline underline-offset-4"
            >
              Clear filters
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
  anyLabel,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  anyLabel: string;
}) {
  return (
    <label className="relative block">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full appearance-none rounded-full border py-3 pr-10 pl-4 text-[0.9375rem] transition-colors lg:w-auto ${
          value
            ? "border-[color:var(--color-sea-300)] bg-[color:var(--color-sea-50)] font-medium text-[color:var(--color-sea-700)]"
            : "border-[color:var(--color-line)] bg-white text-[color:var(--color-body)]"
        }`}
      >
        <option value="">{anyLabel}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-[color:var(--color-mute)]"
        fill="none"
      >
        <path
          d="m6 9 6 6 6-6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </label>
  );
}
