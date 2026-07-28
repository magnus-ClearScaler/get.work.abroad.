"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase, sinceLabel } from "@/lib/supabase";

/* How long we keep an application before it should be reviewed for deletion.
   Two years matches the retention promised in the public privacy notice. Not an
   auto-delete — GDPR wants a decision, not a silent purge — so this just
   surfaces who is overdue for it. */
const RETENTION_MONTHS = 24;

type LogRow = {
  id: number;
  actor_email: string;
  action: string;
  candidate_id: string | null;
  detail: string | null;
  created_at: string;
};

type StaleRow = {
  id: string;
  name: string;
  email: string;
  status: string;
  created_at: string;
};

const ACTION_LABEL: Record<string, string> = {
  view_cv: "Viewed CV",
  download_cv: "Downloaded CV",
  csv_export: "Exported CSV",
  delete_candidate: "Deleted candidate",
};
const ACTION_TONE: Record<string, string> = {
  view_cv: "bg-[color:var(--color-sea-100)] text-[color:var(--color-sea-800)]",
  download_cv: "bg-[color:var(--color-sea-100)] text-[color:var(--color-sea-800)]",
  csv_export: "bg-[color:var(--color-sun-100)] text-[color:var(--color-sun-700)]",
  delete_candidate:
    "bg-[color:var(--color-terra-100)] text-[color:var(--color-terra-600)]",
};

/**
 * The accountability page: who touched candidate data, and which applications
 * are old enough to review for deletion. This is what makes "we hold people's
 * CVs, addresses and phone numbers" defensible rather than just true.
 */
export default function SettingsPage() {
  const [log, setLog] = useState<LogRow[]>([]);
  const [names, setNames] = useState<Record<string, string>>({});
  const [stale, setStale] = useState<StaleRow[]>([]);
  const [staleCount, setStaleCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let live = true;
    (async () => {
      const cutoff = new Date();
      cutoff.setMonth(cutoff.getMonth() - RETENTION_MONTHS);
      const cutoffIso = cutoff.toISOString();

      const [logRes, staleRes] = await Promise.all([
        supabase
          .from("access_log")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(100),
        supabase
          .from("candidates")
          .select("id,name,email,status,created_at", { count: "exact" })
          .lt("created_at", cutoffIso)
          .not("status", "in", "(placed,closed,rejected)")
          .order("created_at", { ascending: true })
          .limit(25),
      ]);
      if (!live) return;

      if (logRes.error || staleRes.error) {
        setError((logRes.error ?? staleRes.error)?.message ?? "Failed to load");
        setLoading(false);
        return;
      }

      const rows = (logRes.data ?? []) as LogRow[];
      setLog(rows);
      setStale((staleRes.data ?? []) as StaleRow[]);
      setStaleCount(staleRes.count ?? null);

      // Resolve candidate names for the ids the log references (skip deleted).
      const ids = [...new Set(rows.map((r) => r.candidate_id).filter(Boolean))] as string[];
      if (ids.length) {
        const { data } = await supabase
          .from("candidates")
          .select("id,name")
          .in("id", ids);
        if (live && data) {
          setNames(Object.fromEntries(data.map((c) => [c.id, c.name])));
        }
      }
      setLoading(false);
    })();
    return () => {
      live = false;
    };
  }, []);

  return (
    <>
      <div>
        <h1 className="h-section text-[1.75rem]">Settings</h1>
        <p className="mt-1 text-[0.9375rem] text-[color:var(--color-body)]">
          Who has touched candidate data, and what is due for review.
        </p>
      </div>

      {error ? (
        <p role="alert" className="mt-8 text-[0.9375rem] text-[color:var(--color-terra-600)]">
          {error}
        </p>
      ) : loading ? (
        <p className="mt-8 text-[0.9375rem] text-[color:var(--color-mute)]">Loading…</p>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          {/* ── Access log ─────────────────────────────────────────── */}
          <section>
            <h2 className="h-section text-[1.15rem]">Access log</h2>
            <p className="mt-1 text-[0.875rem] text-[color:var(--color-mute)]">
              Every CV opened, export taken and candidate deleted. Last 100 events.
            </p>
            <div className="mt-4 overflow-hidden rounded-2xl border border-[color:var(--color-line)] bg-white">
              {log.length === 0 ? (
                <p className="px-5 py-10 text-center text-[0.9375rem] text-[color:var(--color-mute)]">
                  Nothing logged yet.
                </p>
              ) : (
                <ul className="divide-y divide-[color:var(--color-line-soft)]">
                  {log.map((r) => (
                    <li key={r.id} className="flex items-center gap-3 px-5 py-3">
                      <span
                        className={`shrink-0 rounded-full px-2.5 py-1 text-[0.6875rem] font-semibold ${
                          ACTION_TONE[r.action] ??
                          "bg-[color:var(--color-sand-200)] text-[color:var(--color-mute)]"
                        }`}
                      >
                        {ACTION_LABEL[r.action] ?? r.action}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-[0.875rem] text-[color:var(--color-body)]">
                          {r.candidate_id && names[r.candidate_id] ? (
                            <Link
                              href={`/admin/candidates/${r.candidate_id}`}
                              className="font-semibold text-[color:var(--color-ink)] hover:text-[color:var(--color-sea-700)]"
                            >
                              {names[r.candidate_id]}
                            </Link>
                          ) : (
                            <span className="text-[color:var(--color-mute)]">
                              {r.detail ?? (r.candidate_id ? "Deleted candidate" : "—")}
                            </span>
                          )}
                        </div>
                        <div className="truncate text-[0.75rem] text-[color:var(--color-mute)]">
                          {r.actor_email}
                        </div>
                      </div>
                      <span className="shrink-0 text-[0.75rem] text-[color:var(--color-mute)]">
                        {sinceLabel(r.created_at)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>

          {/* ── Retention review ───────────────────────────────────── */}
          <section>
            <h2 className="h-section text-[1.15rem]">Due for review</h2>
            <p className="mt-1 text-[0.875rem] text-[color:var(--color-mute)]">
              Open applications older than {RETENTION_MONTHS} months. Review and
              delete the ones you no longer have a reason to keep.
            </p>
            <div className="mt-4 rounded-2xl border border-[color:var(--color-line)] bg-white">
              <div className="border-b border-[color:var(--color-line-soft)] px-5 py-4">
                <div className="font-[family-name:var(--font-display)] text-[1.75rem] font-semibold tracking-[-0.02em] text-[color:var(--color-ink)]">
                  {staleCount ?? stale.length}
                </div>
                <div className="text-[0.8125rem] text-[color:var(--color-mute)]">
                  overdue for a keep-or-delete decision
                </div>
              </div>
              {stale.length === 0 ? (
                <p className="px-5 py-8 text-center text-[0.875rem] text-[color:var(--color-mute)]">
                  Nothing overdue. Everything on file is recent or resolved.
                </p>
              ) : (
                <ul className="divide-y divide-[color:var(--color-line-soft)]">
                  {stale.map((c) => (
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
                            {c.email}
                          </div>
                        </div>
                        <span className="shrink-0 text-[0.8125rem] text-[color:var(--color-mute)]">
                          {sinceLabel(c.created_at)}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        </div>
      )}
    </>
  );
}
