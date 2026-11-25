import { aliasesFor } from "./aliases";
import type { Hormone } from "./hormones";

type NameMatch = { label: string; note?: string };

const catalogLabels: Record<string, NameMatch[]> = {
  // LY3437943 is documented in PMID 35985340. American Peptides lists it as AP-RTA-3.
  retatrutide: [{ label: "LY3437943" }, { label: "AP-RTA-3", note: "Vendor label" }],
  // The monograph covers both forms and keeps their evidence distinct.
  "cjc-1295": [
    { label: "CJC-1295 (no DAC)", note: "Non-DAC variant covered in this entry" },
    { label: "Modified GRF 1-29", note: "Non-DAC variant covered in this entry" },
    { label: "Mod GRF 1-29", note: "Non-DAC variant covered in this entry" },
    { label: "CJC-1295 (with DAC)", note: "DAC variant covered in this entry" },
  ],
};

function normalizeName(value: string) {
  return value.toLowerCase().replace(/[\s\p{Pd}()™]/gu, "");
}

export function catalogNameMatch(hormone: Hormone, query: string): NameMatch | undefined {
  const key = normalizeName(query);
  if (!key || query.trim().toLowerCase() === hormone.name.toLowerCase()) return;

  const labels = [
    ...(catalogLabels[hormone.slug] ?? []),
    ...aliasesFor(hormone.slug).map((label) => ({ label })),
    ...[hormone.abbr, hormone.name].flatMap((label) => label ? [{ label }] : []),
  ];

  // Match exact normalized labels so a fragment of a name cannot imply equivalence.
  return labels.find(({ label }) => normalizeName(label) === key);
}
