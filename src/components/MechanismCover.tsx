const SUBJECTS: Record<string, { kind: string; label: string }> = {
  "glp-1-signaling": { kind: "signal", label: "A signal becomes a response" },
  "the-note-without-the-incretin": { kind: "binding", label: "A different receptor target" },
  "glp-1-in-a-pill": { kind: "barrier", label: "Crossing the gut barrier" },
  "the-triple-agonist": { kind: "three", label: "One molecule, three targets" },
  "glp-1-muscle-preservation": { kind: "muscle", label: "Preserving muscle during weight loss" },
};

/** Editorial schematics, not molecular structures or quantitative data. */
export function MechanismCover({ slug, className = "" }: { slug: string; className?: string }) {
  const subject = SUBJECTS[slug];
  if (!subject) return null;
  return (
    <div className={`relative overflow-hidden bg-surface-deep text-accent ${className}`}>
      <svg viewBox="0 0 320 180" className="h-full w-full" role="img" aria-label={`${subject.label}. Conceptual illustration, not a molecular structure.`}>
        <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {subject.kind === "barrier" ? <>
            {[40, 80, 120, 200, 240, 280].map(x => <rect key={x} x={x - 16} y="70" width="32" height="44" rx="8" opacity="0.5" />)}
            <path d="M160 30 V140 M150 130 L160 140 L170 130" />
            <circle cx="160" cy="46" r="7" fill="currentColor" />
          </> : subject.kind === "muscle" ? <>
            {[55, 80, 105, 130].map(y => <g key={y}><path d={`M65 ${y} Q160 ${y - 18} 255 ${y}`} />{[100, 130, 160, 190, 220].map(x => <path key={x} d={`M${x} ${y - 9} v14`} opacity="0.5" />)}</g>)}
          </> : subject.kind === "three" ? <>
            <circle cx="160" cy="38" r="12" fill="currentColor" />
            {[70, 160, 250].map(x => <g key={x}><path d={`M160 52 L${x} 104`} opacity="0.6" /><path d={`M${x - 20} 110 v28 q20 22 40 0 v-28`} /><circle cx={x} cy="118" r="5" /></g>)}
          </> : subject.kind === "binding" ? <>
            <path d="M120 80 V120 Q160 160 200 120 V80" strokeWidth="5" />
            <path d="M145 40 L160 55 L175 40" strokeWidth="6" />
            <path d="M160 69 V108 M152 100 L160 108 L168 100" opacity="0.6" />
          </> : <>
            <path d="M35 90 H95 M115 65 V110 Q135 130 155 110 V65 M155 90 H215 M235 90 H285" />
            <circle cx="45" cy="90" r="9" fill="currentColor" />
            <circle cx="225" cy="90" r="10" />
            <path d="M265 70 L285 90 L265 110" />
          </>}
        </g>
      </svg>
      <p className="absolute bottom-3 left-4 right-4 text-xs text-secondary">{subject.label} · schematic</p>
    </div>
  );
}

export function hasMechanismCover(slug: string) {
  return slug in SUBJECTS;
}
