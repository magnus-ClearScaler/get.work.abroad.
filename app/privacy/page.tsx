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
 * TODO(Magnus): this is a plain-language starting point, not legal advice.
 * Before promoting the site it needs the company's registered legal name,
 * company number and registered address filled in below, and a lawyer's eye
 * over it against GDPR. A recruitment site collecting CVs is squarely in
 * scope, and the controller identity is legally required.
 */

const sections = [
  {
    h: "Who is responsible for your data",
    p: `${site.name} is the data controller for everything you send us through this site. Our registered legal name, company number and registered address are listed at the bottom of this page. Any question about your data can go to ${site.email} and a person will answer it.`,
  },
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
    h: "How your application reaches us",
    p: "The application form on this site opens WhatsApp with your details ready to send, so that message travels over WhatsApp and is subject to their encryption and privacy terms as well as ours. If you would rather not use WhatsApp, email us instead — the option is offered on the same screen.",
  },
  {
    h: "Where your data is held",
    p: "Within the EU and the UK. If an employer we introduce you to is outside that area, we will tell you before anything is sent.",
  },
  {
    h: "How long we keep it",
    p: "Two years from your last contact with us, so that we can come back to you when something suitable appears. Ask us to delete it sooner and we will.",
  },
  {
    h: "Your rights",
    p: "You can ask to see the data we hold on you, ask us to correct it, ask us to delete it entirely, or withdraw your consent at any time. Email us and we will action it, normally within a few days and always within one month. If you are not satisfied with how we handle it, you have the right to complain to the data protection authority in your country.",
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
          <section className="rounded-2xl border border-[color:var(--color-sun-200)] bg-[color:var(--color-sun-100)] p-6">
            <h2 className="font-[family-name:var(--font-display)] text-[1.0625rem] font-semibold tracking-[-0.015em] text-[color:var(--color-sun-600)]">
              Company details to be published here
            </h2>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-[color:var(--color-body)]">
              Registered legal name, company registration number and registered
              address. Required before this notice is complete.
            </p>
          </section>
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
