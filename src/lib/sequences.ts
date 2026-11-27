// Curated one-letter sequences for the sequence viewer.
// Source of truth is a public record named on each entry (UniProt accession or
// a prescribing-information description). Do not invent residues. A molecule
// with no entry simply renders no viewer.
//
// Indexes in `marks.at` are 1-based positions in `residues`. A pair is a
// bridge between two positions. Non-coded residues use X and a modification mark.

export type SequenceMarkKind = "disulfide" | "acylation" | "terminus" | "modification";

export interface SequenceMark {
  /** Chain id when the peptide is drawn as more than one chain. */
  chain?: string;
  /** 1-based index, or a pair of indexes on the same chain. */
  at: number | [number, number];
  /** Other end of a bridge that crosses chains. `at` is then a single index. */
  to?: { chain: string; at: number };
  kind: SequenceMarkKind;
  label: string;
  detail: string;
}

export interface SequenceChain {
  id: string;
  name: string;
  residues: string;
}

export interface PeptideSequence {
  slug: string;
  /** Which molecular form this string is. */
  form: string;
  /** Single-chain one-letter string. Omit when `chains` is set. */
  residues?: string;
  /** Two-chain hormones (insulin). Each chain is its own strip. */
  chains?: SequenceChain[];
  /** Where the string was taken from. */
  source: string;
  marks: SequenceMark[];
}

function termini(length: number, cNote: string): SequenceMark[] {
  return [
    { at: 1, kind: "terminus", label: "N-terminus", detail: "Start of the form drawn here." },
    { at: length, kind: "terminus", label: "C-terminus", detail: cNote },
  ];
}

