"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase, STATUS_LABEL, STATUS_TONE, sinceLabel } from "@/lib/supabase";

/**
 * The placed-candidate tracker.
 *
 * Every placement carries a rebate (payout) window: for so many days after the
 * candidate's start date, the client can claw the fee back if they leave. This
 * page counts down to the day that window closes and the fee is secure. The
 * start date is entered by hand on the candidate; the window length is set per
 * client on the Clients page. The number recomputes on each load, so it is
 * accurate to the day.
 */

const DAY = 86_400_000;
const CLOSED = ["placed", "rejected", "closed"];

type Row = {
  id: string;
  name: string;
  status: string;
  client_id: string | null;
  start_date: string | null;
};
type ClientRow = { id: string; name: string; rebate_days: number | null };

type Placed = Row & {
  clientName: string | null;
  rebateDays: number | null;
  daysLeft: number | null; // null when start date or rebate length is missing
  pct: number;
};

function parseDateUTC(d: string) {
  const [y, m, day] = d.split("-").map(Number);
  return Date.UTC(y, m - 1, day);
}
function todayUTC() {
  const n = new Date();
  return Date.UTC(n.getFullYear(), n.getMonth(), n.getDate());
}

export default function PlacementsPage() {
  const [placed, setPlaced] = useState<Placed[]>([]);
  const [inProcess, setInProcess] = useState<(Row & { clientName: string | null })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let live = true;
    (async () => {
      const [candRes, clientRes] = await Promise.all([
        supabase
          .from("candidates")
          .select("id,name,status,client_id,start_date")
          .not("client_id", "is", null),
        supabase.from("clients").select("id,name,rebate_days"),
      ]);
      if (!live) return;
      if (candRes.error || clientRes.error) {
        setError((candRes.error ?? clientRes.error)?.message ?? "Failed to load");
        setLoading(false);
        return;
      }
      const cands = (candRes.data ?? []) as Row[];
      const clients = Object.fromEntries(
        ((clientRes.data ?? []) as ClientRow[]).map((c) => [c.id, c]),
      );
      const now = todayUTC();

      const placedRows: Placed[] = cands
        .filter((c) => c.status === "placed")
        .map((c) => {
          const client = c.client_id ? clients[c.client_id] : undefined;
          const rebateDays = client?.rebate_days ?? null;
          let daysLeft: number | null = null;
          let pct = 0;
          if (rebateDays != null && c.start_date) {
            const end = parseDateUTC(c.start_date) + rebateDays * DAY;
            daysLeft = Math.round((end - now) / DAY);
            pct = Math.max(0, Math.min(100, ((rebateDays - daysLeft) / rebateDays) * 100));
          }
          return {
            ...c,
            clientName: client?.name ?? null,
            rebateDays,
            daysLeft,
            pct,
          };
        })
        .sort((a, b) => {
          if (a.daysLeft == null) return 1;
          if (b.daysLeft == null) return -1;
          return a.daysLeft - b.daysLeft;
        });

      const processing = cands
        .filter((c) => !CLOSED.includes(c.status))
        .map((c) => ({
          ...c,
          clientName: c.client_id ? clients[c.client_id]?.name ?? null : null,
        }));

      setPlaced(placedRows);
      setInProcess(processing);
      setLoading(false);
    })();
    return () => {
      live = false;
    };
  }, []);

  const inWindow = placed.filter((p) => p.daysLeft != null && p.daysLeft > 0).length;
  const secured = placed.filter((p) => p.daysLeft != null && p.daysLeft <= 0).length;
  const needsInfo = placed.filter((p) => p.daysLeft == null).length;

  return (
    <>
      <div>
        <h1 className="h-section text-[1.75rem]">Placements</h1>
        <p className="mt-1 text-[0.9375rem] text-[color:var(--color-body)]">
          {loading
            ? "…"
            : `${placed.length} placed · ${inWindow} in the rebate window · ${secured} secured${
                needsInfo ? ` · ${needsInfo} need a start date or rebate period` : ""
              }`}
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
          {placed.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-dashed border-[color:var(--color-line)] bg-white px-6 py-14 text-center">
              <h2 className="h-section text-[1.15rem]">No placements yet</h2>
              <p className="mx-auto mt-2 max-w-md text-[0.9375rem] text-[color:var(--color-body)]">
                Tag a candidate with a client and mark them placed, add their
                start date, and they show up here counting down to the end of the
                client&rsquo;s rebate period.
              </p>
            </div>
          ) : (
            <ul className="mt-8 space-y-3">
              {placed.map((p) => (
                <PlacementCard key={p.id} p={p} />
              ))}
            </ul>
          )}

          {/* In process: presented to a client, not yet placed. */}
          <div className="mt-12">
            <h2 className="h-section text-[1.25rem]">In process</h2>
            <p className="mt-1 text-[0.9375rem] text-[color:var(--color-mute)]">
              Presented to a client, not yet placed.
            </p>
            {inProcess.length === 0 ? (
              <p className="mt-4 rounded-2xl border border-dashed border-[color:var(--color-line)] bg-white px-6 py-10 text-center text-[0.9375rem] text-[color:var(--color-mute)]">
                Nobody is mid-process right now.
              </p>
            ) : (
              <div className="mt-4 overflow-hidden rounded-2xl border border-[color:var(--color-line)] bg-white">
                <ul className="divide-y divide-[color:var(--color-line-soft)]">
                  {inProcess.map((c) => (
                    <li key={c.id}>
                      <Link
                        href={`/admin/candidates/${c.id}`}
                        className="flex items-center justify-between gap-3 px-5 py-3.5 hover:bg-[color:var(--color-sand-50)]"
                      >
                        <div className="min-w-0">
                          <div className="truncate font-semibold text-[color:var(--color-ink)]">
                            {c.name}
                          </div>
                          <div className="truncate text-[0.8125rem] text-[color:var(--color-mute)]">
                            {c.clientName ?? "No client set"}
                          </div>
                        </div>
                        <span
                          className={`shrink-0 rounded-full px-2.5 py-1 text-[0.75rem] font-semibold ${STATUS_TONE[c.status]}`}
                        >
                          {STATUS_LABEL[c.status] ?? c.status}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}

function PlacementCard({ p }: { p: Placed }) {
  const secured = p.daysLeft != null && p.daysLeft <= 0;
  const unset = p.daysLeft == null;
  const missing = !p.start_date
    ? "Add a start date"
    : p.rebateDays == null
      ? "Set rebate period"
      : null;

  const bar = secured
    ? "bg-[color:var(--color-olive-500)]"
    : p.daysLeft != null && p.daysLeft <= 14
      ? "bg-[color:var(--color-terra-500)]"
      : "bg-[color:var(--color-sea-500)]";

  return (
    <li className="rounded-2xl border border-[color:var(--color-line)] bg-white p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <Link
            href={`/admin/candidates/${p.id}`}
            className="font-semibold text-[color:var(--color-ink)] hover:text-[color:var(--color-sea-700)]"
          >
            {p.name}
          </Link>
          <p className="mt-0.5 text-[0.875rem] text-[color:var(--color-body)]">
            {p.clientName ?? "No client set"}
          </p>
          <p className="mt-0.5 text-[0.8125rem] text-[color:var(--color-mute)]">
            {p.start_date ? `Started ${sinceLabel(p.start_date)}` : "No start date yet"}
            {p.rebateDays != null ? ` · ${p.rebateDays}-day rebate` : ""}
          </p>
        </div>

        <div className="shrink-0 text-right">
          {unset ? (
            <Link
              href={
                missing === "Set rebate period"
                  ? "/admin/clients"
                  : `/admin/candidates/${p.id}`
              }
              className="inline-block rounded-full bg-[color:var(--color-sun-100)] px-3 py-1.5 text-[0.8125rem] font-semibold text-[color:var(--color-sun-700)] hover:underline"
            >
              {missing} →
            </Link>
          ) : secured ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--color-olive-100)] px-3 py-1.5 text-[0.8125rem] font-semibold text-[color:var(--color-olive-600)]">
              ✓ Fee secured
            </span>
          ) : (
            <>
              <div className="font-[family-name:var(--font-display)] text-[1.6rem] font-semibold tracking-[-0.03em] text-[color:var(--color-ink)]">
                {p.daysLeft}
                <span className="ml-1 text-[0.8125rem] font-medium text-[color:var(--color-mute)]">
                  {p.daysLeft === 1 ? "day left" : "days left"}
                </span>
              </div>
              <div className="text-[0.75rem] text-[color:var(--color-mute)]">
                until the fee is secure
              </div>
            </>
          )}
        </div>
      </div>

      {!unset ? (
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-[color:var(--color-sand-200)]">
          <div
            className={`h-full rounded-full ${bar}`}
            style={{ width: `${secured ? 100 : p.pct}%` }}
          />
        </div>
      ) : null}
    </li>
  );
}
