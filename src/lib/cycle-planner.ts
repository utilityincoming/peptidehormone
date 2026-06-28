// Reference data for the cycle planner tool. Dosing figures are illustrative
// reference ranges drawn from the published and community research literature —
// they are NOT dosing advice, and most listed peptides are research-use only.
// The disclaimer block in the UI is load-bearing; see CyclePlanner.tsx.

export type Evidence =
  | "clinical" // studied in human trials
  | "emerging" // early human / strong preclinical
  | "preclinical" // animal / in-vitro only
  | "anecdotal"; // community-reported, little formal data

export type Route = "SubQ" | "IM" | "Oral" | "Nasal";

export interface Peptide {
  /** URL-safe key, also used in the `p` query param. */
  id: string;
  name: string;
  /** Reference dose range, in mcg, per administration. */
  doseLow: number;
  doseHigh: number;
  /** Administrations per week (timeline frequency). */
  perWeek: number;
  route: Route;
  evidence: Evidence;
  /** Categorical bar hue (CSS color). */
  hue: string;
  /** One-line mechanism / use note. */
  note: string;
  /** Reference vial size in mg, for the supply estimate. */
  vialMg: number;
  /** Indicative price per vial, USD — a rough planning figure, not a quote. */
  vialUsd: number;
  /** Slug into the on-site catalog, when a monograph exists. */
  catalogSlug?: string;
  /** When in the day it is typically taken (e.g. "Pre-sleep", "AM", "As needed"). */
  timing?: string;
  /** Relation to meals (e.g. "Empty stomach", "Before meals", "Any"). */
  withFood?: string;
  /** Short-course / on-off scheduling. Absent = dosed every cycle week.
   *  `onWeeks` alone = a single course at the start; with `offWeeks` it repeats. */
  course?: { onWeeks: number; offWeeks?: number };
}

// Categorical hues — teal / amber / violet / rose / blue / green.
const HUE = {
  teal: "#2DD4A8",
  amber: "#E8B65A",
  violet: "#B58CFA",
  rose: "#F472B6",
  blue: "#5EA8FA",
  green: "#34D399",
} as const;

