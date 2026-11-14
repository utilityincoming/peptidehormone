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

export const SEMA_TIRZ_COMPARISON = {
  id: "sema-tirz",
  updated: "2026-11-14",
  description:
    "Semaglutide vs tirzepatide, read through the gut: how both slow gastric emptying, why that drives the early nausea and the bowel changes, why the slowing fades while the appetite effect stays, and where the next molecules are trying to take the trade-off.",
  intro:
    "Semaglutide and tirzepatide are the two most effective weight-loss drugs in wide use, and in the head-to-head SURMOUNT-5 trial tirzepatide produced more weight loss. But the number most people actually feel first is not on the scale — it is in the stomach. Both drugs work in large part by slowing the gut, and that single mechanism explains the fullness, the nausea and the changed bowel habits that dominate the first months. Read side by side through the gut, the two molecules are more alike than the marketing suggests, and the differences point straight at what the next generation is trying to fix.",
  faqs: [
    {
      q: "Do semaglutide and tirzepatide slow digestion?",
      a: "Yes. Both slow the rate at which the stomach empties into the intestine, most strongly in the first hour after a meal, and both slow movement through the small bowel. This is a core part of how they curb appetite and blunt the post-meal glucose rise, and it is also the main reason for the early nausea, fullness and bloating. Semaglutide's effect is a GLP-1 receptor effect; tirzepatide produces a comparable delay despite also engaging the GIP receptor.",
    },
    {
      q: "Is tirzepatide easier on the stomach than semaglutide?",
      a: "The evidence is mixed and does not establish a clear tolerability winner. Tirzepatide delays gastric emptying to a degree comparable to a GLP-1 drug, so the fullness mechanism is similar. There is a biological reason it might cause less nausea — GIP receptor activity blunted GLP-1-induced nausea and vomiting in animal studies — but that has not been cleanly shown to translate into fewer symptoms in people. In both drugs, gastrointestinal effects are most common during dose escalation.",
    },
    {
      q: "Why does the nausea get better over time?",
      a: "Because the gut slowing fades even as the appetite effect lasts. The delay in gastric emptying undergoes tachyphylaxis — the body adapts, and the effect measured after a single dose is largely gone within a couple of weeks of continued treatment. The central appetite suppression does not fade the same way. That split is why slow dose escalation works: it lets the stomach adapt to each step before the next.",
    },
    {
      q: "Do these drugs cause constipation or diarrhea?",
      a: "Both are common and both can occur, because the drugs slow motility along the whole upper gut, not just the stomach. Slowed transit tends toward constipation and bloating; some people instead have diarrhea, and nausea and vomiting are frequent early on. Most of these are mild to moderate and ease after the escalation phase, but delayed gastric emptying has practical consequences — for example, retained stomach contents noted before endoscopy or surgery.",
    },
    {
      q: "Will the next weight-loss drugs have fewer gut side effects?",
      a: "That is an explicit goal of current drug design, not a solved problem. The levers are real: slower dose escalation, the GIP receptor's apparent anti-nausea contribution, and biased signaling that separates the useful effects from the ones that drive nausea. Retatrutide, the triple agonist, still had gastrointestinal effects as its most common adverse events in trials, reduced by starting at a low dose. Whether adding the glucagon receptor or tuning the signaling can genuinely decouple strong weight loss from a slowed gut is still being worked out.",
    },
    {
      q: "Is retatrutide a 'GLP-3'?",
      a: "No. There is no hormone or receptor called GLP-3; the name is informal shorthand sometimes used for the newest agents. Retatrutide is a triple agonist of three receptors — GIP, GLP-1 and glucagon. Semaglutide is a single (GLP-1) agonist and tirzepatide is a dual (GIP/GLP-1) agonist, so retatrutide is the three-receptor step in that sequence, which is probably what the nickname is reaching for.",
    },
  ],
};

export function comparisonEditorial(a: string, b: string) {
  if ((a === "bpc-157" && b === "tb-500") || (a === "tb-500" && b === "bpc-157")) {
    return BPC_TB_COMPARISON;
  }
  if (
    (a === "semaglutide" && b === "tirzepatide") ||
    (a === "tirzepatide" && b === "semaglutide")
  ) {
    return SEMA_TIRZ_COMPARISON;
  }
  return undefined;
}

// External primary sources for the semaglutide/tirzepatide GI comparison.
export const SEMA_TIRZ_SOURCES = {
  surmount5: { title: "Aronne et al. Tirzepatide as Compared with Semaglutide for the Treatment of Obesity (SURMOUNT-5). N Engl J Med, 2025.", url: "https://pubmed.ncbi.nlm.nih.gov/40353578/" },
  semaGe: { title: "Hjerpsted et al. Semaglutide improves postprandial glucose and lipid metabolism, and delays first-hour gastric emptying. Diabetes Obes Metab, 2018.", url: "https://pubmed.ncbi.nlm.nih.gov/28941314/" },
  oralSemaGe: { title: "Dahl et al. Oral semaglutide improves postprandial glucose and lipid metabolism, and delays gastric emptying, in subjects with type 2 diabetes. Diabetes Obes Metab, 2021.", url: "https://pubmed.ncbi.nlm.nih.gov/33710717/" },
  tirzGe: { title: "Urva et al. The dual GIP and GLP-1 receptor agonist tirzepatide transiently delays gastric emptying similarly to selective GLP-1 receptor agonists. Diabetes Obes Metab, 2020.", url: "https://pubmed.ncbi.nlm.nih.gov/32519795/" },
  liraTachy: { title: "Halawi et al. Effects of liraglutide on weight, satiation, and gastric functions in obesity. Lancet Gastroenterol Hepatol, 2017.", url: "https://pubmed.ncbi.nlm.nih.gov/28958851/" },
  clinical: { title: "Jalleh et al. Clinical Consequences of Delayed Gastric Emptying With GLP-1 Receptor Agonists and Tirzepatide. J Clin Endocrinol Metab, 2024.", url: "https://pubmed.ncbi.nlm.nih.gov/39418085/" },
  giNausea: { title: "Borner et al. GIP Receptor Agonism Attenuates GLP-1 Receptor Agonist-Induced Nausea and Emesis in Preclinical Models. Diabetes, 2021.", url: "https://pubmed.ncbi.nlm.nih.gov/34380697/" },
  reta2: { title: "Jastreboff et al. Triple-Hormone-Receptor Agonist Retatrutide for Obesity — A Phase 2 Trial. N Engl J Med, 2023.", url: "https://pubmed.ncbi.nlm.nih.gov/37366315/" },
  reta3: { title: "Jastreboff et al. Retatrutide, a Triple Hormone Receptor Agonist, for Treatment of Obesity (TRIUMPH-1). N Engl J Med, 2026.", url: "https://pubmed.ncbi.nlm.nih.gov/42814954/" },
} as const;

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
