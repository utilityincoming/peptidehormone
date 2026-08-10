export * from "./types";

import type { Reference } from "@/lib/references";
import { SCHEMA_VERSION, type Provenance } from "./types";

/**
 * Lift a curated PubMed Reference (lib/references.ts) into a Provenance record,
 * so monograph citations can back tiered `clinical`/`preclinical` claims without
 * a parallel data model. `retrievedAt` is supplied by the caller — the date the
 * fact was entered or re-verified; a PMID carries no intrinsic retrieval date.
 */
export function provenanceFromReference(ref: Reference, retrievedAt: string): Provenance {
  return {
    source_type: "publication",
    source_name: "PubMed",
    source_id: ref.pmid,
    source_url: `https://pubmed.ncbi.nlm.nih.gov/${ref.pmid}/`,
    retrieved_at: retrievedAt,
    schema_version: SCHEMA_VERSION,
  };
}

/**
 * Provenance for a `reference`-tier identity claim pulled from the PubChem
 * compound registry. `retrievedAt` is the date the record was fetched/verified
 * — the honest anchor for a `reference` claim, since a CID carries no intrinsic
 * date. Use for MW / formula / CID identity facts that a reader can check by
 * opening the linked compound page.
 */
export function provenanceFromPubChem(cid: string, retrievedAt: string): Provenance {
  return {
    source_type: "registry",
    source_name: "PubChem",
    source_id: `CID ${cid}`,
    source_url: `https://pubchem.ncbi.nlm.nih.gov/compound/${cid}`,
    retrieved_at: retrievedAt,
    method: "PubChem compound record — average molecular weight",
    schema_version: SCHEMA_VERSION,
  };
}