export const PEPTIDES: Record<string, Peptide> = {
  "bpc-157": {
    id: "bpc-157", name: "BPC-157", doseLow: 250, doseHigh: 500, perWeek: 7,
    route: "SubQ", evidence: "preclinical", hue: HUE.teal,
    note: "Gastric pentadecapeptide studied for tendon, ligament, and gut healing.",
    vialMg: 5, vialUsd: 40, catalogSlug: "bpc-157",
  },
  "tb-500": {
    id: "tb-500", name: "TB-500", doseLow: 2000, doseHigh: 2500, perWeek: 2,
    route: "SubQ", evidence: "preclinical", hue: HUE.amber,
    note: "Thymosin β4 fragment investigated for tissue repair and angiogenesis.",
    vialMg: 5, vialUsd: 50, catalogSlug: "tb-500",
  },
  "ghk-cu": {
    id: "ghk-cu", name: "GHK-Cu", doseLow: 1000, doseHigh: 2000, perWeek: 7,
    route: "SubQ", evidence: "preclinical", hue: HUE.violet,
    note: "Copper tripeptide studied for skin remodeling and wound signaling.",
    vialMg: 50, vialUsd: 45, catalogSlug: "ghk-cu",
  },
  ipamorelin: {
    id: "ipamorelin", name: "Ipamorelin", doseLow: 200, doseHigh: 300, perWeek: 7,
    route: "SubQ", evidence: "emerging", hue: HUE.rose,
    note: "Selective GH secretagogue (ghrelin-receptor agonist), minimal cortisol/prolactin.",
    vialMg: 5, vialUsd: 40,
  },
  "cjc-1295": {
    id: "cjc-1295", name: "CJC-1295 (no DAC)", doseLow: 100, doseHigh: 200, perWeek: 7,
    route: "SubQ", evidence: "emerging", hue: HUE.blue,
    note: "GHRH analog; paired with a secretagogue to amplify pulsatile GH release.",
    vialMg: 5, vialUsd: 40,
  },
  tesamorelin: {
    id: "tesamorelin", name: "Tesamorelin", doseLow: 1000, doseHigh: 2000, perWeek: 7,
    route: "SubQ", evidence: "clinical", hue: HUE.green,
    note: "Stabilized GHRH analog; the one FDA-approved entry here (HIV lipodystrophy).",
    vialMg: 5, vialUsd: 90,
  },
  "aod-9604": {
    id: "aod-9604", name: "AOD-9604", doseLow: 300, doseHigh: 300, perWeek: 7,
    route: "SubQ", evidence: "emerging", hue: HUE.amber,
    note: "GH fragment (176–191) studied for lipolysis without IGF-1 elevation.",
    vialMg: 5, vialUsd: 45,
  },
  semaglutide: {
    id: "semaglutide", name: "Semaglutide", doseLow: 250, doseHigh: 1000, perWeek: 1,
    route: "SubQ", evidence: "clinical", hue: HUE.teal,
    note: "Long-acting GLP-1 receptor agonist; titrated weekly for metabolic effect.",
    vialMg: 5, vialUsd: 120, catalogSlug: "semaglutide",
  },
  tirzepatide: {
    id: "tirzepatide", name: "Tirzepatide", doseLow: 2500, doseHigh: 5000, perWeek: 1,
    route: "SubQ", evidence: "clinical", hue: HUE.blue,
    note: "Dual GIP/GLP-1 co-agonist; weekly dosing, stepwise titration.",
    vialMg: 10, vialUsd: 150, catalogSlug: "tirzepatide",
  },
  "mots-c": {
    id: "mots-c", name: "MOTS-c", doseLow: 5000, doseHigh: 10000, perWeek: 3,
    route: "SubQ", evidence: "preclinical", hue: HUE.violet,
    note: "Mitochondrial-derived peptide studied for metabolic and exercise signaling.",
    vialMg: 10, vialUsd: 55, catalogSlug: "mots-c",
  },
  epitalon: {
    id: "epitalon", name: "Epithalon", doseLow: 5000, doseHigh: 10000, perWeek: 7,
    route: "SubQ", evidence: "preclinical", hue: HUE.rose,
    note: "Tetrapeptide studied for telomerase and circadian/pineal signaling, in short courses.",
    vialMg: 50, vialUsd: 50, catalogSlug: "epitalon",
  },
  semax: {
    id: "semax", name: "Semax", doseLow: 300, doseHigh: 600, perWeek: 7,
    route: "Nasal", evidence: "emerging", hue: HUE.amber,
    note: "ACTH(4–10) analog studied for neuroprotection and cognition (intranasal).",
    vialMg: 30, vialUsd: 45,
  },
  selank: {
    id: "selank", name: "Selank", doseLow: 250, doseHigh: 500, perWeek: 7,
    route: "Nasal", evidence: "emerging", hue: HUE.green,
    note: "Tuftsin analog studied for anxiolytic and immune-modulating effects (intranasal).",
    vialMg: 10, vialUsd: 45, catalogSlug: "selank",
  },
  dsip: {
    id: "dsip", name: "DSIP", doseLow: 100, doseHigh: 300, perWeek: 7,
    route: "SubQ", evidence: "anecdotal", hue: HUE.blue,
    note: "Delta sleep-inducing peptide; pre-sleep timing, sparse human data.",
    vialMg: 5, vialUsd: 40,
  },
  "thymosin-alpha-1": {
    id: "thymosin-alpha-1", name: "Thymosin α1", doseLow: 1600, doseHigh: 1600, perWeek: 2,
    route: "SubQ", evidence: "clinical", hue: HUE.teal,
    note: "Immune-modulating peptide trialed in infection and adjuvant settings.",
    vialMg: 5, vialUsd: 70,
  },
  "melanotan-2": {
    id: "melanotan-2", name: "Melanotan II", doseLow: 250, doseHigh: 500, perWeek: 7,
    route: "SubQ", evidence: "anecdotal", hue: HUE.amber,
    note: "Melanocortin agonist studied for pigmentation; notable off-target effects.",
    vialMg: 10, vialUsd: 40,
  },
  retatrutide: {
    id: "retatrutide", name: "Retatrutide", doseLow: 2000, doseHigh: 6000, perWeek: 1,
    route: "SubQ", evidence: "clinical", hue: HUE.blue,
    note: "Triple GIP/GLP-1/glucagon agonist in late-stage trials; weekly, titrated.",
    vialMg: 10, vialUsd: 160, catalogSlug: "retatrutide",
  },
  cagrilintide: {
    id: "cagrilintide", name: "Cagrilintide", doseLow: 300, doseHigh: 2400, perWeek: 1,
    route: "SubQ", evidence: "clinical", hue: HUE.teal,
    note: "Long-acting amylin analog trialed for weight management, often with semaglutide.",
    vialMg: 5, vialUsd: 130,
  },
  "pt-141": {
    id: "pt-141", name: "PT-141 (Bremelanotide)", doseLow: 1000, doseHigh: 2000, perWeek: 1,
    route: "SubQ", evidence: "clinical", hue: HUE.rose,
    note: "Melanocortin agonist approved for HSDD; used as-needed, not continuously.",
    vialMg: 10, vialUsd: 50,
  },
  "kisspeptin-10": {
    id: "kisspeptin-10", name: "Kisspeptin-10", doseLow: 50, doseHigh: 100, perWeek: 3,
    route: "SubQ", evidence: "emerging", hue: HUE.violet,
    note: "Upstream driver of GnRH pulses; studied for reproductive-axis signaling.",
    vialMg: 5, vialUsd: 50, catalogSlug: "kisspeptin",
  },
  sermorelin: {
    id: "sermorelin", name: "Sermorelin", doseLow: 200, doseHigh: 500, perWeek: 7,
    route: "SubQ", evidence: "clinical", hue: HUE.green,
    note: "GHRH(1–29) analog studied to stimulate endogenous GH release.",
    vialMg: 5, vialUsd: 45,
  },
  "ghrp-6": {
    id: "ghrp-6", name: "GHRP-6", doseLow: 100, doseHigh: 300, perWeek: 7,
    route: "SubQ", evidence: "emerging", hue: HUE.amber,
    note: "GH secretagogue; strong appetite (ghrelin) stimulation alongside GH release.",
    vialMg: 5, vialUsd: 35,
  },
  "ghrp-2": {
    id: "ghrp-2", name: "GHRP-2", doseLow: 100, doseHigh: 300, perWeek: 7,
    route: "SubQ", evidence: "emerging", hue: HUE.blue,
    note: "GH secretagogue with less appetite drive than GHRP-6; pairs with a GHRH analog.",
    vialMg: 5, vialUsd: 35,
  },
  hexarelin: {
    id: "hexarelin", name: "Hexarelin", doseLow: 100, doseHigh: 100, perWeek: 7,
    route: "SubQ", evidence: "emerging", hue: HUE.rose,
    note: "Potent GH secretagogue; receptor desensitization limits continuous use.",
    vialMg: 5, vialUsd: 45,
  },
  "igf-1-lr3": {
    id: "igf-1-lr3", name: "IGF-1 LR3", doseLow: 20, doseHigh: 50, perWeek: 7,
    route: "SubQ", evidence: "preclinical", hue: HUE.blue,
    note: "Long-acting IGF-1 analog studied for anabolic and hypertrophic signaling.",
    vialMg: 1, vialUsd: 55, catalogSlug: "igf-1",
  },
  humanin: {
    id: "humanin", name: "Humanin", doseLow: 1000, doseHigh: 4000, perWeek: 3,
    route: "SubQ", evidence: "preclinical", hue: HUE.violet,
    note: "Mitochondrial-derived peptide studied for cytoprotection and metabolic aging.",
    vialMg: 10, vialUsd: 60, catalogSlug: "humanin",
  },
  pinealon: {
    id: "pinealon", name: "Pinealon", doseLow: 5000, doseHigh: 10000, perWeek: 7,
    route: "SubQ", evidence: "preclinical", hue: HUE.violet,
    note: "Short peptide bioregulator studied for neuroprotection, in brief courses.",
    vialMg: 20, vialUsd: 50,
  },
  "ll-37": {
    id: "ll-37", name: "LL-37", doseLow: 100, doseHigh: 100, perWeek: 3,
    route: "SubQ", evidence: "preclinical", hue: HUE.teal,
    note: "Host-defense (cathelicidin) peptide studied for antimicrobial and immune roles.",
    vialMg: 5, vialUsd: 55,
  },
  thymalin: {
    id: "thymalin", name: "Thymalin", doseLow: 5000, doseHigh: 10000, perWeek: 7,
    route: "SubQ", evidence: "emerging", hue: HUE.blue,
    note: "Thymic peptide preparation studied for immune restoration, in short courses.",
    vialMg: 10, vialUsd: 50,
  },
  kpv: {
    id: "kpv", name: "KPV", doseLow: 250, doseHigh: 500, perWeek: 7,
    route: "SubQ", evidence: "preclinical", hue: HUE.amber,
    note: "α-MSH C-terminal tripeptide studied for anti-inflammatory and gut signaling.",
    vialMg: 5, vialUsd: 45,
  },
  larazotide: {
    id: "larazotide", name: "Larazotide", doseLow: 500, doseHigh: 500, perWeek: 7,
    route: "Oral", evidence: "clinical", hue: HUE.green,
    note: "Tight-junction regulator trialed orally for intestinal barrier integrity (celiac).",
    vialMg: 5, vialUsd: 60,
  },
  vip: {
    id: "vip", name: "VIP", doseLow: 50, doseHigh: 100, perWeek: 7,
    route: "Nasal", evidence: "emerging", hue: HUE.rose,
    note: "Vasoactive intestinal peptide studied for immune and inflammatory modulation.",
    vialMg: 5, vialUsd: 60,
  },
};

