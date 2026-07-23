import { Container, SectionHead, Faq, Button } from "@/components/ui";
import { Whatsapp } from "@/components/Icons";
import { site } from "@/lib/site";

export const homeFaq = [
  {
    q: "Does this cost me anything?",
    a: "No. We are paid by the employer when you are hired, so there is no fee to you at any stage. If anyone ever asks you to pay for a job placement, walk away.",
  },
  {
    q: "Do I need to speak Spanish, Portuguese or Greek?",
    a: "No. You work in your native language and you will need English at around B2 for training and internal communication. Most employers pay for local language classes once you have settled in.",
  },
  {
    q: "Do I need call-centre or customer service experience?",
    a: "For most roles, no. Employers hire on language and attitude and then train you for three to four weeks on full pay. Technical and sales roles sometimes ask for a little relevant background, and the listing will say so.",
  },
  {
    q: "What paperwork do I need?",
    a: "An EU passport, or an existing right to work in the country. Once you are hired you will need a local tax and social security number: a NIE in Spain, a NIF in Portugal, an AFM in Greece. Employers who hire internationally normally book those appointments with you.",
  },
  {
    q: "How long does the whole process take?",
    a: "Usually two to six weeks from first call to first day, depending on the employer and how quickly you can travel. Some intakes run every fortnight, others monthly.",
  },
  {
    q: "What if I do not see my language listed?",
    a: "Send an open application anyway. Vacancies change weekly and we frequently get asked for languages that were not on the site the day before.",
  },
];

export function HomeFaq() {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <SectionHead
              eyebrow="Questions"
              title="The things people ask us first"
            />
            <div className="mt-8 rounded-2xl border border-[color:var(--color-line)] bg-white p-6 shadow-[var(--shadow-card)]">
              <p className="text-[0.9375rem] leading-relaxed text-[color:var(--color-body)]">
                Not covered here? Message us on WhatsApp. A person answers, and
                usually within the hour.
              </p>
              <Button
                href={site.whatsappLink}
                external
                variant="outline"
                className="mt-5 w-full sm:w-auto"
              >
                <Whatsapp className="h-4 w-4 text-[#25D366]" />
                {site.whatsappNumber}
              </Button>
            </div>
          </div>

          <Faq items={homeFaq} />
        </div>
      </Container>
    </section>
  );
}
