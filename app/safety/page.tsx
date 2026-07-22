import type { Metadata } from "next";
import { Container, Button, SectionHead } from "@/components/ui";
import { PageHeader } from "@/components/PageHeader";
import { Check, Close, Shield, Whatsapp } from "@/components/Icons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Your safety",
  description:
    "How to tell a legitimate recruiter from a scam, what Get Work Abroad will and will not ask you for, and what to do if someone contacts you pretending to be us.",
};

/* Recruitment fraud follows the same handful of patterns everywhere. Naming
   them plainly protects candidates and is worth more than any trust badge. */

const never = [
  "Ask you to pay a fee, a deposit, a 'registration', a visa charge or a training cost. Not before, not after. The employer pays us.",
  "Ask for your bank details, card number or a payment of any kind.",
  "Ask for a copy of your passport or ID before you have an actual offer from an employer.",
  "Send your CV to an employer without asking you first.",
  "Pressure you to accept a role the same day, or tell you an offer expires in hours.",
  "Contact you from a personal Gmail, Hotmail or Outlook address about a role.",
];

const willAsk = [
  "Your CV, and the languages you speak",
  "Which countries and cities you would consider",
  "Your phone number and email so a recruiter can reach you",
  "Once you have an offer: the documents that employer legitimately needs for a contract",
];

const redFlags = [
  {
    flag: "Any request for money",
    why: "This is the big one. In the EU it is illegal to charge a candidate a fee for finding them work. If money is mentioned at any point, stop.",
  },
  {
    flag: "A job offer with no interview",
    why: "Real employers interview. An offer that arrives after one message, with a contract attached and a deposit request, is a scam.",
  },
  {
    flag: "Being asked to pay for your own flight or accommodation up front, with a promise of reimbursement",
    why: "Genuine relocation packages either book the flight for you or reimburse it after you start. They do not ask you to wire money to a third party first.",
  },
  {
    flag: "Pressure and urgency",
    why: "Fraud runs on urgency because it stops you checking. A legitimate recruiter will happily wait while you verify who they are.",
  },
  {
    flag: "Messages riddled with errors, or a company name that is almost right",
    why: "Look closely at spelling in the domain and the company name. Impersonation usually relies on you not looking twice.",
  },
  {
    flag: "A request to move to a channel you did not choose, then to install something",
    why: "Never install software or click a download to 'complete an application'.",
  },
];

