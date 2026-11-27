// Curated one-letter sequences for the sequence viewer.
// Source of truth is a public record named on each entry (UniProt accession or
// a prescribing-information description). Do not invent residues. A molecule
// with no entry simply renders no viewer.
//
// Indexes in `marks.at` are 1-based positions in `residues`. A pair is a
// bridge between two positions. Non-coded residues use X and a modification mark.

export type SequenceMarkKind = "disulfide" | "acylation" | "terminus" | "modification";

export interface SequenceMark {
  at: number | [number, number];
  kind: SequenceMarkKind;
  label: string;
  detail: string;
}

export interface PeptideSequence {
  slug: string;
  /** Which molecular form this string is. */
  form: string;
  residues: string;
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
];

export function sequenceFor(slug: string): PeptideSequence | undefined {
  return SEQUENCES.find((s) => s.slug === slug);
}
