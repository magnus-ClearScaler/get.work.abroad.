import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Container } from "@/components/ui";
import { PageHeader } from "@/components/PageHeader";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How Get Work Abroad handles your details and your CV, and who they are shared with when you apply."
};

/*
 * TODO(Magnus): plain-language notice, not legal advice. Still outstanding
 * before this is promoted:
 *  · the registered legal name, company number and registered address. The
 *    controller identity is legally required in the notice. Nothing on the
 *    page claims they are there, so there is no false statement in the
 *    meantime — but they still need adding, as a section at the end;
 *  · if the set of clients grows beyond the current freelance arrangement,
 *    revisit "Where your CV goes" so it still describes what actually
 *    happens;
 *  · a lawyer's eye over the consent model. Passing a CV to the client is
 *    lawful and expected, but it rests on consent that is specific and
 *    informed, which is why the tick box on the form names it plainly.
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
    p: "Only what you hand us: your name, email, phone, native language, the countries and roles you are open to, anything you write in the message field, and your CV. No tracking pixel, no profile built from your browsing.",
  },
  {
    h: "Where your CV goes",
    p: "The roles listed here come from a range of clients and recruitment firms. When you apply, your details and CV go to the client behind that role so they can consider you for it — that is what applying is for, and it is what you agree to when you send the form. From that point they hold your data under their own privacy notice. We never sell your data and we never pass it to marketing lists.",
  },
  {
    h: "Where it is held, and for how long",
    p: "Within the EU and the UK, and with the client whose role you applied for. We keep it for two years from your last contact with us, then delete it. Ask us to delete it sooner and we will.",
  },
  {
    h: "Your rights",
    p: `You can ask to see what we hold on you, correct it, delete it, or withdraw your consent. Email ${site.email} and we will action it, normally within a few days and always within a month. If you are not happy with how we handle it, you can complain to the data protection authority in your country.`,
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