// Per-week scheduling metadata, merged onto the catalog above so the entries
// stay readable. timing/withFood drive the dosing table; `course` segments the
// timeline and scopes the supply estimate to weeks actually dosed.
const SCHEDULE: Record<string, Partial<Peptide>> = {
  "bpc-157": { timing: "AM or split", withFood: "Any" },
  "tb-500": { timing: "AM", withFood: "Any" },
  "ghk-cu": { timing: "AM", withFood: "Any" },
  ipamorelin: { timing: "Pre-sleep", withFood: "Empty stomach" },
  "cjc-1295": { timing: "Pre-sleep", withFood: "Empty stomach" },
  tesamorelin: { timing: "Pre-sleep", withFood: "Empty stomach" },
  "aod-9604": { timing: "AM, fasted", withFood: "Empty stomach" },
  semaglutide: { timing: "Any day", withFood: "Any" },
  tirzepatide: { timing: "Any day", withFood: "Any" },
  "mots-c": { timing: "AM", withFood: "Any" },
  epitalon: { timing: "AM", course: { onWeeks: 3 } },
  semax: { timing: "AM", withFood: "Any" },
  selank: { timing: "AM", withFood: "Any" },
  dsip: { timing: "Pre-sleep", withFood: "Empty stomach" },
  "thymosin-alpha-1": { timing: "AM", withFood: "Any" },
  "melanotan-2": { timing: "PM", withFood: "Any" },
  retatrutide: { timing: "Any day", withFood: "Any" },
  cagrilintide: { timing: "Any day", withFood: "Any" },
  "pt-141": { timing: "As needed (~45 min prior)", withFood: "Empty stomach" },
  "kisspeptin-10": { timing: "AM", withFood: "Any" },
  sermorelin: { timing: "Pre-sleep", withFood: "Empty stomach" },
  "ghrp-6": { timing: "Pre-sleep", withFood: "Empty stomach" },
  "ghrp-2": { timing: "Pre-sleep", withFood: "Empty stomach" },
  hexarelin: { timing: "Pre-workout", withFood: "Empty stomach", course: { onWeeks: 4, offWeeks: 4 } },
  "igf-1-lr3": { timing: "Post-workout", withFood: "Any" },
  humanin: { timing: "AM", withFood: "Any" },
  pinealon: { timing: "AM", course: { onWeeks: 2 } },
  "ll-37": { timing: "AM", withFood: "Any" },
  thymalin: { timing: "AM", course: { onWeeks: 2 } },
  kpv: { timing: "AM", withFood: "Any" },
  larazotide: { timing: "Before meals", withFood: "Before meals" },
  vip: { timing: "AM", withFood: "Any" },
};

