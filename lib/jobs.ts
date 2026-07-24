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
    packageHighlight: "Your own room, every bill covered",
    start: "Intakes every two weeks",
    featured: true,
    summary:
      "The most complete move we place on. You are met at the airport and taken straight to your own room in a shared flat, with the rent, the electricity and the water all covered for as long as your contract runs, so the thing that stops most people, finding somewhere to live in a country you do not know yet, is simply handled for you. You work in Dutch for a brand the whole world knows, on a permanent Portuguese contract, in the city that has quietly become one of Europe's favourite places to be young: Lisbon, all tiled hills and river light, cheap pastéis and long evenings, a fast train to the surf and a short hop home. No experience needed. You bring the language and the nerve to go.",
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

  /* ── SPAIN ────────────────────────────────────────────────────────── */
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
      "The Norwegian desk on the Costa del Sol, inside one of the biggest multilingual offices in the south of Spain. Several hundred Nordic and Dutch speakers already work this floor, so you will not be the only Norwegian in the building, which matters far more in month three than you would guess. Málaga around it has become one of Europe's most talked-about cities: Google built its largest cybersecurity centre in Europe on the seafront, the tech and finance money keeps arriving, and a young international crowd has come with it. And then the everyday reason people stay: three hundred days of sun, the beach a tram ride from your desk, and Oslo two and a half hours away for whenever you need it.",
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
    photo: "/photos/alicante-beach-castle.jpg",
    alt: "Santa Bárbara castle on its mountain above the beach and town of Alicante",
    employer: "A Dutch telecoms provider, from its Alicante hub",
    contract: "Permanent",
    model: "On-site",
    packageHighlight: "Costa Blanca · a Dutch brand you know, a Spanish contract",
    start: "Rolling intakes",
    summary:
      "A Dutch telecoms brand you already know runs its customer desk from Alicante, on the Costa Blanca. You work in your own language for a company you grew up with, on a permanent Spanish contract, in a city with one of the kindest climates in Europe and none of the price tags of the busier coasts. The Explanada palms and the beach are ten minutes from the office, the old town fills up on a Thursday night, and the rest of the Costa Blanca is a short drive when the weekend comes.",
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
    packageHighlight: "Swim before work · permanent from day one",
    start: "Rolling intakes",
    summary:
      "The opposite of a call-centre floor. A small, deliberately un-corporate team looks after the Dutch-speaking customers of product-led European tech companies, the kind of firms people actually enjoy using, from an office right on Málaga harbour. You are on a permanent indefinido contract from your first day, not after a probation gauntlet, and the week is hybrid, so the sea is a five-minute walk when you are in the office and your own sofa when you are not. The whole south of Spain is on the rise and Málaga is leading it: Google put its largest cybersecurity centre in Europe on this seafront, tech and finance firms keep arriving, and a young international crowd has come with them, so you land somewhere that is growing rather than somewhere already settled. And around it sits the everyday part: three hundred days of sun a year, a swim before your shift, and dinner on a terrace for the price of a coffee back home.",
    responsibilities: [
      "Look after Dutch-speaking customers over chat, email and the occasional call, in full sentences rather than a script",
      "Solve the actual problem and own it until it is done, rather than closing the ticket fastest",
      "Feed what you learn back into how the product and the support get better; your read on the customer is listened to here",
      "Help keep a small, close team a good place to work as it grows",
    ],
    requirements: [
      "Native or near-native Dutch, written and spoken",
      "English at B2 or better for the team and the tools",
      "Quick with digital tools, and happy to pick up new ones",
      "EU passport or the existing right to work in Spain",
      "Already in Málaga, or genuinely ready to move soon",
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
    packageHighlight: "Swim before work · permanent from day one",
    start: "Rolling intakes",
    featured: true,
    summary:
      "The opposite of a call-centre floor. A small, deliberately un-corporate team looks after the Danish-speaking customers of product-led European tech companies, the kind of firms people actually enjoy using, from an office right on Málaga harbour. You are on a permanent indefinido contract from your first day, not after a probation gauntlet, and the week is hybrid, so the sea is a five-minute walk when you are in the office and your own sofa when you are not. The whole south of Spain is on the rise and Málaga is leading it: Google put its largest cybersecurity centre in Europe on this seafront, tech and finance firms keep arriving behind it, and a young international crowd has come with them, so you land somewhere that is growing rather than somewhere already settled. But what you actually feel is the smaller stuff: three hundred days of sun a year, a swim before your shift, and dinner on a terrace for what a coffee costs in Copenhagen.",
    responsibilities: [
      "Look after Danish-speaking customers over chat, email and the occasional call, in full sentences and never a script",
      "Solve the actual problem and own it until it is done, rather than closing the ticket fastest",
      "Feed what you learn back into how the product and the support get better; your read on the customer is listened to here",
      "Help keep a small, close team a good place to work as it grows",
    ],
    requirements: [
      "Native or near-native Danish, written and spoken",
      "English at B2 or better for the team and the tools",
      "Quick with digital tools, and happy to pick up new ones",
      "EU passport or the existing right to work in Spain",
      "Already in Málaga, or genuinely ready to move soon, not a someday plan",
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
    packageHighlight: "Swap the winter · permanent from day one",
    start: "Rolling intakes",
    summary:
      "The Norwegian seat on a small, un-corporate support team based right on Málaga harbour, looking after the customers of product-led European tech companies. You are on a permanent indefinido contract from your first day, and the week is hybrid, so you are by the water when you are in the office and home when you are not, with Oslo two and a half hours away for whenever you need it. The whole south of Spain is on the rise and Málaga is leading it: Google's largest cybersecurity centre in Europe sits on this seafront, tech and finance firms keep arriving, and a young international crowd has come with them, so you arrive somewhere that is growing rather than somewhere already settled. And it trades the Norwegian winter for three hundred days of sun, a coast you can swim off before work, and a cost of living that lets a Spanish salary stretch in a way a Norwegian one never had to.",
    responsibilities: [
      "Support Norwegian-speaking customers over chat, email and the occasional call, in proper Norwegian rather than a script",
      "Solve the problem properly and see it through, rather than racing to close the ticket",
      "Flag the patterns you spot back to the team; recurring issues get fixed here, not filed",
      "Help keep a small, close team a good place to work as it grows",
    ],
    requirements: [
      "Native or near-native Norwegian, written and spoken",
      "English at B2 or better for the team and the tools",
      "Quick with digital tools and comfortable learning new ones",
      "EU passport or the existing right to work in Spain",
      "In Málaga already, or genuinely ready to move soon",
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
      "Dutch is one of the two languages our Greek partner hires for all year round, so there is nearly always something open, usually across several programmes at once. This is less a single vacancy than a standing invitation: tell us you are ready and we match you to the desk and the start date that suit you, with the flight and the first weeks' hotel covered before you arrive. Athens hands you an ancient city with a coastline attached, and the islands are a ferry away for the weekend.",
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
      "The largest and most consistently open desk in Greece. German speakers are hired here effectively without pause, across several programmes and in both Athens and Thessaloniki, so start dates come round every couple of weeks and you rarely wait long. It is the surest and fastest route we have onto the Greek coast, and the flight and your first weeks' hotel are covered before you have unpacked.",
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
      "Danish speakers are scarce on the ground in Greece, and that scarcity works in your favour: it is exactly why these desks carry the full relocation package and get properly looked after. Several programmes run a Danish seat, in Athens and in Thessaloniki, and we match you to the one that fits. You land into fourteen salaries a year, private healthcare, and a country where a Copenhagen rent buys a whole life by the sea.",
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
      "Norwegian speakers are rare enough in Greece that these desks get looked after properly, with the entire move paid for. The unusual part: alongside Athens and Thessaloniki, one of the programmes runs from Chania on Crete, with the old Venetian harbour a walk from the office. Choose the island if the thought of it makes you smile, because most people who can, do.",
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
      "Swedish is a scarce language on the ground in Athens, so these desks carry the full relocation package and tend to be looked after. Several programmes run a Swedish seat and we match you to the one that fits. You swap a Swedish winter for fourteen salaries a year, private healthcare, and a coastline that runs all the way out to the islands.",
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
