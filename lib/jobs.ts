import type { CountrySlug } from "./destinations";

/**
 * ─────────────────────────────────────────────────────────────────────────
 * LIVE VACANCIES.
 *
 * Built from roles currently advertised by our partner employers in Athens,
 * Thessaloniki, Chania, Málaga, Alicante, Valencia, Madrid, Lisbon and Larnaca (October 2026).
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
  /** Card image (16:10). A portrait shot crops fine here. */
  photo: string;
  alt: string;
  /** Optional wide image for the full-bleed detail hero, where a portrait
   *  photo would zoom badly. Falls back to `photo`. */
  heroPhoto?: string;
  heroAlt?: string;
  /** object-position for the hero crop, e.g. "center 32%". */
  heroFocal?: string;
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
  "Free accommodation on arrival (four weeks for Dutch and German speakers, two for other languages), then help with the flat search",
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

/* The Dutch telecoms desk hires locally, so no relocation line here. */
const SPAIN_TRANSCOM_DUTCH = [
  "Permanent Spanish contract",
  "A monthly performance bonus on top of your salary",
  "Two weeks of paid training, then guided calls and an extra training week",
  "Hybrid working possible after your first three months, once approved",
  "A clear path to Team Leader, Trainer and beyond",
  "Help with your NIE and Spanish social security registration",
  "A Dutch-speaking team in a lively office",
];

const SPAIN_ATENDER = [
  "Permanent Spanish contract, indefinido from the start",
  "Help with the legal registration, including your CUE card",
  "Hybrid working from an office by Málaga harbour",
  "Five minutes' walk from the train and bus stations",
  "Monthly team dinners, after-work events and company trips",
  "Room to grow the role rather than sit in a queue",
];

