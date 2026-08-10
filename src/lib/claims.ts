// Per-claim evidence records for flagship monographs — the Standard (lib/evidence)
// applied to real molecules. Each claim carries its OWN provenance tier: a
// molecular weight is `reference` (a PubChem identity lookup, corroborated
// against the catalog `mw`); a half-life is `clinical` (human PK from a cited
// publication). The catalog's single compound-level `evidence` badge is the
// coarse view; this is the fine one it sits on top of.
//
// Rollout is deliberate and additive: only molecules with sourced claims appear
// here, so a monograph without an entry renders exactly as before. PubChem
// identities were retrieved 2026-08-09/10 and every MolecularWeight corroborated
// the catalog value (sema 4114≈4113.6, tirze 4813≈4813.5, lira 3751≈3751.2,
// GHK-Cu 400.9). Every PMID resolves in that molecule's own
// references.ts block — `cite()` throws if a citation ever drifts out of it.

import type { Claim } from "@/lib/evidence/types";
import { provenanceFromPubChem, provenanceFromReference } from "@/lib/evidence";
import { REFERENCES } from "@/lib/references";

/** Date the PubChem identities were retrieved and the citations last verified. */
const VERIFIED = "2026-08-10";

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

const MW_NOTE =
  "Average molecular weight from the PubChem compound record, corroborating the catalog value. An identity lookup, not an empirical measurement.";

function molecularWeight(value: number, cid: string, scopeNote: string = MW_NOTE): Claim {
  return {
    field: "molecular_weight",
    value,
    unit: "Da",
    tier: "reference",
    freshness: "current",
    estimate_kind: "identity",
    scope_note: scopeNote,
    provenance: provenanceFromPubChem(cid, VERIFIED),
  };
}

const HALF_LIFE_NOTE =
  "Human subcutaneous pharmacokinetics for the approved product, from the cited review.";

function halfLife(
  value: number,
  unit: string,
  slug: string,
  pmid: string,
  scopeNote: string = HALF_LIFE_NOTE,
): Claim {
  return {
    field: "half_life",
    value,
    unit,
    tier: "clinical",
    freshness: "current",
    estimate_kind: "pharmacokinetic",
    scope_note: scopeNote,
    provenance: cite(slug, pmid),
  };
}

export const HORMONE_CLAIMS: Record<string, Claim[]> = {
  // Endogenous anchor: the ~2-minute native half-life every long-acting analog is
  // engineered to defeat. MW is intentionally left un-badged — native GLP-1 is a
  // mix of the (7-36)amide (~3,298 Da) and (7-37) (~3,356 Da) forms, so a single
  // reference-tier identity claim would overstate a value the catalog gives as one.
  "glp-1": [
    halfLife(
      2,
      "min",
      "glp-1",
      "17928588",
      "Native circulating half-life in humans — GLP-1 is cleared within ~2 minutes by DPP-4. This is the pharmacological problem its long-acting analogs exist to solve.",
    ),
  ],

  // Flagship incretin/metabolic analogs. MW (reference) + half-life (clinical).
  semaglutide: [molecularWeight(4113.6, "56843331"), halfLife(165, "h", "semaglutide", "31031702")],
  tirzepatide: [molecularWeight(4813.5, "166567236"), halfLife(120, "h", "tirzepatide", "39632534")],
  liraglutide: [molecularWeight(3751.2, "16134956"), halfLife(13, "h", "liraglutide", "34626851")],

  // Compound-level tier is "Investigational", yet the half-life claim is `clinical`:
  // a peer-reviewed phase-2 trial IS human data. Tier the claim, not the compound.
  // No catalog MW, so this page floors on the half-life alone.
  retatrutide: [
    halfLife(
      144,
      "h",
      "retatrutide",
      "39318607",
      "Human phase-2 pharmacokinetics. Retatrutide is investigational, not approved; the ~6-day half-life is what supports once-weekly dosing.",
    ),
  ],

  // A "Limited"-evidence research peptide whose IDENTITY is still `reference`-grade:
  // deterministic chemistry doesn't care how sparse the biology is. Identity-only,
  // so no empirical floor renders yet — just the verified MW badge.
  "ghk-cu": [
    molecularWeight(
      400.9,
      "139035031",
      "Molecular weight of the GHK-Cu copper(II) complex from the PubChem compound record. The copper-free GHK tripeptide alone is 340.4 Da.",
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
