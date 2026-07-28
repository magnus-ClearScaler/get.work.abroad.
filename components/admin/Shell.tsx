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

  const nav = [
    { href: "/admin", label: "Dashboard", exact: true },
    { href: "/admin/candidates", label: "Candidates" },
    { href: "/admin/placements", label: "Placements" },
    { href: "/admin/clients", label: "Clients" },
    { href: "/admin/partners", label: "Partners" },
    { href: "/admin/settings", label: "Settings" },
  ];
  const isActive = (item: (typeof nav)[number]) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href);

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Sidebar (rail on desktop, top bar with scrolling nav on mobile) */}
      <aside className="sticky top-0 z-30 shrink-0 border-b border-[color:var(--color-line)] bg-[color:var(--color-sand-50)]/95 backdrop-blur-xl lg:h-screen lg:w-60 lg:border-r lg:border-b-0">
        <div className="flex h-full flex-col px-4 py-4 lg:px-5 lg:py-6">
          <Link href="/admin" aria-label="Admin home" className="hidden lg:block">
            <Logo />
          </Link>
          <nav className="mt-0 flex gap-1 overflow-x-auto lg:mt-8 lg:flex-col lg:gap-0.5 lg:overflow-visible">
            <Link href="/admin" aria-label="Admin home" className="mr-2 shrink-0 self-center lg:hidden">
              <Logo />
            </Link>
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item) ? "page" : undefined}
                className={`shrink-0 whitespace-nowrap rounded-xl px-3.5 py-2.5 text-[0.9375rem] font-medium transition-colors ${
                  isActive(item)
                    ? "bg-[color:var(--color-sea-100)] text-[color:var(--color-sea-700)]"
                    : "text-[color:var(--color-body)] hover:bg-[color:var(--color-sand-100)] hover:text-[color:var(--color-ink)]"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto hidden border-t border-[color:var(--color-line-soft)] pt-4 lg:block">
            <p className="truncate text-[0.8125rem] text-[color:var(--color-mute)]">
              {session.user.email}
            </p>
            <button
              type="button"
              onClick={() => supabase.auth.signOut()}
              className="mt-2 w-full rounded-full border border-[color:var(--color-line)] bg-white px-4 py-2 text-[0.8125rem] font-semibold text-[color:var(--color-ink)] transition-colors hover:border-[color:var(--color-sea-300)]"
            >
              Sign out
            </button>
          </div>
          <button
            type="button"
            onClick={() => supabase.auth.signOut()}
            className="ml-2 shrink-0 self-center rounded-full border border-[color:var(--color-line)] bg-white px-3 py-1.5 text-[0.75rem] font-semibold text-[color:var(--color-ink)] lg:hidden"
          >
            Sign out
          </button>
        </div>
      </aside>

      <main className="min-w-0 flex-1 px-5 py-8 sm:px-8 lg:py-10">
        <div className="mx-auto w-full max-w-[76rem]">{children}</div>
      </main>
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