for (const [id, meta] of Object.entries(SCHEDULE)) {
  if (PEPTIDES[id]) Object.assign(PEPTIDES[id], meta);
}

export interface Goal {
  id: string;
  label: string;
  blurb: string;
  /** Peptide ids in the default stack for this goal. */
  stack: string[];
}

export const GOALS: Goal[] = [
  { id: "injury", label: "Injury recovery", blurb: "Tissue repair & connective-tissue signaling", stack: ["bpc-157", "tb-500", "ghk-cu"] },
  { id: "fat-loss", label: "Fat loss", blurb: "Metabolic & lipolytic pathways", stack: ["tesamorelin", "aod-9604", "semaglutide"] },
  { id: "muscle", label: "Muscle growth", blurb: "GH-axis secretagogue stack", stack: ["cjc-1295", "ipamorelin", "tesamorelin"] },
  { id: "recomp", label: "Body recomposition", blurb: "GH axis + incretin co-agonist", stack: ["cjc-1295", "ipamorelin", "tirzepatide"] },
  { id: "longevity", label: "Longevity", blurb: "Mitochondrial & cellular-aging signaling", stack: ["epitalon", "mots-c", "humanin"] },
  { id: "cognitive", label: "Cognitive", blurb: "Neuroprotective & nootropic peptides", stack: ["semax", "selank", "pinealon"] },
  { id: "sleep", label: "Sleep", blurb: "Sleep architecture & calming signaling", stack: ["dsip", "selank"] },
  { id: "aesthetic", label: "Aesthetic", blurb: "Skin, pigmentation & melanocortin", stack: ["ghk-cu", "melanotan-2"] },
  { id: "immune", label: "Immune", blurb: "Immune modulation & resilience", stack: ["thymosin-alpha-1", "ll-37", "thymalin"] },
  { id: "libido", label: "Libido", blurb: "Sexual health & melanocortin/kisspeptin signaling", stack: ["pt-141", "kisspeptin-10", "melanotan-2"] },
  { id: "gut", label: "Gut health", blurb: "Mucosal repair & barrier integrity", stack: ["bpc-157", "kpv", "larazotide"] },
  { id: "anti-aging", label: "Anti-aging", blurb: "GH-axis & cellular-aging signaling", stack: ["sermorelin", "epitalon", "ghk-cu"] },
  { id: "metabolic", label: "Metabolic", blurb: "Incretin & amylin co-agonism", stack: ["retatrutide", "cagrilintide"] },
];

