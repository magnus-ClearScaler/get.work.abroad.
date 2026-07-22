export type CountrySlug = "spain" | "portugal" | "greece";

export type Destination = {
  slug: CountrySlug;
  country: string;
  flag: string;
  /** Home-page card */
  card: { photo: string; alt: string; blurb: string };
  hero: { photo: string; alt: string };
  headline: string;
  intro: string;
  /** Plain, checkable facts a candidate actually wants before they move. */
  facts: { label: string; value: string }[];
  cities: { name: string; photo: string; alt: string; note: string }[];
  living: { title: string; body: string }[];
  /** Roles most commonly hired here */
  hiringFor: string[];
};

export const destinations: Destination[] = [
  {
    slug: "spain",
    country: "Spain",
    flag: "🇪🇸",
    card: {
      photo: "/photos/spain-barcelona-aerial.jpg",
      alt: "Aerial view of Barcelona's Eixample grid with the Sagrada Família",
      blurb:
        "Barcelona, Málaga and Valencia. The biggest hubs, the widest choice of roles.",
    },
    hero: {
      photo: "/photos/spain-barcelona-aerial.jpg",
      alt: "Aerial view of Barcelona's Eixample grid with the Sagrada Família",
    },
    headline: "Spain",
    intro:
      "Spain has the deepest market of the three. Barcelona and Málaga host the European service hubs for most of the big tech and travel brands, which means more roles, more languages and more room to move sideways once you are in.",
    facts: [
      { label: "Main hubs", value: "Barcelona, Málaga, Valencia" },
      { label: "Typical contract", value: "Permanent, Spanish contract" },
      { label: "Working week", value: "39 hours" },
      { label: "Paid holiday", value: "23 days plus public holidays" },
      { label: "Healthcare", value: "Public system via social security" },
      { label: "Language needed", value: "Your native language plus B2 English" },
    ],
    cities: [
      {
        name: "Barcelona",
        photo: "/photos/barcelona-beach-city.jpg",
        alt: "Barcelona seen from above with the city meeting the beach",
        note: "The largest hub. Tech, travel and fintech support teams, and a beach at the end of the metro line.",
      },
      {
        name: "Málaga",
        photo: "/photos/malaga-beach.jpg",
        alt: "Palm-lined beach promenade in Málaga",
        note: "Fast-growing, noticeably cheaper than Barcelona, and roughly 300 days of sun a year.",
      },
      {
        name: "Valencia",
        photo: "/photos/valencia-street.jpg",
        alt: "Old-town street in Valencia leading to the cathedral",
        note: "The balance option. Big-city salaries are lower, but so is everything else.",
      },
    ],
    living: [
      {
        title: "What you will spend",
        body: "A room in a shared flat runs roughly €400 to €650 in Barcelona and €350 to €500 in Málaga or Valencia. A menú del día lunch is €12 to €15. A monthly transport pass is under €25 in most cities.",
      },
      {
        title: "Getting set up",
        body: "You will need a NIE number and a Spanish social security number. Employers who hire internationally normally walk you through both, and many book the appointments for you.",
      },
      {
        title: "Life outside work",
        body: "Spanish hours take adjusting to. Dinner starts at nine, the city stays out late, and most teams are young and international. Weekend trips run to the Pyrenees, the Costa Brava or across to the Balearics.",
      },
    ],
    hiringFor: [
      "Customer advisor",
      "Technical support",
      "Inside sales",
      "Travel consultant",
      "Content review",
      "Back office",
    ],
  },
  {
    slug: "portugal",
    country: "Portugal",
    flag: "🇵🇹",
    card: {
      photo: "/photos/portugal-lisbon-alfama.jpg",
      alt: "Terracotta rooftops of Lisbon's Alfama district",
      blurb:
        "Lisbon and Porto. The friendliest landing for a first move abroad.",
    },
    hero: {
      photo: "/photos/portugal-lisbon-alfama.jpg",
      alt: "Terracotta rooftops of Lisbon's Alfama district",
    },
    headline: "Portugal",
    intro:
      "Portugal is where most people make their first move. The relocation packages are the most generous in Europe, English gets you a long way from day one, and Lisbon has spent a decade building a community of people who arrived exactly the way you are about to.",
    facts: [
      { label: "Main hubs", value: "Lisbon, Porto" },
      { label: "Typical contract", value: "Permanent, Portuguese contract" },
      { label: "Working week", value: "40 hours" },
      { label: "Paid holiday", value: "22 days plus public holidays" },
      { label: "Common extras", value: "Flight, first weeks of accommodation, meal allowance" },
      { label: "Language needed", value: "Your native language plus B2 English" },
    ],
    cities: [
      {
        name: "Lisbon",
        photo: "/photos/lisbon-funicular.jpg",
        alt: "Yellow funicular climbing a colourful Lisbon street",
        note: "The main hub by a distance. Most roles, most languages, and the biggest community of people who moved here for the same reason.",
      },
      {
        name: "Porto",
        photo: "/photos/porto-ribeira.jpg",
        alt: "Colourful riverside houses along the Douro in Porto",
        note: "Smaller, cheaper, and a lot of people prefer it. The Douro is fifteen minutes from most offices.",
      },
    ],
    living: [
      {
        title: "What you will spend",
        body: "A room in a shared flat runs roughly €400 to €600 in Lisbon and €300 to €450 in Porto. Lunch out is €8 to €12. A monthly transport pass in Lisbon is €40 and covers the whole metropolitan area.",
      },
      {
        title: "Getting set up",
        body: "You will need a NIF number and a Portuguese social security number. Most employers hiring internationally handle the paperwork and often collect you from the airport.",
      },
      {
        title: "Life outside work",
        body: "Lisbon is small enough to cross on foot and has the Atlantic on its doorstep. Cascais and Costa da Caparica are half an hour out, the surf is genuinely good, and Sintra is a train ride away.",
      },
    ],
    hiringFor: [
      "Customer advisor",
      "Technical support",
      "Content review",
      "Travel consultant",
      "Sales development",
      "Back office",
    ],
  },
  {
    slug: "greece",
    country: "Greece",
    flag: "🇬🇷",
    card: {
      photo: "/photos/greece-oia-domes.jpg",
      alt: "Blue-domed churches above the caldera in Oia, Santorini",
      blurb:
        "Athens and Thessaloniki. The strongest relocation packages we place on.",
    },
    hero: {
      photo: "/photos/athens-golden.jpg",
      alt: "The Acropolis at golden hour above Athens",
    },
    headline: "Greece",
    intro:
      "Greece is the value play. Salaries look smaller on paper than Spain, but the relocation packages are the most complete on the market and the cost of living is the lowest of the three. People move to Athens for a year and stay for four.",
    facts: [
      { label: "Main hubs", value: "Athens, Thessaloniki" },
      { label: "Typical contract", value: "Permanent, Greek contract" },
      { label: "Working week", value: "40 hours" },
      { label: "Paid holiday", value: "20 days plus public holidays" },
      { label: "Common extras", value: "Flight, hotel on arrival, help finding a flat, paid Greek lessons" },
      { label: "Language needed", value: "Your native language plus B2 English" },
    ],
    cities: [
      {
        name: "Athens",
        photo: "/photos/athens-acropolis-city.jpg",
        alt: "The Acropolis above Athens with the sea beyond",
        note: "The hub. Ancient city, huge nightlife, and the Athens Riviera beaches are forty minutes down the tram line.",
      },
      {
        name: "Thessaloniki",
        photo: "/photos/greece-taverna-alley.jpg",
        alt: "Bougainvillea over a taverna terrace in a Greek alley",
        note: "Northern Greece, student city, famously good food, and cheaper again than Athens.",
      },
      {
        name: "The islands",
        photo: "/photos/greece-milos-cove.jpg",
        alt: "Fishing boats in a turquoise cove on Milos",
        note: "Not where the offices are, but they are a ferry ride away and that is rather the point.",
      },
    ],
    living: [
      {
        title: "What you will spend",
        body: "A room in a shared flat runs roughly €300 to €450 in Athens and less in Thessaloniki. A full taverna meal is €12 to €18. A monthly transport pass in Athens is €30.",
      },
      {
        title: "Getting set up",
        body: "You will need an AFM tax number and an AMKA social security number. Employers hiring internationally normally book the appointments, and several put you in a hotel for the first weeks while you find a flat.",
      },
      {
        title: "Life outside work",
        body: "Athens surprises people. It is scruffy, warm, cheap and alive at all hours, and you are never more than a short ferry from an island. Winter is mild enough to keep eating outside.",
      },
    ],
    hiringFor: [
      "Customer advisor",
      "Technical support",
      "Content review",
      "Sales development",
      "Travel consultant",
      "Back office",
    ],
  },
];

export const byCountry = (slug: string) =>
  destinations.find((d) => d.slug === slug);
