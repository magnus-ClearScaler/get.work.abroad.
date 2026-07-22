import Link from "next/link";
import { Logo } from "./Logo";
import { Instagram, TikTok, Whatsapp, ArrowUpRight } from "./Icons";
import { site } from "@/lib/site";
import { destinations } from "@/lib/destinations";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-[color:var(--color-sea-950)] text-[color:var(--color-sea-200)]">
      <div className="mx-auto max-w-[84rem] px-5 pt-16 pb-10 sm:px-8 sm:pt-20">
        <div className="grid gap-12 border-b border-white/10 pb-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo tone="light" />
            <p className="mt-5 text-[0.9375rem] leading-relaxed text-[color:var(--color-sea-200)]/80">
              We place native language speakers into permanent roles in Spain,
              Portugal and Greece. Always free for the candidate.
            </p>
            <div className="mt-6 flex items-center gap-2.5">
              {[
                { href: site.instagram, label: "Instagram", Icon: Instagram },
                { href: site.tiktok, label: "TikTok", Icon: TikTok },
                { href: site.whatsappLink, label: "WhatsApp", Icon: Whatsapp },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-[color:var(--color-sun-400)] hover:text-[color:var(--color-sun-400)]"
                >
                  <Icon className="h-[1.05rem] w-[1.05rem]" />
                </a>
              ))}
            </div>
          </div>

          <FooterCol
            title="Jobs"
            links={[
              { label: "All open jobs", href: "/jobs" },
              { label: "Customer advisor", href: "/jobs?category=Customer+advisor" },
              { label: "Technical support", href: "/jobs?category=Technical+support" },
              { label: "Sales", href: "/jobs?category=Inside+sales" },
              { label: "Open application", href: "/apply" },
            ]}
          />

          <FooterCol
            title="Destinations"
            links={destinations.map((d) => ({
              label: d.country,
              href: `/destinations/${d.slug}`,
            }))}
          />

          <FooterCol
            title="Company"
            links={[
              { label: "About us", href: "/about" },
              { label: "For employers", href: "/employers" },
              { label: "Privacy", href: "/privacy" },
            ]}
          />
        </div>

        <div className="flex flex-col gap-6 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.8125rem] text-[color:var(--color-sea-200)]/60">
            © {year} {site.name}. Recruitment for the Mediterranean.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.8125rem]">
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-1.5 text-white transition-colors hover:text-[color:var(--color-sun-400)]"
            >
              {site.email}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <a
              href={site.whatsappLink}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 text-white transition-colors hover:text-[color:var(--color-sun-400)]"
            >
              {site.whatsappNumber}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-[0.6875rem] font-semibold tracking-[0.16em] text-[color:var(--color-sun-400)] uppercase">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link
              href={l.href}
              className="text-[0.9375rem] text-[color:var(--color-sea-200)]/80 transition-colors hover:text-white"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
