"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  supabase,
  CANDIDATE_STATUSES,
  STATUS_TONE,
  STATUS_LABEL,
  READINESS_TONE,
  READINESS_LABEL,
  AVAILABILITY_LABEL,
  COMMITMENT_LABEL,
  ENGLISH_LABEL,
  logAccess,
  sinceLabel,
  type Candidate,
} from "@/lib/supabase";
import { languages } from "@/lib/site";

const PAGE = 50;

/* The type of a filterable candidates query — i.e. what `.select()` hands back.
   Typing the filter helper against this (not the query builder) lets the chain
   compose without casts. */
type CandidatesQuery = ReturnType<ReturnType<typeof supabase.from>["select"]>;

/**
 * The candidate list, queried server-side: every filter, the search and the
 * paging happen in Postgres, so the browser only ever holds one page. This is
 * what lets the table hold a very large number of applications.
 */
export default function CandidatesPage() {
  const [rows, setRows] = useState<Candidate[]>([]);
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);

  // Seed the initial view from the URL so dashboard links land pre-filtered.
  const initial = useMemo(() => {
    if (typeof window === "undefined") return { pool: "eu" as const, ready: false };
    const p = new URLSearchParams(window.location.search);
    const poolParam = p.get("pool");
    const pool: "eu" | "non_eu" | "all" =
      poolParam === "all" || poolParam === "non_eu" ? poolParam : "eu";
    return { pool, ready: p.get("ready") === "1" };
  }, []);

  const [q, setQ] = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [pool, setPool] = useState<"eu" | "non_eu" | "all">(initial.pool);
  const [language, setLanguage] = useState("");
  const [readyOnly, setReadyOnly] = useState(initial.ready);
  const [clientMap, setClientMap] = useState<Record<string, string>>({});

  // Client names for the "Client" column — fetched once and looked up by id.
  useEffect(() => {
    let live = true;
    supabase
      .from("clients")
      .select("id,name")
      .then(({ data }) => {
        if (live && data)
          setClientMap(Object.fromEntries(data.map((c) => [c.id, c.name])));
      });
    return () => {
      live = false;
    };
  }, []);

  // Debounce the search box so a query does not fire on every keystroke.
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQ(q.trim()), 300);
    return () => clearTimeout(t);
  }, [q]);

  /** Apply the active filters to a query builder. Shared by list + export. */
  const applyFilters = useCallback(
    (qb: CandidatesQuery) => {
      if (pool === "eu") qb = qb.eq("eu_passport", true);
      else if (pool === "non_eu") qb = qb.or("eu_passport.is.null,eu_passport.eq.false");
      if (statusFilter) qb = qb.eq("status", statusFilter);
      if (language) qb = qb.eq("language", language);
      if (readyOnly) qb = qb.eq("readiness_tier", "ready");
      if (debouncedQ.length >= 2)
        qb = qb.ilike("search_text", `%${debouncedQ.toLowerCase()}%`);
      return qb;
    },
    [pool, statusFilter, language, readyOnly, debouncedQ],
  );

  // (Re)load page 0 whenever a filter or the search changes.
  const reqId = useRef(0);
  useEffect(() => {
    const id = ++reqId.current;
    (async () => {
      setLoading(true);
      const { data, error, count } = await applyFilters(
        supabase.from("candidates").select("*", { count: "exact" }),
      )
        .order("created_at", { ascending: false })
        .order("id", { ascending: false })
        .range(0, PAGE - 1);
      if (id !== reqId.current) return; // a newer request superseded this one
      if (error) setError(error.message);
      else {
        setRows((data ?? []) as Candidate[]);
        setCount(count ?? null);
        setError(null);
      }
      setLoading(false);
    })();
  }, [applyFilters]);

  async function loadMore() {
    setLoadingMore(true);
    const { data, error } = await applyFilters(
      supabase.from("candidates").select("*"),
    )
      .order("created_at", { ascending: false })
      .order("id", { ascending: false })
      .range(rows.length, rows.length + PAGE - 1);
    if (error) setError(error.message);
    else setRows((r) => [...r, ...((data ?? []) as Candidate[])]);
    setLoadingMore(false);
  }

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

  /* Export the matching rows (not just the loaded page), capped, with CSV
     formula-injection neutralised and the export recorded in the access log. */
  async function exportCsv() {
    setExporting(true);
    try {
      const { data, error } = await applyFilters(
        supabase.from("candidates").select("*"),
      )
        .order("created_at", { ascending: false })
        .range(0, 4999);
      if (error) throw error;
      const list = (data ?? []) as Candidate[];
      await logAccess("csv_export", null, `${list.length} rows`);

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
        ["Readiness", (c) => (c.readiness_tier ? READINESS_LABEL[c.readiness_tier] : "")],
        ["Preferred country", "preferred_country"],
        ["Role type", "role_type"],
        ["Role of interest", "role_interest"],
        ["Status", (c) => STATUS_LABEL[c.status]],
        ["CV", (c) => c.cv_filename ?? ""],
        ["Applied", (c) => new Date(c.created_at).toISOString().slice(0, 10)],
      ];
      // Neutralise spreadsheet formula injection from attacker-controlled text.
      const esc = (v: unknown) => {
        let s = String(v ?? "");
        if (/^[=+\-@]/.test(s)) s = "'" + s;
        return `"${s.replace(/"/g, '""')}"`;
      };
      const body = list.map((c) =>
        cols.map(([, k]) => esc(typeof k === "function" ? k(c) : c[k])).join(","),
      );
      const csv = [cols.map((col) => col[0]).join(","), ...body].join("\r\n");
      const url = URL.createObjectURL(
        new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" }),
      );
      const a = document.createElement("a");
      a.href = url;
      a.download = `candidates-${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Export failed");
    } finally {
      setExporting(false);
    }
  }

  const filtersOn = useMemo(
    () => pool !== "eu" || !!statusFilter || !!language || readyOnly || debouncedQ.length >= 2,
    [pool, statusFilter, language, readyOnly, debouncedQ],
  );

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="h-section text-[1.75rem]">Candidates</h1>
          <p className="mt-1 text-[0.9375rem] text-[color:var(--color-body)]">
            {count === null ? "…" : `${count} ${count === 1 ? "match" : "matches"}`}
            {filtersOn ? " · filtered" : ""}
          </p>
        </div>
        <button
          type="button"
          onClick={exportCsv}
          disabled={exporting || count === 0}
          className="rounded-full border border-[color:var(--color-line)] bg-white px-4 py-2 text-[0.8125rem] font-semibold text-[color:var(--color-ink)] transition-colors hover:border-[color:var(--color-sea-300)] disabled:opacity-50"
        >
          {exporting ? "Exporting…" : `Export CSV${count ? ` (${Math.min(count, 5000)})` : ""}`}
        </button>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        {([
          ["eu", "EU passport"],
          ["non_eu", "Non-EU"],
          ["all", "Everyone"],
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
          ● Ready to go
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
      ) : rows.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-[color:var(--color-line)] bg-white px-6 py-16 text-center">
          <h2 className="h-section text-[1.25rem]">
            {filtersOn ? "Nothing matches that" : "No applications yet"}
          </h2>
          <p className="mx-auto mt-2 max-w-md text-[0.9375rem] text-[color:var(--color-body)]">
            {filtersOn
              ? "Try a wider filter."
              : "Applications sent through the site land here the moment they are submitted."}
          </p>
        </div>
      ) : (
        <>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-[color:var(--color-line)] bg-white">
            <table className="w-full min-w-[52rem] text-left">
              <thead className="border-b border-[color:var(--color-line)] text-[0.75rem] tracking-wide text-[color:var(--color-mute)] uppercase">
                <tr>
                  <th className="px-5 py-3.5 font-medium">Name</th>
                  <th className="px-5 py-3.5 font-medium">Readiness</th>
                  <th className="px-5 py-3.5 font-medium">Language</th>
                  <th className="px-5 py-3.5 font-medium">Client</th>
                  <th className="px-5 py-3.5 font-medium">Can move</th>
                  <th className="px-5 py-3.5 font-medium">CV</th>
                  <th className="px-5 py-3.5 font-medium">Status</th>
                  <th className="px-5 py-3.5 font-medium">Applied</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[color:var(--color-line-soft)]">
                {rows.map((c) => (
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
                      {c.eu_passport === false ? (
                        <span className="mt-1 inline-block rounded-full bg-[color:var(--color-terra-100)] px-2 py-0.5 text-[0.6875rem] font-semibold text-[color:var(--color-terra-600)]">
                          No EU passport
                        </span>
                      ) : null}
                    </td>
                    <td className="px-5 py-4">
                      {c.readiness_tier ? (
                        <span
                          className={`inline-block rounded-full px-2.5 py-1 text-[0.75rem] font-semibold ${READINESS_TONE[c.readiness_tier]}`}
                        >
                          {READINESS_LABEL[c.readiness_tier]}
                        </span>
                      ) : (
                        <span className="text-[color:var(--color-mute)]">—</span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-[0.9375rem]">{c.language}</td>
                    <td className="px-5 py-4 text-[0.875rem]">
                      {c.client_id && clientMap[c.client_id] ? (
                        <span className="inline-block rounded-full bg-[color:var(--color-sea-50)] px-2.5 py-1 text-[0.75rem] font-semibold text-[color:var(--color-sea-700)]">
                          {clientMap[c.client_id]}
                        </span>
                      ) : (
                        <span className="text-[color:var(--color-mute)]">—</span>
                      )}
                    </td>
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

          {count !== null && rows.length < count ? (
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={loadMore}
                disabled={loadingMore}
                className="rounded-full border border-[color:var(--color-line)] bg-white px-6 py-2.5 text-[0.875rem] font-semibold text-[color:var(--color-ink)] transition-colors hover:border-[color:var(--color-sea-300)] disabled:opacity-50"
              >
                {loadingMore ? "Loading…" : `Load more (${count - rows.length} left)`}
              </button>
            </div>
          ) : null}
        </>
      )}
    </>
  );
}
