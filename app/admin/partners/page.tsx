"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase, type Partner } from "@/lib/supabase";

/** The agencies we hand CVs to. Deliberately thin — name and who to chase. */
export default function PartnersPage() {
  const [rows, setRows] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* State is set inside the promise callback rather than straight from the
     effect body, so a fetch never triggers a cascading render. */
  const apply = useCallback(
    ({ data, error }: { data: Partner[] | null; error: { message: string } | null }) => {
      if (error) setError(error.message);
      else setRows(data ?? []);
      setLoading(false);
    },
    [],
  );

  const load = useCallback(
    () =>
      supabase
        .from("partners")
        .select("*")
        .order("name")
        .then((r) => apply(r as { data: Partner[] | null; error: { message: string } | null })),
    [apply],
  );

  useEffect(() => {
    supabase
      .from("partners")
      .select("*")
      .order("name")
      .then((r) => apply(r as { data: Partner[] | null; error: { message: string } | null }));
  }, [apply]);

  async function add(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const list = (k: string) =>
      String(data.get(k) ?? "")
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean);

    const { error } = await supabase.from("partners").insert({
      name: String(data.get("name") ?? "").trim(),
      contact_name: String(data.get("contact_name") ?? "").trim() || null,
      contact_email: String(data.get("contact_email") ?? "").trim() || null,
      languages: list("languages"),
      countries: list("countries"),
      notes: String(data.get("notes") ?? "").trim() || null,
    });
    if (error) return setError(error.message);
    form.reset();
    load();
  }

  async function toggleActive(p: Partner) {
    setRows((rs) => rs.map((r) => (r.id === p.id ? { ...r, active: !r.active } : r)));
    await supabase.from("partners").update({ active: !p.active }).eq("id", p.id);
  }

  return (
    <>
      <h1 className="h-section text-[1.75rem]">Partner agencies</h1>
      <p className="mt-1.5 max-w-2xl text-[0.9375rem] text-[color:var(--color-body)]">
        The agencies you pass CVs to. They run their own process from there — this
        is just so every submission has a name against it.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section>
          {loading ? (
            <p className="text-[0.9375rem] text-[color:var(--color-mute)]">Loading…</p>
          ) : rows.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[color:var(--color-line)] bg-white px-6 py-14 text-center">
              <h2 className="h-section text-[1.15rem]">No partners yet</h2>
              <p className="mx-auto mt-2 max-w-sm text-[0.9375rem] text-[color:var(--color-body)]">
                Add the first one and you can start recording where each CV went.
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {rows.map((p) => (
                <li
                  key={p.id}
                  className="rounded-2xl border border-[color:var(--color-line)] bg-white p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-[color:var(--color-ink)]">
                        {p.name}
                        {!p.active ? (
                          <span className="ml-2 rounded-full bg-[color:var(--color-sand-200)] px-2 py-0.5 text-[0.6875rem] font-semibold text-[color:var(--color-mute)]">
                            inactive
                          </span>
                        ) : null}
                      </p>
                      <p className="mt-1 text-[0.875rem] text-[color:var(--color-body)]">
                        {[p.contact_name, p.contact_email].filter(Boolean).join(" · ") ||
                          "No contact recorded"}
                      </p>
                      {p.languages.length || p.countries.length ? (
                        <p className="mt-1.5 text-[0.8125rem] text-[color:var(--color-mute)]">
                          {[p.languages.join(", "), p.countries.join(", ")]
                            .filter(Boolean)
                            .join(" — ")}
                        </p>
                      ) : null}
                      {p.notes ? (
                        <p className="mt-2 text-[0.875rem] text-[color:var(--color-body)]">
                          {p.notes}
                        </p>
                      ) : null}
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleActive(p)}
                      className="rounded-full border border-[color:var(--color-line)] bg-white px-4 py-2 text-[0.8125rem] font-semibold text-[color:var(--color-ink)]"
                    >
                      {p.active ? "Mark inactive" : "Reactivate"}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <form
            onSubmit={add}
            className="rounded-2xl border border-[color:var(--color-line)] bg-[color:var(--color-sand-50)] p-5"
          >
            <h2 className="text-[0.9375rem] font-semibold text-[color:var(--color-ink)]">
              Add a partner
            </h2>
            <div className="mt-4 grid gap-3">
              <input
                name="name"
                required
                placeholder="Agency name"
                className="rounded-xl border border-[color:var(--color-line)] bg-white px-4 py-2.5 text-[0.9375rem]"
              />
              <input
                name="contact_name"
                placeholder="Contact person"
                className="rounded-xl border border-[color:var(--color-line)] bg-white px-4 py-2.5 text-[0.9375rem]"
              />
              <input
                name="contact_email"
                type="email"
                placeholder="Contact email"
                className="rounded-xl border border-[color:var(--color-line)] bg-white px-4 py-2.5 text-[0.9375rem]"
              />
              <input
                name="languages"
                placeholder="Languages, comma separated"
                className="rounded-xl border border-[color:var(--color-line)] bg-white px-4 py-2.5 text-[0.9375rem]"
              />
              <input
                name="countries"
                placeholder="Countries, comma separated"
                className="rounded-xl border border-[color:var(--color-line)] bg-white px-4 py-2.5 text-[0.9375rem]"
              />
              <textarea
                name="notes"
                rows={3}
                placeholder="What they are good for, fee split, anything else"
                className="resize-y rounded-xl border border-[color:var(--color-line)] bg-white px-4 py-2.5 text-[0.9375rem]"
              />
            </div>
            <button
              type="submit"
              className="mt-4 w-full rounded-full bg-[color:var(--color-sea-700)] px-5 py-3 text-[0.875rem] font-semibold text-white"
            >
              Add partner
            </button>
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
