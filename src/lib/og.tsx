import type { ReactElement } from "react";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Shared Open Graph image layout (1200×630). Satori-safe: flexbox + inline
// styles only, no Tailwind. Used by the opengraph-image route segments for the
// home page, family hubs, and hormone pages.

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

// Map a Tailwind accent class (from the families data) to its hex value.
export function accentHex(cls?: string): string {
  const map: Record<string, string> = {
    "text-accent": "#34566A",
    "text-accent-teal": "#3E6B58",
    "text-accent-blue": "#386982",
    "text-accent-amber": "#865C27",
    "text-accent-purple": "#605A79",
    "text-accent-rose": "#885768",
  };
  return (cls && map[cls]) || "#34566A";
}

// The site's display face, bundled (latin subset, OFL — see src/assets/fonts)
// so share cards match the headings instead of falling back to a system sans.
// Satori cannot read woff2 or variable fonts, hence the static woff files.
// Every opengraph-image route passes this as ImageResponse's `fonts`.
const FONT_DIR = join(process.cwd(), "src/assets/fonts");
let fontCache: Promise<
  { name: string; data: Buffer; weight: 400 | 600; style: "normal" }[]
> | null = null;

export function ogFonts() {
  fontCache ??= Promise.all(
    ([400, 600] as const).map(async (weight) => ({
      name: "Space Grotesk",
      data: await readFile(join(FONT_DIR, `space-grotesk-latin-${weight}-normal.woff`)),
      weight,
      style: "normal" as const,
    })),
  );
  return fontCache;
}

// The house tri-residue brand mark, matching the site header, as an inline SVG
// data URI so Satori can rasterize it (it can't render raw <svg> children).
const MARK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#34566A" stroke-width="1.6" stroke-linecap="round"><path d="M6.7 10.4 10.3 13.6M13.7 13.6 17.3 8.4"/><circle cx="5" cy="9" r="2.4" fill="#34566A"/><circle cx="12" cy="15" r="2.4" fill="#34566A" opacity="0.72"/><circle cx="19" cy="7" r="2.4" fill="#34566A" opacity="0.5"/></svg>`;
const MARK_URI = `data:image/svg+xml,${encodeURIComponent(MARK_SVG)}`;

export function ogImage({
  eyebrow,
  title,
  subtitle,
  accent = "#34566A",
  art,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  accent?: string;
  /** Optional graphic rendered under the subtitle (Satori-safe markup). */
  art?: ReactElement;
}): ReactElement {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px",
        backgroundColor: "#F8FAFC",
        borderTop: `12px solid ${accent}`,
        color: "#182B37",
        fontFamily: "Space Grotesk, sans-serif",
      }}
    >
      {/* Wordmark */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img width={44} height={44} src={MARK_URI} alt="" />
        <div style={{ display: "flex", fontSize: 30, fontWeight: 600, letterSpacing: "-0.02em" }}>
          <span>Peptide</span>
          <span style={{ color: "#586775" }}>Hormone</span>
        </div>
      </div>

      {/* Body */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            fontSize: 24,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: accent,
            marginBottom: 22,
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 70,
            fontWeight: 600,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            maxWidth: 1000,
          }}
        >
          {title}
        </div>
        {subtitle && (
          <div
            style={{
              display: "flex",
              fontSize: 30,
              lineHeight: 1.35,
              color: "#4A5964",
              marginTop: 26,
              maxWidth: 920,
            }}
          >
            {subtitle}
          </div>
        )}
        {art}
      </div>

      {/* Footer */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", fontSize: 26, color: "#586775" }}>
          peptidehormone.com
        </div>
      </div>
    </div>
  );
}
