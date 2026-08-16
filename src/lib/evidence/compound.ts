// lib/evidence/compound — the COMPOUND-level rigor ladder.
// ---------------------------------------------------------------------------
// This is the hand-maintained "Established … Limited" label carried on
// `Hormone.evidence` (lib/hormones.ts) that drives the catalog filter. It is a
// different axis from the Validation Tier Schema in ./types: that one tiers a
// CLAIM by provenance, this one grades a COMPOUND by overall rigor. They are
// not interchangeable — `TierBadge` cannot render "Established", and this
// ladder cannot express "vendor-reported".
//
// The Standard names `EvidenceFloor` as this ladder's principled successor: a
// floor COMPUTED from a compound's per-claim tiers rather than asserted by
// hand. Until per-claim data exists for the catalog, both axes coexist. This
// module's job is narrow — be the single source of truth for the ladder's
// order and hue, so the label is defined once instead of copy-pasted.
//
// PALETTE — §6 of the Standard: never red. A low tier is a disclosure, not an
// error, and colouring it like a failure state editorialises the grade. The
// ramp below runs teal → blue → purple → slate → amber, and deliberately
// agrees with TIER_HUE in ./types at the points where the two axes mean the
// same thing (strongest → teal, preclinical → slate, weakest → amber).

/** The ladder, strongest → weakest. Mirrors EVIDENCE_TIERS in lib/hormones.ts. */
export const COMPOUND_TIERS = [
  "Established",
  "Clinical",
  "Investigational",
  "Preclinical",
  "Limited",
] as const;

export type CompoundTier = (typeof COMPOUND_TIERS)[number];

/** Hue names are DATA; the Tailwind classes live in components/evidence. */
export type CompoundHue = "teal" | "blue" | "purple" | "slate" | "amber";

export const COMPOUND_HUE: Record<CompoundTier, CompoundHue> = {
  Established: "teal",
  Clinical: "blue",
  Investigational: "purple",
  Preclinical: "slate",
  Limited: "amber",
};

/** Rank for sorting, strongest first. */
export function compoundRank(tier: CompoundTier): number {
  return COMPOUND_TIERS.indexOf(tier);
}

/**
 * Resolve an arbitrary stored label to a hue. Unknown values fall to the
 * weakest hue rather than throwing — an ungraded compound reads as the least
 * supported, which is the safe direction to fail in.
 */
export function compoundHue(tier: string): CompoundHue {
  return COMPOUND_HUE[tier as CompoundTier] ?? "amber";
}
