"use client";

import { useState } from "react";
import { ArrowRight, Whatsapp, Check } from "./Icons";
import { site, languages } from "@/lib/site";
import { destinations } from "@/lib/destinations";
import { jobCategories } from "@/lib/jobs";

/**
 * No backend yet. The form composes the application into a WhatsApp message
 * (the channel this audience actually replies on) and offers an email fallback
 * for attaching the CV. Swap `handleSubmit` for a real endpoint — Formspree,
 * Resend, a route handler — when one exists.
 */

const field =
  "w-full rounded-xl border border-[color:var(--color-line)] bg-white px-4 py-3 text-[0.9375rem] text-[color:var(--color-ink)] placeholder:text-[color:var(--color-mute)] transition-colors focus:border-[color:var(--color-sea-300)]";

export function ApplyForm({ role = "" }: { role?: string }) {
  const [sent, setSent] = useState<string | null>(null);

  function compose(form: HTMLFormElement) {
    const data = new FormData(form);
    const get = (k: string) => String(data.get(k) ?? "").trim();
    const lines = [
      "New application via getworkabroad.com",
      "",
      `Name: ${get("name")}`,
      `Email: ${get("email")}`,
      `Phone: ${get("phone")}`,
      `Native language: ${get("language")}`,
      `Preferred country: ${get("country") || "Open to any"}`,
      `Role type: ${get("category") || "Open to any"}`,
      get("role") ? `Role of interest: ${get("role")}` : "",
      "",
      get("message") ? `Message: ${get("message")}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    return lines;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const body = compose(e.currentTarget);
    setSent(body);
    window.open(
      `${site.whatsappLink}?text=${encodeURIComponent(body)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-[color:var(--color-line)] bg-white p-8 text-center shadow-[var(--shadow-card)]">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[color:var(--color-sea-50)] text-[color:var(--color-sea-600)]">
          <Check className="h-6 w-6" />
        </span>
        <h2 className="h-section mt-5 text-[1.5rem]">Nearly there</h2>
        <p className="mx-auto mt-3 max-w-md text-[0.9375rem] leading-relaxed text-[color:var(--color-body)]">
          We have opened WhatsApp with your details ready to send. Attach your
          CV in the chat and hit send, and a recruiter will come back to you.
        </p>

        <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href={`${site.whatsappLink}?text=${encodeURIComponent(sent)}`}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--color-sea-700)] px-6 py-3 text-[0.9375rem] font-semibold text-white"
          >
            <Whatsapp className="h-4 w-4" />
            Open WhatsApp again
          </a>
          <a
            href={`mailto:${site.email}?subject=${encodeURIComponent(
              "Application via getworkabroad.com",
            )}&body=${encodeURIComponent(sent)}`}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--color-line)] bg-white px-6 py-3 text-[0.9375rem] font-semibold text-[color:var(--color-ink)]"
          >
            Email it with my CV instead
          </a>
        </div>

        <button
          type="button"
          onClick={() => setSent(null)}
          className="mt-6 text-[0.875rem] font-medium text-[color:var(--color-sea-700)] underline underline-offset-4"
        >
          Edit my details
        </button>
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

      <button
        type="submit"
        className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[color:var(--color-sea-700)] px-7 py-4 text-[0.9375rem] font-semibold text-white shadow-[var(--shadow-soft)] transition-colors hover:bg-[color:var(--color-sea-800)] sm:w-auto"
      >
        Send my application
        <ArrowRight className="h-4 w-4" />
      </button>

      <p className="mt-4 text-[0.8125rem] leading-relaxed text-[color:var(--color-mute)]">
        We use your details only to match you to roles and to contact you about
        them. No fee, ever, and we never pass your CV on without asking you
        first.
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
