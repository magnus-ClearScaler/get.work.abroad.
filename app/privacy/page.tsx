import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Container } from "@/components/ui";
import { PageHeader } from "@/components/PageHeader";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How Get Work Abroad handles your details and your CV: what we collect, the legal basis for it, who it is shared with, how long we keep it, how we protect it, and your rights under the GDPR."
};

/*
 * Plain-language GDPR notice, not legal advice. It covers the elements a
 * candidate-facing recruiter is required to disclose: controller, what is
 * collected, the lawful basis, recipients, storage and transfers, retention,
 * security, and the full set of data-subject rights. It is written to match
 * the GDPR obligations our recruitment partners set out in their own policies,
 * since a CV that comes in here can be passed on to one of them.
 *
 * TODO(Magnus): still outstanding before a lawyer sign-off —
 *  · the registered legal name, company number and registered address. The
 *    controller's full identity is legally required. The page states the
 *    trading name and a working contact, and claims nothing it does not have,
 *    so there is no false statement in the meantime — but add these to the
 *    "Who is responsible" section as soon as the entity is registered;
 *  · if the set of clients grows beyond the current partner arrangement,
 *    revisit "Where your CV goes" so it still describes what actually happens.
 */

type Section = {
  h: string;
  p: ReactNode;
  list?: string[];
  after?: string;
};

const sections: Section[] = [
  {
    h: "Who is responsible for your data",
    p: `${site.name} is the data controller for what you send us through this site: we decide what is collected and why. Any question about your data, or any request under the rights below, can go to ${site.email}, and a person answers it.`,
  },
  {
    h: "What we collect",
    p: "Only what you hand us on the form: your name, email and phone; your native language; whether you hold an EU passport or the right to work in the EU; how soon you could move and how set you are on moving; your level of English; whether you have lived or worked abroad before; the countries and roles you are open to; anything you write in the message field; and your CV, with whatever it contains. No tracking pixel, and no profile built from your browsing.",
  },
  {
    h: "Why we are allowed to use it",
    p: "Under the GDPR we rely on your consent for the heart of it: the box you tick when you send the form, letting us hold your details and pass your CV to a client. You can withdraw that consent at any time. Running the service around it (replying to you, keeping our own records straight, and meeting any legal obligation we are under) rests on our legitimate interest as a recruiter. We never share your CV with a client before you have consented to it.",
  },
  {
    h: "Where your CV goes",
    p: "The roles listed here come from a range of clients and recruitment partners. When you apply, your details and CV go to the partner or client behind that role so they can consider you for it. That is what applying is for, and what you agree to when you send the form. From that point they also hold your data, under their own privacy notice. We never sell your data, and we never pass it to marketing lists.",
  },
  {
    h: "Where it is held",
    p: "Your details and CV are stored on secure infrastructure in the European Union (Sweden), plus with the recruitment partner or client whose role you applied for. If any provider we use ever needs to process your data outside the European Economic Area, we only allow it under the safeguards the GDPR requires, such as Standard Contractual Clauses.",
  },
  {
    h: "How long we keep it",
    p: "We keep your details for up to two years from your last contact with us, and your CV is deleted on request or after two years, whichever comes first, unless the law requires us to keep something longer. Ask us to delete it sooner and we will.",
  },
  {
    h: "How we keep it safe",
    p: "Your data travels to us encrypted, and your CV sits in private storage that is never publicly listed: it is only ever reached through short-lived, single-use links. Access is limited to the Get Work Abroad team, and every time a CV is opened, downloaded or exported it is recorded, so access to your data is always accountable.",
  },
  {
    h: "Your rights",
    p: "Under the GDPR you can ask us to:",
    list: [
      "see the data we hold on you (access);",
      "correct anything wrong or incomplete (rectification);",
      "delete it, the right to be forgotten (erasure);",
      "pause how we use it while something is sorted out (restriction);",
      "stop us using it for a particular purpose (objection);",
      "receive a copy in a portable format, or have it sent on (portability);",
      "withdraw a consent you gave, at any time, without affecting what was lawful beforehand.",
    ],
    after: `To use any of these, email ${site.email}. We action requests normally within a few days and always within one month. If you are not happy with how we have handled your data, you can also complain to the data protection authority in your country.`,
  },
  {
    h: "Cookies",
    p: "This site sets no tracking or advertising cookies, so there is no consent banner to click through. We do not follow you around the web or build an advertising profile from your visit.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Privacy"
        title="What we do with your details"
        intro="Short version: we use your details to put you in front of the client whose role you applied for, and nothing else."
      />
      <Container className="py-16 sm:py-20">
        <div className="max-w-2xl space-y-10">
          {sections.map((s) => (
            <section key={s.h}>
              <h2 className="h-section text-[1.35rem]">{s.h}</h2>
              <p className="mt-3 text-[1.0625rem] leading-relaxed text-pretty text-[color:var(--color-body)]">
                {s.p}
              </p>
              {s.list ? (
                <ul className="mt-4 space-y-3">
                  {s.list.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--color-sun-400)]"
                      />
                      <span className="text-[1.0625rem] leading-relaxed text-pretty text-[color:var(--color-body)]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}
              {s.after ? (
                <p className="mt-4 text-[1.0625rem] leading-relaxed text-pretty text-[color:var(--color-body)]">
                  {s.after}
                </p>
              ) : null}
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}
