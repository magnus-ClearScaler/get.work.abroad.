"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  supabase,
  CANDIDATE_STATUSES,
  STATUS_TONE,
  STATUS_LABEL,
  AVAILABILITY_LABEL,
  COMMITMENT_LABEL,
  ENGLISH_LABEL,
  readiness,
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
  const [statusFilter, setStatusFilter] = useState("");
  /* EU passport is the first filter that matters — without one we cannot
     place them — so the list opens on the pool that is actually workable. */
  const [pool, setPool] = useState<"eu" | "non_eu" | "all">("eu");
  const [language, setLanguage] = useState("");
  /* The whole point: surface who is placeable now. Defaults to everyone,
     but one click narrows to the leads worth walking to TopJobs today. */
  const [readyOnly, setReadyOnly] = useState(false);

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
      if (pool === "eu" && c.eu_passport !== true) return false;
      if (pool === "non_eu" && c.eu_passport === true) return false;
      if (statusFilter && c.status !== statusFilter) return false;
      if (language && c.language !== language) return false;
      if (readyOnly && readiness(c).tier !== "ready") return false;
      if (!needle) return true;
      return [c.name, c.email, c.phone, c.role_interest, c.preferred_country]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [rows, q, statusFilter, language, pool, readyOnly]);

  /* Optimistic: the row flips immediately and the write follows. A failure
     puts it back rather than leaving the screen lying about the database. */
  async function setStatus(c: Candidate, status: string) {
    const previous = c.status;
    setRows((rs) =>
      rs.map((r) =>
        r.id === c.id ? { ...r, status: status as Candidate["status"] } : r,
      ),
    );
    const { error } = await supabase
      .from("candidates")
      .update({ status })
      .eq("id", c.id);
    if (error) {
      setError(error.message);
      setRows((rs) =>
        rs.map((r) => (r.id === c.id ? { ...r, status: previous } : r)),
      );
    }
  }

  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const c of rows) map[c.status] = (map[c.status] ?? 0) + 1;
    return map;
  }, [rows]);

  const pools = useMemo(() => {
    const eu = rows.filter((c) => c.eu_passport === true).length;
    return { eu, non_eu: rows.length - eu, all: rows.length };
  }, [rows]);

  const readyCount = useMemo(
    () => rows.filter((c) => readiness(c).tier === "ready").length,
    [rows],
  );

  /* Same email applied more than once. Flagged rather than blocked: a real
     person re-applying is fine, we just want to see it. */
  const dupEmails = useMemo(() => {
    const seen = new Map<string, number>();
    for (const c of rows) {
      const e = c.email.trim().toLowerCase();
      seen.set(e, (seen.get(e) ?? 0) + 1);
    }
    return new Set([...seen].filter(([, n]) => n > 1).map(([e]) => e));
  }, [rows]);

  /* Download the current view as a spreadsheet, for a backup or a batch
     handoff. Respects the filters that are on, so "Ready to go" plus a
     language gives you exactly that list. */
  function exportCsv() {
    type Col = [string, keyof Candidate | ((c: Candidate) => string)];
    const cols: Col[] = [
      ["Name", "name"],
      ["Email", "email"],
      ["Phone", "phone"],
      ["Language", "language"],
      ["EU passport", (c) => (c.eu_passport === null ? "" : c.eu_passport ? "Yes" : "No")],
      ["Can move", (c) => (c.availability ? AVAILABILITY_LABEL[c.availability] : "")],
      ["How set", (c) => (c.commitment ? COMMITMENT_LABEL[c.commitment] : "")],
      ["English", (c) => (c.english_level ? ENGLISH_LABEL[c.english_level] : "")],
      ["Lived abroad", (c) => (c.relocated_before === null ? "" : c.relocated_before ? "Yes" : "No")],
      ["Readiness", (c) => readiness(c).label],
      ["Preferred country", "preferred_country"],
      ["Role type", "role_type"],
      ["Role of interest", "role_interest"],
      ["Status", (c) => STATUS_LABEL[c.status]],
      ["CV", (c) => c.cv_filename ?? ""],
      ["Applied", (c) => new Date(c.created_at).toISOString().slice(0, 10)],
    ];
    const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const rowsCsv = results.map((c) =>
      cols.map(([, k]) => esc(typeof k === "function" ? k(c) : c[k])).join(","),
    );
    const csv = [cols.map((col) => col[0]).join(","), ...rowsCsv].join("\r\n");
    const url = URL.createObjectURL(new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `candidates-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="h-section text-[1.75rem]">Candidates</h1>
        <button
          type="button"
          onClick={exportCsv}
          disabled={results.length === 0}
          className="rounded-full border border-[color:var(--color-line)] bg-white px-4 py-2 text-[0.8125rem] font-semibold text-[color:var(--color-ink)] transition-colors hover:border-[color:var(--color-sea-300)] disabled:opacity-50"
        >
          Export CSV ({results.length})
        </button>
      </div>

      {/* At a glance. Placed and Ready are the two numbers that matter most. */}
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Tile label="Total" value={rows.length} />
        <Tile label="Ready to go" value={readyCount} tone="olive" />
        <Tile label="Sent to TopJobs" value={counts.sent_to_topjobs ?? 0} tone="sea" />
        <Tile label="Placed" value={counts.placed ?? 0} tone="olive" />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        {([
          ["eu", `EU passport · ${pools.eu}`],
          ["non_eu", `Non-EU · ${pools.non_eu}`],
          ["all", `Everyone · ${pools.all}`],
        ] as const).map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => setPool(value)}
            aria-pressed={pool === value}
            className={`rounded-full px-4 py-2 text-[0.875rem] font-semibold transition-colors ${
              pool === value
                ? "bg-[color:var(--color-sea-700)] text-white"
                : "border border-[color:var(--color-line)] bg-white text-[color:var(--color-body)] hover:border-[color:var(--color-sea-300)]"
            }`}
          >
            {label}
          </button>
        ))}

        <span className="mx-1 hidden h-6 w-px bg-[color:var(--color-line)] sm:block" />

        {/* The placeable-today filter. Green because it is the money view. */}
        <button
          type="button"
          onClick={() => setReadyOnly((v) => !v)}
          aria-pressed={readyOnly}
          className={`rounded-full px-4 py-2 text-[0.875rem] font-semibold transition-colors ${
            readyOnly
              ? "bg-[color:var(--color-olive-500)] text-white"
              : "border border-[color:var(--color-olive-500)]/40 bg-[color:var(--color-olive-100)] text-[color:var(--color-olive-600)] hover:border-[color:var(--color-olive-500)]"
          }`}
        >
          ● Ready to go · {readyCount}
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search name, email, phone or role"
          className="flex-1 rounded-full border border-[color:var(--color-line)] bg-white px-5 py-3 text-[0.9375rem] focus:border-[color:var(--color-sea-300)]"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-full border border-[color:var(--color-line)] bg-white px-4 py-3 text-[0.9375rem]"
        >
          <option value="">Any status</option>
          {CANDIDATE_STATUSES.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABEL[s]}
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
                <th className="px-5 py-3.5 font-medium">Readiness</th>
                <th className="px-5 py-3.5 font-medium">Language</th>
                <th className="px-5 py-3.5 font-medium">Can move</th>
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
                    <div className="mt-1 flex flex-wrap gap-1">
                      {c.eu_passport === false ? (
                        <span className="inline-block rounded-full bg-[color:var(--color-terra-100)] px-2 py-0.5 text-[0.6875rem] font-semibold text-[color:var(--color-terra-600)]">
                          No EU passport
                        </span>
                      ) : null}
                      {dupEmails.has(c.email.trim().toLowerCase()) ? (
                        <span
                          title="This email applied more than once"
                          className="inline-block rounded-full bg-[color:var(--color-sun-100)] px-2 py-0.5 text-[0.6875rem] font-semibold text-[color:var(--color-sun-700)]"
                        >
                          Duplicate
                        </span>
                      ) : null}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    {(() => {
                      const r = readiness(c);
                      return (
                        <span
                          className={`inline-block rounded-full px-2.5 py-1 text-[0.75rem] font-semibold ${r.tone}`}
                        >
                          {r.label}
                        </span>
                      );
                    })()}
                  </td>
                  <td className="px-5 py-4 text-[0.9375rem]">{c.language}</td>
                  <td className="px-5 py-4 text-[0.875rem] text-[color:var(--color-body)]">
                    {c.availability ? AVAILABILITY_LABEL[c.availability] : "—"}
                  </td>
                  <td className="px-5 py-4 text-[0.9375rem]">
                    {c.cv_path ? (
                      <span className="text-[color:var(--color-olive-600)]">Yes</span>
                    ) : (
                      <span className="text-[color:var(--color-mute)]">—</span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    {/* Editable in place: moving someone to "Sent to TopJobs"
                        is the most common thing you do, and it should not
                        require opening the candidate first. */}
                    <select
                      value={c.status}
                      onChange={(e) => setStatus(c, e.target.value)}
                      aria-label={`Status for ${c.name}`}
                      className={`cursor-pointer rounded-full px-2.5 py-1.5 text-[0.75rem] font-semibold ${STATUS_TONE[c.status]}`}
                    >
                      {CANDIDATE_STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {STATUS_LABEL[s]}
                        </option>
                      ))}
                    </select>
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

function Tile({
  label,
  value,
  tone = "plain",
}: {
  label: string;
  value: number;
  tone?: "plain" | "olive" | "sea";
}) {
  const num =
    tone === "olive"
      ? "text-[color:var(--color-olive-600)]"
      : tone === "sea"
        ? "text-[color:var(--color-sea-700)]"
        : "text-[color:var(--color-ink)]";
  return (
    <div className="rounded-2xl border border-[color:var(--color-line)] bg-white px-5 py-4">
      <div className={`font-[family-name:var(--font-display)] text-[1.75rem] font-semibold tracking-[-0.02em] ${num}`}>
        {value}
      </div>
      <div className="mt-0.5 text-[0.8125rem] text-[color:var(--color-mute)]">
        {label}
      </div>
    </div>
  );
}
