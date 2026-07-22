export const site = {
  name: "Get Work Abroad",
  tagline: "Language jobs on the Mediterranean",
  url: "https://get-work-abroad.vercel.app",

  /* TODO(Magnus): swap these for the real brand accounts before launch. */
  email: "hello@getworkabroad.com",
  whatsappNumber: "+47 466 71 367",
  whatsappLink: "https://wa.me/4746671367",
  instagram: "https://instagram.com/getworkabroad",
  tiktok: "https://tiktok.com/@getworkabroad",

  nav: [
    { label: "Open jobs", href: "/jobs" },
    { label: "Spain", href: "/destinations/spain" },
    { label: "Portugal", href: "/destinations/portugal" },
    { label: "Greece", href: "/destinations/greece" },
    { label: "For employers", href: "/employers" },
    { label: "About", href: "/about" },
  ],
} as const;

/** Languages we recruit for — drives the marquee and the job filters. */
export const languages = [
  "Dutch",
  "German",
  "French",
  "Italian",
  "Swedish",
  "Norwegian",
  "Danish",
  "Finnish",
  "Polish",
  "Czech",
  "Hungarian",
  "Turkish",
  "Hebrew",
  "Greek",
  "Portuguese",
  "Spanish",
  "English",
] as const;
