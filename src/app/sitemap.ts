import type { MetadataRoute } from "next";
import { FAMILIES } from "@/lib/families";
import { HORMONES } from "@/lib/hormones";
import { INSIGHTS } from "@/lib/insights";

const BASE = "https://www.peptidehormone.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/catalog", "/insights", "/research", "/tools", "/tools/half-life", "/tools/compare"];
  const familyPages = FAMILIES.map((f) => `/families/${f.slug}`);
  const hormonePages = HORMONES.map((h) => `/hormones/${h.slug}`);
  const insightPages = INSIGHTS.map((i) => `/insights/${i.slug}`);

  return [...staticPages, ...familyPages, ...hormonePages, ...insightPages].map((path) => ({
    url: `${BASE}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));
}
