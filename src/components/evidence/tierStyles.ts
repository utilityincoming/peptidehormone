import type { TierHue } from "@/lib/evidence/types";

// Presentational only: maps the shared §6 hue grouping to peptidehormone's
// Tailwind v4 tokens. Kept out of lib/evidence so the schema stays styling-free
// and portable to AmericanPeptide (whose "teal" resolves to a different token).
export interface HueClasses {
  text: string;
  fill: string;
  border: string;
  dot: string;
}

export const HUE_CLASSES: Record<TierHue, HueClasses> = {
  teal: {
    text: "text-accent-teal",
    fill: "bg-accent-teal/12",
    border: "border-accent-teal/30",
    dot: "bg-accent-teal",
  },
  slate: {
    text: "text-ink/75",
    fill: "bg-ink/[0.06]",
    border: "border-ink/20",
    dot: "bg-ink/55",
  },
  amber: {
    text: "text-accent-amber",
    fill: "bg-accent-amber/12",
    border: "border-accent-amber/30",
    dot: "bg-accent-amber",
  },
};

/** Short "Mon YYYY" for the `retrieved_at` stamp (§6). */
export function formatRetrieved(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short" });
}
