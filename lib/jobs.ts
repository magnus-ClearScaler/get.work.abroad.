import type { CountrySlug } from "./destinations";

/**
 * ─────────────────────────────────────────────────────────────────────────
 * PLACEHOLDER VACANCIES.
 *
 * These are representative of the roles Get Work Abroad recruits for, but
 * none of them is a live, confirmed vacancy. Replace this array with real
 * listings before driving traffic to the site — nothing else needs to
 * change, every page reads from here.
 * ─────────────────────────────────────────────────────────────────────────
 */

export type Job = {
  slug: string;
  title: string;
  language: string;
  category: string;
  country: CountrySlug;
  countryName: string;
  flag: string;
  city: string;
  photo: string;
  alt: string;
  contract: string;
  model: "On-site" | "Hybrid" | "Remote";
  salary: string;
  start: string;
  featured?: boolean;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  package: string[];
};

export const jobs: Job[] = [
  {
    slug: "dutch-customer-advisor-lisbon",
    title: "Dutch-speaking Customer Advisor",
    language: "Dutch",
    category: "Customer advisor",
    country: "portugal",
    countryName: "Portugal",
    flag: "🇵🇹",
    city: "Lisbon",
    photo: "/photos/lisbon-funicular.jpg",
    alt: "Yellow funicular climbing a colourful Lisbon street",
    contract: "Permanent",
    model: "Hybrid",
    salary: "€1,300 to €1,550 net per month, plus performance bonus",
    start: "Intakes every two weeks",
    featured: true,
    summary:
      "Support Dutch customers of a large European consumer brand from its Lisbon service hub. Full relocation package, paid training, and a permanent Portuguese contract from day one.",
    responsibilities: [
      "Answer customer questions in Dutch by phone, email and chat",
      "Resolve billing, order and account issues end to end",
      "Log cases accurately and flag recurring problems to the product team",
      "Hit quality and satisfaction targets rather than raw call counts",
    ],
    requirements: [
      "Native or near-native Dutch",
      "English at B2 or better",
      "EU passport or the right to work in Portugal",
      "Comfortable working shifts within the service window",
      "No previous call-centre experience required",
    ],
    package: [
      "Flight to Lisbon reimbursed",
      "First weeks of accommodation covered, plus help finding a flat",
      "Paid four-week training",
      "Private health insurance after probation",
      "Meal allowance on top of salary",
      "Annual return flight home",
    ],
  },
  {
    slug: "german-technical-support-athens",
    title: "German-speaking Technical Support",
    language: "German",
    category: "Technical support",
    country: "greece",
    countryName: "Greece",
    flag: "🇬🇷",
    city: "Athens",
    photo: "/photos/athens-golden.jpg",
    alt: "The Acropolis at golden hour above Athens",
    contract: "Permanent",
    model: "On-site",
    salary: "€1,250 to €1,450 net per month, plus bonus",
    start: "Intakes monthly",
    featured: true,
    summary:
      "First and second-line technical support in German for a consumer hardware brand, from a modern office in central Athens. One of the most complete relocation packages on the market.",
    responsibilities: [
      "Diagnose and resolve hardware and software issues over phone and chat",
      "Walk customers through setup, configuration and troubleshooting",
      "Escalate cleanly, with the detail the next team actually needs",
      "Keep the knowledge base honest and up to date",
    ],
    requirements: [
      "Native or near-native German",
      "English at B2 or better",
      "EU passport or the right to work in Greece",
      "Genuine interest in consumer tech",
      "Technical training is provided, prior experience is a plus not a must",
    ],
    package: [
      "Flight to Athens booked and paid",
      "Two weeks in a hotel on arrival",
      "Real help finding and signing a flat",
      "Paid Greek lessons",
      "Private health insurance",
      "14 salaries per year, as standard in Greece",
    ],
  },
  {
    slug: "french-customer-advisor-barcelona",
    title: "French-speaking Customer Advisor",
    language: "French",
    category: "Customer advisor",
    country: "spain",
    countryName: "Spain",
    flag: "🇪🇸",
    city: "Barcelona",
    photo: "/photos/barcelona-beach-city.jpg",
    alt: "Barcelona seen from above where the city meets the beach",
    contract: "Permanent",
    model: "Hybrid",
    salary: "€22,000 to €25,000 gross per year, plus bonus",
    start: "Rolling intakes",
    featured: true,
    summary:
      "Look after French customers for an international travel platform from its Barcelona hub. Hybrid after training, permanent Spanish contract, and a team of about forty nationalities.",
    responsibilities: [
      "Handle booking changes, cancellations and complaints in French",
      "Work with airline and hotel partners to fix problems for customers",
      "Spot the cases that need a human decision rather than a script",
      "Contribute to how the team improves its own process",
    ],
    requirements: [
      "Native or near-native French",
      "English at B2 or better",
      "EU passport or the right to work in Spain",
      "Customer-facing experience in any sector is welcome",
    ],
    package: [
      "Relocation allowance towards flight and first month",
      "Support with NIE and social security appointments",
      "Paid three-week training",
      "Private health insurance",
      "Hybrid working after training",
      "Discounted travel through the platform",
    ],
  },
  {
    slug: "italian-customer-advisor-malaga",
    title: "Italian-speaking Customer Advisor",
    language: "Italian",
    category: "Customer advisor",
    country: "spain",
    countryName: "Spain",
    flag: "🇪🇸",
    city: "Málaga",
    photo: "/photos/malaga-beach.jpg",
    alt: "Palm-lined beach promenade in Málaga",
    contract: "Permanent",
    model: "Hybrid",
    salary: "€20,000 to €23,000 gross per year, plus bonus",
    start: "Intakes monthly",
    featured: true,
    summary:
      "Join the Italian desk of a fintech service hub in Málaga. Lower cost of living than Barcelona, the same contract, and the beach is a fifteen-minute walk from the office.",
    responsibilities: [
      "Support Italian customers with accounts, cards and payments",
      "Handle identity and fraud checks carefully and to the letter",
      "Explain financial products in plain Italian",
      "Keep records that stand up to a compliance review",
    ],
    requirements: [
      "Native or near-native Italian",
      "English at B2 or better",
      "EU passport or the right to work in Spain",
      "Comfortable with detail and process",
    ],
    package: [
      "Relocation allowance",
      "Support with NIE and social security appointments",
      "Paid four-week training",
      "Private health insurance",
      "Hybrid working after training",
      "Language classes on the company",
    ],
  },
  {
    slug: "swedish-customer-advisor-lisbon",
    title: "Swedish-speaking Customer Advisor",
    language: "Swedish",
    category: "Customer advisor",
    country: "portugal",
    countryName: "Portugal",
    flag: "🇵🇹",
    city: "Lisbon",
    photo: "/photos/lisbon-tram.jpg",
    alt: "A yellow tram on a sunlit Lisbon street",
    contract: "Permanent",
    model: "Hybrid",
    salary: "€1,400 to €1,650 net per month, plus bonus",
    start: "Intakes every two weeks",
    summary:
      "Nordic-language roles carry the strongest packages in Lisbon because there are fewer speakers on the ground. Full relocation, permanent contract, and a short flight home.",
    responsibilities: [
      "Support Swedish customers by phone, email and chat",
      "Own each case through to resolution",
      "Work with the Nordic team on translations and tone",
    ],
    requirements: [
      "Native or near-native Swedish",
      "English at B2 or better",
      "EU passport or the right to work in Portugal",
    ],
    package: [
      "Flight to Lisbon reimbursed",
      "Accommodation covered on arrival",
      "Paid training",
      "Private health insurance",
      "Meal allowance",
      "Annual return flight home",
    ],
  },
  {
    slug: "norwegian-customer-advisor-athens",
    title: "Norwegian-speaking Customer Advisor",
    language: "Norwegian",
    category: "Customer advisor",
    country: "greece",
    countryName: "Greece",
    flag: "🇬🇷",
    city: "Athens",
    photo: "/photos/athens-acropolis-city.jpg",
    alt: "The Acropolis above Athens with the sea beyond",
    contract: "Permanent",
    model: "On-site",
    salary: "€1,400 to €1,700 net per month, plus bonus",
    start: "Intakes monthly",
    summary:
      "One of the best-paid language desks in Athens relative to what living there costs. Flight, hotel on arrival and flat-hunting support all included.",
    responsibilities: [
      "Support Norwegian customers across phone, email and chat",
      "Resolve account and service issues end to end",
      "Feed recurring problems back to the client team",
    ],
    requirements: [
      "Native or near-native Norwegian",
      "English at B2 or better",
      "EU passport or the right to work in Greece",
    ],
    package: [
      "Flight to Athens booked and paid",
      "Two weeks in a hotel on arrival",
      "Help finding and signing a flat",
      "Paid Greek lessons",
      "Private health insurance",
      "14 salaries per year",
    ],
  },
  {
    slug: "danish-content-review-lisbon",
    title: "Danish-speaking Content Reviewer",
    language: "Danish",
    category: "Content review",
    country: "portugal",
    countryName: "Portugal",
    flag: "🇵🇹",
    city: "Lisbon",
    photo: "/photos/lisbon-azulejo.jpg",
    alt: "A tiled azulejo façade in Lisbon",
    contract: "Permanent",
    model: "On-site",
    salary: "€1,350 to €1,600 net per month, plus bonus",
    start: "Intakes monthly",
    summary:
      "Review Danish-language content against platform policy for a major social platform's Lisbon trust and safety hub. Structured work, clear guidelines, strong wellbeing support.",
    responsibilities: [
      "Review reported content against written policy",
      "Apply guidelines consistently and document the call",
      "Flag policy gaps and edge cases to the policy team",
    ],
    requirements: [
      "Native or near-native Danish",
      "English at B2 or better",
      "EU passport or the right to work in Portugal",
      "Resilience. Some of the content is difficult, and support is provided",
    ],
    package: [
      "Flight to Lisbon reimbursed",
      "Accommodation covered on arrival",
      "Paid training",
      "Dedicated wellbeing and psychological support",
      "Private health insurance",
      "Meal allowance",
    ],
  },
  {
    slug: "finnish-customer-advisor-barcelona",
    title: "Finnish-speaking Customer Advisor",
    language: "Finnish",
    category: "Customer advisor",
    country: "spain",
    countryName: "Spain",
    flag: "🇪🇸",
    city: "Barcelona",
    photo: "/photos/barcelona-granvia.jpg",
    alt: "Gran Via in Barcelona at golden hour",
    contract: "Permanent",
    model: "Hybrid",
    salary: "€24,000 to €27,000 gross per year, plus bonus",
    start: "Rolling intakes",
    summary:
      "Finnish speakers are scarce in Barcelona and paid accordingly. Consumer electronics brand, hybrid after training, permanent Spanish contract.",
    responsibilities: [
      "Support Finnish customers with orders, returns and product questions",
      "Coordinate with logistics partners to resolve delivery issues",
      "Keep the Finnish knowledge base current",
    ],
    requirements: [
      "Native or near-native Finnish",
      "English at B2 or better",
      "EU passport or the right to work in Spain",
    ],
    package: [
      "Relocation allowance",
      "Support with NIE and social security appointments",
      "Paid training",
      "Private health insurance",
      "Hybrid working after training",
    ],
  },
  {
    slug: "german-inside-sales-barcelona",
    title: "German-speaking Inside Sales Representative",
    language: "German",
    category: "Inside sales",
    country: "spain",
    countryName: "Spain",
    flag: "🇪🇸",
    city: "Barcelona",
    photo: "/photos/barcelona-palms.jpg",
    alt: "Palm trees along the Barceloneta beachfront",
    contract: "Permanent",
    model: "Hybrid",
    salary: "€26,000 base, €36,000 on target",
    start: "Rolling intakes",
    summary:
      "Sell a B2B software product into the DACH market from Barcelona. Warm leads, a real career track into account management, and commission that is actually achievable.",
    responsibilities: [
      "Qualify inbound leads and run first calls in German",
      "Build a pipeline of small and mid-sized business accounts",
      "Run product demos and hand over cleanly to account executives",
      "Keep the CRM in a state someone else could pick up",
    ],
    requirements: [
      "Native or near-native German",
      "English at B2 or better",
      "EU passport or the right to work in Spain",
      "Some sales or customer-facing experience",
    ],
    package: [
      "Relocation allowance",
      "Uncapped commission",
      "Structured promotion path",
      "Private health insurance",
      "Hybrid working after ramp-up",
    ],
  },
  {
    slug: "dutch-travel-consultant-athens",
    title: "Dutch-speaking Travel Consultant",
    language: "Dutch",
    category: "Travel consultant",
    country: "greece",
    countryName: "Greece",
    flag: "🇬🇷",
    city: "Athens",
    photo: "/photos/greece-milos-cove.jpg",
    alt: "Fishing boats in a turquoise cove on Milos",
    contract: "Permanent",
    model: "On-site",
    salary: "€1,200 to €1,400 net per month, plus bonus",
    start: "Intakes monthly",
    summary:
      "Book and rebook holidays for Dutch travellers from Athens. Travel perks, full relocation package, and an office ten minutes from the metro.",
    responsibilities: [
      "Handle bookings, changes and cancellations in Dutch",
      "Work with airlines and hotels to sort disrupted trips",
      "Upsell where it genuinely improves the trip",
    ],
    requirements: [
      "Native or near-native Dutch",
      "English at B2 or better",
      "EU passport or the right to work in Greece",
    ],
    package: [
      "Flight to Athens booked and paid",
      "Hotel on arrival",
      "Help finding a flat",
      "Paid Greek lessons",
      "Staff travel discounts",
      "14 salaries per year",
    ],
  },
  {
    slug: "polish-customer-advisor-porto",
    title: "Polish-speaking Customer Advisor",
    language: "Polish",
    category: "Customer advisor",
    country: "portugal",
    countryName: "Portugal",
    flag: "🇵🇹",
    city: "Porto",
    photo: "/photos/porto-ribeira.jpg",
    alt: "Colourful riverside houses along the Douro in Porto",
    contract: "Permanent",
    model: "Hybrid",
    salary: "€1,150 to €1,350 net per month, plus bonus",
    start: "Intakes monthly",
    summary:
      "Porto is smaller and cheaper than Lisbon and a lot of people prefer it. Polish desk for an e-commerce brand, full relocation package, permanent contract.",
    responsibilities: [
      "Support Polish customers by phone, email and chat",
      "Resolve order, delivery and returns issues",
      "Keep case notes clean and useful",
    ],
    requirements: [
      "Native or near-native Polish",
      "English at B2 or better",
      "EU passport or the right to work in Portugal",
    ],
    package: [
      "Flight to Porto reimbursed",
      "Accommodation covered on arrival",
      "Paid training",
      "Private health insurance",
      "Meal allowance",
    ],
  },
  {
    slug: "turkish-technical-support-thessaloniki",
    title: "Turkish-speaking Technical Support",
    language: "Turkish",
    category: "Technical support",
    country: "greece",
    countryName: "Greece",
    flag: "🇬🇷",
    city: "Thessaloniki",
    photo: "/photos/greece-taverna-alley.jpg",
    alt: "Bougainvillea over a taverna terrace in a Greek alley",
    contract: "Permanent",
    model: "On-site",
    salary: "€1,100 to €1,300 net per month, plus bonus",
    start: "Intakes monthly",
    summary:
      "Technical support in Turkish from Thessaloniki, northern Greece. Cheaper than Athens, famously good food, and a large student population that keeps the city young.",
    responsibilities: [
      "Resolve technical issues by phone and chat in Turkish",
      "Guide customers through configuration and troubleshooting",
      "Escalate with clear reproduction steps",
    ],
    requirements: [
      "Native or near-native Turkish",
      "English at B2 or better",
      "The right to work in Greece",
    ],
    package: [
      "Flight booked and paid",
      "Hotel on arrival",
      "Help finding a flat",
      "Paid Greek lessons",
      "Private health insurance",
    ],
  },
  {
    slug: "french-back-office-valencia",
    title: "French-speaking Back Office Specialist",
    language: "French",
    category: "Back office",
    country: "spain",
    countryName: "Spain",
    flag: "🇪🇸",
    city: "Valencia",
    photo: "/photos/valencia-street.jpg",
    alt: "Old-town street in Valencia leading to the cathedral",
    contract: "Permanent",
    model: "Hybrid",
    salary: "€21,000 to €23,500 gross per year",
    start: "Rolling intakes",
    summary:
      "No phones. Document handling, verification and case administration in French, from Valencia. Suits people who would rather work through a queue than a call list.",
    responsibilities: [
      "Verify and process customer documentation in French",
      "Run checks against internal policy and flag exceptions",
      "Keep case records audit-ready",
    ],
    requirements: [
      "Native or near-native French",
      "English at B2 or better",
      "EU passport or the right to work in Spain",
      "Methodical, detail-driven approach",
    ],
    package: [
      "Relocation allowance",
      "Support with NIE and social security appointments",
      "Paid training",
      "Private health insurance",
      "Hybrid working after training",
    ],
  },
  {
    slug: "hebrew-customer-advisor-lisbon",
    title: "Hebrew-speaking Customer Advisor",
    language: "Hebrew",
    category: "Customer advisor",
    country: "portugal",
    countryName: "Portugal",
    flag: "🇵🇹",
    city: "Lisbon",
    photo: "/photos/lisbon-bridge.jpg",
    alt: "The 25 de Abril bridge over the Tagus in Lisbon",
    contract: "Permanent",
    model: "On-site",
    salary: "€1,450 to €1,700 net per month, plus bonus",
    start: "Intakes monthly",
    summary:
      "A small desk and a scarce language, which is why the package is what it is. Full relocation, permanent Portuguese contract, central Lisbon office.",
    responsibilities: [
      "Support Hebrew-speaking customers across channels",
      "Own cases end to end",
      "Support the wider team on translation and tone",
    ],
    requirements: [
      "Native or near-native Hebrew",
      "English at B2 or better",
      "The right to work in Portugal",
    ],
    package: [
      "Flight to Lisbon reimbursed",
      "Accommodation covered on arrival",
      "Paid training",
      "Private health insurance",
      "Meal allowance",
      "Annual return flight home",
    ],
  },
];

export const featuredJobs = jobs.filter((j) => j.featured);

export const jobBySlug = (slug: string) => jobs.find((j) => j.slug === slug);

export const jobsByCountry = (country: CountrySlug) =>
  jobs.filter((j) => j.country === country);

export const jobLanguages = [...new Set(jobs.map((j) => j.language))].sort();
export const jobCategories = [...new Set(jobs.map((j) => j.category))].sort();
export const jobCities = [...new Set(jobs.map((j) => j.city))].sort();
