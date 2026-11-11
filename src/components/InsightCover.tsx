import { FamilyGlyph } from "@/components/FamilyGlyph";

/* ── Insight cover art ───────────────────────────────────────────────────────
   A generated cover for a deep-dive: peptide chains drawn from a hash of the
   slug, tinted with the family accent, with the family glyph as a watermark.
   Deterministic — the same slug always yields the same cover — so every piece
   gets its own recognisable plate without anyone drawing one by hand. Colour
   comes from `currentColor`; pass the family's accent text class. */

function seeded(slug: string): () => number {
  let h = 2166136261;
  for (let i = 0; i < slug.length; i++) {
    h ^= slug.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  // mulberry32
  return () => {
    h = (h + 0x6d2b79f5) | 0;
    let t = Math.imul(h ^ (h >>> 15), 1 | h);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const W = 320;
const H = 180;
const r1 = (n: number) => Math.round(n * 10) / 10;

export function InsightCover({
  slug,
  family,
  accent = "text-accent",
  className = "",
}: {
  slug: string;
  family?: string;
  /** Tailwind text-colour class for the family accent. */
  accent?: string;
  className?: string;
}) {
  const rand = seeded(slug);
  const chains = [0, 1, 2].map((c) => {
    const n = 9 + Math.floor(rand() * 7);
    const amp = 10 + rand() * 22;
    const freq = 0.45 + rand() * 0.6;
    const phase = rand() * Math.PI * 2;
    const base = 44 + c * 46 + (rand() - 0.5) * 14;
    const tilt = (rand() - 0.5) * 30;
    const x0 = -10 + rand() * 30;
    const step = (W + 20 - x0) / (n - 1);
    const lit = Math.floor(rand() * n);
    const pts = Array.from({ length: n }, (_, i) => ({
      x: r1(x0 + i * step),
      y: r1(base + (tilt * i) / n + amp * Math.sin(i * freq + phase)),
    }));
    return { pts, lit, opacity: [0.9, 0.45, 0.22][c], r: [5, 4, 3.2][c] };
  });

  return (
    <div
      className={`relative overflow-hidden bg-surface-deep ${accent} ${className}`}
      aria-hidden
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <radialGradient id={`cover-${slug}`} cx="0.8" cy="0.1" r="0.9">
            <stop offset="0" stopColor="currentColor" stopOpacity="0.28" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width={W} height={H} fill={`url(#cover-${slug})`} />
        {chains.map((ch, c) => (
          <g key={c} opacity={ch.opacity}>
            <path
              d={`M${ch.pts.map((p) => `${p.x} ${p.y}`).join(" L")}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinejoin="round"
              opacity="0.55"
            />
            {ch.pts.map((p, i) =>
              i === ch.lit ? (
                <g key={i}>
                  <circle cx={p.x} cy={p.y} r={ch.r * 2.4} fill="currentColor" opacity="0.2" />
                  <circle cx={p.x} cy={p.y} r={ch.r * 1.2} fill="currentColor" />
                </g>
              ) : (
                <circle
                  key={i}
                  cx={p.x}
                  cy={p.y}
                  r={ch.r}
                  fill="var(--surface-deep)"
                  stroke="currentColor"
                  strokeWidth="1.4"
                />
              ),
            )}
          </g>
        ))}
      </svg>
      {family && (
        <FamilyGlyph
          slug={family}
          className="absolute bottom-3 right-3 h-9 w-9 opacity-70"
        />
      )}
    </div>
  );
}
