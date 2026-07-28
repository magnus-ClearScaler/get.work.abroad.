import { site } from "@/lib/site";
import { homeFaq } from "@/components/home/HomeFaq";

/**
 * JSON-LD for the things Google can safely show as rich results today.
 *
 * Deliberately NOT here: JobPosting. The vacancies in lib/jobs.ts are
 * placeholders, and marking them up would push them into Google for Jobs as if
 * they were live. That schema goes in the day the array holds confirmed roles —
 * see the note in app/jobs/[slug]/page.tsx.
 */
export function OrganizationSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    description:
      "Recruitment for native Dutch, German and Scandinavian speakers into permanent, relocation-covered roles in Spain, Portugal and Greece.",
    email: site.email,
    areaServed: ["ES", "PT", "GR"],
    /* sameAs omitted until the real, verified social handles exist — pointing
       Google at guessed URLs is worse than pointing it nowhere. */
  };
  return (
    <script
      type="application/ld+json"
      // Server-rendered, static, no user input — safe to inline.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** The homepage FAQ, marked up so it can win an expandable result. */
export function FaqSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homeFaq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
