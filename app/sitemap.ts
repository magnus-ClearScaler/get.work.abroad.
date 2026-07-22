import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { jobs } from "@/lib/jobs";
import { destinations } from "@/lib/destinations";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${site.url}${path}`;

  return [
    { url: url("/"), changeFrequency: "weekly", priority: 1 },
    { url: url("/jobs"), changeFrequency: "daily", priority: 0.9 },
    ...destinations.map((d) => ({
      url: url(`/destinations/${d.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...jobs.map((j) => ({
      url: url(`/jobs/${j.slug}`),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    { url: url("/employers"), changeFrequency: "monthly", priority: 0.6 },
    { url: url("/about"), changeFrequency: "monthly", priority: 0.5 },
    { url: url("/apply"), changeFrequency: "monthly", priority: 0.6 },
    { url: url("/safety"), changeFrequency: "yearly", priority: 0.5 },
    { url: url("/privacy"), changeFrequency: "yearly", priority: 0.2 },
  ];
}
