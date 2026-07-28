export const site = {
  name: "Get Work Abroad",
  tagline: "Language jobs on the Mediterranean",
  url: "https://getworkabroad.com",

  /* Live: the domain and the Microsoft 365 mailbox.
     WhatsApp is Kian's mobile for now — a dedicated business number is coming.
     TODO(Magnus): the Instagram and TikTok handles are still guesses; swap
     them for the brand accounts before promoting the site. */
  email: "hello@getworkabroad.com",
  whatsappNumber: "+34 681 81 15 89",
  whatsappLink: "https://wa.me/34681811589",
  instagram: "https://instagram.com/getworkabroad",
  tiktok: "https://tiktok.com/@getworkabroad",

  /* Employers is deliberately kept out of the primary nav (it still lives in
     the footer): this bar is the candidate funnel, and "Your safety" earns a
     slot here because trust is the thing a relocating jobseeker needs most. */
  nav: [
    { label: "Open jobs", href: "/jobs" },
    { label: "Spain", href: "/destinations/spain" },
    { label: "Portugal", href: "/destinations/portugal" },
    { label: "Greece", href: "/destinations/greece" },
    { label: "How it works", href: "/how-it-works" },
    { label: "Your safety", href: "/safety" },
    { label: "About", href: "/about" },
  ],
} as const;

/** Languages we recruit for — drives the marquee and the job filters. */
export const languages = [
  "Dutch",
  "German",
  "Danish",
  "Norwegian",
  "Swedish",
] as const;
