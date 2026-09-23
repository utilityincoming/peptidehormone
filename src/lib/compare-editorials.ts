// Pair-specific editorial copy. Both URL orders share the same evidence and FAQ.
export const BPC_TB_COMPARISON = {
  id: "bpc-tb",
  updated: "2026-09-20",
  description: "BPC-157 vs TB-500: human evidence, fragment identity, stacking claims, side effects, FDA concerns, and sport restrictions. Neither is proven for injury repair.",
  intro: "BPC-157 and TB-500 are different experimental peptides, not two proven recovery treatments. BPC-157 has a larger preclinical repair literature and a few small human reports. TB-500 has an additional identity problem: findings for full-length thymosin β4 are often presented as evidence for its much shorter fragment. The sources below do not establish a head-to-head winner for tendon, muscle, or joint recovery.",
  faqs: [
    {
      q: "Is BPC-157 or TB-500 better for tendon and muscle injuries?",
      a: "Neither has demonstrated superiority in a reliable human head-to-head trial identified in the sources reviewed here. BPC-157 has more direct preclinical repair research and small human reports, but these do not establish tendon healing, faster return to sport, or superiority over TB-500 or standard care.",
    },
    {
      q: "Is TB-500 the same as thymosin beta-4?",
      a: "No. Full-length thymosin β4 has 43 amino acids. FDA's 2026 evaluation describes TB-500 as the N-acetylated seven-amino-acid fragment Ac-LKKTETQ, corresponding to residues 17–23. Commercial naming is inconsistent. A trial of the full-length peptide does not establish that a TB-500 product has the same benefits or safety.",
    },
    {
      q: "Does taking BPC-157 and TB-500 together make the stack more effective?",
      a: "A beneficial interaction has not been established in controlled human recovery trials in the evidence reviewed here. A 2021 knee-pain report included only four people given BPC-157 plus a product described as TB4, with no randomized comparison or TB4-only arm. It cannot prove synergy, establish an optimal combination, or be assumed to test the defined TB-500 fragment.",
    },
    {
      q: "Which is safer, and what side effects are known?",
      a: "There is no dependable comparative safety estimate. FDA highlights potential immune reactions, peptide impurities, and inadequate safety information. A two-person BPC-157 infusion pilot reported no side effects over its short observation period, but cannot rule out uncommon or delayed harm. Neither long-term safety nor a safer winner is established.",
    },
    {
      q: "Do half-life claims establish a dose or injection schedule?",
      a: "No. Human pharmacokinetics are insufficiently characterized for a reliable comparison. Animal half-lives, a parent peptide's kinetics, and detection windows are not interchangeable with the human half-life of a particular product. None establishes an effective or safe injury-recovery regimen.",
    },
    {
      q: "Are BPC-157 and TB-500 FDA-approved or allowed in sport?",
      a: "Neither is an FDA-approved treatment for injury recovery. A compounding nomination or advisory discussion is not drug approval. The 2026 WADA List prohibits BPC-157 under S0 and thymosin β4 and its derivatives, including TB-500, under S2.3, both in and out of competition.",
    },
  ],
};

export function comparisonEditorial(a: string, b: string) {
  return (a === "bpc-157" && b === "tb-500") || (a === "tb-500" && b === "bpc-157")
    ? BPC_TB_COMPARISON
    : undefined;
}

export const BPC_TB_SOURCES = {
  review: { title: "Vasireddi et al. Emerging Use of BPC-157 in Orthopaedic Sports Medicine: A Systematic Review (2025; search through June 3, 2024).", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12313605/" },
  rat: { title: "Biçer et al. Effects of BPC-157 and TB-500 on Achilles tendon healing in rats: A histopathological and biomechanical study (2026).", url: "https://www.jointdrs.org/full-text/1851" },
  hamstring: { title: "ClinicalTrials.gov. NCT07437547: BPC 157 for Acute Hamstring Muscle Strain Repair (registry record; no results posted when checked).", url: "https://clinicaltrials.gov/study/NCT07437547" },
  shoulder: { title: "ClinicalTrials.gov. NCT07803250: Impact of BPC-157 on Recovery Following Rotator Cuff Repair Surgery (registry record; no results posted when checked).", url: "https://clinicaltrials.gov/study/NCT07803250" },
  tbRegistry: { title: "ClinicalTrials.gov API. NCT07487363: TB-500 cardiovascular record; summary explicitly describes a fictional example (checked September 20, 2026).", url: "https://clinicaltrials.gov/api/v2/studies/NCT07487363" },
  knee: { title: "Lee & Padgett. Intra-Articular Injection of BPC 157 for Multiple Types of Knee Pain (2021).", url: "https://pubmed.ncbi.nlm.nih.gov/34324435/" },
  pilot: { title: "Lee & Burgess. Safety of Intravenous Infusion of BPC157 in Humans: A Pilot Study (2025).", url: "https://pubmed.ncbi.nlm.nih.gov/40131143/" },
  fdaBpc: { title: "FDA. BPC-157-related bulk drug substances: briefing document for the July 2026 Pharmacy Compounding Advisory Committee.", url: "https://www.fda.gov/media/193343/download" },
  fdaTb: { title: "FDA. TB-500-related bulk drug substances: briefing document for the July 2026 Pharmacy Compounding Advisory Committee.", url: "https://www.fda.gov/media/193349/download" },
  fdaSafety: { title: "FDA. Certain bulk drug substances for use in compounding that may present significant safety risks.", url: "https://www.fda.gov/drugs/human-drug-compounding/certain-bulk-drug-substances-use-compounding-may-present-significant-safety-risks" },
  wada: { title: "WADA. 2026 Prohibited List, sections S0 and S2.3.", url: "https://www.wada-ama.org/sites/default/files/2025-09/2026list_en_final_clean_september_2025.pdf" },
} as const;
