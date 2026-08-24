import type { ReactElement } from "react";

// Shared Open Graph image layout (1200×630). Satori-safe: flexbox + inline
// styles only, no Tailwind, no external fonts. Used by the opengraph-image
// route segments for the home page, family hubs, and hormone pages.

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

// Map a Tailwind accent class (from the families data) to its hex value.
export function accentHex(cls?: string): string {
  const map: Record<string, string> = {
    "text-accent": "#7C83FF",
    "text-accent-teal": "#2DD4A8",
    "text-accent-blue": "#5EA8FA",
    "text-accent-amber": "#F5B544",
    "text-accent-purple": "#B58CFA",
    "text-accent-rose": "#F472B6",
  };
  return (cls && map[cls]) || "#7C83FF";
}

const DOTS = ["#7C83FF", "#2DD4A8", "#5EA8FA", "#F5B544", "#B58CFA", "#F472B6"];

// The house tri-residue brand mark, matching the site header, as an inline SVG
// data URI so Satori can rasterize it (it can't render raw <svg> children).
const MARK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#7C83FF" stroke-width="1.6" stroke-linecap="round"><path d="M6.7 10.4 10.3 13.6M13.7 13.6 17.3 8.4"/><circle cx="5" cy="9" r="2.4" fill="#7C83FF"/><circle cx="12" cy="15" r="2.4" fill="#7C83FF" opacity="0.72"/><circle cx="19" cy="7" r="2.4" fill="#7C83FF" opacity="0.5"/></svg>`;
const MARK_URI = `data:image/svg+xml,${encodeURIComponent(MARK_SVG)}`;

export function ogImage({
  eyebrow,
  title,
  subtitle,
  accent = "#7C83FF",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  accent?: string;
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
        backgroundColor: "#0A0E1A",
        backgroundImage:
          "radial-gradient(900px 500px at 85% -10%, rgba(124,131,255,0.22), transparent), radial-gradient(700px 500px at 0% 120%, rgba(45,212,168,0.12), transparent)",
        color: "#ffffff",
        fontFamily: "sans-serif",
      }}
    >
      {/* Wordmark */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img width={44} height={44} src={MARK_URI} alt="" />
        <div style={{ display: "flex", fontSize: 30, fontWeight: 600, letterSpacing: "-0.02em" }}>
          <span>Peptide</span>
          <span style={{ color: "rgba(255,255,255,0.45)" }}>Hormone</span>
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
            fontWeight: 700,
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
              color: "rgba(255,255,255,0.62)",
              marginTop: 26,
              maxWidth: 920,
            }}
          >
            {subtitle}
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", fontSize: 26, color: "rgba(255,255,255,0.5)" }}>
          peptidehormone.com
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          {DOTS.map((c, i) => (
            <div key={i} style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: c }} />
          ))}
        </div>
      </div>
    </div>
  );
}
