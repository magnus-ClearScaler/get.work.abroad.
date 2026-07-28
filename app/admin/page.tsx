"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  supabase,
  STATUS_TONE,
  STATUS_LABEL,
  READINESS_TONE,
  READINESS_LABEL,
  sinceLabel,
  type AdminOverview,
  type Candidate,
} from "@/lib/supabase";

/* The columns a queue row needs — a light slice of Candidate, so the dashboard
   pulls only what it shows rather than every field of every row. */
type Lead = Pick<
  Candidate,
  | "id"
  | "name"
  | "email"
  | "language"
  | "status"
  | "readiness_tier"
  | "eu_passport"
  | "client_id"
  | "created_at"
>;
const LEAD_COLS =
  "id,name,email,language,status,readiness_tier,eu_passport,client_id,created_at";

/**
 * The landing screen: what needs doing today, then the numbers. The full
 * searchable list lives on /admin/candidates — this page is deliberately a
 * short, scannable summary so nothing important gets buried.
 */
export default function DashboardPage() {
  const [overview, setOverview] = useState<AdminOverview | null>(null);
  const [readyToSend, setReadyToSend] = useState<Lead[]>([]);
  const [unreviewed, setUnreviewed] = useState<Lead[]>([]);
  const [recent, setRecent] = useState<Lead[]>([]);
  const [clientMap, setClientMap] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let live = true;
    (async () => {
      const [ov, ready, fresh, latest, clientRows] = await Promise.all([
        supabase.rpc("candidate_overview"),
        // Ready to place but not yet sent onward — the money queue.
        supabase
          .from("candidates")
          .select(LEAD_COLS)
          .eq("readiness_tier", "ready")
          .in("status", ["new", "reviewing"])
          .order("created_at", { ascending: true })
          .limit(8),
        // New and untouched — oldest first so nobody waits too long.
        supabase
          .from("candidates")
          .select(LEAD_COLS)
          .eq("status", "new")
          .order("created_at", { ascending: true })
          .limit(8),
        // Most recent arrivals, for a pulse of what is coming in.
        supabase
          .from("candidates")
          .select(LEAD_COLS)
          .order("created_at", { ascending: false })
          .limit(6),
        // Client names, to show which client each candidate is with.
        supabase.from("clients").select("id,name"),
      ]);
      if (!live) return;
      const firstErr =
        ov.error || ready.error || fresh.error || latest.error || null;
      if (firstErr) setError(firstErr.message);
      else {
        setOverview(ov.data as AdminOverview);
        setReadyToSend((ready.data ?? []) as Lead[]);
        setUnreviewed((fresh.data ?? []) as Lead[]);
        setRecent((latest.data ?? []) as Lead[]);
        if (clientRows.data)
          setClientMap(
            Object.fromEntries(clientRows.data.map((c) => [c.id, c.name])),
          );
      }
      setLoading(false);
    })();
    return () => {
      live = false;
    };
  }, []);

  const summary = overview
    ? `${overview.new_7d} new this week · ${overview.ready_not_sent} ready to send · ${overview.unreviewed} to review`
    : "…";

  return (
    <>
      <div>
        <h1 className="h-section text-[1.75rem]">Dashboard</h1>
        <p className="mt-1 text-[0.9375rem] text-[color:var(--color-body)]">
          {summary}
        </p>
      </div>

      {error ? (
        <p role="alert" className="mt-8 text-[0.9375rem] text-[color:var(--color-terra-600)]">
          {error}
        </p>
      ) : loading ? (
        <p className="mt-8 text-[0.9375rem] text-[color:var(--color-mute)]">Loading…</p>
      ) : (
        <>
          {/* The numbers. Ready and Placed are the two that pay the bills. */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            <Stat label="Total" value={overview?.total ?? 0} href="/admin/candidates?pool=all" />
            <Stat label="New this week" value={overview?.new_7d ?? 0} />
            <Stat label="Ready to go" value={overview?.ready ?? 0} tone="olive" href="/admin/candidates?ready=1" />
            <Stat label="Sent to client" value={overview?.sent_to_topjobs ?? 0} tone="sea" />
            <Stat label="Interviewing" value={overview?.interviewing ?? 0} tone="sea" />
            <Stat label="Placed" value={overview?.placed ?? 0} tone="olive" />
          </div>

          {/* Two work queues, side by side: what to act on right now. */}
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <Queue
              title="Ready to send to a client"
              hint="Placeable now, not yet passed on"
              tone="olive"
              rows={readyToSend}
              clientMap={clientMap}
              emptyLabel="Nothing waiting — you're on top of it."
            />
            <Queue
              title="New, not yet reviewed"
              hint="Oldest first, so nobody waits"
              tone="sun"
              rows={unreviewed}
              clientMap={clientMap}
              emptyLabel="Every application has been looked at."
            />
          </div>

          {/* A quiet pulse of the latest arrivals. */}
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <h2 className="h-section text-[1.125rem]">Latest applications</h2>
              <Link
                href="/admin/candidates"
                className="text-[0.875rem] font-semibold text-[color:var(--color-sea-700)] hover:underline"
              >
                See all →
              </Link>
            </div>
            <div className="mt-3 overflow-hidden rounded-2xl border border-[color:var(--color-line)] bg-white">
              {recent.length === 0 ? (
                <p className="px-5 py-10 text-center text-[0.9375rem] text-[color:var(--color-mute)]">
                  No applications yet.
                </p>
              ) : (
                <ul className="divide-y divide-[color:var(--color-line-soft)]">
                  {recent.map((c) => (
                    <li key={c.id}>
                      <Link
                        href={`/admin/candidates/${c.id}`}
                        className="flex items-center justify-between gap-4 px-5 py-3.5 hover:bg-[color:var(--color-sand-50)]"
                      >
                        <div className="min-w-0">
                          <div className="truncate font-semibold text-[color:var(--color-ink)]">
                            {c.name}
                          </div>
                          <div className="truncate text-[0.8125rem] text-[color:var(--color-mute)]">
                            {c.language} · {c.email}
                          </div>
                        </div>
                        <div className="flex shrink-0 items-center gap-2">
                          {c.client_id && clientMap[c.client_id] ? (
                            <span className="hidden rounded-full bg-[color:var(--color-sea-50)] px-2.5 py-1 text-[0.75rem] font-semibold text-[color:var(--color-sea-700)] sm:inline-block">
                              {clientMap[c.client_id]}
                            </span>
                          ) : null}
                          <span
                            className={`hidden rounded-full px-2.5 py-1 text-[0.75rem] font-semibold sm:inline-block ${STATUS_TONE[c.status]}`}
                          >
                            {STATUS_LABEL[c.status]}
                          </span>
                          <span className="w-20 text-right text-[0.8125rem] text-[color:var(--color-mute)]">
                            {sinceLabel(c.created_at)}
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

function Stat({
  label,
  value,
  tone = "plain",
  href,
}: {
  label: string;
  value: number;
  tone?: "plain" | "olive" | "sea";
  href?: string;
}) {
  const num =
    tone === "olive"
      ? "text-[color:var(--color-olive-600)]"
      : tone === "sea"
        ? "text-[color:var(--color-sea-700)]"
        : "text-[color:var(--color-ink)]";
  const body = (
    <div className="rounded-2xl border border-[color:var(--color-line)] bg-white px-5 py-4 transition-colors hover:border-[color:var(--color-sea-300)]">
      <div className={`font-[family-name:var(--font-display)] text-[1.75rem] font-semibold tracking-[-0.02em] ${num}`}>
        {value}
      </div>
      <div className="mt-0.5 text-[0.8125rem] text-[color:var(--color-mute)]">
        {label}
      </div>
    </div>
  );
  return href ? <Link href={href}>{body}</Link> : body;
}

function Queue({
  title,
  hint,
  tone,
  rows,
  clientMap,
  emptyLabel,
}: {
  title: string;
  hint: string;
  tone: "olive" | "sun";
  rows: Lead[];
  clientMap: Record<string, string>;
  emptyLabel: string;
}) {
  const dot =
    tone === "olive"
      ? "bg-[color:var(--color-olive-500)]"
      : "bg-[color:var(--color-sun-500)]";
  return (
    <section className="rounded-2xl border border-[color:var(--color-line)] bg-white">
      <div className="flex items-center gap-2.5 border-b border-[color:var(--color-line-soft)] px-5 py-4">
        <span className={`h-2 w-2 shrink-0 rounded-full ${dot}`} />
        <div>
          <h2 className="text-[1rem] font-semibold text-[color:var(--color-ink)]">
            {title}
          </h2>
          <p className="text-[0.8125rem] text-[color:var(--color-mute)]">{hint}</p>
        </div>
        {rows.length > 0 ? (
          <span className="ml-auto rounded-full bg-[color:var(--color-sand-100)] px-2.5 py-0.5 text-[0.8125rem] font-semibold text-[color:var(--color-body)]">
            {rows.length}
          </span>
        ) : null}
      </div>
      {rows.length === 0 ? (
        <p className="px-5 py-8 text-center text-[0.875rem] text-[color:var(--color-mute)]">
          {emptyLabel}
        </p>
      ) : (
        <ul className="divide-y divide-[color:var(--color-line-soft)]">
          {rows.map((c) => (
            <li key={c.id}>
              <Link
                href={`/admin/candidates/${c.id}`}
                className="flex items-center justify-between gap-3 px-5 py-3 hover:bg-[color:var(--color-sand-50)]"
              >
                <div className="min-w-0">
                  <div className="truncate font-semibold text-[color:var(--color-ink)]">
                    {c.name}
                  </div>
                  <div className="truncate text-[0.8125rem] text-[color:var(--color-mute)]">
                    {c.language}
                    {c.client_id && clientMap[c.client_id]
                      ? ` · ${clientMap[c.client_id]}`
                      : ""}
                    {c.eu_passport === false ? " · No EU passport" : ""}
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {c.readiness_tier ? (
                    <span
                      className={`hidden rounded-full px-2 py-0.5 text-[0.6875rem] font-semibold sm:inline-block ${READINESS_TONE[c.readiness_tier]}`}
                    >
                      {READINESS_LABEL[c.readiness_tier]}
                    </span>
                  ) : null}
                  <span className="w-20 text-right text-[0.8125rem] text-[color:var(--color-mute)]">
                    {sinceLabel(c.created_at)}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
