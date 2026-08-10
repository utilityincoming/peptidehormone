// Per-claim evidence records for flagship monographs — the Standard (lib/evidence)
// applied to real molecules. Each claim carries its OWN provenance tier: a
// molecular weight is `reference` (a PubChem identity lookup, corroborated
// against the catalog `mw`); a half-life is `clinical` (human PK from a cited
// publication). The catalog's single compound-level `evidence` badge is the
// coarse view; this is the fine one it sits on top of.
//
// Rollout is deliberate and additive: only molecules with sourced claims appear
// here, so a monograph without an entry renders exactly as before. PubChem
// identities were retrieved 2026-08-09 and every MolecularWeight corroborated
// the catalog value (semaglutide 4114≈4113.6, tirzepatide 4813≈4813.5,
// liraglutide 3751≈3751.2). Every PMID resolves in that molecule's own
// references.ts block — `cite()` throws if a citation ever drifts out of it.

import type { Claim } from "@/lib/evidence/types";
import { provenanceFromPubChem, provenanceFromReference } from "@/lib/evidence";
import { REFERENCES } from "@/lib/references";

/** Date the PubChem identities were retrieved and the citations last verified. */
const VERIFIED = "2026-08-09";

/** Provenance from a curated PMID — but only if it really is in this slug's
 *  reference list, so a copy-paste error fails the build instead of shipping a
 *  citation the "Selected literature" section doesn't actually list. */
function cite(slug: string, pmid: string) {
  const ref = REFERENCES[slug]?.find((r) => r.pmid === pmid);
  if (!ref) {
    throw new Error(`claims.ts: PMID ${pmid} is not a listed reference for "${slug}"`);
  }
  return provenanceFromReference(ref, VERIFIED);
}

function molecularWeight(value: number, cid: string): Claim {
  return {
    field: "molecular_weight",
    value,
    unit: "Da",
    tier: "reference",
    freshness: "current",
    estimate_kind: "identity",
    scope_note:
      "Average molecular weight from the PubChem compound record, corroborating the catalog value. An identity lookup, not an empirical measurement.",
    provenance: provenanceFromPubChem(cid, VERIFIED),
  };
}

function halfLife(hours: number, slug: string, pmid: string, scopeNote?: string): Claim {
  return {
    field: "half_life",
    value: hours,
    unit: "h",
    tier: "clinical",
    freshness: "current",
    estimate_kind: "pharmacokinetic",
    scope_note:
      scopeNote ??
      "Human subcutaneous pharmacokinetics for the approved product, from the cited review.",
    provenance: cite(slug, pmid),
  };
}

// Flagship incretin/metabolic analogs. MW (reference) + half-life (clinical),
// except retatrutide, whose catalog entry carries no MW — so its page floors on
// the half-life alone, a clean demonstration of a single-claim rollup.
export const HORMONE_CLAIMS: Record<string, Claim[]> = {
  semaglutide: [molecularWeight(4113.6, "56843331"), halfLife(165, "semaglutide", "31031702")],
  tirzepatide: [molecularWeight(4813.5, "166567236"), halfLife(120, "tirzepatide", "39632534")],
  liraglutide: [molecularWeight(3751.2, "16134956"), halfLife(13, "liraglutide", "34626851")],
  // Compound-level tier is "Investigational", yet the half-life claim is `clinical`:
  // a peer-reviewed phase-2 trial IS human data. Tier the claim, not the compound.
  retatrutide: [
    halfLife(
      144,
      "retatrutide",
      "39318607",
      "Human phase-2 pharmacokinetics. Retatrutide is investigational, not approved; the ~6-day half-life is what supports once-weekly dosing.",
    ),
  ],
};

/** All authored claims for a monograph (empty when none have been sourced yet). */
export function claimsFor(slug: string): Claim[] {
  return HORMONE_CLAIMS[slug] ?? [];
}

/** The single claim for one field on a monograph, for rendering an inline badge. */
export function claimField(slug: string, field: string): Claim | undefined {
  return HORMONE_CLAIMS[slug]?.find((c) => c.field === field);
}
