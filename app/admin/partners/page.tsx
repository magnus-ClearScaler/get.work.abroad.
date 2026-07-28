"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase, type Partner } from "@/lib/supabase";

/** The agencies we place candidates through — add, edit, retire or remove. */
export default function PartnersPage() {
  const [rows, setRows] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<string | null>(null);

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

  async function save(id: string | null, values: Partial<Partner>) {
    const query = id
      ? supabase.from("partners").update(values).eq("id", id)
      : supabase.from("partners").insert(values);
    const { error } = await query;
    if (error) return setError(error.message);
    setEditing(null);
    load();
  }

  async function toggleActive(p: Partner) {
    setRows((rs) => rs.map((r) => (r.id === p.id ? { ...r, active: !r.active } : r)));
    await supabase.from("partners").update({ active: !p.active }).eq("id", p.id);
  }

  async function remove(p: Partner) {
    if (
      !window.confirm(
        `Remove ${p.name}? Any submissions already recorded against them stay, but lose the name.`,
      )
    )
      return;
    setRows((rs) => rs.filter((r) => r.id !== p.id));
    const { error } = await supabase.from("partners").delete().eq("id", p.id);
    if (error) {
      setError(error.message);
      load();
    }
  }

  return (
    <>
      <h1 className="h-section text-[1.75rem]">Partner agencies</h1>
      <p className="mt-1.5 max-w-2xl text-[0.9375rem] text-[color:var(--color-body)]">
        The agencies you place candidates through. They run their own process
        from there, and this is just so every submission has a name against it.
        The end-clients themselves live on the{" "}
        <a href="/admin/clients" className="font-medium text-[color:var(--color-sea-700)] underline">
          Clients
        </a>{" "}
        page.
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
              {rows.map((p) =>
                editing === p.id ? (
                  <li key={p.id}>
                    <PartnerForm
                      title="Edit partner"
                      partner={p}
                      onSave={(v) => save(p.id, v)}
                      onCancel={() => setEditing(null)}
                    />
                  </li>
                ) : (
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
                              .join(" · ")}
                          </p>
                        ) : null}
                        {p.notes ? (
                          <p className="mt-2 text-[0.875rem] text-[color:var(--color-body)]">
                            {p.notes}
                          </p>
                        ) : null}
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setEditing(p.id)}
                          className="rounded-full border border-[color:var(--color-line)] bg-white px-4 py-2 text-[0.8125rem] font-semibold text-[color:var(--color-ink)] hover:border-[color:var(--color-sea-300)]"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleActive(p)}
                          className="rounded-full border border-[color:var(--color-line)] bg-white px-4 py-2 text-[0.8125rem] font-semibold text-[color:var(--color-body)]"
                        >
                          {p.active ? "Mark inactive" : "Reactivate"}
                        </button>
                        <button
                          type="button"
                          onClick={() => remove(p)}
                          aria-label={`Remove ${p.name}`}
                          className="rounded-full px-2 py-2 text-[0.8125rem] font-semibold text-[color:var(--color-mute)] hover:text-[color:var(--color-terra-600)]"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ),
              )}
            </ul>
          )}
        </section>

        <section>
          <PartnerForm title="Add a partner" onSave={(v) => save(null, v)} />
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

/**
 * Add and edit share the same fields. When `partner` is passed the form is
 * seeded with its values and shows Save/Cancel; otherwise it clears on submit
 * so you can add several in a row.
 */
function PartnerForm({
  title,
  partner,
  onSave,
  onCancel,
}: {
  title: string;
  partner?: Partner;
  onSave: (values: Partial<Partner>) => void;
  onCancel?: () => void;
}) {
  const field =
    "w-full rounded-xl border border-[color:var(--color-line)] bg-white px-4 py-2.5 text-[0.9375rem]";

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const str = (k: string) => String(data.get(k) ?? "").trim();
    const list = (k: string) =>
      str(k)
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean);

    onSave({
      name: str("name"),
      contact_name: str("contact_name") || null,
      contact_email: str("contact_email") || null,
      languages: list("languages"),
      countries: list("countries"),
      notes: str("notes") || null,
    });
    if (!partner) form.reset();
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-2xl border border-[color:var(--color-line)] bg-[color:var(--color-sand-50)] p-5"
    >
      <h2 className="text-[0.9375rem] font-semibold text-[color:var(--color-ink)]">
        {title}
      </h2>
      <div className="mt-4 grid gap-3">
        <input name="name" required defaultValue={partner?.name} placeholder="Agency name" className={field} />
        <input name="contact_name" defaultValue={partner?.contact_name ?? ""} placeholder="Contact person" className={field} />
        <input name="contact_email" type="email" defaultValue={partner?.contact_email ?? ""} placeholder="Contact email" className={field} />
        <input name="languages" defaultValue={partner?.languages.join(", ") ?? ""} placeholder="Languages, comma separated" className={field} />
        <input name="countries" defaultValue={partner?.countries.join(", ") ?? ""} placeholder="Countries, comma separated" className={field} />
        <textarea name="notes" rows={3} defaultValue={partner?.notes ?? ""} placeholder="What they are good for, fee split, anything else" className={`${field} resize-y`} />
      </div>
      <div className="mt-4 flex gap-2">
        <button
          type="submit"
          className="flex-1 rounded-full bg-[color:var(--color-sea-700)] px-5 py-3 text-[0.875rem] font-semibold text-white"
        >
          {partner ? "Save changes" : "Add partner"}
        </button>
        {onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-[color:var(--color-line)] bg-white px-5 py-3 text-[0.875rem] font-semibold text-[color:var(--color-ink)]"
          >
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  );
}
