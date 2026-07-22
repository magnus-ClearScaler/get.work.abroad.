import type { Metadata } from "next";
import { Container, Button } from "@/components/ui";
import { PageHeader } from "@/components/PageHeader";
import { ApplyForm } from "@/components/ApplyForm";
import { Check, Whatsapp } from "@/components/Icons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Apply",
  description:
    "Send your CV and we will match you against every role on our desk in Spain, Portugal and Greece. Free for candidates, always.",
};

const reassurance = [
  "No fee at any stage. The employer pays us, not you",
  "A person reads every application, usually the same day",
  "We tell you what the role actually pays before you interview",
  "Your CV never goes to an employer without your say-so",
];

export default async function ApplyPage(props: PageProps<"/apply">) {
  const sp = await props.searchParams;
  const role = Array.isArray(sp.role) ? sp.role[0] : (sp.role ?? "");

  return (
    <>
      <PageHeader
        eyebrow="Open application"
        title={role ? `Apply: ${role}` : "Tell us where you want to be"}
        intro="Fill this in once and we will match you against everything on our desk, including the roles that never make it onto the site."
      />

      <Container className="py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-14">
          <ApplyForm role={role} />

          <aside className="lg:pt-2">
            <h2 className="h-section text-[1.35rem]">What happens next</h2>
            <ol className="mt-6 space-y-6">
              {[
                {
                  n: "1",
                  t: "We read it",
                  b: "Usually within a few hours on a weekday.",
                },
                {
                  n: "2",
                  t: "A short call",
                  b: "Fifteen minutes to work out the country, the city and the role that fit.",
                },
                {
                  n: "3",
                  t: "We introduce you",
                  b: "Straight to the hiring team, with proper interview prep beforehand.",
                },
              ].map((s) => (
                <li key={s.n} className="flex gap-4">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[color:var(--color-sea-700)] text-[0.875rem] font-semibold text-white">
                    {s.n}
                  </span>
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-[1.0625rem] font-semibold tracking-[-0.015em] text-[color:var(--color-ink)]">
                      {s.t}
                    </h3>
                    <p className="mt-1 text-[0.9375rem] leading-relaxed text-[color:var(--color-body)]">
                      {s.b}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <ul className="mt-10 space-y-3 border-t border-[color:var(--color-line)] pt-8">
              {reassurance.map((r) => (
                <li key={r} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[color:var(--color-sea-50)] text-[color:var(--color-sea-600)]">
                    <Check className="h-3 w-3" />
                  </span>
                  <span className="text-[0.9375rem] leading-snug text-[color:var(--color-body)]">
                    {r}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-2xl bg-[color:var(--color-sand-100)] p-6">
              <p className="text-[0.9375rem] leading-relaxed text-[color:var(--color-body)]">
                Would rather just message? We answer WhatsApp faster than email.
              </p>
              <Button
                href={site.whatsappLink}
                external
                variant="outline"
                className="mt-4 w-full"
              >
                <Whatsapp className="h-4 w-4 text-[#25D366]" />
                {site.whatsappNumber}
              </Button>
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}
