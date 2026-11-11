import { ImageResponse } from "next/og";
import { ogImage, ogFonts, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "PeptideHormone — the research-grade catalog of peptide science";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

// The homepage's lead figure as three bars: native GLP-1 is cleared in about
// two minutes; the engineered analogs last about a week. Linear scale, so the
// native bar is honestly a sliver. Values mirror the catalog's half-lives.
const ROWS = [
  { name: "Native GLP-1", value: "~2 min", width: 6, color: "#F5B544" },
  { name: "Semaglutide", value: "~7 days · 1 receptor", width: 480, color: "#5EA8FA" },
  { name: "Retatrutide", value: "~6 days · 3 receptors", width: 411, color: "#7C83FF" },
];

function HalfLifeArt() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 34 }}>
      {ROWS.map((r) => (
        <div key={r.name} style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ display: "flex", width: 190, fontSize: 24, color: "rgba(255,255,255,0.7)" }}>
            {r.name}
          </div>
          <div
            style={{ width: r.width, height: 14, borderRadius: 7, backgroundColor: r.color }}
          />
          <div style={{ display: "flex", fontSize: 24, fontWeight: 600, color: r.color }}>
            {r.value}
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function Image() {
  return new ImageResponse(
    ogImage({
      eyebrow: "Independent · research-grade",
      title: "The peptide frontier, mapped from the source.",
      art: <HalfLifeArt />,
    }),
    { ...size, fonts: await ogFonts() },
  );
}