export const SEQUENCES: PeptideSequence[] = [
  {
    slug: "glp-1",
    form: "GLP-1(7–36) amide",
    residues: "HAEGTFTSDVSSYLEGQAAKEFIAWLVKGR",
    source: "UniProt P01275, processed GLP-1(7–36) amide",
    marks: [
      ...termini(30, "C-terminal arginine amide in the 7–36 form."),
      { at: 2, kind: "modification", label: "Ala8", detail: "DPP-4 cuts after this alanine. Analogs often replace it." },
    ],
  },
  {
    slug: "semaglutide",
    form: "Backbone with Aib8 and Lys26 acylation",
    residues: "HXEGTFTSDVSSYLEGQAAKEFIAWLVRGRG",
    source: "US prescribing information: GLP-1(7–37) with Aib at position 8 and a C18 diacid on Lys26",
    marks: [
      ...termini(31, "C-terminal glycine of the 7–37 scaffold."),
      { at: 2, kind: "modification", label: "Aib8", detail: "X is aminoisobutyric acid, which blocks DPP-4 cleavage." },
      { at: 20, kind: "acylation", label: "Lys26", detail: "A C18 fatty diacid is attached here so the peptide binds albumin." },
    ],
  },
  {
    slug: "glucagon",
    form: "Glucagon (29 aa)",
    residues: "HSQGTFTSDYSKYLDSRRAQDFVQWLMNT",
    source: "UniProt P01275, glucagon peptide",
    marks: termini(29, "Free C-terminus."),
  },
  {
    slug: "gip",
    form: "GIP (42 aa)",
    residues: "YAEGTFISDYSIAMDKIHQQDFVNWLLAQKGKKNDWKHNITQ",
    source: "UniProt P09681, mature GIP",
    marks: [
      ...termini(42, "Free C-terminus."),
      { at: 2, kind: "modification", label: "Ala2", detail: "DPP-4 also cuts GIP after this alanine." },
    ],
  },
  {
    slug: "amylin",
    form: "Human amylin (37 aa)",
    residues: "KCNTATCATQRLANFLVHSSNNFGAILSSTNVGSNTY",
    source: "UniProt P10997",
    marks: [
      ...termini(37, "C-terminal tyrosine amide."),
      { at: [2, 7], kind: "disulfide", label: "Cys2–Cys7", detail: "The N-terminal disulfide that stabilizes the ring." },
    ],
  },
  {
    slug: "oxytocin",
    form: "Oxytocin",
    residues: "CYIQNCPLG",
    source: "UniProt P01178",
    marks: [
      ...termini(9, "C-terminal glycine amide."),
      { at: [1, 6], kind: "disulfide", label: "Cys1–Cys6", detail: "The ring disulfide shared with vasopressin." },
    ],
  },
  {
    slug: "vasopressin",
    form: "Arginine vasopressin",
    residues: "CYFQNCPRG",
    source: "UniProt P01185",
    marks: [
      ...termini(9, "C-terminal glycine amide."),
      { at: [1, 6], kind: "disulfide", label: "Cys1–Cys6", detail: "Same ring as oxytocin; residues 3 and 8 differ." },
      { at: 3, kind: "modification", label: "Phe3", detail: "Phenylalanine here, isoleucine in oxytocin." },
      { at: 8, kind: "modification", label: "Arg8", detail: "Arginine here, leucine in oxytocin." },
    ],
  },
  {
    slug: "somatostatin",
    form: "Somatostatin-14",
    residues: "AGCKNFFWKTFTSC",
    source: "UniProt P61278, somatostatin-14",
    marks: [
      ...termini(14, "Cyclic C-terminus."),
      { at: [3, 14], kind: "disulfide", label: "Cys3–Cys14", detail: "The disulfide that closes the 14-residue ring." },
    ],
  },
  {
    slug: "liraglutide",
    form: "GLP-1(7–37) with Arg34 and a C16 chain on Lys26",
    residues: "HAEGTFTSDVSSYLEGQAAKEFIAWLVRGRG",
    source: "Victoza prescribing information: Lys34→Arg, palmitoyl-γ-Glu on Lys26",
    marks: [
      ...termini(31, "C-terminal glycine of the 7–37 scaffold."),
      { at: 20, kind: "acylation", label: "Lys26", detail: "A C16 fatty acid is attached through glutamic acid so the peptide binds albumin." },
      { at: 28, kind: "modification", label: "Arg34", detail: "Arginine replaces the native lysine so only Lys26 carries the fatty acid." },
    ],
  },
  {
    slug: "tirzepatide",
    form: "39-residue GIP/GLP-1 backbone",
    residues: "YXEGTFTSDYSIXLDKIAQKAFVQWLIAGGPSSGAPPPS",
    source: "Mounjaro prescribing information: Aib at positions 2 and 13, C20 diacid on Lys20",
    marks: [
      ...termini(39, "C-terminal serine."),
      { at: 2, kind: "modification", label: "Aib2", detail: "X is aminoisobutyric acid." },
      { at: 13, kind: "modification", label: "Aib13", detail: "X is a second aminoisobutyric acid." },
      { at: 20, kind: "acylation", label: "Lys20", detail: "A C20 fatty diacid is attached here." },
    ],
  },
  {
    slug: "retatrutide",
    form: "39-residue tri-agonist backbone",
    residues: "YXQGTFTSDYSIXLDKKAQXAFIEYLLEGGPSSGAPPPS",
    source: "USAN statement (2022): Aib at 2 and 20, α-methylleucine at 13, C20 diacid on Lys17, Ser39 amide",
    marks: [
      ...termini(39, "C-terminal serine amide."),
      { at: 2, kind: "modification", label: "Aib2", detail: "X is aminoisobutyric acid." },
      { at: 13, kind: "modification", label: "αMeLeu13", detail: "X is α-methyl-L-leucine." },
      { at: 17, kind: "acylation", label: "Lys17", detail: "A C20 fatty diacid is attached through one AEEA and γ-glutamate." },
      { at: 20, kind: "modification", label: "Aib20", detail: "X is aminoisobutyric acid." },
    ],
  },
  {
    slug: "insulin",
    form: "Human insulin, A and B chains",
    chains: [
      { id: "A", name: "A chain", residues: "GIVEQCCTSICSLYQLENYCN" },
      { id: "B", name: "B chain", residues: "FVNQHLCGSHLVEALYLVCGERGFFYTPKT" },
    ],
    source: "UniProt P01308",
    marks: [
      { chain: "A", at: 1, kind: "terminus", label: "A1", detail: "N-terminus of the A chain." },
      { chain: "A", at: 21, kind: "terminus", label: "A21", detail: "C-terminus of the A chain." },
      { chain: "B", at: 1, kind: "terminus", label: "B1", detail: "N-terminus of the B chain." },
      { chain: "B", at: 30, kind: "terminus", label: "B30", detail: "C-terminus of the B chain." },
      { chain: "A", at: [6, 11], kind: "disulfide", label: "A6–A11", detail: "Disulfide inside the A chain." },
      { chain: "A", at: 7, to: { chain: "B", at: 7 }, kind: "disulfide", label: "A7–B7", detail: "Disulfide linking the chains." },
      { chain: "A", at: 20, to: { chain: "B", at: 19 }, kind: "disulfide", label: "A20–B19", detail: "Disulfide linking the chains." },
    ],
  },
  {
    slug: "ghrh",
    form: "GHRH(1–44)",
    residues: "YADAIFTNSYRKVLGQLSARKLLQDIMSRQQGESNQERGARARL",
    source: "UniProt P01286",
    marks: termini(44, "C-terminal leucine amide in the mature hormone."),
  },
  {
    slug: "sermorelin",
    form: "GHRH(1–29) amide",
    residues: "YADAIFTNSYRKVLGQLSARKLLQDIMSR",
    source: "The 1–29 fragment of UniProt P01286, the form formerly approved as sermorelin",
    marks: termini(29, "C-terminal arginine amide."),
  },
  {
    slug: "tesamorelin",
    form: "GHRH(1–44) with an N-terminal hexenoyl group",
    residues: "YADAIFTNSYRKVLGQLSARKLLQDIMSRQQGESNQERGARARL",
    source: "Egrifta prescribing information: trans-3-hexenoyl on Tyr1 of human GHRH(1–44)",
    marks: [
      ...termini(44, "C-terminal leucine amide."),
      { at: 1, kind: "acylation", label: "Tyr1", detail: "A trans-3-hexenoyl group is attached to the N-terminus." },
    ],
  },
  {
    slug: "cjc-1295",
    form: "Modified GHRH(1–29), the 29-residue core",
    residues: "YADAIFTQSYRKVLAQLSARKLLQDILSR",
    source: "FDA PCAC briefing (2024), citing Jetté 2005: D-Ala2, Gln8, Ala15, Leu27 versus GHRH(1–29)",
    marks: [
      ...termini(29, "C-terminal arginine amide. The DAC form adds a maleimidopropionyl-lysine that is not in this 29-letter string."),
      { at: 2, kind: "modification", label: "D-Ala2", detail: "D-alanine replaces L-alanine. The letter is still A." },
      { at: 8, kind: "modification", label: "Gln8", detail: "Glutamine replaces asparagine." },
      { at: 15, kind: "modification", label: "Ala15", detail: "Alanine replaces glycine." },
      { at: 27, kind: "modification", label: "Leu27", detail: "Leucine replaces methionine." },
    ],
  },
  {
    slug: "ghrelin",
    form: "Ghrelin (28 aa), octanoylated",
    residues: "GSSFLSPEHQRVQQRKESKKPPAKLQPR",
    source: "UniProt Q9UBU3, mature ghrelin",
    marks: [
      ...termini(28, "C-terminal arginine."),
      { at: 3, kind: "acylation", label: "Ser3", detail: "An n-octanoyl group on this serine is required for GHS-R activity." },
    ],
  },
  {
    slug: "ipamorelin",
    form: "Pentapeptide secretagogue",
    residues: "XHXXK",
    source: "Raun et al. 1998: Aib-His-D-2-Nal-D-Phe-Lys amide",
    marks: [
      ...termini(5, "C-terminal lysine amide."),
      { at: 1, kind: "modification", label: "Aib1", detail: "X is aminoisobutyric acid." },
      { at: 3, kind: "modification", label: "D-2-Nal3", detail: "X is D-2-naphthylalanine." },
      { at: 4, kind: "modification", label: "D-Phe4", detail: "X stands in for D-phenylalanine, not the L amino acid." },
    ],
  },
];

export function sequenceFor(slug: string): PeptideSequence | undefined {
  return SEQUENCES.find((s) => s.slug === slug);
}
