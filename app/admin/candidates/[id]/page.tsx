"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  supabase,
  CANDIDATE_STATUSES,
  SUBMISSION_STATUSES,
  STATUS_TONE,
  STATUS_LABEL,
  sinceLabel,
  type Candidate,
  type Partner,
  type Submission,
} from "@/lib/supabase";

/**
 * One candidate, and the record of every partner their CV went to.
 *
 * This is the part that answers "where did this CV go, who is in process, and
 * did they get the job". We do not run the process ourselves — the partner
 * does — so a submission carries only what we need to chase it: who has it,
 * for what, since when, and where it got to.
 */
type Bundle = {
  candidate: Candidate | null;
  subs: Submission[];
  partners: Partner[];
  error: string | null;
};

async function fetchBundle(id: string): Promise<Bundle> {
  const [c, s, p] = await Promise.all([
    supabase.from("candidates").select("*").eq("id", id).single(),
    supabase
      .from("submissions")
      .select("*")
      .eq("candidate_id", id)
      .order("sent_at", { ascending: false }),
    supabase.from("partners").select("*").order("name"),
  ]);
  return {
    candidate: (c.data as Candidate) ?? null,
    subs: (s.data ?? []) as Submission[],
    partners: (p.data ?? []) as Partner[],
    error: c.error?.message ?? null,
  };
}

