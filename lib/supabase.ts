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
  | "sent_to_topjobs"
  | "interviewing"
  | "placed"
  | "rejected"
  | "closed";

/** How soon they could actually move. */
export type Availability = "this_month" | "1_3_months" | "later";

export const AVAILABILITY: { value: Availability; label: string }[] = [
  { value: "this_month", label: "This month" },
  { value: "1_3_months", label: "1–3 months" },
  { value: "later", label: "Later" },
];

export const AVAILABILITY_LABEL: Record<string, string> = Object.fromEntries(
  AVAILABILITY.map((a) => [a.value, a.label]),
);

/** Enough English for training and internal comms — conversational is the floor. */
export type EnglishLevel = "basic" | "conversational" | "fluent" | "native";

export const ENGLISH_LEVELS: { value: EnglishLevel; label: string }[] = [
  { value: "basic", label: "Basic" },
  { value: "conversational", label: "Conversational (B2)" },
  { value: "fluent", label: "Fluent" },
  { value: "native", label: "Native" },
];

/** How set they are on moving. The seriousness signal, distinct from timing. */
export type Commitment = "ready_now" | "planning" | "exploring";

export const COMMITMENTS: { value: Commitment; label: string }[] = [
  { value: "ready_now", label: "Ready to go now" },
  { value: "planning", label: "Planning it seriously" },
  { value: "exploring", label: "Still exploring" },
];

export const ENGLISH_LABEL: Record<string, string> = Object.fromEntries(
  ENGLISH_LEVELS.map((e) => [e.value, e.label]),
);
export const COMMITMENT_LABEL: Record<string, string> = Object.fromEntries(
  COMMITMENTS.map((c) => [c.value, c.label]),
);

/**
 * A single readiness read, computed from the screening answers — no stored
 * score to drift. The point is to spot the placeable lead at a glance: an
 * EU-eligible candidate who can move soon, means it, and has a CV on file is
 * the one worth walking over to TopJobs today. Everyone else is pipeline.
 */
export type Readiness = {
  tier: "ready" | "warming" | "early" | "ineligible" | "unscreened";
  label: string;
  tone: string; // Tailwind classes
  score: number;
};

export function readiness(c: {
  eu_passport: boolean | null;
  availability: Availability | null;
  commitment: Commitment | null;
  english_level: EnglishLevel | null;
  relocated_before: boolean | null;
  cv_path: string | null;
}): Readiness {
  // Without the right to work we cannot place them, full stop.
  if (c.eu_passport === false)
    return {
      tier: "ineligible",
      label: "No EU passport",
      tone: "bg-[color:var(--color-terra-100)] text-[color:var(--color-terra-600)]",
      score: 0,
    };

  const answered =
    c.availability || c.commitment || c.english_level || c.eu_passport !== null;
  if (!answered)
    return {
      tier: "unscreened",
      label: "Not screened",
      tone: "bg-[color:var(--color-sand-200)] text-[color:var(--color-mute)]",
      score: 0,
    };

  // Speed to start is weighted hardest — that is where a placement is made.
  const move = { this_month: 3, "1_3_months": 2, later: 0 } as const;
  const commit = { ready_now: 3, planning: 1, exploring: 0 } as const;
  const eng = { native: 2, fluent: 2, conversational: 1, basic: 0 } as const;

  let score = 0;
  if (c.availability) score += move[c.availability];
  if (c.commitment) score += commit[c.commitment];
  if (c.english_level) score += eng[c.english_level];
  if (c.relocated_before) score += 1;
  if (c.cv_path) score += 1;

  // Ready = can move soon AND means it AND could actually do the job.
  const soon =
    c.availability === "this_month" || c.availability === "1_3_months";
  const serious = c.commitment === "ready_now" || c.commitment === "planning";
  const canWork = c.english_level !== "basic";

  if (score >= 7 && soon && serious && canWork)
    return {
      tier: "ready",
      label: "Ready to go",
      tone: "bg-[color:var(--color-olive-100)] text-[color:var(--color-olive-600)]",
      score,
    };
  if (score >= 4 && soon)
    return {
      tier: "warming",
      label: "Warming up",
      tone: "bg-[color:var(--color-sun-100)] text-[color:var(--color-sun-700)]",
      score,
    };
  return {
    tier: "early",
    label: "Early / pipeline",
    tone: "bg-[color:var(--color-sea-100)] text-[color:var(--color-sea-800)]",
    score,
  };
}

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
  /** Null means we never asked, which is not the same as "no". */
  eu_passport: boolean | null;
  availability: Availability | null;
  english_level: EnglishLevel | null;
  commitment: Commitment | null;
  relocated_before: boolean | null;
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
  "sent_to_topjobs",
  "interviewing",
  "placed",
  "rejected",
  "closed",
];

/** Underscores are for the database, not for the person reading the screen. */
export const STATUS_LABEL: Record<string, string> = {
  new: "New",
  reviewing: "Reviewing",
  sent_to_topjobs: "Sent to TopJobs",
  interviewing: "Interviewing",
  placed: "Placed",
  rejected: "Rejected",
  closed: "Closed",
  sent: "Sent",
  screening: "Screening",
  interview: "Interview",
  offer: "Offer",
  withdrawn: "Withdrawn",
};

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
  sent_to_topjobs:
    "bg-[color:var(--color-sea-100)] text-[color:var(--color-sea-800)]",
  interviewing:
    "bg-[color:var(--color-sun-100)] text-[color:var(--color-sun-700)]",
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
