"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase, type Client } from "@/lib/supabase";

type Counts = { presented: number; placed: number };

/**
 * The end-clients candidates are placed with (reached through our partner).
 * Each carries its own rebate/payout window, which the Placements tracker
 * counts down from a candidate's start date.
 */
export default function ClientsPage() {
  const [rows, setRows] = useState<Client[]>([]);
  const [counts, setCounts] = useState<Record<string, Counts>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<string | null>(null);

  const load = useCallback(() => {
    supabase
      .from("clients")
      .select("*")
      .order("name")
      .then(({ data, error }) => {
        if (error) setError(error.message);
        else setRows((data ?? []) as Client[]);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // How many candidates are presented to / placed with each client.
  useEffect(() => {
    let live = true;
    supabase
      .from("candidates")
      .select("client_id,status")
      .not("client_id", "is", null)
      .then(({ data }) => {
        if (!live || !data) return;
        const map: Record<string, Counts> = {};
        for (const c of data as { client_id: string; status: string }[]) {
          const m = (map[c.client_id] ??= { presented: 0, placed: 0 });
          if (c.status === "placed") m.placed += 1;
          else m.presented += 1;
        }
        setCounts(map);
      });
    return () => {
      live = false;
    };
  }, []);

  async function save(id: string | null, values: Partial<Client>) {
    const query = id
      ? supabase.from("clients").update(values).eq("id", id)
      : supabase.from("clients").insert(values);
    const { error } = await query;
    if (error) return setError(error.message);
    setEditing(null);
    load();
  }

  async function toggleActive(c: Client) {
    setRows((rs) => rs.map((r) => (r.id === c.id ? { ...r, active: !r.active } : r)));
    await supabase.from("clients").update({ active: !c.active }).eq("id", c.id);
  }

  async function remove(c: Client) {
    if (
      !window.confirm(
        `Remove ${c.name}? Any candidate tagged with them keeps their record but loses the client name.`,
      )
    )
      return;
    setRows((rs) => rs.filter((r) => r.id !== c.id));
    const { error } = await supabase.from("clients").delete().eq("id", c.id);
    if (error) {
      setError(error.message);
      load();
    }
  }

  return (
    <>
      <h1 className="h-section text-[1.75rem]">Clients</h1>
      <p className="mt-1.5 max-w-2xl text-[0.9375rem] text-[color:var(--color-body)]">
        The end-clients you place candidates with. Set each one&rsquo;s rebate
        period (how long after a start date the fee can be clawed back) so the{" "}
        <a href="/admin/placements" className="font-medium text-[color:var(--color-sea-700)] underline">
          placements tracker
        </a>{" "}
        can count down to when it&rsquo;s secure.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section>
          {loading ? (
            <p className="text-[0.9375rem] text-[color:var(--color-mute)]">Loading…</p>
          ) : rows.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[color:var(--color-line)] bg-white px-6 py-14 text-center">
              <h2 className="h-section text-[1.15rem]">No clients yet</h2>
              <p className="mx-auto mt-2 max-w-sm text-[0.9375rem] text-[color:var(--color-body)]">
                Add the first one and you can start tagging candidates with it.
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {rows.map((c) =>
                editing === c.id ? (
                  <li key={c.id}>
                    <ClientForm
                      title="Edit client"
                      client={c}
                      onSave={(v) => save(c.id, v)}
                      onCancel={() => setEditing(null)}
                    />
                  </li>
                ) : (
                  <li
                    key={c.id}
                    className="rounded-2xl border border-[color:var(--color-line)] bg-white p-5"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-[color:var(--color-ink)]">
                          {c.name}
                          {!c.active ? (
                            <span className="ml-2 rounded-full bg-[color:var(--color-sand-200)] px-2 py-0.5 text-[0.6875rem] font-semibold text-[color:var(--color-mute)]">
                              inactive
                            </span>
                          ) : null}
                        </p>
                        <div className="mt-2.5 flex flex-wrap gap-2">
                          <span className="inline-flex items-center rounded-full bg-[color:var(--color-sea-50)] px-2.5 py-1 text-[0.75rem] font-semibold text-[color:var(--color-sea-700)]">
                            {counts[c.id]?.presented ?? 0} presented
                          </span>
                          <span className="inline-flex items-center rounded-full bg-[color:var(--color-olive-100)] px-2.5 py-1 text-[0.75rem] font-semibold text-[color:var(--color-olive-600)]">
                            {counts[c.id]?.placed ?? 0} placed
                          </span>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-1 text-[0.75rem] font-semibold ${
                              c.rebate_days == null
                                ? "bg-[color:var(--color-sun-100)] text-[color:var(--color-sun-700)]"
                                : "bg-[color:var(--color-sand-200)] text-[color:var(--color-body)]"
                            }`}
                          >
                            {c.rebate_days == null
                              ? "Rebate period: set it"
                              : `${c.rebate_days}-day rebate`}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setEditing(c.id)}
                          className="rounded-full border border-[color:var(--color-line)] bg-white px-4 py-2 text-[0.8125rem] font-semibold text-[color:var(--color-ink)] hover:border-[color:var(--color-sea-300)]"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleActive(c)}
                          className="rounded-full border border-[color:var(--color-line)] bg-white px-4 py-2 text-[0.8125rem] font-semibold text-[color:var(--color-body)]"
                        >
                          {c.active ? "Mark inactive" : "Reactivate"}
                        </button>
                        <button
                          type="button"
                          onClick={() => remove(c)}
                          aria-label={`Remove ${c.name}`}
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
          <ClientForm title="Add a client" onSave={(v) => save(null, v)} />
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

function ClientForm({
  title,
  client,
  onSave,
  onCancel,
}: {
  title: string;
  client?: Client;
  onSave: (values: Partial<Client>) => void;
  onCancel?: () => void;
}) {
  const field =
    "w-full rounded-xl border border-[color:var(--color-line)] bg-white px-4 py-2.5 text-[0.9375rem]";

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const rebate = String(data.get("rebate_days") ?? "").trim();
    onSave({ name, rebate_days: rebate === "" ? null : Number(rebate) });
    if (!client) form.reset();
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
        <input
          name="name"
          required
          defaultValue={client?.name}
          placeholder="Client name, e.g. Atender Málaga"
          className={field}
        />
        <label className="block">
          <span className="mb-1 block text-[0.8125rem] font-medium text-[color:var(--color-mute)]">
            Rebate period in days — how long after a start date the fee can be
            clawed back (e.g. 60 for two months). Leave blank until you know it.
          </span>
          <input
            name="rebate_days"
            type="number"
            min={0}
            max={366}
            defaultValue={client?.rebate_days ?? ""}
            placeholder="e.g. 60"
            className={field}
          />
        </label>
      </div>
      <div className="mt-4 flex gap-2">
        <button
          type="submit"
          className="flex-1 rounded-full bg-[color:var(--color-sea-700)] px-5 py-3 text-[0.875rem] font-semibold text-white"
        >
          {client ? "Save changes" : "Add client"}
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
