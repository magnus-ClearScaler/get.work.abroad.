import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Prefilled application URLs are per-candidate, not content.
      disallow: ["/apply?"],
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
