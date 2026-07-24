export const site = {
  name: "Get Work Abroad",
  tagline: "Language jobs on the Mediterranean",
  url: "https://getworkabroad.com",

  /* Live: the domain and the Microsoft 365 mailbox.
     TODO(Magnus): the WhatsApp number is still a personal mobile, and the
     Instagram and TikTok handles are guesses — swap them for the brand
     accounts before promoting the site. */
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
  "Danish",
  "Norwegian",
  "Swedish",
] as const;
