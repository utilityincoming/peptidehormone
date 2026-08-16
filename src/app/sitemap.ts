import type { MetadataRoute } from "next";
import { FAMILIES } from "@/lib/families";
import { HORMONES } from "@/lib/hormones";
import { INSIGHTS } from "@/lib/insights";

const BASE = "https://peptidehormone.com";

const MONTHS = [
  "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december",
];

/**
 * Parse an insight's human "reviewed" label ("August 2026") into a Date.
 * Only insights carry a real review date, so they are the only entries that
 * claim a lastModified — the rest stay silent rather than assert a build-time
 * date that would tell crawlers the whole site changed on every deploy.
 */
function reviewedDate(label: string): Date | undefined {
  const [month, year] = label.trim().toLowerCase().split(/\s+/);
  const m = MONTHS.indexOf(month);
  const y = Number(year);
  if (m < 0 || !Number.isFinite(y)) return undefined;
  return new Date(Date.UTC(y, m, 1));
}

type Entry = MetadataRoute.Sitemap[number];

export default function sitemap(): MetadataRoute.Sitemap {
  // Hubs a crawler should reach first, then the reference bodies.
  const hubs = [
    "",
    "/catalog",
    "/insights",
    "/available",
    "/tools",
    "/why-peptides",
    "/methodology",
    "/research",
  ];
  const toolPages = ["/tools/half-life", "/tools/compare", "/tools/cycle-planner"];

  const entries: Entry[] = [
    ...hubs.map((path) => ({
      url: `${BASE}${path}`,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.9,
    })),
    ...FAMILIES.map((f) => ({
      url: `${BASE}/families/${f.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...INSIGHTS.map((i) => ({
      url: `${BASE}/insights/${i.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      lastModified: reviewedDate(i.reviewed),
    })),
    ...HORMONES.map((h) => ({
      url: `${BASE}/hormones/${h.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...toolPages.map((path) => ({
      url: `${BASE}${path}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];

  return entries;
}