export const LEVELS = ["beginner", "intermediate", "advanced"] as const;
export type Level = (typeof LEVELS)[number];

export const WEEKS_MIN = 4;
export const WEEKS_MAX = 12;
export const WEEKS_DEFAULT = 6;
export const MAX_PEPTIDES = 6;

// Pick a single reference dose within a peptide's range, by experience level:
// beginner → low end, intermediate → midpoint, advanced → high end.
export function doseForLevel(p: Peptide, level: Level): number {
  if (p.doseLow === p.doseHigh) return p.doseLow;
  const f = level === "beginner" ? 0 : level === "advanced" ? 1 : 0.5;
  const raw = p.doseLow + (p.doseHigh - p.doseLow) * f;
  // round to a clean 25 mcg step
  return Math.round(raw / 25) * 25;
}

export interface SupplyLine {
  peptide: Peptide;
  dose: number; // mcg per administration
  totalMcg: number; // across the whole cycle
  vials: number;
  cost: number;
}

// Which cycle weeks a peptide is actually dosed (0-indexed booleans). Continuous
// compounds are active every week; short courses follow their on/off pattern.
export function weekFlags(p: Peptide, weeks: number): boolean[] {
  const c = p.course;
  return Array.from({ length: weeks }, (_, i) => {
    if (!c) return true;
    if (c.offWeeks && c.offWeeks > 0) return i % (c.onWeeks + c.offWeeks) < c.onWeeks;
    return i < c.onWeeks;
  });
}

export function activeWeeks(p: Peptide, weeks: number): number {
  return weekFlags(p, weeks).filter(Boolean).length;
}

// Short human label for a course, or null when the compound runs continuously.
export function courseLabel(p: Peptide): string | null {
  const c = p.course;
  if (!c) return null;
  if (c.offWeeks && c.offWeeks > 0) return `${c.onWeeks} on / ${c.offWeeks} off`;
  return `wk 1–${c.onWeeks}`;
}

export function supplyFor(peptide: Peptide, level: Level, weeks: number): SupplyLine {
  const dose = doseForLevel(peptide, level);
  // Count only the weeks the compound is dosed, so short courses don't over-order.
  const totalMcg = dose * peptide.perWeek * activeWeeks(peptide, weeks);
  const vials = Math.max(1, Math.ceil(totalMcg / 1000 / peptide.vialMg));
  return { peptide, dose, totalMcg, vials, cost: vials * peptide.vialUsd };
}

export const EVIDENCE_LABEL: Record<Evidence, string> = {
  clinical: "clinical",
  emerging: "emerging",
  preclinical: "preclinical",
  anecdotal: "anecdotal",
};
