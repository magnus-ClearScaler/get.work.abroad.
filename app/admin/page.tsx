"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  supabase,
  CANDIDATE_STATUSES,
  STATUS_TONE,
  sinceLabel,
  type Candidate,
} from "@/lib/supabase";
import { languages } from "@/lib/site";

/** Every CV that has come in, newest first. */
export default function CandidatesPage() {
  const [rows, setRows] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [language, setLanguage] = useState("");

  useEffect(() => {
    supabase
      .from("candidates")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) setError(error.message);
        else setRows((data ?? []) as Candidate[]);
        setLoading(false);
      });
  }, []);

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return rows.filter((c) => {
      if (status && c.status !== status) return false;
      if (language && c.language !== language) return false;
      if (!needle) return true;
      return [c.name, c.email, c.phone, c.role_interest, c.preferred_country]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [rows, q, status, language]);

  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const c of rows) map[c.status] = (map[c.status] ?? 0) + 1;
    return map;
  }, [rows]);

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="h-section text-[1.75rem]">Candidates</h1>
          <p className="mt-1.5 text-[0.9375rem] text-[color:var(--color-body)]">
            {rows.length} in total
            {CANDIDATE_STATUSES.filter((s) => counts[s]).length ? " · " : ""}
            {CANDIDATE_STATUSES.filter((s) => counts[s])
              .map((s) => `${counts[s]} ${s}`)
              .join(", ")}
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search name, email, phone or role"
          className="flex-1 rounded-full border border-[color:var(--color-line)] bg-white px-5 py-3 text-[0.9375rem] focus:border-[color:var(--color-sea-300)]"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-full border border-[color:var(--color-line)] bg-white px-4 py-3 text-[0.9375rem]"
        >
          <option value="">Any status</option>
          {CANDIDATE_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="rounded-full border border-[color:var(--color-line)] bg-white px-4 py-3 text-[0.9375rem]"
        >
          <option value="">Any language</option>
          {languages.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
          <option value="Other">Other</option>
        </select>
      </div>

      {error ? (
        <p role="alert" className="mt-8 text-[0.9375rem] text-[color:var(--color-terra-600)]">
          {error}
        </p>
      ) : loading ? (
        <p className="mt-8 text-[0.9375rem] text-[color:var(--color-mute)]">Loading…</p>
      ) : results.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-[color:var(--color-line)] bg-white px-6 py-16 text-center">
          <h2 className="h-section text-[1.25rem]">
            {rows.length === 0 ? "No applications yet" : "Nothing matches that"}
          </h2>
          <p className="mx-auto mt-2 max-w-md text-[0.9375rem] text-[color:var(--color-body)]">
            {rows.length === 0
              ? "Applications sent through the site land here the moment they are submitted."
              : "Try a wider filter."}
          </p>
        </div>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-2xl border border-[color:var(--color-line)] bg-white">
          <table className="w-full min-w-[52rem] text-left">
            <thead className="border-b border-[color:var(--color-line)] text-[0.75rem] tracking-wide text-[color:var(--color-mute)] uppercase">
              <tr>
                <th className="px-5 py-3.5 font-medium">Name</th>
                <th className="px-5 py-3.5 font-medium">Language</th>
                <th className="px-5 py-3.5 font-medium">Wants</th>
                <th className="px-5 py-3.5 font-medium">CV</th>
                <th className="px-5 py-3.5 font-medium">Status</th>
                <th className="px-5 py-3.5 font-medium">Applied</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[color:var(--color-line-soft)]">
              {results.map((c) => (
                <tr key={c.id} className="hover:bg-[color:var(--color-sand-50)]">
                  <td className="px-5 py-4">
                    <Link
                      href={`/admin/candidates/${c.id}`}
                      className="font-semibold text-[color:var(--color-ink)] hover:text-[color:var(--color-sea-700)]"
                    >
                      {c.name}
                    </Link>
                    <div className="text-[0.8125rem] text-[color:var(--color-mute)]">
                      {c.email}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-[0.9375rem]">{c.language}</td>
                  <td className="px-5 py-4 text-[0.9375rem] text-[color:var(--color-body)]">
                    {[c.preferred_country, c.role_type].filter(Boolean).join(" · ") ||
                      "Open to any"}
                  </td>
                  <td className="px-5 py-4 text-[0.9375rem]">
                    {c.cv_path ? (
                      <span className="text-[color:var(--color-olive-600)]">Yes</span>
                    ) : (
                      <span className="text-[color:var(--color-mute)]">—</span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-block rounded-full px-2.5 py-1 text-[0.75rem] font-semibold ${STATUS_TONE[c.status]}`}
                    >
                      {c.status}
                    </span>
                    {c.network_opt_out ? (
                      <span
                        title="Asked us not to send their CV to partner agencies"
                        className="ml-1.5 inline-block rounded-full bg-[color:var(--color-terra-100)] px-2 py-1 text-[0.6875rem] font-semibold text-[color:var(--color-terra-600)]"
                      >
                        no network
                      </span>
                    ) : null}
                  </td>
                  <td className="px-5 py-4 text-[0.875rem] text-[color:var(--color-mute)]">
                    {sinceLabel(c.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