const SPAIN_VALENCIA = [
  "Breakfast and lunch provided every working day",
  "Full Spanish health insurance",
  "Free Spanish lessons",
  "Help finding accommodation and getting your NIE number",
  "Monthly team events and social activities",
  "Room to grow into other roles as the company grows",
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
    heroPhoto: "/photos/lisbon-sunset-bridge.jpg",
    heroAlt: "Lisbon at sunset, rooftops running to the 25 de Abril bridge and the Tagus",
    employer: "A globally recognised brand, from its Lisbon hub",
    contract: "Permanent",
    model: "On-site",
    packageHighlight: "Your own room, every bill covered",
    start: "Intakes every two weeks",
    featured: true,
    summary:
      "Almost everyone who moves abroad comes back a different person, and Lisbon is one of the easiest places in Europe to become that person. You are met at the airport and taken to your own room in a shared flat, with the rent, electricity and water covered for as long as your contract runs, so the thing that stops most people, finding a home in a country you do not know yet, is simply handled. The rest is up to you: a permanent contract working in Dutch for a brand the whole world knows, colleagues from every corner of Europe and beyond, and a city of tiled hills, river light and long evenings that has quietly become one of Europe's favourite places to be young. You arrive with a language and a suitcase. A year later you have friends from ten countries, a second language starting to stick, and a much clearer idea of what you want next. No experience needed.",
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
      "A high-school diploma and a clean criminal record",
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
  {
    slug: "dutch-content-moderator-lisbon",
    title: "Dutch-speaking Content Moderator",
    language: "Dutch",
    category: "Content moderation",
    country: "portugal",
    countryName: "Portugal",
    flag: "🇵🇹",
    city: "Lisbon",
    photo: "/photos/lisbon-tram.jpg",
    alt: "A yellow Lisbon tram on a sunny street lined with tiled buildings",
    heroPhoto: "/photos/lisbon-dusk-rooftops.jpg",
    heroAlt: "Lisbon rooftops at dusk, running down to the Tagus",
    employer: "A well-established international brand, from its Lisbon office",
    contract: "Full-time",
    model: "On-site",
    packageHighlight: "Full relocation · help with housing when you land",
    start: "Rolling intakes",
    summary:
      "Some of the most valuable experience you can collect in your twenties is the kind you only get by moving somewhere new and making it work. This role gives you that, plus a skill tech companies now actively hire for. Working in Dutch, you keep a platform millions of people use every day safe, reviewing posts, images and video against clear guidelines and making the call on what stays up. It is careful, focused work that builds real trust and safety experience, and you do it from Lisbon, in a team from all over Europe and beyond. The move is organised for you: relocation support, help finding somewhere to live, and paid training from your first day, so you start from a plan rather than a guess. No experience needed.",
    responsibilities: [
      "Review Dutch-language text, images and video on a major online platform",
      "Apply the platform's policies consistently and accurately",
      "Spot and act on content that breaks the community guidelines",
      "Escalate complex or sensitive cases to the right team",
      "Keep your accuracy high in a fast-moving environment",
    ],
    requirements: [
      "Native or near-native Dutch",
      "Comfortable working in English internally",
      "A sharp eye for detail and sound judgement",
      "Able to stay objective and composed with sensitive content",
      "A high-school diploma and a clean criminal record",
      "Ready to relocate to Lisbon, or already living there",
      "No moderation experience required",
    ],
    package: [
      "Full relocation support to Lisbon",
      "Help with accommodation when you arrive",
      "Paid training and onboarding from day one",
      "Wellbeing support and resilience resources",
      "Career progression in a structured international company",
      "A team from across Europe and beyond",
    ],
  },

  /* ── SPAIN ────────────────────────────────────────────────────────── */
  {
    slug: "dutch-customer-support-valencia",
    title: "Dutch-speaking Customer Support Agent",
    language: "Dutch",
    category: "Customer advisor",
    country: "spain",
    countryName: "Spain",
    flag: "🇪🇸",
    city: "Valencia",
    photo: "/photos/valencia-plaza-virgen.jpg",
    alt: "Plaza de la Virgen in Valencia under a blue sky, the cathedral and the Micalet tower behind the fountain",
    heroPhoto: "/photos/valencia-hero.jpg",
    heroAlt: "The City of Arts and Sciences in Valencia at sunset, mirrored in the still water",
    employer: "An established international brand, from its Valencia office",
    contract: "Full-time",
    model: "On-site",
    packageHighlight: "Breakfast and lunch on the house, every day",
    start: "Rolling intakes",
    featured: true,
    summary:
      "Ask anyone who has lived abroad and they will tell you the same thing: the job was the reason to go, but the life around it is what changed them. Valencia is a very good place for that to happen. You help Dutch customers with their orders, returns and deliveries, in your own language, in a team where patience and a friendly way with people matter more than a CV full of call centres. Breakfast and lunch are provided every working day, you are on full Spanish health insurance, and Spanish lessons are free, so the city opens up a little more every week. Around you: the beach a tram ride from the centre, nine kilometres of park through the old riverbed, paella where it was invented, around three hundred days of sun, and colleagues from all over Europe who took the same leap. Give it a year and you will be surprised how much you have grown.",
    responsibilities: [
      "Handle Dutch-speaking customers by phone, email and chat",
      "Help with orders, products, returns and delivery updates",
      "Work with internal teams to resolve issues smoothly",
      "Keep customer records accurate and up to date",
    ],
    requirements: [
      "Native Dutch, with a clear and warm way of communicating",
      "Patient, calm and good at working out what a customer actually needs",
      "Organised and detail-minded",
      "Energetic, social and keen to be part of a lively office team",
      "No customer service experience required",
    ],
    package: SPAIN_VALENCIA,
  },
  {
    slug: "dutch-after-sales-valencia",
    title: "Dutch-speaking After-Sales Agent",
    language: "Dutch",
    category: "Inside sales",
    country: "spain",
    countryName: "Spain",
    flag: "🇪🇸",
    city: "Valencia",
    photo: "/photos/valencia-turia.jpg",
    alt: "Pines and walkers in late golden light in the Turia gardens, Valencia",
    heroPhoto: "/photos/valencia-hero.jpg",
    heroAlt: "The City of Arts and Sciences in Valencia at sunset, mirrored in the still water",
    employer: "A fast-growing international company, from its Valencia office",
    contract: "Full-time",
    model: "On-site",
    packageHighlight: "No cold calls · commission on top",
    start: "Rolling intakes",
    summary:
      "Most people who live abroad come home with more than a tan: they come home able to talk to anyone. This role turns that into a commercial skill. You call people who are already customers, in Dutch, to help them get more out of what they bought and recommend what genuinely suits them. No cold calls, an easy-to-learn order system, and monthly commission on top of your fixed salary, so a good month shows in your pay. The skills you build here open doors later into sales, account management and customer success, wherever you end up next. Meanwhile you live in Valencia, with breakfast and lunch every working day, Spanish health insurance, free Spanish lessons, an international team and the beach a tram ride away.",
    responsibilities: [
      "Contact existing Dutch-speaking customers, never cold calls",
      "Recommend the products that genuinely fit each customer's needs",
      "Spot chances to improve an order or the customer's experience",
      "Process orders in an easy-to-learn system",
      "Work closely with a supportive international team",
    ],
    requirements: [
      "Native Dutch, with a clear and warm way of communicating",
      "Curious, positive and happy helping people",
      "Organised and focused when it gets busy",
      "Keen to learn and grow in sales or service",
      "Sales or customer service experience is a plus, not a requirement",
    ],
    package: [
      "Monthly commission on top of your fixed salary",
      "Training and support from the start",
      ...SPAIN_VALENCIA,
    ],
  },
  {
    slug: "german-customer-support-valencia",
    title: "German-speaking Customer Support Agent",
    language: "German",
    category: "Customer advisor",
    country: "spain",
    countryName: "Spain",
    flag: "🇪🇸",
    city: "Valencia",
    photo: "/photos/valencia-street.jpg",
    alt: "An old-town street in Valencia seen from above, a blossoming tree beside the balconies",
    heroPhoto: "/photos/valencia-hero.jpg",
    heroAlt: "The City of Arts and Sciences in Valencia at sunset, mirrored in the still water",
    employer: "An established international brand, from its Valencia office",
    contract: "Full-time",
    model: "On-site",
    packageHighlight: "Breakfast and lunch on the house, every day",
    start: "Rolling intakes",
    featured: true,
    summary:
      "The people who move abroad in their twenties are very often the ones doing something interesting in their thirties. This is a straightforward way to start. Join the German-speaking support team of an established brand and help customers with orders, products, returns and deliveries, in your own language. No experience needed: patience, a friendly manner and a willingness to learn matter more than a CV. Breakfast and lunch are provided every working day, you are on full Spanish health insurance, and Spanish lessons are free. Valencia does the rest: a beach a tram ride from the centre, a nine-kilometre park through the old riverbed, a famously good food scene, a winter that barely counts as one, and friends from all over the world before you have finished unpacking.",
    responsibilities: [
      "Handle German-speaking customers by phone, email and chat",
      "Help with orders, products, returns and delivery updates",
      "Work with internal teams to resolve issues",
      "Keep customer records accurate and up to date",
    ],
    requirements: [
      "Native German, with clear and empathetic communication",
      "Patient, calm and good at working out what a customer needs",
      "Organised and detail-minded",
      "A proactive team player",
      "No customer service experience required",
    ],
    package: SPAIN_VALENCIA,
  },
  {
    slug: "german-after-sales-valencia",
    title: "German-speaking After-Sales Agent",
    language: "German",
    category: "Inside sales",
    country: "spain",
    countryName: "Spain",
    flag: "🇪🇸",
    city: "Valencia",
    photo: "/photos/valencia-central-market.jpg",
    alt: "The iron-and-glass dome of Valencia's Central Market above the stalls",
    heroPhoto: "/photos/valencia-hero.jpg",
    heroAlt: "The City of Arts and Sciences in Valencia at sunset, mirrored in the still water",
    employer: "A fast-growing international company, from its Valencia office",
    contract: "Full-time",
    model: "On-site",
    packageHighlight: "No cold calls · a monthly bonus on top",
    start: "Rolling intakes",
    summary:
      "Sales without the part everyone dreads, in a city that will teach you more than any training course. You call existing German-speaking customers to help them get more from what they bought and recommend the products that genuinely suit them. No cold calls, an easy-to-learn order system, and a monthly bonus on top of your fixed salary. You build real commercial skills, the kind that lead into account management, customer success or a bigger sales role later, and you build them while learning to live in another language and culture, which is exactly the part future employers notice. Breakfast and lunch every working day, Spanish health insurance and free Spanish lessons come with it.",
    responsibilities: [
      "Contact existing German-speaking customers, never cold calls",
      "Recommend the products that genuinely fit each customer",
      "Spot chances to improve an order or the customer's experience",
      "Process orders in an easy-to-learn system",
      "Work closely with an international team",
    ],
    requirements: [
      "Native German, with a clear and warm way of communicating",
      "Curious, positive and happy helping people",
      "Organised and focused under pressure",
      "Keen to learn and grow in sales or service",
      "Sales or customer service experience is a plus, not a requirement",
    ],
    package: [
      "A monthly bonus on top of your fixed salary",
      "Training and support from the start",
      ...SPAIN_VALENCIA,
    ],
  },
  {
    slug: "swedish-sales-agent-valencia",
    title: "Swedish-speaking Sales Agent",
    language: "Swedish",
    category: "Inside sales",
    country: "spain",
    countryName: "Spain",
    flag: "🇪🇸",
    city: "Valencia",
    photo: "/photos/valencia-turia.jpg",
    alt: "Pines and walkers in late golden light in the Turia gardens, Valencia",
    heroPhoto: "/photos/valencia-hero.jpg",
    heroAlt: "The City of Arts and Sciences in Valencia at sunset, mirrored in the still water",
    employer: "A fast-growing international company, from its Valencia office",
    contract: "Full-time",
    model: "On-site",
    packageHighlight: "No cold calls · commission on top",
    start: "As soon as you can",
    summary:
      "Swap the Swedish winter for a year that will teach you more than any course could. You call existing Swedish-speaking customers to help them get more from what they bought and recommend the products that genuinely suit them. No cold calls, an easy-to-learn order system, and monthly commission on top of your fixed salary, so a good month shows in your pay. You build real commercial skills, the kind that lead into account management, customer success or a bigger sales role later, while learning to live in another language and culture. Breakfast and lunch every working day, Spanish health insurance and free Spanish lessons come with it, in a lively office full of people from all over Europe and a city with the beach a tram ride away.",
    responsibilities: [
      "Contact existing Swedish-speaking customers, never cold calls",
      "Recommend the products that genuinely fit each customer",
      "Spot chances to improve an order or the customer's experience",
      "Process orders in an easy-to-learn system",
    ],
    requirements: [
      "Native or near-native Swedish",
      "Energetic, social and keen to be part of a lively office team",
      "Keen to learn and grow in sales",
      "Sales experience is a plus, not a requirement",
    ],
    package: [
      "Monthly commission on top of your fixed salary",
      "Training and support from the start",
      ...SPAIN_VALENCIA,
    ],
  },
  {
    slug: "portuguese-sales-agent-valencia",
    title: "Portuguese-speaking Sales Agent",
    language: "Portuguese",
    category: "Inside sales",
    country: "spain",
    countryName: "Spain",
    flag: "🇪🇸",
    city: "Valencia",
    photo: "/photos/valencia-street.jpg",
    alt: "An old-town street in Valencia seen from above, a blossoming tree beside the balconies",
    heroPhoto: "/photos/valencia-hero.jpg",
    heroAlt: "The City of Arts and Sciences in Valencia at sunset, mirrored in the still water",
    employer: "A fast-growing international company, from its Valencia office",
    contract: "Full-time",
    model: "On-site",
    packageHighlight: "No cold calls · commission on top",
    start: "As soon as you can",
    summary:
      "The people who move abroad in their twenties are very often the ones doing something interesting in their thirties. This is a strong way to start. You call existing Portuguese-speaking customers to help them get more from what they bought and recommend the products that genuinely suit them. No cold calls, an easy-to-learn order system, and monthly commission on top of your fixed salary. The commercial skills you build here travel anywhere, into account management, customer success or bigger sales roles. Meanwhile you live in Valencia, with breakfast and lunch every working day, Spanish health insurance, free Spanish lessons and an office full of people from all over Europe.",
    responsibilities: [
      "Contact existing Portuguese-speaking customers, never cold calls",
      "Recommend the products that genuinely fit each customer",
      "Spot chances to improve an order or the customer's experience",
      "Process orders in an easy-to-learn system",
    ],
    requirements: [
      "Native or near-native Portuguese",
      "Energetic, social and keen to be part of a lively office team",
      "Keen to learn and grow in sales",
      "Sales experience is a plus, not a requirement",
    ],
    package: [
      "Monthly commission on top of your fixed salary",
      "Training and support from the start",
      ...SPAIN_VALENCIA,
    ],
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
      "Almost everyone on this floor arrived the same way: one job, one suitcase, no Spanish. A few years on, many of them lead teams, have moved into bigger roles in Málaga's growing tech scene, or have taken what they learned to a new country. It starts at the Norwegian desk of one of the biggest multilingual offices in the south of Spain, where several hundred Nordic and Dutch speakers already work, so you will not be the only Norwegian in the building. Málaga around it is a city on the rise: Google built its largest cybersecurity centre in Europe on the seafront, and a young international crowd keeps arriving. Then there is the everyday reason people stay: three hundred days of sun, the beach a tram ride from your desk, and Oslo two and a half hours away whenever you need it.",
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
    heroFocal: "center 34%",
    employer: "A Dutch telecoms provider, from its Alicante and Málaga hubs",
    contract: "Permanent",
    model: "Hybrid",
    packageHighlight: "Alicante or Málaga · a monthly bonus on top",
    start: "Rolling intakes",
    summary:
      "The first job abroad is the one people look back on as the start of everything: you learn a system nobody taught you, make friends who grew up a thousand kilometres away, and build a confidence that follows you to whatever comes next. This is a good one to start with. A Dutch telecoms brand you already know runs its customer desk from the Spanish coast, with offices in both Alicante and Málaga. You help Dutch customers set up SIM cards, get online, fix home internet and install TV boxes, in your own language, on a permanent Spanish contract with a monthly bonus on top. It has a real ladder too: two weeks of training and guided calls, then a clear route to Team Leader, Trainer and beyond. Pick your city: Alicante, smaller and around 10% cheaper on the Costa Blanca, or Málaga, the fastest-growing city in the south.",
    responsibilities: [
      "Help Dutch customers with mobile services: SIM setup and getting online on their devices",
      "Troubleshoot home internet and set up TV boxes",
      "Spot the moments where a better plan or product genuinely helps, and act on them",
    ],
    requirements: [
      "Native or near-native Dutch",
      "Good English for internal communication",
      "Comfortable with computers and genuinely interested in technology",
      "EU passport or the right to work in Spain",
      "Already living in Spain, or ready to organise your own move",
      "No previous experience required",
    ],
    package: SPAIN_TRANSCOM_DUTCH,
  },
  {
    slug: "dutch-customer-support-malaga",
    title: "Dutch-speaking Technical Support Agent, EV Charging",
    language: "Dutch",
    category: "Technical support",
    country: "spain",
    countryName: "Spain",
    flag: "🇪🇸",
    city: "Málaga",
    photo: "/photos/malaga-sunset.jpg",
    alt: "Sunset over the harbour in Málaga",
    employer: "A people-first support company by Málaga harbour, for a European EV-charging brand",
    contract: "Permanent",
    model: "Hybrid",
    packageHighlight: "Mon–Fri, 08:00–16:00 · permanent from day one",
    start: "Rolling intakes",
    summary:
      "Some jobs abroad are a gap year with a desk. This one is the start of a career. You support Dutch-speaking customers, and the electricians who install for them, with smart chargers for electric cars: installation, setup and troubleshooting, by phone, chat and email. It is a step more technical than standard customer service, with full training, so an interest in technology matters more than experience. You are on a permanent indefinido contract from your first day, your pay rises after six months and again after a year, and you work Monday to Friday, eight till four, so every evening and every weekend in Málaga is yours. The team is small and deliberately un-corporate, the office is by the harbour, and the city around it is the fastest-growing tech hub in Spain. Two years here and you have a technical skill set, a second language and a network that opens doors anywhere.",
    responsibilities: [
      "Support Dutch-speaking customers and electricians by phone, chat and email",
      "Guide people through installing, setting up and troubleshooting smart EV chargers",
      "Own each case until it is actually solved, rather than closing the ticket fastest",
      "Feed what you learn back to the team; your read on the customer is listened to here",
    ],
    requirements: [
      "Native or near-native Dutch, written and spoken",
      "English at B2 or better for the team and the tools",
      "An interest in technology and quick with new systems; no technical background required",
      "EU passport or the existing right to work in Spain",
      "Already in Málaga, or genuinely ready to move soon",
    ],
    package: [
      "A pay rise after six months, and again after one year",
      "Monday to Friday, 08:00 to 16:00: evenings and weekends are yours",
      "Full technical training before you take your first case",
      ...SPAIN_ATENDER,
    ],
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
      "Everyone who moved to Málaga for work tells a version of the same story: they came for a job, and found out who they were. This is a good place to start yours. A small, deliberately un-corporate team looks after the Danish-speaking customers of product-led European tech companies from an office right on Málaga harbour. You are on a permanent indefinido contract from your first day, and the week is hybrid, so the sea is a five-minute walk when you are in the office and your own sofa when you are not. Málaga is the fastest-rising city in the south of Spain, with Google's largest European cybersecurity centre on the seafront and a young international crowd arriving behind it, so you land somewhere that is growing as fast as you are. And then the smaller stuff: three hundred days of sun, a swim before your shift, and dinner on a terrace for what a coffee costs in Copenhagen.",
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
      "Trade the Norwegian winter for the year that changes how you see everything. This is the Norwegian seat on a small, un-corporate support team right on Málaga harbour, looking after the customers of product-led European tech companies. You are on a permanent indefinido contract from your first day, and the week is hybrid, so you are by the water when you are in the office and at home when you are not, with Oslo two and a half hours away whenever you need it. Around you is a city on the rise and a crowd of people from everywhere who made the same jump, the kind of people who go on to start companies, step into bigger roles and keep exploring. Add three hundred days of sun, a coast you can swim off before work, and a cost of living that lets a Spanish salary stretch further than you would think.",
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

  {
    slug: "german-account-executive-madrid",
    title: "German-speaking Account Executive",
    language: "German",
    category: "Inside sales",
    country: "spain",
    countryName: "Spain",
    flag: "🇪🇸",
    city: "Madrid",
    photo: "/photos/spain-tapas-table.jpg",
    alt: "A table of croquetas, jamón and cold drinks in the Spanish sun",
    employer: "A fast-growing e-commerce software company, from its Madrid office",
    contract: "Full-time",
    model: "Hybrid",
    packageHighlight: "Uncapped commission · a real B2B sales career",
    start: "As soon as you can",
    summary:
      "If you want a career abroad rather than just a year in the sun, start here. A fast-growing e-commerce software company in Madrid is looking for a German-speaking Account Executive to grow the German market. It is outbound B2B sales: 80 to 100 calls a day, finding new businesses and taking them all the way from the first conversation to a signed deal. It is close to entry level despite the title, the team teaches you its own method, and the commission on top of your base salary has no ceiling. You can work from the Madrid office or remotely from anywhere in Spain. There is no relocation package, so this one is for people who can organise their own move or are already here. In return you get one of Europe's great capitals and a sales skill set that travels anywhere you go next.",
    responsibilities: [
      "Prospect German businesses by phone, 80 to 100 calls a day",
      "Run the full sales cycle, from first contact to closing the deal",
      "Learn and apply the team's own sales method, with coaching from your team leader",
    ],
    requirements: [
      "Native German",
      "One to two years of sales experience, ideally on the phone",
      "Genuinely coachable: open, humble and keen to learn a new way of doing things",
      "A lot of energy, and a love of being on the phone",
      "Living in Spain, or able to organise your own move (no relocation package)",
    ],
    package: [
      "Uncapped commission on top of your base salary",
      "Work from the Madrid office or remotely within Spain",
      "Coaching and a structured sales method from day one",
      "Full sales-cycle experience that opens doors across B2B tech",
    ],
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
      "Living abroad grows you faster than almost anything you can do at home, and Greece makes the first step about as easy as it gets. Dutch is one of the two languages our Greek partner hires for all year round, so there is nearly always something open, usually across several programmes at once. Tell us you are ready and we match you to the desk and the start date that suit you, with the flight and the first weeks' hotel covered before you arrive. Athens hands you an ancient city with a coastline attached, the islands a ferry away for the weekend, and colleagues from all over Europe who are just as new as you are.",
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
      "The largest and most consistently open desk in Greece, and the fastest way we know to swap a routine for a life you will talk about for years. German speakers are hired here effectively without pause, across several programmes and in both Athens and Thessaloniki, so start dates come round every couple of weeks and you rarely wait long. The flight and your first weeks' hotel are covered before you have unpacked. From there it is fourteen salaries a year, a city with the sea at the end of the metro line, and a circle of people from everywhere who made the same decision you did.",
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
    heroPhoto: "/photos/greece-mykonos.jpg",
    heroAlt: "Whitewashed island houses above turquoise water in the Greek islands",
    employer: "One of the largest customer experience employers in Greece",
    contract: "Permanent",
    model: "On-site",
    packageHighlight: "Flight and hotel covered · 14 salaries a year",
    openings: "Several desks, intakes monthly",
    start: "Intakes monthly",
    summary:
      "Danish speakers are scarce in Greece, and that scarcity works in your favour: it is exactly why these desks carry the full relocation package and get properly looked after. Several programmes run a Danish seat, in Athens and Thessaloniki, and we match you to the one that fits. You land into fourteen salaries a year, private healthcare, and a country where a Copenhagen rent buys a whole life by the sea. The bigger return is the one you take with you: a year of figuring out a new country, a new language and a new circle of friends does more for you than five years of the same routine at home.",
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
      "Norwegian speakers are rare enough in Greece that these desks get looked after properly, with the entire move paid for. The unusual part: alongside Athens and Thessaloniki, one of the programmes runs from Chania on Crete, with the old Venetian harbour a walk from the office. Choose the island if the thought of it makes you smile, because most people who can, do. What you bring home, whenever that is, is the part nobody can put on a payslip: the confidence of someone who built a life somewhere new, from scratch.",
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
      "Swedish is a scarce language in Athens, so these desks carry the full relocation package and tend to be looked after. Several programmes run a Swedish seat and we match you to the one that fits. You swap a Swedish winter for fourteen salaries a year, private healthcare, and a coastline that runs all the way out to the islands. And you get the thing everyone who has lived abroad talks about afterwards: the friends from everywhere, the problems you learned to solve on your own, and a much clearer idea of what you want from life.",
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

  /* ── CYPRUS ───────────────────────────────────────────────────────────
     One Larnaca hub, hiring Danish only for now. ─────────────── */
  {
    slug: "danish-customer-support-cyprus",
    title: "Danish-speaking Customer Support Agent",
    language: "Danish",
    category: "Customer advisor",
    country: "cyprus",
    countryName: "Cyprus",
    flag: "🇨🇾",
    city: "Larnaca",
    photo: "/photos/larnaca-finikoudes-promenade-palms.jpg",
    alt: "The palm-lined Finikoudes promenade and beach in Larnaca",
    heroPhoto: "/photos/larnaca-seafront-aerial.jpg",
    heroAlt: "Larnaca seafront from above, the beach and promenade running along the town",
    employer: "A global customer experience company, from its Larnaca hub",
    contract: "Full-time",
    model: "On-site",
    packageHighlight: "Tax-free up to ~€22,000 · flight reimbursed",
    start: "Regular intakes",
    featured: true,
    summary:
      "For a first move abroad, Cyprus is about as gentle as it gets, and it still changes you the way only living abroad can. You work in Danish from a customer experience hub in Larnaca, supporting players of a world-famous gaming brand or readers of a leading e-book platform. No customer service experience needed. The package takes the risk out of the move: your first month in shared accommodation is free, your flight down is reimbursed, there is a monthly bonus on top of your salary, and no income tax on earnings up to around €22,000 a year, so almost everything you earn is yours to keep. Around you: a palm-lined promenade, swimming from May to November, English spoken everywhere, and a team from all over Europe. Come for the sun and the savings. Leave, whenever you do, with friends from ten countries and the confidence of someone who made it work somewhere new.",
    responsibilities: [
      "Support Danish-speaking customers by phone, email and chat",
      "Depending on the project: a world-famous gaming brand, or a leading e-book and audiobook platform",
      "Solve account, order and technical questions end to end",
      "Escalate the complex cases with the detail the next team needs",
    ],
    requirements: [
      "Native Danish (there is a short language test)",
      "A clean criminal record",
      "Happy to book your own flight down; it is reimbursed afterwards",
      "No customer service experience required",
    ],
    package: [
      "Your first month of shared accommodation free",
      "Your flight down reimbursed",
      "A monthly performance bonus on top of your salary",
      "No income tax on salaries up to around €22,000 a year",
      "An international team in a seaside city",
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
