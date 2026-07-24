import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Container } from "@/components/ui";
import { PageHeader } from "@/components/PageHeader";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How Get Work Abroad handles your details and your CV, including who we pass them to and how to say no.",
};

/*
 * TODO(Magnus): plain-language notice, not legal advice. Still outstanding
 * before this is promoted:
 *  · the registered legal name, company number and registered address. The
 *    controller identity is legally required in the notice. Nothing on the
 *    page claims they are there, so there is no false statement in the
 *    meantime — but they still need adding, as a section at the end;
 *  · the list of partner agencies, or at least the criteria by which one
 *    joins the network, if you want to name them rather than describe them;
 *  · a lawyer's eye over the consent model. Sharing a CV onward to other
 *    agencies is lawful, but it rests on consent that is specific and freely
 *    given — which is why the tick box on the form now spells it out and why
 *    "network introductions" can be declined without losing the service.
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
    p: `${site.name} is the data controller for what you send us through this site. Any question about your data can go to ${site.email}, and a person answers it.`,
  },
  {
    h: "What we collect",
    p: "Only what you hand us: your name, email, phone, native language, the countries and roles you are open to, anything you write in the message field, and your CV. No tracking pixel, no profile built from your browsing. The form opens WhatsApp, so that message travels under their terms as well as ours — email us instead if you would rather it did not.",
  },
  {
    h: "Where your CV goes",
    p: "A CV is only useful if it reaches people who are hiring. When you send yours, you agree that we may pass it and your details to:",
    list: [
      "Employers with a live vacancy that fits you",
      "Recruitment agencies in our partner network, who hold roles we do not and may contact you about their own",
    ],
    after:
      "We only pass it to a partner recruiting for your language, country and kind of role, and we will tell you which ones if you ask. Once they have it they are responsible for it under their own privacy notice. We never sell your data or pass it to marketing lists — we are paid by an employer, only when you are hired.",
  },
  {
    h: "If you would rather we did not",
    p: `Tell us to keep your CV to our own introductions and that is how it will be handled — email ${site.email}, or just say so in the message field when you apply. It changes nothing about the service you get. You can withdraw your consent altogether at any time, though we cannot recall an introduction already made.`,
  },
  {
    h: "Where it is held, and for how long",
    p: "Within the EU and the UK, and with the employers and partner agencies we introduce you to in Spain, Portugal and Greece. We keep it for two years from your last contact with us, then delete it. Ask us to delete it sooner and we will.",
  },
  {
    h: "Your rights",
    p: `You can ask to see what we hold on you, correct it, delete it, stop the partner introductions, or withdraw the consent you gave with the tick box. Email ${site.email} and we will action it, normally within a few days and always within a month. If you are not happy with how we handle it, you can complain to the data protection authority in your country.`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Privacy"
        title="What we do with your details"
        intro="Short version: we use your CV to get you in front of people who are hiring, including partner agencies beyond us, and nothing else. You can opt out of that part at any time."
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