export default function CandidatePage() {
  const { id } = useParams<{ id: string }>();

  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [subs, setSubs] = useState<Submission[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [savedNote, setSavedNote] = useState(false);

  /* Fetching is kept separate from the state it produces: the effect body only
     starts the request, and every setState happens inside the callback. */
  const apply = useCallback((b: Bundle) => {
    if (b.error) setError(b.error);
    else if (b.candidate) {
      setCandidate(b.candidate);
      setNotes(b.candidate.notes ?? "");
    }
    setSubs(b.subs);
    setPartners(b.partners);
    setLoading(false);
  }, []);

  const load = useCallback(() => fetchBundle(id).then(apply), [id, apply]);

  useEffect(() => {
    fetchBundle(id).then(apply);
  }, [id, apply]);

  async function openCv() {
    if (!candidate?.cv_path) return;
    const { data, error } = await supabase.storage
      .from("cvs")
      .createSignedUrl(candidate.cv_path, 60);
    if (error) setError(error.message);
    else window.open(data.signedUrl, "_blank", "noopener,noreferrer");
  }

  async function setStatus(status: string) {
    if (!candidate) return;
    setCandidate({ ...candidate, status: status as Candidate["status"] });
    await supabase.from("candidates").update({ status }).eq("id", candidate.id);
  }

  async function saveNotes() {
    if (!candidate) return;
    await supabase.from("candidates").update({ notes }).eq("id", candidate.id);
    setSavedNote(true);
    setTimeout(() => setSavedNote(false), 2000);
  }

  async function addSubmission(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const { error } = await supabase.from("submissions").insert({
      candidate_id: id,
      partner_id: String(data.get("partner_id") || "") || null,
      role: String(data.get("role") || "").trim() || null,
      sent_at: String(data.get("sent_at") || "") || undefined,
      notes: String(data.get("notes") || "").trim() || null,
    });
    if (error) return setError(error.message);
    form.reset();
    /* Sending a CV out is the first real step — keep the top-level status
       honest without making anyone remember to change it. */
    if (candidate && candidate.status === "new")
      await setStatus("sent_to_topjobs");
    load();
  }

  async function setSubStatus(sub: Submission, status: string) {
    setSubs((rows) =>
      rows.map((r) =>
        r.id === sub.id ? { ...r, status: status as Submission["status"] } : r,
      ),
    );
    await supabase.from("submissions").update({ status }).eq("id", sub.id);
    /* A placement is the outcome that matters; reflect it on the candidate. */
    if (status === "placed") await setStatus("placed");
  }

  async function removeSubmission(sub: Submission) {
    setSubs((rows) => rows.filter((r) => r.id !== sub.id));
    await supabase.from("submissions").delete().eq("id", sub.id);
  }

  if (loading) {
    return <p className="text-[0.9375rem] text-[color:var(--color-mute)]">Loading…</p>;
  }
  if (!candidate) {
    return (
      <p role="alert" className="text-[0.9375rem] text-[color:var(--color-terra-600)]">
        {error ?? "Not found."}
      </p>
    );
  }

  const partnerName = (pid: string | null) =>
    partners.find((p) => p.id === pid)?.name ?? "Unnamed partner";

  return (
    <>
      <Link
        href="/admin"
        className="text-[0.875rem] font-medium text-[color:var(--color-sea-700)]"
      >
        ← All candidates
      </Link>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="h-section text-[1.75rem]">{candidate.name}</h1>
          <p className="mt-1.5 text-[0.9375rem] text-[color:var(--color-body)]">
            {candidate.language} · applied {sinceLabel(candidate.created_at)}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {candidate.cv_path ? (
            <button
              type="button"
              onClick={openCv}
              className="rounded-full bg-[color:var(--color-sea-700)] px-5 py-2.5 text-[0.875rem] font-semibold text-white"
            >
              Open CV{candidate.cv_filename ? ` · ${candidate.cv_filename}` : ""}
            </button>
          ) : (
            <span className="text-[0.875rem] text-[color:var(--color-mute)]">
              No CV attached
            </span>
          )}
          <select
            value={candidate.status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-full border border-[color:var(--color-line)] bg-white px-4 py-2.5 text-[0.875rem] font-medium"
          >
            {CANDIDATE_STATUSES.map((s) => (
              <option key={s} value={s}>
                {STATUS_LABEL[s]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        {/* ── Details ──────────────────────────────────────────────── */}
        <section>
          <h2 className="h-section text-[1.15rem]">Details</h2>
          <dl className="mt-4 divide-y divide-[color:var(--color-line-soft)] rounded-2xl border border-[color:var(--color-line)] bg-white">
            <Row label="Email">
              <a href={`mailto:${candidate.email}`} className="text-[color:var(--color-sea-700)]">
                {candidate.email}
              </a>
            </Row>
            <Row label="Phone">
              {candidate.phone ? (
                <a href={`tel:${candidate.phone}`} className="text-[color:var(--color-sea-700)]">
                  {candidate.phone}
                </a>
              ) : (
                "—"
              )}
            </Row>
            <Row label="Preferred country">{candidate.preferred_country ?? "Open to any"}</Row>
            <Row label="Role type">{candidate.role_type ?? "Open to any"}</Row>
            <Row label="Role of interest">{candidate.role_interest ?? "—"}</Row>
            <Row label="Their message">{candidate.message ?? "—"}</Row>
          </dl>

          <h2 className="h-section mt-8 text-[1.15rem]">Your notes</h2>
          <textarea
            rows={5}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Call notes, what they are actually after, anything a partner should know."
            className="mt-3 w-full resize-y rounded-xl border border-[color:var(--color-line)] bg-white px-4 py-3 text-[0.9375rem] focus:border-[color:var(--color-sea-300)]"
          />
          <button
            type="button"
            onClick={saveNotes}
            className="mt-3 rounded-full border border-[color:var(--color-line)] bg-white px-5 py-2.5 text-[0.875rem] font-semibold text-[color:var(--color-ink)]"
          >
            {savedNote ? "Saved" : "Save notes"}
          </button>
        </section>

        {/* ── Submissions ──────────────────────────────────────────── */}
        <section>
          <h2 className="h-section text-[1.15rem]">
            Sent to {subs.length === 1 ? "1 partner" : `${subs.length} partners`}
          </h2>

          {subs.length === 0 ? (
            <p className="mt-3 text-[0.9375rem] text-[color:var(--color-mute)]">
              Nothing sent out yet.
            </p>
          ) : (
            <ul className="mt-4 space-y-3">
              {subs.map((s) => (
                <li
                  key={s.id}
                  className="rounded-2xl border border-[color:var(--color-line)] bg-white p-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-[color:var(--color-ink)]">
                        {partnerName(s.partner_id)}
                      </p>
                      <p className="text-[0.875rem] text-[color:var(--color-body)]">
                        {s.role ?? "Role not specified"} · sent {s.sent_at}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <select
                        value={s.status}
                        onChange={(e) => setSubStatus(s, e.target.value)}
                        className={`rounded-full px-3 py-1.5 text-[0.8125rem] font-semibold ${STATUS_TONE[s.status]}`}
                      >
                        {SUBMISSION_STATUSES.map((v) => (
                          <option key={v} value={v}>
                            {STATUS_LABEL[v]}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => removeSubmission(s)}
                        aria-label="Remove this submission"
                        className="text-[0.8125rem] text-[color:var(--color-mute)] hover:text-[color:var(--color-terra-600)]"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <p className="mt-2 text-[0.8125rem] text-[color:var(--color-mute)]">
                    {STATUS_LABEL[s.status]} since {sinceLabel(s.status_changed_at)}
                    {s.notes ? ` · ${s.notes}` : ""}
                  </p>
                </li>
              ))}
            </ul>
          )}

          <form
            onSubmit={addSubmission}
            className="mt-6 rounded-2xl border border-[color:var(--color-line)] bg-[color:var(--color-sand-50)] p-5"
          >
            <h3 className="text-[0.9375rem] font-semibold text-[color:var(--color-ink)]">
              Record a CV you have sent
            </h3>
            {partners.length === 0 ? (
              <p className="mt-2 text-[0.875rem] text-[color:var(--color-body)]">
                Add a partner agency first on the{" "}
                <Link href="/admin/partners" className="text-[color:var(--color-sea-700)] underline">
                  Partners
                </Link>{" "}
                page.
              </p>
            ) : (
              <>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <select
                    name="partner_id"
                    required
                    defaultValue=""
                    className="rounded-xl border border-[color:var(--color-line)] bg-white px-4 py-2.5 text-[0.9375rem]"
                  >
                    <option value="" disabled>
                      Which partner
                    </option>
                    {partners.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="date"
                    name="sent_at"
                    defaultValue={new Date().toISOString().slice(0, 10)}
                    className="rounded-xl border border-[color:var(--color-line)] bg-white px-4 py-2.5 text-[0.9375rem]"
                  />
                  <input
                    name="role"
                    placeholder="Role, e.g. Dutch support, Lisbon"
                    className="rounded-xl border border-[color:var(--color-line)] bg-white px-4 py-2.5 text-[0.9375rem] sm:col-span-2"
                  />
                  <input
                    name="notes"
                    placeholder="Anything worth remembering"
                    className="rounded-xl border border-[color:var(--color-line)] bg-white px-4 py-2.5 text-[0.9375rem] sm:col-span-2"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-4 rounded-full bg-[color:var(--color-sea-700)] px-5 py-2.5 text-[0.875rem] font-semibold text-white"
                >
                  Add
                </button>
              </>
            )}
          </form>
        </section>
      </div>

      {error ? (
        <p role="alert" className="mt-6 text-[0.875rem] text-[color:var(--color-terra-600)]">
          {error}
        </p>
      ) : null}
    </>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4 px-5 py-3.5">
      <dt className="w-40 shrink-0 text-[0.8125rem] text-[color:var(--color-mute)]">
        {label}
      </dt>
      <dd className="text-[0.9375rem] text-[color:var(--color-body)]">{children}</dd>
    </div>
  );
}
