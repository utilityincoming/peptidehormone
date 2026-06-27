// Structured-data (schema.org / JSON-LD) builders. One source of truth for
// every node the site emits, derived entirely from the existing catalog data —
// no new content, no fabricated facts. Render with <JsonLd data={...} />.
//
// Site-wide Organization + WebSite live in the root layout; page builders here
// reference them by @id and add only page-specific nodes (Google merges all
// JSON-LD blocks on a page and resolves @id across them).

import type { Hormone } from "@/lib/hormones";
import type { Family } from "@/lib/families";
import type { Insight } from "@/lib/insights";
import { referencesFor } from "@/lib/references";

export const SITE_URL = "https://www.peptidehormone.com";
const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;
const LOGO = `${SITE_URL}/opengraph-image`;

type Node = Record<string, unknown>;

const ORG_REF = { "@id": ORG_ID };
const SITE_REF = { "@id": SITE_ID };

// Inlined publisher with logo, so Article-type nodes satisfy rich-result
// requirements without relying on cross-block @id resolution for the logo.
const PUBLISHER = {
  "@type": "Organization",
  name: "Peptide Hormone",
  url: SITE_URL,
  logo: { "@type": "ImageObject", url: LOGO },
};

function graph(nodes: Node[]): Node {
  return { "@context": "https://schema.org", "@graph": nodes };
}

function abs(path: string): string {
  return path.startsWith("http") ? path : `${SITE_URL}${path}`;
}

export function breadcrumbLd(items: { name: string; path: string }[], id?: string): Node {
  const node: Node = {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
  if (id) node["@id"] = id;
  return node;
}

// ── Site-wide: Organization + WebSite (rendered once, in the layout) ──
export function siteLd(): Node {
  return graph([
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: "Peptide Hormone",
      url: SITE_URL,
      description:
        "An independent, research-grade reference on the peptide hormone system. Educational only — not medical advice.",
      logo: { "@type": "ImageObject", url: LOGO },
      image: LOGO,
    },
    {
      "@type": "WebSite",
      "@id": SITE_ID,
      name: "Peptide Hormone",
      url: SITE_URL,
      inLanguage: "en",
      publisher: ORG_REF,
    },
  ]);
}

// ── Hormone monograph: MedicalWebPage + ChemicalSubstance + breadcrumb ──
export function hormoneLd(h: Hormone, family?: Family): Node {
  const url = `${SITE_URL}/hormones/${h.slug}`;

  const substance: Node = {
    "@type": "ChemicalSubstance",
    "@id": `${url}#substance`,
    name: h.name,
    description: h.summary,
    url,
  };
  if (h.abbr) substance.alternateName = h.abbr;
  if (h.class) substance.disambiguatingDescription = h.class;
  if (h.mw) {
    substance.molecularWeight = {
      "@type": "QuantitativeValue",
      value: h.mw,
      unitText: "Da",
    };
  }

  const refs = referencesFor(h.slug);
  const citation = refs.map((r) => ({
    "@type": "ScholarlyArticle",
    headline: r.title,
    url: `https://pubmed.ncbi.nlm.nih.gov/${r.pmid}/`,
    ...(r.source ? { isPartOf: { "@type": "Periodical", name: r.source } } : {}),
    ...(r.year ? { datePublished: r.year } : {}),
    identifier: { "@type": "PropertyValue", propertyID: "PMID", value: r.pmid },
  }));

  const page: Node = {
    "@type": "MedicalWebPage",
    "@id": url,
    url,
    name: h.abbr ? `${h.name} (${h.abbr})` : h.name,
    description: h.summary,
    inLanguage: "en",
    isPartOf: SITE_REF,
    publisher: ORG_REF,
    primaryImageOfPage: `${url}/opengraph-image`,
    about: { "@id": `${url}#substance` },
    breadcrumb: { "@id": `${url}#breadcrumb` },
    ...(citation.length ? { citation } : {}),
    ...(family ? { significantLink: `${SITE_URL}/families/${family.slug}` } : {}),
  };

  const crumbs = breadcrumbLd(
    [
      { name: "Home", path: "/" },
      { name: "Catalog", path: "/catalog" },
      ...(family ? [{ name: family.name, path: `/families/${family.slug}` }] : []),
      { name: h.abbr ?? h.name, path: `/hormones/${h.slug}` },
    ],
    `${url}#breadcrumb`,
  );

  return graph([page, substance, crumbs]);
}

