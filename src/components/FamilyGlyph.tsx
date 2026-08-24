import type { ReactNode } from "react";

/* ── Family icon system ──────────────────────────────────────────────────────
   One abstract line-glyph per signaling family, drawn in a single visual
   grammar — nodes, bonds, and signal curves on a 24×24 grid, uniform 1.6px
   stroke — so the twelve read as one system rather than clip-art. Each encodes
   the family's core dynamic (a switched-on response, a pulsatile train, a
   receptor hub, a homeostatic balance, a capped rise…). Colour is inherited via
   `currentColor`, so a family's accent class tints the glyph with no extra
   plumbing. Unknown slugs fall back to the house tri-residue mark. */

const GLYPHS: Record<string, ReactNode> = {
  // Incretins & metabolic — a glucose-dependent response switching on (sigmoid).
  "incretins-metabolic": (
    <>
      <path d="M4 18.5 C 8 18.5 8.5 8.6 12 8.2 C 15.5 7.8 16 6 20 6" />
      <circle cx="12" cy="8.4" r="1.7" fill="currentColor" stroke="none" />
    </>
  ),

  // Growth & repair — pulsatile secretion, amplitude climbing.
  "growth-repair": (
    <>
      <path d="M4 19 L7.5 13 L11 19 L14 8.5 L16.5 19 L19.5 4.5" />
      <circle cx="19.5" cy="4.5" r="1.7" fill="currentColor" stroke="none" />
    </>
  ),

  // Melanocortins — one receptor hub, five outputs (MC1R–MC5R).
  melanocortins: (
    <>
      <path d="M12 9.4 V4 M9.53 11.2 L4.39 9.53 M10.47 14.1 L7.3 18.47 M13.53 14.1 L16.7 18.47 M14.47 11.2 L19.61 9.53" />
      <circle cx="12" cy="12" r="2.3" fill="currentColor" stroke="none" />
    </>
  ),

  // Neuropeptides — a dendritic soma branching to terminals.
  neuropeptides: (
    <>
      <path d="M6.6 17 L11 12 M11 12 L8 6 M11 12 L14 6 M11 12 L16.6 10.4" />
      <circle cx="6.4" cy="17.3" r="2" fill="currentColor" stroke="none" />
      <g fill="currentColor" stroke="none" opacity="0.5">
        <circle cx="8" cy="6" r="1.1" />
        <circle cx="14" cy="6" r="1.1" />
        <circle cx="16.6" cy="10.4" r="1.1" />
      </g>
    </>
  ),

  // Gut & appetite — an enteroendocrine "report" broadcast from a source.
  "gut-appetite": (
    <>
      <circle cx="6" cy="17.6" r="1.7" fill="currentColor" stroke="none" />
      <path d="M6 12.6 A5 5 0 0 1 11 17.6" />
      <path d="M6 8.6 A9 9 0 0 1 15 17.6" opacity="0.7" />
      <path d="M6 4.6 A13 13 0 0 1 19 17.6" opacity="0.45" />
    </>
  ),

  // Reproductive & gonadal — the pulsatile GnRH rhythm (sine train).
  "reproductive-gonadal": (
    <path d="M3.5 12 Q 6.5 5.5 9.5 12 T 15.5 12 T 21.5 12" />
  ),

  // Adipokines & energy balance — a gauge reporting reserve.
  adipokines: (
    <>
      <path d="M5 15.5 A7.5 7.5 0 0 1 19 15.5" />
      <path d="M6 13.1 L7.3 13.8 M18 13.1 L16.7 13.8" opacity="0.5" />
      <path d="M12 15.5 L15.6 9.6" />
      <circle cx="12" cy="15.5" r="1.7" fill="currentColor" stroke="none" />
    </>
  ),

  // Calcium & bone — a level balance held in a tight range.
  "calcium-bone": (
    <>
      <path d="M5 10.5 H19 M12 10.5 L9.5 15.5 H14.5 Z M5 10.5 V12.6 M19 10.5 V12.6" />
      <path d="M8.5 15.5 H15.5" opacity="0.5" />
      <g fill="currentColor" stroke="none">
        <circle cx="5" cy="13.3" r="1.3" />
        <circle cx="19" cy="13.3" r="1.3" />
      </g>
    </>
  ),

  // Cardiovascular & natriuretic — a pressure/ECG spike on the baseline.
  cardiovascular: (
    <path d="M3.5 14 H9 L10.5 14 L12 7.5 L13.8 19 L15.3 14 H20.5" />
  ),

  // Muscle & TGF-β — growth rising into a cap (the brake).
  "muscle-tgfb": (
    <>
      <path d="M6 6 H18" />
      <path d="M12 19.5 V9.2 M8.8 12.4 L12 9 L15.2 12.4" />
    </>
  ),

  // Repair & regenerative — a bond mended across a break.
  repair: (
    <>
      <path d="M3.5 12 H9.4 M14.6 12 H20.5" />
      <path d="M9.4 12 Q 12 8.7 14.6 12 Q 12 15.3 9.4 12 Z" opacity="0.7" />
      <circle cx="12" cy="12" r="1.7" fill="currentColor" stroke="none" />
    </>
  ),

  // Mitochondrial-derived — the organelle and its cristae.
  mitochondrial: (
    <>
      <ellipse cx="12" cy="12" rx="8.6" ry="5.2" />
      <path
        d="M5.6 12 L8 9.6 L8 14.4 L11 9.6 L11 14.4 L14 9.6 L14 14.4 L16.4 12"
        opacity="0.75"
      />
    </>
  ),
};

// House fallback: the tri-residue peptide mark.
const FALLBACK: ReactNode = (
  <>
    <path d="M6.7 10.4 10.3 13.6M13.7 13.6 17.3 8.4" />
    <g fill="currentColor" stroke="none">
      <circle cx="5" cy="9" r="2.2" />
      <circle cx="12" cy="15" r="2.2" opacity="0.72" />
      <circle cx="19" cy="7" r="2.2" opacity="0.5" />
    </g>
  </>
);

export function FamilyGlyph({
  slug,
  className = "",
}: {
  slug: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {GLYPHS[slug] ?? FALLBACK}
    </svg>
  );
}
