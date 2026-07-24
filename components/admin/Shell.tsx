"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { Logo } from "@/components/Logo";

/**
 * Auth gate and chrome for every /admin page.
 *
 * The gate here is convenience, not security — row level security in Postgres
 * is what actually protects the data. Someone who bypassed this component
 * would still get nothing back from any query.
 */
export function AdminShell({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) =>
      setSession(s),
    );
    return () => sub.subscription.unsubscribe();
  }, []);

  if (!ready) {
    return (
      <div className="grid min-h-[60vh] place-items-center text-[0.9375rem] text-[color:var(--color-mute)]">
        Checking your session…
      </div>
    );
  }

  if (!session) return <SignIn />;

  const tabs = [
    { href: "/admin", label: "Candidates" },
    { href: "/admin/partners", label: "Partners" },
  ];

  return (
    <div className="mx-auto w-full max-w-[84rem] px-5 py-10 sm:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[color:var(--color-line)] pb-5">
        <div className="flex items-center gap-5">
          <Link href="/admin" aria-label="Admin home">
            <Logo />
          </Link>
          <nav className="flex gap-1">
            {tabs.map((t) => {
              const active =
                t.href === "/admin"
                  ? pathname === "/admin" || pathname.startsWith("/admin/candidates")
                  : pathname.startsWith(t.href);
              return (
                <Link
                  key={t.href}
                  href={t.href}
                  className={`rounded-full px-3.5 py-2 text-[0.875rem] font-medium transition-colors ${
                    active
                      ? "bg-[color:var(--color-sea-100)] text-[color:var(--color-sea-700)]"
                      : "text-[color:var(--color-body)] hover:bg-[color:var(--color-sand-100)]"
                  }`}
                >
                  {t.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[0.8125rem] text-[color:var(--color-mute)]">
            {session.user.email}
          </span>
          <button
            type="button"
            onClick={() => supabase.auth.signOut()}
            className="rounded-full border border-[color:var(--color-line)] bg-white px-4 py-2 text-[0.8125rem] font-semibold text-[color:var(--color-ink)]"
          >
            Sign out
          </button>
        </div>
      </div>
      <div className="pt-8">{children}</div>
    </div>
  );
}

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    /* Deliberately vague: a precise message would tell whoever is guessing
       which of the two halves they got right. */
    if (error) setError("That email and password did not match.");
    setBusy(false);
  }

  return (
    <div className="mx-auto grid min-h-[70vh] w-full max-w-md place-items-center px-5">
      <div className="w-full rounded-2xl border border-[color:var(--color-line)] bg-white p-8 shadow-[var(--shadow-card)]">
        <Logo />
        <h1 className="h-section mt-6 text-[1.5rem]">Sign in</h1>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-[color:var(--color-body)]">
          For the Get Work Abroad team.
        </p>

        <form onSubmit={submit} className="mt-6 space-y-3">
          <input
            type="email"
            required
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@getworkabroad.com"
            className="w-full rounded-xl border border-[color:var(--color-line)] bg-white px-4 py-3 text-[0.9375rem] focus:border-[color:var(--color-sea-300)]"
          />
          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-xl border border-[color:var(--color-line)] bg-white px-4 py-3 text-[0.9375rem] focus:border-[color:var(--color-sea-300)]"
          />
          {error ? (
            <p role="alert" className="text-[0.875rem] text-[color:var(--color-terra-600)]">
              {error}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-full bg-[color:var(--color-sea-700)] px-6 py-3.5 text-[0.9375rem] font-semibold text-white disabled:opacity-60"
          >
            {busy ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
