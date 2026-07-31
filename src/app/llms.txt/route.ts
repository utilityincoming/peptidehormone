// /llms.txt — a plain-text map of the site for AI answer engines (the llmstxt.org
// convention). Generated from the same catalog data the pages use, so it never goes
// stale: molecules grouped by signaling family with their evidence tier + type,
// then insights, tools, and the methodology. No new content, no fabricated facts.

import { HORMONES } from "@/lib/hormones";
import { FAMILIES } from "@/lib/families";
import { INSIGHTS } from "@/lib/insights";

export const dynamic = "force-static";

const SITE = "https://www.peptidehormone.com";

// First sentence only — keeps each index line to one concise entry.
const firstSentence = (s: string) => s.split(/(?<=\.)\s/)[0];

export function GET() {
  const out: string[] = [
    "# Peptide Hormone",
    "",
    `> An editorially independent, research-grade reference on the peptide hormone system — ${HORMONES.length} molecules across ${FAMILIES.length} signaling families, each sourced from PubMed and graded on a five-tier evidence ladder.`,
    "",
    "Educational reference only, not medical advice. Every monograph cites its PubMed references by PMID and carries an explicit evidence tier (Established through Limited) and molecule type (endogenous, analog, or research peptide). Sourced, not asserted.",
  ];

  for (const fam of FAMILIES) {
    const members = HORMONES.filter((h) => h.family === fam.slug);
    if (!members.length) continue;
    out.push("", `## ${fam.name}`);
    for (const h of members) {
      const name = h.abbr ? `${h.name} (${h.abbr})` : h.name;
      const tags = `${h.evidence ?? "Established"}, ${h.type ?? "endogenous"}`;
      out.push(`- [${name}](${SITE}/hormones/${h.slug}): ${h.summary} [${tags}]`);
    }
  }

  out.push("", "## Insights");
  for (const i of INSIGHTS) {
    out.push(`- [${i.title}](${SITE}/insights/${i.slug}): ${firstSentence(i.dek)}`);
  }

  out.push(
    "",
    "## Tools",
    `- [Peptide cycle planner](${SITE}/tools/cycle-planner): plan a research cycle — goal stacks, a week-by-week timeline, reference dosing, and a supply estimate.`,
    `- [Half-life & dosing calculator](${SITE}/tools/half-life): model bioactive duration, accumulation, and steady state from a half-life and dosing interval.`,
    `- [Analog comparison](${SITE}/tools/compare): compare the molecules in a lineage side by side.`,
    "",
    "## About",
    `- [Methodology & standards](${SITE}/methodology): how references are sourced from PubMed, how evidence is graded, how molecules are classified, and where the reference stops.`,
    "",
  );

  return new Response(out.join("\n"), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
