"use client";

import { useState } from "react";
import { ArrowRight, Whatsapp, Check } from "./Icons";
import { site, languages } from "@/lib/site";
import { destinations } from "@/lib/destinations";
import { jobCategories } from "@/lib/jobs";
import { supabase } from "@/lib/supabase";

/**
 * The application is saved first and offered to WhatsApp second.
 *
 * The previous version only opened a WhatsApp deep link, which meant an
 * application that was never sent in WhatsApp left no trace at all — and no CV
 * ever arrived as a file. Now the row and the CV land in the database on
 * submit; WhatsApp is a follow-up for the people who prefer it, not the only
 * route in.
 */

const field =
  "w-full rounded-xl border border-[color:var(--color-line)] bg-white px-4 py-3 text-[0.9375rem] text-[color:var(--color-ink)] placeholder:text-[color:var(--color-mute)] transition-colors focus:border-[color:var(--color-sea-300)]";

const MAX_CV_BYTES = 10 * 1024 * 1024;

const CV_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/rtf",
  "text/plain",
];

/** Keeps the stored object name readable in the bucket without being a path. */
function safeName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]+/g, "-").slice(-80);
}

export function ApplyForm({ role = "" }: { role?: string }) {
  const [sent, setSent] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cv, setCv] = useState<File | null>(null);

  function summarise(data: FormData) {
    const get = (k: string) => String(data.get(k) ?? "").trim();
    return [
      "New application via getworkabroad.com",
      "",
      `Name: ${get("name")}`,
      `Email: ${get("email")}`,
      `Phone: ${get("phone")}`,
      `Native language: ${get("language")}`,
      `Preferred country: ${get("country") || "Open to any"}`,
      `Role type: ${get("category") || "Open to any"}`,
      get("role") ? `Role of interest: ${get("role")}` : "",
      cv ? `CV: ${cv.name} (already uploaded)` : "",
      "",
      get("message") ? `Message: ${get("message")}` : "",
    ]
      .filter(Boolean)
      .join("\n");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const get = (k: string) => String(data.get(k) ?? "").trim();

    setBusy(true);
    setError(null);

    try {
      /* Upload the CV first: if storage rejects it we want to say so before a
         half-finished candidate row exists. */
      let cv_path: string | null = null;
      let cv_filename: string | null = null;

      if (cv) {
        if (cv.size > MAX_CV_BYTES) {
          throw new Error("That file is over 10 MB. Send a smaller one.");
        }
        const path = `${crypto.randomUUID()}-${safeName(cv.name)}`;
        const { error: upload } = await supabase.storage
          .from("cvs")
          .upload(path, cv, { contentType: cv.type || undefined });
        if (upload) throw upload;
        cv_path = path;
        cv_filename = cv.name;
      }

      const { error: insert } = await supabase.from("candidates").insert({
        name: get("name"),
        email: get("email"),
        phone: get("phone") || null,
        language: get("language"),
        preferred_country: get("country") || null,
        role_type: get("category") || null,
        role_interest: get("role") || null,
        message: get("message") || null,
        cv_path,
        cv_filename,
        consent_at: new Date().toISOString(),
        source: "website",
      });
      if (insert) throw insert;

      setSent(summarise(data));
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong sending that. Try again, or email us.",
      );
    } finally {
      setBusy(false);
    }
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-[color:var(--color-line)] bg-white p-8 text-center shadow-[var(--shadow-card)]">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[color:var(--color-sea-50)] text-[color:var(--color-sea-600)]">
          <Check className="h-6 w-6" />
        </span>
        <h2 className="h-section mt-5 text-[1.5rem]">We have got it</h2>
        <p className="mx-auto mt-3 max-w-md text-[0.9375rem] leading-relaxed text-[color:var(--color-body)]">
          Your application is with us{cv ? ", CV and all" : ""}. A recruiter
          reads it, usually within a few hours on a weekday, and comes back to
          you on the roles that actually match.
        </p>

        <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href={`${site.whatsappLink}?text=${encodeURIComponent(sent)}`}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--color-sea-700)] px-6 py-3 text-[0.9375rem] font-semibold text-white"
          >
            <Whatsapp className="h-4 w-4" />
            Message us on WhatsApp too
          </a>
          <a
            href={`mailto:${site.email}?subject=${encodeURIComponent(
              "Application via getworkabroad.com",
            )}&body=${encodeURIComponent(sent)}`}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--color-line)] bg-white px-6 py-3 text-[0.9375rem] font-semibold text-[color:var(--color-ink)]"
          >
            Email us instead
          </a>
        </div>

        <p className="mt-6 text-[0.8125rem] text-[color:var(--color-mute)]">
          Neither is necessary — we already have your details.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-[color:var(--color-line)] bg-white p-6 shadow-[var(--shadow-card)] sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" required>
          <input name="name" required className={field} placeholder="Anna Jansen" />
        </Field>

        <Field label="Email" required>
          <input
            name="email"
            type="email"
            required
            className={field}
            placeholder="anna@example.com"
          />
        </Field>

        <Field label="Phone or WhatsApp" required>
          <input
            name="phone"
            type="tel"
            required
            className={field}
            placeholder="+31 6 12 34 56 78"
          />
        </Field>

        <Field label="Native language" required>
          <select name="language" required defaultValue="" className={field}>
            <option value="" disabled>
              Choose a language
            </option>
            {languages.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>
        </Field>

        <Field label="Preferred country">
          <select name="country" defaultValue="" className={field}>
            <option value="">Open to any</option>
            {destinations.map((d) => (
              <option key={d.slug} value={d.country}>
                {d.country}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Role type">
          <select name="category" defaultValue="" className={field}>
            <option value="">Open to any</option>
            {jobCategories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>

        <div className="sm:col-span-2">
          <Field label="Role you are applying for">
            <input
              name="role"
              defaultValue={role}
              className={field}
              placeholder="Leave blank for an open application"
            />
          </Field>
        </div>

        {/* ── CV ──────────────────────────────────────────────────────── */}
        <div className="sm:col-span-2">
          <Field label="Your CV">
            <label
              className={`flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-dashed px-4 py-4 transition-colors ${
                cv
                  ? "border-[color:var(--color-sea-300)] bg-[color:var(--color-sea-50)]"
                  : "border-[color:var(--color-line)] bg-[color:var(--color-sand-50)] hover:border-[color:var(--color-sea-300)]"
              }`}
            >
              <span className="text-[0.9375rem] text-[color:var(--color-body)]">
                {cv ? (
                  <>
                    <span className="font-semibold text-[color:var(--color-sea-800)]">
                      {cv.name}
                    </span>{" "}
                    <span className="text-[color:var(--color-mute)]">
                      · {(cv.size / 1024 / 1024).toFixed(1)} MB
                    </span>
                  </>
                ) : (
                  "PDF, Word or plain text, up to 10 MB"
                )}
              </span>
              <span className="shrink-0 rounded-full border border-[color:var(--color-line)] bg-white px-4 py-2 text-[0.8125rem] font-semibold text-[color:var(--color-ink)]">
                {cv ? "Change" : "Choose file"}
              </span>
              <input
                type="file"
                name="cv"
                accept={CV_TYPES.join(",")}
                className="sr-only"
                onChange={(e) => setCv(e.target.files?.[0] ?? null)}
              />
            </label>
          </Field>
          <p className="mt-2 text-[0.8125rem] text-[color:var(--color-mute)]">
            Optional, but it is the fastest way for us to place you. You can
            always send it later.
          </p>
        </div>

        <div className="sm:col-span-2">
          <Field label="Anything we should know">
            <textarea
              name="message"
              rows={4}
              className={`${field} resize-y`}
              placeholder="When you could start, whether you have moved abroad before, anything you are unsure about."
            />
          </Field>
        </div>
      </div>

      <label className="mt-7 flex cursor-pointer items-start gap-3 rounded-xl border border-[color:var(--color-line)] bg-[color:var(--color-sand-50)] p-4">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-0.5 h-4 w-4 shrink-0 accent-[color:var(--color-sea-700)]"
        />
        <span className="text-[0.8125rem] leading-relaxed text-[color:var(--color-body)]">
          I agree that my details and CV are shared with the client I am
          applying to, and I understand the roles listed here come from a
          range of clients and recruitment firms.{" "}
          <a
            href="/privacy"
            className="font-medium text-[color:var(--color-sea-700)] underline underline-offset-2"
          >
            Privacy notice
          </a>
        </span>
      </label>

      {error ? (
        <p
          role="alert"
          className="mt-5 rounded-xl border border-[color:var(--color-terra-500)]/30 bg-[color:var(--color-terra-100)] px-4 py-3 text-[0.875rem] text-[color:var(--color-terra-600)]"
        >
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={busy}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[color:var(--color-sea-700)] px-7 py-4 text-[0.9375rem] font-semibold text-white shadow-[var(--shadow-soft)] transition-colors hover:bg-[color:var(--color-sea-800)] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {busy ? "Sending…" : "Send my application"}
        {busy ? null : <ArrowRight className="h-4 w-4" />}
      </button>

      <p className="mt-4 text-[0.8125rem] leading-relaxed text-[color:var(--color-mute)]">
        Your details come straight to us over an encrypted connection. We never
        charge candidates a fee, at any stage.
      </p>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[0.8125rem] font-semibold text-[color:var(--color-ink)]">
        {label}
        {required ? (
          <span className="ml-1 text-[color:var(--color-terra-500)]">*</span>
        ) : null}
      </span>
      {children}
    </label>
  );
}
