import { languages } from "@/lib/site";

/** A quiet, continuously drifting statement of what we actually recruit on. */
export function LanguageBand() {
  const row = [...languages, ...languages];

  return (
    <section className="border-y border-[color:var(--color-line)] bg-white py-7">
      <div className="mx-auto mb-5 max-w-[84rem] px-5 sm:px-8">
        <p className="eyebrow text-center">
          We recruit native speakers of
        </p>
      </div>
      <div className="marquee-mask overflow-hidden">
        <div className="marquee-track flex w-max items-center gap-3 sm:gap-4">
          {row.map((lang, i) => (
            <span
              key={`${lang}-${i}`}
              className="rounded-full border border-[color:var(--color-line)] bg-[color:var(--color-sand-50)] px-4 py-2 font-[family-name:var(--font-display)] text-[0.9375rem] font-medium tracking-[-0.01em] whitespace-nowrap text-[color:var(--color-ink)] sm:text-[1.0625rem]"
            >
              {lang}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
