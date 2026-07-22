import type { CountrySlug } from "./destinations";

/**
 * ─────────────────────────────────────────────────────────────────────────
 * LIVE VACANCIES.
 *
 * Built from roles currently advertised by our partner employers in Athens,
 * Thessaloniki, Chania, Málaga, Alicante and Lisbon (July 2026).
 *
 * House rules for this file:
 *  · Employers and end brands stay anonymous. Describe the sector instead
 *    ("a global streaming platform"), never the client name.
 *  · No salary figures. We only publish what we can stand behind, and the
 *    number is confirmed on the first call. `packageHighlight` carries the
 *    hook instead — it is the one line that shows on the job card.
 *  · Everything in `package` must be something the employer actually offers.
 *    If we cannot verify it, it does not go in.
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
  /** Anonymised description of who you would actually work for. */
  employer: string;
  contract: string;
  model: "On-site" | "Hybrid" | "Remote";
  /** One line, shown on the card. The reason to click. */
  packageHighlight: string;
  /** How many seats are open, where a desk runs several at once. */
  openings?: string;
  start: string;
  featured?: boolean;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  package: string[];
};

/* Package blocks shared across employers, so a change to a real-world
   benefit is made in exactly one place. */

const GREECE_FULL = [
  "Flight to Greece booked and paid for you",
  "Hotel accommodation on arrival, then help through the flat search",
  "All relocation paperwork handled with you: AFM, AMKA, bank account",
  "Full training by certified instructors, paid from day one",
  "14 salaries a year, as standard on a Greek contract",
  "Private healthcare and a long list of partner discounts",
  "Free online Greek lessons once you have landed",
  "Performance bonus and a paid referral scheme",
];

const SPAIN_TRANSCOM = [
  "Relocation support into Málaga or Alicante",
  "Help with your NIE and Spanish social security registration",
  "Paid training before you take your first customer",
  "Permanent Spanish contract",
  "Private health insurance",
  "A Nordic and Dutch-speaking community of several hundred colleagues on site",
];

const SPAIN_ATENDER = [
  "Permanent Spanish contract, indefinido from the start",
  "Help with the legal registration, including your CUE card",
  "Hybrid working from an office by Málaga harbour",
  "Five minutes' walk from the train and bus stations",
  "Monthly team dinners, after-work events and company trips",
  "Room to grow the role rather than sit in a queue",
];

