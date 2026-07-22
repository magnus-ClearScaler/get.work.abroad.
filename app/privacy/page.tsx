import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { PageHeader } from "@/components/PageHeader";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How Get Work Abroad handles the personal data you send us when you apply.",
};

/*
 * Plain-language starting point, not legal advice. Have this reviewed against
 * GDPR and the company's actual registered details before launch.
 */

const sections = [
  {
    h: "What we collect",
    p: "The details you give us when you apply: your name, email address, phone number, native language, the countries and roles you are interested in, anything you write in the message field, and your CV if you send one.",
  },
  {
    h: "Why we collect it",
    p: "To match you against open vacancies, to contact you about them, and to introduce you to an employer if you want us to. That is the whole of it.",
  },
  {
    h: "Who we share it with",
    p: "Employers we are introducing you to, and only after you have agreed to that specific introduction. We do not sell your data and we do not pass it to third parties for marketing.",
  },
  {
    h: "How long we keep it",
    p: "Two years from your last contact with us, so that we can come back to you when something suitable appears. Ask us to delete it sooner and we will.",
  },
  {
    h: "Your rights",
    p: "You can ask to see the data we hold on you, ask us to correct it, or ask us to delete it entirely. Email us and we will action it.",
  },
  {
    h: "Contact",
    p: `Email ${site.email} for anything relating to your data.`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Privacy"
        title="What we do with your details"
        intro="Short version: we use them to find you a job and nothing else."
      />
      <Container className="py-16 sm:py-20">
        <div className="max-w-2xl space-y-10">
          {sections.map((s) => (
            <section key={s.h}>
              <h2 className="h-section text-[1.35rem]">{s.h}</h2>
              <p className="mt-3 text-[1.0625rem] leading-relaxed text-pretty text-[color:var(--color-body)]">
                {s.p}
              </p>
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}
