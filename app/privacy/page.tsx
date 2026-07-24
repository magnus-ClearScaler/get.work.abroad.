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
    p: `${site.name} is the data controller for everything you send us through this site, which means we decide what is collected, what happens to it and who else ever sees it. Anything you want to ask about your data can go to ${site.email}, and a person answers it.`,
  },
  {
    h: "What we collect",
    p: "Only what you hand us. There is no tracking pixel, no advertising network and no profile built from your browsing:",
    list: [
      "Your name, email address and phone or WhatsApp number",
      "Your native language, and the countries and types of role you are open to",
      "Anything you choose to write in the message field",
      "Your CV, if you send one — including whatever you have put in it",
    ],
  },
  {
    h: "What you are agreeing to when you send us your CV",
    p: "This is the part most recruitment sites bury, so we will put it first. A CV is only useful to you if it reaches people who are hiring. When you send yours, you are asking us to do that, and you are agreeing that we may pass your details and your CV to two kinds of organisation:",
    list: [
      "Employers with a live vacancy that fits you — the companies whose roles are listed on this site, and others we work with directly",
      "Recruitment agencies in our partner network, who hold vacancies we do not, and who may contact you about their own roles",
    ],
    after:
      "We say this here, on the application page, and in the tick box you have to complete before the form will send. Nobody should discover it afterwards.",
  },
  {
    h: "Why we pass it on, and the limits on it",
    p: "The network exists because no single agency sees every vacancy. A Dutch speaker we cannot place in Lisbon this month is often someone a partner can place in Athens next week, and passing the CV on is the difference between you hearing about that role and never knowing it existed. The limits we hold ourselves to:",
    list: [
      "We only pass your CV to a partner who is actually recruiting for your language, and for countries and roles that match what you told us you want",
      "We tell you which partners we have passed it to, if you ask",
      "A partner may contact you about their own vacancies. From that point they are responsible for your data under their own privacy notice, and you can deal with them directly",
      "We never sell your data, and we never pass it to advertisers, marketing lists or data brokers. Nobody pays us for your CV — we are paid by an employer, only when you are hired",
    ],
  },
  {
    h: "How to say no, or change your mind",
    p: `You can ask us to keep your CV to our own introductions and not send it to the partner network. Email ${site.email}, or simply say so in the message field when you apply, and that is how it will be handled. It does not change the service you get from us and it does not go in a file somewhere as a black mark. You can also withdraw your consent entirely at any time, and we will stop using your data and delete it — though we cannot claw back an introduction that has already been made, which is why the tick box comes before the send button rather than after it.`,
  },
  {
    h: "What our legal basis is",
    p: "Your consent, given by that tick box, for holding your details and for passing them to employers and partner agencies. Where we are already talking to you about a specific role, we also rely on taking steps at your request before entering a contract. Consent given can be withdrawn, and withdrawing it costs you nothing.",
  },
  {
    h: "How your application reaches us",
    p: "The application form opens WhatsApp with your details ready to send, so that message travels over WhatsApp and is subject to their encryption and privacy terms as well as ours. If you would rather not use WhatsApp, email us instead — the option is offered on the same screen, and it is the better route for attaching a CV.",
  },
  {
    h: "Where your data is held",
    p: "Within the EU and the UK. Our partner agencies and the employers we introduce you to are in Spain, Portugal, Greece and elsewhere in Europe. If an introduction would send your CV outside the EU or UK, we will tell you before anything is sent.",
  },
  {
    h: "How long we keep it",
    p: "Two years from your last contact with us, so that we can come back to you when something suitable appears, then we delete it. Ask us to delete it sooner and we will, without asking you why.",
  },
  {
    h: "Your rights",
    p: "You can ask to see the data we hold on you, ask us to correct it, ask us to delete it entirely, ask us to stop passing it to partners, or withdraw your consent altogether. Email us and we will action it, normally within a few days and always within one month. If you are not satisfied with how we have handled it, you have the right to complain to the data protection authority in your own country.",
  },
  {
    h: "Contact",
    p: `Email ${site.email} for anything at all relating to your data. It reaches a person, not a ticket queue.`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Privacy"
        title="What we do with your details"
        intro="Short version: we use your CV to get you in front of people who are hiring — including recruitment partners beyond us — and nothing else. The long version is below, and you can opt out of the network part at any time."
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
