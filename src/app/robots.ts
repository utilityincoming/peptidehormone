import type { MetadataRoute } from "next";

const BASE = "https://peptidehormone.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // JSON endpoints (chat, checkout, pass, webhook) are not pages; crawling
      // them only produces "Blocked"/"Soft 404" noise in Search Console.
      // /search and /research/pass stay crawlable so their noindex tags are read.
      disallow: ["/api/"],
    },
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
