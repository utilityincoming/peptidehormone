import { compoundHue, type CompoundHue } from "@/lib/evidence/compound";

// Presentational only: maps the compound ladder's hue names to peptidehormone's
// Tailwind v4 tokens. Mirrors the tierStyles.ts split for the claim-level
// Standard — the ladder stays styling-free in lib/evidence so it can move, and
// only this file knows about accent tokens.

export const COMPOUND_HUE_CLASSES: Record<CompoundHue, string> = {
  teal: "border-accent-teal/40 bg-accent-teal/10 text-accent-teal",
  blue: "border-accent-blue/40 bg-accent-blue/10 text-accent-blue",
  purple: "border-accent-purple/40 bg-accent-purple/10 text-accent-purple",
  // Deliberately heavier than the Standard's slate. On a monograph this chip
  // sits directly beside the neutral molecule-type chip (border-ink/15,
  // bg-panel/50, text-ink/65); at the Standard's weight the two were
  // indistinguishable. The stronger border and text keep it legible as a
  // separate, deliberate grade rather than a second type label.
  slate: "border-ink/35 bg-ink/[0.09] text-ink/85",
  amber: "border-accent-amber/40 bg-accent-amber/10 text-accent-amber",
};

/**
 * Border/fill/text classes for a compound rigor label. Sizing and shape stay
 * with the call site, which is why this returns classes rather than a badge —
 * the ladder appears at four different scales across the catalog, the
 * monograph, the comparer, and the planner.
 */
export function compoundTierClasses(tier: string): string {
  return COMPOUND_HUE_CLASSES[compoundHue(tier)];
}