export const jobs: Job[] = [
  /* ── PORTUGAL ─────────────────────────────────────────────────────── */
  {
    slug: "dutch-customer-support-lisbon",
    title: "Dutch-speaking Customer Support Agent",
    language: "Dutch",
    category: "Customer advisor",
    country: "portugal",
    countryName: "Portugal",
    flag: "🇵🇹",
    city: "Lisbon",
    photo: "/photos/user-lisbon-golden.jpg",
    alt: "Lisbon at golden hour, the castle above the rooftops and the Tagus beyond",
    employer: "A globally recognised brand, from its Lisbon hub",
    contract: "Permanent",
    model: "On-site",
    packageHighlight: "Private room in shared accommodation, bills included",
    start: "Intakes every two weeks",
    featured: true,
    summary:
      "The most complete accommodation package we place on. You are picked up at the airport and moved straight into your own room in a shared flat, with rent, electricity and water covered for the length of your contract. No experience needed.",
    responsibilities: [
      "Support Dutch customers by phone, email and live chat",
      "Resolve enquiries and complaints professionally and first time where you can",
      "Escalate the complex cases to the right department with the detail they need",
      "Represent a world-leading brand with a customer-first approach",
    ],
    requirements: [
      "Native or near-native Dutch",
      "Good command of English for internal communication",
      "Calm under pressure and solution-oriented",
      "Willing to relocate to Lisbon, or already living there",
      "No previous customer service experience required",
    ],
    package: [
      "Full relocation support to Lisbon",
      "Airport pick-up when you land",
      "Private room in shared accommodation for the length of your contract",
      "Rent, electricity and water all included",
      "Fully paid training from day one",
      "Permanent full-time contract",
      "A multicultural team with colleagues from across Europe",
    ],
  },

  /* ── GREECE · Dutch ───────────────────────────────────────────────── */
  {
    slug: "danish-customer-service-malaga",
    title: "Danish-speaking Customer Service Representative",
    language: "Danish",
    category: "Customer advisor",
    country: "spain",
    countryName: "Spain",
    flag: "🇪🇸",
    city: "Málaga",
    photo: "/photos/user-malaga-aerial.jpg",
    alt: "Málaga from above, the bullring and the port meeting the Mediterranean",
    employer: "A large multilingual service hub on the Costa del Sol",
    contract: "Permanent",
    model: "On-site",
    packageHighlight: "Málaga Valley · a Nordic community already on site",
    start: "Rolling intakes",
    featured: true,
    summary:
      "Málaga is now the fastest-growing tech city in Spain: Google put its largest European cybersecurity centre on the seafront here and Vodafone put a €225 million research hub alongside it. This coast also holds one of the largest concentrations of Nordic and Dutch speakers working in Europe, several hundred of them in these two offices. You will not be the only Dane in the building, which matters more in month three than you would think.",
    responsibilities: [
      "Support Danish customers by phone, email and chat",
      "Resolve account, order and service issues end to end",
      "Work to quality and satisfaction targets rather than raw call counts",
    ],
    requirements: [
      "Native or near-native Danish",
      "Good English for internal communication",
      "EU passport or the right to work in Spain",
      "No previous experience required",
    ],
    package: SPAIN_TRANSCOM,
  },
  {
    slug: "norwegian-customer-service-malaga",
    title: "Norwegian-speaking Customer Service Representative",
    language: "Norwegian",
    category: "Customer advisor",
    country: "spain",
    countryName: "Spain",
    flag: "🇪🇸",
    city: "Málaga",
    photo: "/photos/malaga-sunset.jpg",
    alt: "Sunset over the harbour in Málaga",
    employer: "A large multilingual service hub on the Costa del Sol",
    contract: "Permanent",
    model: "On-site",
    packageHighlight: "300 days of sun · a Nordic community already on site",
    start: "Rolling intakes",
    summary:
      "The Norwegian desk in Málaga. Same offices, same Nordic community, and a two-and-a-half hour flight home when you need it.",
    responsibilities: [
      "Support Norwegian customers by phone, email and chat",
      "Resolve account, order and service issues end to end",
      "Flag recurring problems back to the client team",
    ],
    requirements: [
      "Native or near-native Norwegian",
      "Good English for internal communication",
      "EU passport or the right to work in Spain",
      "No previous experience required",
    ],
    package: SPAIN_TRANSCOM,
  },
  {
    slug: "dutch-telecom-support-alicante",
    title: "Dutch-speaking Customer Expert, Telecoms",
    language: "Dutch",
    category: "Customer advisor",
    country: "spain",
    countryName: "Spain",
    flag: "🇪🇸",
    city: "Alicante",
    photo: "/photos/user-alicante-explanada.jpg",
    alt: "Palms and the Explanada promenade in Alicante under a Spanish flag",
    employer: "A Dutch telecoms provider, from its Alicante hub",
    contract: "Permanent",
    model: "On-site",
    packageHighlight: "Costa Blanca · a Dutch brand, a Spanish contract",
    start: "Rolling intakes",
    summary:
      "A Dutch telecoms brand runs its customer desk from Alicante, on the Costa Blanca. You work in Dutch for a company you already know, on a Spanish contract, with the Explanada and the beach ten minutes from the office.",
    responsibilities: [
      "Support Dutch customers with subscriptions, billing and connectivity",
      "Troubleshoot mobile and home internet issues",
      "Handle upgrades and retention conversations",
    ],
    requirements: [
      "Native or near-native Dutch",
      "Good English for internal communication",
      "EU passport or the right to work in Spain",
      "No previous experience required",
    ],
    package: SPAIN_TRANSCOM,
  },
  {
    slug: "dutch-customer-support-malaga",
    title: "Dutch-speaking Customer Support Agent",
    language: "Dutch",
    category: "Customer advisor",
    country: "spain",
    countryName: "Spain",
    flag: "🇪🇸",
    city: "Málaga",
    photo: "/photos/malaga-sunset.jpg",
    alt: "Sunset over the harbour in Málaga",
    employer: "A people-first support company by Málaga harbour",
    contract: "Permanent",
    model: "Hybrid",
    packageHighlight: "Hybrid · indefinido contract from the start",
    start: "Rolling intakes",
    summary:
      "The smallest employer we place with, and for a lot of people the best fit. A support team by Málaga harbour that works for product-led European companies, with hybrid working and a permanent indefinido contract from day one rather than after probation.",
    responsibilities: [
      "Handle incoming enquiries and support tickets in Dutch, thoughtfully and on time",
      "Solve the problem rather than close the ticket",
      "Work with the wider team on how support itself gets better",
    ],
    requirements: [
      "Fluent Dutch",
      "Good English",
      "Quick with digital tools",
      "Living in Málaga or relocating there",
    ],
    package: SPAIN_ATENDER,
  },
  {
    slug: "danish-customer-support-malaga-hybrid",
    title: "Danish-speaking Customer Support Agent",
    language: "Danish",
    category: "Customer advisor",
    country: "spain",
    countryName: "Spain",
    flag: "🇪🇸",
    city: "Málaga",
    photo: "/photos/malaga-beach.jpg",
    alt: "Palm-lined beach promenade in Málaga",
    employer: "A people-first support company by Málaga harbour",
    contract: "Permanent",
    model: "Hybrid",
    packageHighlight: "Hybrid · indefinido contract from the start",
    start: "Rolling intakes",
    summary:
      "A small, deliberately un-corporate support team by Málaga harbour, working for product-led European companies. Hybrid, permanent from day one, and close enough to the water to swim before work.",
    responsibilities: [
      "Handle incoming enquiries and support tickets in Danish",
      "Keep a solution-oriented approach rather than a scripted one",
      "Contribute to how the team improves its own process",
    ],
    requirements: [
      "Fluent Danish",
      "Good English",
      "Quick with digital tools",
      "Living in Málaga or relocating there",
    ],
    package: SPAIN_ATENDER,
  },
  {
    slug: "norwegian-customer-support-malaga-hybrid",
    title: "Norwegian-speaking Customer Support Agent",
    language: "Norwegian",
    category: "Customer advisor",
    country: "spain",
    countryName: "Spain",
    flag: "🇪🇸",
    city: "Málaga",
    photo: "/photos/malaga-beach.jpg",
    alt: "Palm-lined beach promenade in Málaga",
    employer: "A people-first support company by Málaga harbour",
    contract: "Permanent",
    model: "Hybrid",
    packageHighlight: "Hybrid · indefinido contract from the start",
    start: "Rolling intakes",
    summary:
      "The Norwegian seat on a small support team by Málaga harbour. Hybrid working, a permanent contract from the start, and a five-minute walk from the train station.",
    responsibilities: [
      "Handle incoming enquiries and support tickets in Norwegian",
      "Solve the problem properly rather than close the ticket",
      "Help shape how the team works",
    ],
    requirements: [
      "Fluent Norwegian",
      "Good English",
      "Quick with digital tools",
      "Living in Málaga or relocating there",
    ],
    package: SPAIN_ATENDER,
  },

  /* ── GREECE ───────────────────────────────────────────────────────────
     Our Greek partner runs standing desks rather than one-off vacancies:
     several programmes hiring the same language at once, on rolling intakes.
     One listing per language, with the range of desks and the number of
     seats described inside. ──────────────────────────────────────────── */
  {
    slug: "dutch-speaking-jobs-greece",
    title: "Dutch-speaking Customer, Technical and Sales Experts",
    language: "Dutch",
    category: "Customer advisor",
    country: "greece",
    countryName: "Greece",
    flag: "🇬🇷",
    city: "Athens",
    photo: "/photos/athens-golden.jpg",
    alt: "The Acropolis at golden hour above Athens",
    employer: "One of the largest customer experience employers in Greece",
    contract: "Permanent",
    model: "On-site",
    packageHighlight: "Several seats open · flight and hotel covered",
    openings: "Multiple positions, hiring continuously",
    start: "Intakes every two weeks",
    summary:
      "Dutch is one of the two languages our Greek partner hires for all year round. There is almost always something open, usually across several programmes at once, so this is less a single vacancy than a standing invitation.",
    responsibilities: [
      "Support Dutch-speaking customers by phone, email and chat",
      "Depending on the desk: streaming and entertainment, consumer electronics, home technology, cameras and imaging, travel bookings, financial services, or first-line software support",
      "Own each case through to a resolution rather than passing it along",
      "Escalate with the detail the next team actually needs",
    ],
    requirements: [
      "Excellent Dutch",
      "Fluent English",
      "EU passport or the right to work in Greece",
      "No previous experience required for most desks; technical and sales desks may ask for a little relevant background",
    ],
    package: GREECE_FULL,
  },
  {
    slug: "german-speaking-jobs-greece",
    title: "German-speaking Customer and Technical Experts",
    language: "German",
    category: "Customer advisor",
    country: "greece",
    countryName: "Greece",
    flag: "🇬🇷",
    city: "Athens",
    photo: "/photos/athens-acropolis-city.jpg",
    alt: "The Acropolis above Athens with the sea beyond",
    employer: "One of the largest customer experience employers in Greece",
    contract: "Permanent",
    model: "On-site",
    packageHighlight: "Several seats open · flight and hotel covered",
    openings: "Multiple positions, hiring continuously",
    start: "Intakes every two weeks",
    featured: true,
    summary:
      "The largest and most consistently open desk in Greece. German speakers are hired effectively without pause, across several programmes and in both Athens and Thessaloniki, so start dates are frequent and you rarely wait long.",
    responsibilities: [
      "Support German-speaking customers by phone, email and chat",
      "Depending on the desk: consumer brands, software and technical support, home technology, or financial services",
      "Resolve account, order and product issues end to end",
      "Keep the knowledge base honest and up to date",
    ],
    requirements: [
      "Excellent German",
      "Fluent English",
      "EU passport or the right to work in Greece",
      "No previous experience required for most desks",
    ],
    package: GREECE_FULL,
  },
  {
    slug: "danish-speaking-jobs-greece",
    title: "Danish-speaking Customer and Content Experts",
    language: "Danish",
    category: "Customer advisor",
    country: "greece",
    countryName: "Greece",
    flag: "🇬🇷",
    city: "Athens",
    photo: "/photos/user-greece-cove.jpg",
    alt: "A turquoise cove with umbrellas on a white pebble beach in Greece",
    employer: "One of the largest customer experience employers in Greece",
    contract: "Permanent",
    model: "On-site",
    packageHighlight: "Flight and hotel covered · 14 salaries a year",
    openings: "Several desks, intakes monthly",
    start: "Intakes monthly",
    summary:
      "Danish speakers are scarce on the ground in Greece, which is why these desks carry the full relocation package. Several programmes run a Danish seat, in Athens and in Thessaloniki, and we will match you to whichever fits.",
    responsibilities: [
      "Support Danish-speaking customers across phone, email and chat",
      "Depending on the desk: travel bookings, consumer electronics, home appliances, financial services, or social media content review",
      "Own each case through to resolution",
      "Work with the Nordic team on tone and translations",
    ],
    requirements: [
      "Excellent Danish",
      "Fluent English",
      "EU passport or the right to work in Greece",
      "For content review desks: resilience, and a willingness to use the support provided",
    ],
    package: [
      ...GREECE_FULL,
      "On content review desks, dedicated psychological and wellbeing support",
    ],
  },
  {
    slug: "norwegian-speaking-jobs-greece",
    title: "Norwegian-speaking Customer and Technical Experts",
    language: "Norwegian",
    category: "Customer advisor",
    country: "greece",
    countryName: "Greece",
    flag: "🇬🇷",
    city: "Athens",
    photo: "/photos/crete-chania-harbour.jpg",
    alt: "The Venetian harbour at Chania, Crete, lined with pastel houses",
    employer: "One of the largest customer experience employers in Greece",
    contract: "Permanent",
    model: "On-site",
    packageHighlight: "Athens, Thessaloniki or Crete · full relocation",
    openings: "Several desks across three cities",
    start: "Intakes monthly",
    featured: true,
    summary:
      "Norwegian speakers are rare enough in Greece that these desks get looked after. The unusual part: alongside Athens and Thessaloniki, one of the programmes runs from Chania on Crete, with the Venetian harbour a walk from the office.",
    responsibilities: [
      "Support Norwegian-speaking customers across phone, email and chat",
      "Depending on the desk: payments and disputes, delivery and logistics, cameras and imaging, home appliances, financial services, or social media content review",
      "Investigate properly and explain the outcome in plain Norwegian",
      "Own the case until the customer has an answer",
    ],
    requirements: [
      "Excellent Norwegian",
      "Fluent English",
      "EU passport or the right to work in Greece",
      "For content review desks: resilience, and a willingness to use the support provided",
    ],
    package: [
      ...GREECE_FULL,
      "Desks available in Athens, Thessaloniki and Chania on Crete",
    ],
  },
  {
    slug: "swedish-speaking-jobs-greece",
    title: "Swedish-speaking Customer and Content Experts",
    language: "Swedish",
    category: "Customer advisor",
    country: "greece",
    countryName: "Greece",
    flag: "🇬🇷",
    city: "Athens",
    photo: "/photos/greek-taverna-table.jpg",
    alt: "A taverna table with blue chairs set right beside the sea",
    employer: "One of the largest customer experience employers in Greece",
    contract: "Permanent",
    model: "On-site",
    packageHighlight: "Flight and hotel covered · 14 salaries a year",
    openings: "Several desks, intakes monthly",
    start: "Intakes monthly",
    summary:
      "Swedish is a scarce language on the ground in Athens, so these desks carry the full relocation package and tend to be looked after. Several programmes run a Swedish seat and we will match you to the one that fits.",
    responsibilities: [
      "Support Swedish-speaking customers across phone, email and chat",
      "Depending on the desk: consumer brands, technical support, or social media content review",
      "Own each case through to resolution",
      "Work with the Nordic team on tone and translations",
    ],
    requirements: [
      "Excellent Swedish",
      "Fluent English",
      "EU passport or the right to work in Greece",
      "For content review desks: resilience, and a willingness to use the support provided",
    ],
    package: [
      ...GREECE_FULL,
      "On content review desks, dedicated psychological and wellbeing support",
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