export default function SafetyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Your safety"
        title="How to tell we are real, and how to spot the people who are not"
        intro="Recruitment fraud targets people moving abroad specifically, because you are dealing with a new country, an unfamiliar language and a lot of paperwork. Here is exactly what we will and will not do, so you have something to measure anyone against."
      >
        <div className="mt-8 rounded-2xl border border-[color:var(--color-sea-200)] bg-[color:var(--color-sea-50)] p-6">
          <p className="flex items-start gap-3 text-[1.0625rem] leading-relaxed font-medium text-[color:var(--color-sea-900)]">
            <Shield className="mt-0.5 h-6 w-6 shrink-0 text-[color:var(--color-sea-600)]" />
            <span>
              We never charge candidates a fee, for anything, at any stage. If
              anyone claiming to be {site.name} asks you for money, it is not
              us. Tell us and we will help you report it.
            </span>
          </p>
        </div>
      </PageHeader>

      {/* ── Never / will ────────────────────────────────────────── */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="rounded-2xl border border-[color:var(--color-line)] bg-white p-7 shadow-[var(--shadow-card)] sm:p-9">
              <h2 className="h-section text-[1.35rem]">
                We will never
              </h2>
              <ul className="mt-6 space-y-4">
                {never.map((n) => (
                  <li key={n} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[color:var(--color-terra-100)] text-[color:var(--color-terra-600)]">
                      <Close className="h-3 w-3" />
                    </span>
                    <span className="text-[0.9375rem] leading-relaxed text-pretty text-[color:var(--color-body)]">
                      {n}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-[color:var(--color-line)] bg-white p-7 shadow-[var(--shadow-card)] sm:p-9">
              <h2 className="h-section text-[1.35rem]">
                What we will actually ask for
              </h2>
              <ul className="mt-6 space-y-4">
                {willAsk.map((n) => (
                  <li key={n} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[color:var(--color-sea-50)] text-[color:var(--color-sea-600)]">
                      <Check className="h-3 w-3" />
                    </span>
                    <span className="text-[0.9375rem] leading-relaxed text-pretty text-[color:var(--color-body)]">
                      {n}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-7 border-t border-[color:var(--color-line-soft)] pt-5 text-[0.9375rem] leading-relaxed text-[color:var(--color-body)]">
                That is the whole list. If a request falls outside it, ask us
                about it before you act on it.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Red flags ───────────────────────────────────────────── */}
      <section className="border-y border-[color:var(--color-line)] bg-white py-20 sm:py-28">
        <Container>
          <SectionHead
            eyebrow="Warning signs"
            title="Six things that should stop you immediately"
            intro="These apply to any recruiter, not just us. If you learn only one thing from this page, make it the first one."
          />
          <ol className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {redFlags.map((r, i) => (
              <li
                key={r.flag}
                className="border-t border-[color:var(--color-line)] pt-5"
              >
                <span className="font-[family-name:var(--font-display)] text-[0.8125rem] font-bold tracking-[0.14em] text-[color:var(--color-terra-500)] uppercase">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-[family-name:var(--font-display)] text-[1.15rem] leading-snug font-semibold tracking-[-0.015em] text-balance text-[color:var(--color-ink)]">
                  {r.flag}
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-pretty text-[color:var(--color-body)]">
                  {r.why}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* ── Verify us ───────────────────────────────────────────── */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
            <div>
              <SectionHead
                eyebrow="Check us"
                title="How to confirm you are talking to us"
              />
              <div className="mt-8 space-y-5 text-[1.0625rem] leading-relaxed text-pretty text-[color:var(--color-body)]">
                <p>
                  Our only WhatsApp number is{" "}
                  <strong className="text-[color:var(--color-ink)]">
                    {site.whatsappNumber}
                  </strong>
                  . Our only email address is{" "}
                  <strong className="text-[color:var(--color-ink)]">
                    {site.email}
                  </strong>
                  . If a message comes from anywhere else, it is not us, however
                  convincing it looks.
                </p>
                <p>
                  You are always welcome to stop mid-conversation and check.
                  Message the number above and ask whether the person contacting
                  you actually works here. We would far rather answer that
                  question than have you take a risk.
                </p>
                <p>
                  If you think you have been targeted by someone using our name,
                  tell us. We will confirm whether it was us, and help you report
                  it to the right place in the country you are in.
                </p>
              </div>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button href={site.whatsappLink} external>
                  <Whatsapp className="h-4 w-4" />
                  Check with us on WhatsApp
                </Button>
                <Button href="/privacy" variant="outline">
                  What we do with your data
                </Button>
              </div>
            </div>

            <div className="rounded-2xl bg-[color:var(--color-sand-100)] p-7 sm:p-9 lg:h-fit">
              <h3 className="h-section text-[1.2rem]">
                Your rights when you apply
              </h3>
              <ul className="mt-5 space-y-3.5">
                {[
                  "Your CV goes to an employer only when you have agreed to that specific introduction.",
                  "You can ask what we hold on you, correct it, or have it deleted, at any time.",
                  "You can withdraw from a process at any point without giving a reason.",
                  "You can ask us what a role pays before you interview, and we will tell you.",
                ].map((r) => (
                  <li key={r} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white text-[color:var(--color-sea-600)]">
                      <Check className="h-3 w-3" />
                    </span>
                    <span className="text-[0.9375rem] leading-relaxed text-[color:var(--color-body)]">
                      {r}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
