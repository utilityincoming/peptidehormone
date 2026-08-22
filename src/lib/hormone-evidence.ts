// Monograph glue between the catalog (lib/hormones) and the Validation Tier
// Schema (lib/evidence/types). Kept OUT of lib/evidence so the schema stays
// app-agnostic and portable to AmericanPeptide.
//
// What it does: turn a monograph's two quantitative properties - molecular
// weight and circulating half-life - into per-claim provenance tiers, and roll
// them up into a computed EvidenceFloor. This is the Standard's core rule made
// literal on the page: TIER THE CLAIM, NOT THE COMPOUND. A molecule's MW is
// always `reference` (molecular identity, not an empirical measurement); its
// half-life is tiered by where THAT number comes from - which is not the same
// axis as the compound's overall `evidence` grade.

import type { Hormone } from "@/lib/hormones";
import type { Tier, EvidenceFloor } from "@/lib/evidence/types";
import { TIERS } from "@/lib/evidence/types";

// Half-life claim tier. DEFAULT is `clinical`: native human hormones and
// approved/investigational analogs whose circulating half-life is measured in
// humans. The overrides below are the cases where the CLAIM is weaker than the
// COMPOUND - e.g. thymosin β4 is an Established compound, but its human
// half-life is poorly characterized, so that claim is `community`. Downgrade is
// free; keeping the default `clinical` is an implicit claim of human data, so a
// molecule without it MUST appear here.
const HALF_LIFE_TIER: Record<string, Tier> = {
  // Poorly characterized in humans - no rigorous PK behind the figure.
  "thymosin-beta-4": "community",
  "ghk-cu": "community",
  "bpc-157": "community",
  "tb-500": "community",
  "mots-c": "community",
  "aod-9604": "community",
  kpv: "community",
  // Animal / mechanistic literature, or only thin human data.
  humanin: "preclinical",
  epitalon: "preclinical",
  selank: "preclinical",
  semax: "preclinical",
  dsip: "preclinical",
  adiponectin: "preclinical",
  pthrp: "preclinical",
  myostatin: "preclinical",
  "activin-a": "preclinical",
  follistatin: "preclinical",
};

/** Provenance tier of a monograph's half-life claim. */
export function halfLifeTier(h: Hormone): Tier {
  return HALF_LIFE_TIER[h.slug] ?? "clinical";
}

export interface MonographClaim {
  /** Stable field key, matching the Standard's `Claim.field` convention. */
  field: string;
  tier: Tier;
  /** Scope note - what the figure is and what it does not license (§5). */
  scopeNote: string;
}

const MW_NOTE =
  "Molecular identity from the sequence or a chemistry registry - a reference figure, not an empirical measurement. Approximate for glycoproteins and conjugates.";

const HALF_LIFE_NOTE: Record<Tier, string> = {
  reference: "",
  clinical:
    "Circulating half-life measured in humans - native physiology or clinical pharmacokinetics.",
  preclinical:
    "Non-human, in-vitro, or only thin human data. Interspecies scaling of a half-life is unreliable.",
  third_party: "",
  vendor_reported: "",
  community:
    "Half-life is poorly characterized in humans. The figure is indicative of order-of-magnitude, not an established value.",
};

/** The per-claim records surfaced on a monograph, strongest data first. */
export function monographClaims(h: Hormone): MonographClaim[] {
  const claims: MonographClaim[] = [];
  if (h.mw != null) {
    claims.push({ field: "molecular_weight", tier: "reference", scopeNote: MW_NOTE });
  }
  if (h.halfLife) {
    const tier = halfLifeTier(h);
    claims.push({ field: "half_life", tier, scopeNote: HALF_LIFE_NOTE[tier] });
  }
  return claims;
}

/**
 * Page-level rollup (§3): the floor is the LOWEST tier among the monograph's
 * load-bearing claims - computed, never asserted. Computed here rather than via
 * computeEvidenceFloor() so we never have to mint full Claim/Provenance records
 * (which would mean inventing retrieval dates and source names we do not have);
 * we assert only the tier, which we can defend.
 */
export function monographFloor(h: Hormone): EvidenceFloor | null {
  const claims = monographClaims(h);
  if (claims.length === 0) return null;
  const distribution: Partial<Record<Tier, number>> = {};
  let floor = claims[0].tier;
  for (const c of claims) {
    distribution[c.tier] = (distribution[c.tier] ?? 0) + 1;
    if (TIERS[c.tier].weight < TIERS[floor].weight) floor = c.tier;
  }
  return { floor, distribution, load_bearing_fields: claims.map((c) => c.field) };
}
