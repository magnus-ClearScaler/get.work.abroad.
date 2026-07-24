import { createClient } from "@supabase/supabase-js";

/**
 * One browser client for the whole app.
 *
 * The URL and the publishable key are not secrets — the key is designed to ship
 * to browsers, and every table it can reach is behind row level security. The
 * rules live in the `admin_access_policies` migration: anonymous visitors may
 * insert an application and upload a CV, and nothing else. Reading candidates,
 * partners and submissions requires a signed-in user whose email is in the
 * `admins` table. There is deliberately no service-role key anywhere in this
 * codebase, so a mistake in the UI cannot become a data leak.
 *
 * They are read from the environment first so the project can be pointed at a
 * branch or a local stack without a code change.
 */

const url =
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  "https://yscvyhpltclbwuuwzdca.supabase.co";

const publishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  "sb_publishable_so1r_rlZ8WpmFTgikrVaKQ_I-ZeHhwD";

export const supabase = createClient(url, publishableKey);

/* ── Shapes, mirroring the tables ─────────────────────────────────────────── */

export type CandidateStatus =
  | "new"
  | "reviewing"
  | "shared"
  | "placed"
  | "closed";

export type SubmissionStatus =
  | "sent"
  | "screening"
  | "interview"
  | "offer"
  | "placed"
  | "rejected"
  | "withdrawn";

export type Candidate = {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  email: string;
  phone: string | null;
  language: string;
  preferred_country: string | null;
  role_type: string | null;
  role_interest: string | null;
  message: string | null;
  cv_path: string | null;
  cv_filename: string | null;
  source: string;
  status: CandidateStatus;
  network_opt_out: boolean;
  consent_at: string | null;
  notes: string | null;
};

export type Partner = {
  id: string;
  created_at: string;
  name: string;
  contact_name: string | null;
  contact_email: string | null;
  countries: string[];
  languages: string[];
  notes: string | null;
  active: boolean;
};

export type Submission = {
  id: string;
  created_at: string;
  candidate_id: string;
  partner_id: string | null;
  role: string | null;
  sent_at: string;
  status: SubmissionStatus;
  status_changed_at: string;
  notes: string | null;
};

/** Ordered as a pipeline, so the UI can render them in a sensible sequence. */
export const CANDIDATE_STATUSES: CandidateStatus[] = [
  "new",
  "reviewing",
  "shared",
  "placed",
  "closed",
];

export const SUBMISSION_STATUSES: SubmissionStatus[] = [
  "sent",
  "screening",
  "interview",
  "offer",
  "placed",
  "rejected",
  "withdrawn",
];

/** Tailwind classes per status. Placed is the only celebratory one. */
export const STATUS_TONE: Record<string, string> = {
  new: "bg-[color:var(--color-sea-100)] text-[color:var(--color-sea-800)]",
  reviewing: "bg-[color:var(--color-sun-100)] text-[color:var(--color-sun-700)]",
  shared: "bg-[color:var(--color-sun-100)] text-[color:var(--color-sun-700)]",
  sent: "bg-[color:var(--color-sea-100)] text-[color:var(--color-sea-800)]",
  screening: "bg-[color:var(--color-sun-100)] text-[color:var(--color-sun-700)]",
  interview: "bg-[color:var(--color-sun-100)] text-[color:var(--color-sun-700)]",
  offer: "bg-[color:var(--color-sun-100)] text-[color:var(--color-sun-700)]",
  placed: "bg-[color:var(--color-olive-100)] text-[color:var(--color-olive-600)]",
  rejected: "bg-[color:var(--color-terra-100)] text-[color:var(--color-terra-600)]",
  withdrawn: "bg-[color:var(--color-sand-200)] text-[color:var(--color-mute)]",
  closed: "bg-[color:var(--color-sand-200)] text-[color:var(--color-mute)]",
};

/** "3 days ago" — enough to spot a submission that has gone quiet. */
export function sinceLabel(iso: string): string {
  const days = Math.floor(
    (Date.now() - new Date(iso).getTime()) / 86_400_000,
  );
  if (days <= 0) return "today";
  if (days === 1) return "1 day ago";
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  return months === 1 ? "1 month ago" : `${months} months ago`;
}
