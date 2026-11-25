import { ImageResponse } from "next/og";
import { ogImage, ogFonts, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt = "What is apelin — the peptide that strengthens the heartbeat while lowering pressure, why one receptor has two ligands, and why the infusion has not become a drug";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  const insight = getInsight("what-is-apelin")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · Cardiovascular & natriuretic",
      title: insight.title,
      subtitle: "Apelin: one receptor, a stronger beat, a lower pressure.",
      accent: "#3E6B58",
    }),
    { ...size, fonts: await ogFonts() },
  );
}
