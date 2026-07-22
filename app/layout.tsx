import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const interTight = Inter_Tight({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Get Work Abroad · Language jobs in Spain, Portugal & Greece",
    template: "%s · Get Work Abroad",
  },
  description:
    "Permanent jobs on the Mediterranean for native language speakers. Flights, accommodation and paid training included. Free for candidates, always.",
  keywords: [
    "jobs abroad",
    "language jobs",
    "work in Spain",
    "work in Portugal",
    "work in Greece",
    "customer service jobs abroad",
    "relocation package",
  ],
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/icon.png" }],
  },
  openGraph: {
    title: "Get Work Abroad · Language jobs on the Mediterranean",
    description:
      "Permanent roles in Spain, Portugal and Greece for native language speakers. Flights, accommodation and paid training included.",
    url: site.url,
    siteName: site.name,
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Get Work Abroad · Language jobs on the Mediterranean",
    description:
      "Permanent roles in Spain, Portugal and Greece. Flights, accommodation and paid training included.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${interTight.variable} h-full`}
      data-scroll-behavior="smooth"
    >
      <body className="flex min-h-full flex-col bg-[color:var(--color-sand-50)] text-[color:var(--color-body)]">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-[color:var(--color-sea-700)] focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
