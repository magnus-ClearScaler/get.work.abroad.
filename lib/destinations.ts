export type CountrySlug = "spain" | "portugal" | "greece";

export type Destination = {
  slug: CountrySlug;
  country: string;
  flag: string;
  card: { photo: string; alt: string; blurb: string };
  hero: { photo: string; alt: string };
  headline: string;
  intro: string;
  /** The honest pitch: why people actually move here, and stay. */
  whyMove: { title: string; body: string; photo: string; alt: string }[];
  /** Checkable contract and admin facts. */
  facts: { label: string; value: string }[];
  /** Real 2026 prices. Nothing here is invented or rounded up to look good. */
  costs: { item: string; price: string }[];
  costNote: string;
  cities: { name: string; photo: string; alt: string; note: string }[];
  living: { title: string; body: string }[];
  hiringFor: string[];
};

export const destinations: Destination[] = [
  /* ── SPAIN ─────────────────────────────────────────────────────────── */
  {
    slug: "spain",
    country: "Spain",
    flag: "🇪🇸",
    card: {
      photo: "/photos/user-malaga-aerial.jpg",
      alt: "Málaga from above, the bullring and the port meeting the Mediterranean",
      blurb:
        "Málaga and Alicante. Where the Costa del Sol turned into a tech coast.",
    },
    hero: {
      photo: "/photos/user-malaga-aerial.jpg",
      alt: "Málaga from above, the bullring and the port meeting the Mediterranean",
    },
    headline: "Spain",
    intro:
      "Málaga spent the last decade turning from a beach town into the fastest-growing tech city in Spain. Google put its largest European cybersecurity centre here, on the seafront between the marina and La Malagueta beach. Vodafone put a €225 million research hub here. The city ran out of local candidates, which is exactly why it is hiring people like you.",
    whyMove: [
      {
        title: "You are moving somewhere that is going up",
        body: "Google's biggest cybersecurity centre in Europe sits on the Málaga seafront. Vodafone is investing €225 million and more than 600 skilled jobs into its research hub here. People have started saying Málaga Valley without much irony. A service desk in this city is not a dead end, it is a foot in a place where international companies are arriving faster than they can staff.",
        photo: "/photos/user-malaga-aerial.jpg",
        alt: "Málaga from above, the bullring and the port meeting the Mediterranean",
      },
      {
        title: "The Costa del Sol already speaks your language",
        body: "This stretch of coast has one of the densest concentrations of Nordic, Dutch and German speakers working anywhere in Europe, and several hundred of them are inside the hubs we place into. You will not be the only Dane in the building. That matters far more in month three than it does in week one.",
        photo: "/photos/malaga-beach.jpg",
        alt: "Palm-lined beach promenade in Málaga",
      },
      {
        title: "Lunch takes two hours and nobody apologises",
        body: "The menú del día is a national institution: three courses, bread and a drink for €12 to €15, on a terrace, in the middle of a working day. Dinner starts at nine. The city is out until two. It takes about a month to stop feeling like you are getting away with something.",
        photo: "/photos/spain-tapas-table.jpg",
        alt: "A table of croquetas, jamón and cold drinks in the Spanish sun",
      },
      {
        title: "Roughly 300 days of sun a year",
        body: "That statistic gets quoted until it means nothing, so here is what it actually looks like. Swimming in October. Terraces in January. A winter that is a mild grey fortnight rather than a season. If you are coming from northern Europe, this is the part that changes your life, not the job title.",
        photo: "/photos/alicante-beach-castle.jpg",
        alt: "The beach below Santa Bárbara castle in Alicante",
      },
    ],
    facts: [
      { label: "Where we place", value: "Málaga and Alicante" },
      { label: "Typical contract", value: "Permanent Spanish contract" },
      { label: "Working week", value: "39 hours" },
      { label: "Paid holiday", value: "23 days plus public holidays" },
      { label: "Healthcare", value: "Public system, plus private cover from the employer" },
      { label: "Language needed", value: "Your native language plus around B2 English" },
    ],
    costs: [
      { item: "Room in a shared flat, Málaga", price: "€400 to €550" },
      { item: "Room in a shared flat, Alicante", price: "€350 to €450" },
      { item: "Studio or one-bed, outer Málaga", price: "€650 to €1,000" },
      { item: "Menú del día, three courses", price: "€12 to €15" },
      { item: "Caña of beer on a terrace", price: "€2 to €3" },
      { item: "Monthly transport pass", price: "Around €30" },
      { item: "Gym membership", price: "€25 to €40" },
      { item: "Comfortable month, sharing a flat", price: "€1,100 to €1,400" },
    ],
    costNote:
      "Alicante runs about 10% cheaper than Málaga across the board. Both sit well below Barcelona and Madrid, which is a large part of why the hubs are here rather than there.",
    cities: [
      {
        name: "Málaga",
        photo: "/photos/user-malaga-aerial.jpg",
        alt: "Málaga from above, the bullring and the port meeting the Mediterranean",
        note: "The main hub. Google, Vodafone, a rebuilt port full of restaurants, and La Malagueta beach a walk from the office. Most of our Nordic, Dutch and German desks are here.",
      },
      {
        name: "Alicante",
        photo: "/photos/user-alicante-explanada.jpg",
        alt: "Palms and the Explanada promenade in Alicante under a Spanish flag",
        note: "Costa Blanca, around 10% cheaper than Málaga, and smaller in a way people either love or outgrow. The Explanada and the beach are both a short walk from the office.",
      },
    ],
    living: [
      {
        title: "Getting set up",
        body: "You need a NIE number and a Spanish social security number. Employers who hire internationally walk you through both, and most book the appointments with you rather than handing you a form and wishing you luck. A bank account takes an afternoon once the NIE is through.",
      },
      {
        title: "Finding somewhere to live",
        body: "Most people land in a shared flat found through Idealista or a Facebook group, then move somewhere better after six months once they know which barrio they actually want. In Málaga: Soho and El Perchel are central and lively, Teatinos is cheaper and full of students, Pedregalejo is by the sea and quieter.",
      },
      {
        title: "Weekends",
        body: "Granada and the Alhambra are ninety minutes inland, Seville two and a half hours, Morocco a ferry from Tarifa. The white villages start half an hour from Málaga. The Sierra Nevada has skiing into April, so you can genuinely ski and swim in the same weekend.",
      },
    ],
    hiringFor: [
      "Customer advisor",
      "Technical support",
      "Inside sales",
      "Back office",
    ],
  },

  /* ── PORTUGAL ──────────────────────────────────────────────────────── */
  {
    slug: "portugal",
    country: "Portugal",
    flag: "🇵🇹",
    card: {
      photo: "/photos/user-lisbon-golden.jpg",
      alt: "Lisbon at golden hour, the castle above the rooftops and the Tagus beyond",
      blurb:
        "Lisbon and Porto. The softest landing there is for a first move abroad.",
    },
    hero: {
      photo: "/photos/user-lisbon-golden.jpg",
      alt: "Lisbon at golden hour, the castle above the rooftops and the Tagus beyond",
    },
    headline: "Portugal",
    intro:
      "Portugal is where most people make their first move, and there are good reasons for that. The accommodation packages are the most generous in Europe, some covering your rent and bills outright. English gets you a long way from day one. And Lisbon has spent a decade accumulating a community of people who arrived exactly the way you are about to.",
    whyMove: [
      {
        title: "The accommodation packages are unmatched",
        body: "Several Lisbon employers do not just help you find a flat, they put you in one. A private room in a shared apartment for the length of your contract with rent, electricity and water included, plus a pick-up at the airport when you land. Nowhere else in Europe takes that much risk out of moving abroad.",
        photo: "/photos/lisbon-dusk-rooftops.jpg",
        alt: "Alfama rooftops at pink dusk above the Tagus",
      },
      {
        title: "The Atlantic is thirty minutes away",
        body: "Carcavelos, Costa da Caparica and Guincho are all a short train or bus from central Lisbon, and the surf is genuinely good rather than a nice idea. Plenty of people who moved here for the job are organising their week around the swell within two months.",
        photo: "/photos/portugal-surf.jpg",
        alt: "A surfer walking out at a Portuguese beach break beside an old fort",
      },
      {
        title: "You can cross the city on foot",
        body: "Lisbon is small. Alfama to Bairro Alto is twenty minutes on foot, past three viewpoints and a tram you did not plan to catch. After a northern European city built around a commute, living somewhere you can cross in an evening quietly rearranges your whole week.",
        photo: "/photos/lisbon-sunset-bridge.jpg",
        alt: "Golden sunset over Lisbon with the 25 de Abril bridge beyond",
      },
      {
        title: "Everyone you meet also just arrived",
        body: "This is the underrated part. Lisbon has spent ten years being the city people move to, so the social infrastructure for arriving already exists: language exchanges, football teams, surf groups, and a very high tolerance for someone new turning up on their own.",
        photo: "/photos/portugal-coast-aerial.jpg",
        alt: "A turquoise Atlantic cove on the Portuguese coast seen from above",
      },
    ],
    facts: [
      { label: "Where we place", value: "Lisbon and Porto" },
      { label: "Typical contract", value: "Permanent Portuguese contract" },
      { label: "Working week", value: "40 hours" },
      { label: "Paid holiday", value: "22 days plus public holidays" },
      { label: "Common extras", value: "Flight, accommodation, meal allowance" },
      { label: "Language needed", value: "Your native language plus around B2 English" },
    ],
    costs: [
      { item: "Room in a shared flat, Lisbon", price: "€350 to €550" },
      { item: "Room in a shared flat, Porto", price: "€300 to €450" },
      { item: "Central or trendy Lisbon room", price: "€500 to €700" },
      { item: "Set lunch in a tasca", price: "Around €8" },
      { item: "Dinner out with a drink", price: "€15 to €22" },
      { item: "Navegante monthly transport pass", price: "€40" },
      { item: "Espresso at the counter", price: "€0.80" },
      { item: "Comfortable month, sharing a flat", price: "€1,100 to €1,300" },
    ],
    costNote:
      "Porto runs roughly 15% to 20% cheaper than Lisbon, with the gap widest on rent. And if your package includes accommodation, most of the number above simply disappears.",
    cities: [
      {
        name: "Lisbon",
        photo: "/photos/lisbon-dusk-rooftops.jpg",
        alt: "Alfama rooftops at pink dusk above the Tagus",
        note: "The main hub by a distance. Most roles, most languages, the Atlantic half an hour away, and the largest community of people who moved for exactly the reason you are about to.",
      },
      {
        name: "Porto",
        photo: "/photos/porto-ribeira.jpg",
        alt: "Colourful riverside houses along the Douro in Porto",
        note: "Smaller, noticeably cheaper, and a lot of people quietly prefer it. The Douro is fifteen minutes from most offices and the beach at Matosinhos is on the metro.",
      },
    ],
    living: [
      {
        title: "Getting set up",
        body: "You need a NIF tax number and a Portuguese social security number. Most employers hiring internationally handle the paperwork for you, and several collect you from the airport on the day you arrive.",
      },
      {
        title: "Finding somewhere to live",
        body: "If your package includes accommodation you can skip this entirely for the first year. If not, most people start in a shared flat found through Idealista or Uniplaces. Arroios and Anjos are central and reasonable, Alcântara and Marvila are cheaper and getting busier, Cascais is a train ride out and worth it if you surf.",
      },
      {
        title: "Weekends",
        body: "Sintra's palaces are forty minutes by train and Cascais is on the same line. The Alentejo coast is two hours south and largely empty. Porto and the Douro valley are a three-hour train north. Flights home from Lisbon are cheap and frequent, which matters more than people expect.",
      },
    ],
    hiringFor: [
      "Customer advisor",
      "Technical support",
      "Content review",
      "Back office",
    ],
  },

  /* ── GREECE ────────────────────────────────────────────────────────── */
  {
    slug: "greece",
    country: "Greece",
    flag: "🇬🇷",
    card: {
      photo: "/photos/user-greece-cove.jpg",
      alt: "A turquoise cove with umbrellas on a white pebble beach in Greece",
      blurb:
        "Athens, Thessaloniki and Crete. The most complete relocation packages on the market.",
    },
    hero: {
      photo: "/photos/athens-golden.jpg",
      alt: "The Acropolis at golden hour above Athens",
    },
    headline: "Greece",
    intro:
      "Greece is the value play and it is not close. The relocation packages are the most complete we place on anywhere, the cost of living is the lowest of the three countries, and a Greek contract pays fourteen salaries a year rather than twelve. People move to Athens meaning to stay a year and are still there four years later.",
    whyMove: [
      {
        title: "Fourteen salaries a year, and someone else buys the flight",
        body: "A Greek contract pays fourteen monthly salaries, not twelve: half at Easter, half in summer, a full one at Christmas. On top of that the employers we place with book and pay your flight, put you in a hotel while you look for a flat, sort your AFM and AMKA paperwork and pay for Greek lessons. It is the most complete package on the market by a distance.",
        photo: "/photos/athens-golden.jpg",
        alt: "The Acropolis at golden hour above Athens",
      },
      {
        title: "The islands are a ferry, not a holiday",
        body: "This is what people underestimate. From Piraeus you can be on Aegina in forty minutes, Hydra in ninety, Naxos or Paros by early afternoon. A Greek island stops being a once-a-year trip and turns into something you do on a long weekend because the weather was good and the ferry was €40.",
        photo: "/photos/user-greece-cove.jpg",
        alt: "A turquoise cove with umbrellas on a white pebble beach in Greece",
      },
      {
        title: "Your money goes further here than anywhere in the eurozone",
        body: "A room in a shared flat in Athens runs €300 to €450. A pita gyros is €3.50 to €4.50. A full taverna dinner with a carafe of house wine lands around €18. On a Greek package with the flight and first weeks covered, an ordinary salary buys a standard of living that would take considerably more money in Amsterdam or Copenhagen.",
        photo: "/photos/greek-salad.jpg",
        alt: "A Greek salad topped with a slab of feta beside a glass of wine",
      },
      {
        title: "Athens is not a museum",
        body: "People arrive expecting ruins and find a scruffy, loud, extremely alive city. Bars in Exarcheia, terraces in Koukaki, rooftops looking straight at a floodlit Acropolis, and a nightlife that does not really start until midnight. The Riviera beaches are forty minutes down the tram line and winter is mild enough to keep eating outside.",
        photo: "/photos/greek-taverna-table.jpg",
        alt: "A taverna table with blue chairs set right beside the sea",
      },
    ],
    facts: [
      { label: "Where we place", value: "Athens, Thessaloniki and Chania" },
      { label: "Typical contract", value: "Permanent Greek contract" },
      { label: "Salaries per year", value: "14, not 12" },
      { label: "Working week", value: "40 hours" },
      { label: "Paid holiday", value: "20 days plus public holidays" },
      { label: "Language needed", value: "Your native language plus around B2 English" },
    ],
    costs: [
      { item: "Room in a shared flat, Athens", price: "€300 to €450" },
      { item: "Room in a shared flat, Thessaloniki", price: "€250 to €380" },
      { item: "Studio outside the centre", price: "€500 to €680" },
      { item: "Pita gyros or souvlaki", price: "€3.50 to €4.50" },
      { item: "Full taverna dinner with wine", price: "€15 to €20" },
      { item: "Monthly transport pass, Athens", price: "€30" },
      { item: "Utilities and internet", price: "€120 to €200" },
      { item: "Comfortable month, sharing a flat", price: "€900 to €1,200" },
    ],
    costNote:
      "Thessaloniki is cheaper again than Athens, and Chania cheaper still outside the summer. These are 2026 figures and food prices have moved: souvlaki is no longer the bargain older guides promise.",
    cities: [
      {
        name: "Athens",
        photo: "/photos/athens-acropolis-city.jpg",
        alt: "The Acropolis above Athens with the sea beyond",
        note: "The main hub. Ancient city, enormous nightlife, rooftop bars looking at a floodlit Acropolis, and the Riviera beaches forty minutes down the tram line.",
      },
      {
        name: "Thessaloniki",
        photo: "/photos/thessaloniki-waterfront.jpg",
        alt: "Thessaloniki's dense waterfront meeting the Thermaic Gulf",
        note: "Northern Greece and a student city, so it skews young. Widely agreed to have the best food in the country, cheaper than Athens, and Halkidiki's beaches an hour away.",
      },
      {
        name: "Chania, Crete",
        photo: "/photos/crete-chania-harbour.jpg",
        alt: "The Venetian harbour at Chania, Crete, lined with pastel houses",
        note: "Yes, there is a support hub on Crete. A Venetian harbour, mountains behind the town, and beaches that empty out completely by October.",
      },
    ],
    living: [
      {
        title: "Getting set up",
        body: "You need an AFM tax number and an AMKA social security number. The employers we place with book those appointments and go with you, and several put you in a hotel for the first weeks while you find a flat rather than leaving you to it.",
      },
      {
        title: "Finding somewhere to live",
        body: "Most people land in a shared flat in Koukaki, Pangrati or Kypseli, all central and walkable. Spitogatos is the main listings site. Because relocation support normally includes help with the search, this is far less stressful in Greece than doing it cold.",
      },
      {
        title: "Weekends",
        body: "Ferries from Piraeus and Rafina reach the Saronic islands in under two hours and the Cyclades in a morning. Delphi and Meteora are drivable. In winter, Parnassos has skiing two and a half hours from Athens. From Chania, the Samaria gorge and the pink sand at Elafonisi are both day trips.",
      },
    ],
    hiringFor: [
      "Customer advisor",
      "Technical support",
      "Content review",
      "Inside sales",
    ],
  },
];

export const byCountry = (slug: string) =>
  destinations.find((d) => d.slug === slug);