// ── Family hub: CollectionPage + ItemList of members + breadcrumb ──
export function familyLd(family: Family, members: Hormone[]): Node {
  const url = `${SITE_URL}/families/${family.slug}`;
  const page: Node = {
    "@type": "CollectionPage",
    "@id": url,
    url,
    name: family.name,
    description: family.tagline,
    inLanguage: "en",
    isPartOf: SITE_REF,
    publisher: ORG_REF,
    breadcrumb: { "@id": `${url}#breadcrumb` },
    mainEntity: itemList(members.map((m) => ({ name: m.name, path: `/hormones/${m.slug}` }))),
  };
  const crumbs = breadcrumbLd(
    [
      { name: "Home", path: "/" },
      { name: "Families", path: "/#families" },
      { name: family.name, path: `/families/${family.slug}` },
    ],
    `${url}#breadcrumb`,
  );
  return graph([page, crumbs]);
}

// ── Generic collection page (catalog, insights index, tools index) ──
export function collectionLd(opts: {
  path: string;
  name: string;
  description: string;
  items: { name: string; path: string }[];
  crumbs: { name: string; path: string }[];
}): Node {
  const url = `${SITE_URL}${opts.path}`;
  const page: Node = {
    "@type": "CollectionPage",
    "@id": url,
    url,
    name: opts.name,
    description: opts.description,
    inLanguage: "en",
    isPartOf: SITE_REF,
    publisher: ORG_REF,
    breadcrumb: { "@id": `${url}#breadcrumb` },
    mainEntity: itemList(opts.items),
  };
  return graph([page, breadcrumbLd(opts.crumbs, `${url}#breadcrumb`)]);
}

// ── Insight article: Article + breadcrumb ──
export function insightLd(insight: Insight, family?: Family): Node {
  const url = `${SITE_URL}/insights/${insight.slug}`;
  const modified = parseReviewed(insight.reviewed);
  const article: Node = {
    "@type": "Article",
    "@id": url,
    headline: insight.title,
    description: insight.dek,
    url,
    inLanguage: "en",
    image: `${url}/opengraph-image`,
    timeRequired: `PT${insight.readingMinutes}M`,
    author: PUBLISHER,
    publisher: PUBLISHER,
    isPartOf: SITE_REF,
    mainEntityOfPage: url,
    breadcrumb: { "@id": `${url}#breadcrumb` },
    ...(modified ? { dateModified: modified } : {}),
    ...(family ? { about: family.name } : {}),
  };
  const crumbs = breadcrumbLd(
    [
      { name: "Home", path: "/" },
      { name: "Insights", path: "/insights" },
      { name: insight.title, path: `/insights/${insight.slug}` },
    ],
    `${url}#breadcrumb`,
  );
  return graph([article, crumbs]);
}

// ── Interactive tool: WebApplication + breadcrumb ──
export function toolLd(opts: { path: string; name: string; description: string }): Node {
  const url = `${SITE_URL}${opts.path}`;
  const app: Node = {
    "@type": "WebApplication",
    "@id": url,
    name: opts.name,
    description: opts.description,
    url,
    applicationCategory: "HealthApplication",
    operatingSystem: "Any (web browser)",
    browserRequirements: "Requires JavaScript",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    inLanguage: "en",
    isPartOf: SITE_REF,
    publisher: ORG_REF,
    breadcrumb: { "@id": `${url}#breadcrumb` },
  };
  const crumbs = breadcrumbLd(
    [
      { name: "Home", path: "/" },
      { name: "Tools", path: "/tools" },
      { name: opts.name, path: opts.path },
    ],
    `${url}#breadcrumb`,
  );
  return graph([app, crumbs]);
}

function itemList(items: { name: string; path: string }[]): Node {
  return {
    "@type": "ItemList",
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      url: abs(it.path),
    })),
  };
}

const MONTHS: Record<string, number> = {
  january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
  july: 7, august: 8, september: 9, october: 10, november: 11, december: 12,
};

// "June 2026" → "2026-06-01" (ISO date for dateModified). Returns undefined for
// any label that isn't a clean "Month YYYY", so we never emit a fabricated date.
function parseReviewed(label: string): string | undefined {
  const m = label.trim().match(/^([A-Za-z]+)\s+(\d{4})$/);
  if (!m) return undefined;
  const month = MONTHS[m[1].toLowerCase()];
  if (!month) return undefined;
  return `${m[2]}-${String(month).padStart(2, "0")}-01`;
}
