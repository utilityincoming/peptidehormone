import { ImageResponse } from "next/og";
import { ogImage, ogFonts, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt = "How to read a peptide COA — what HPLC purity, mass spec identity, net peptide content and endotoxin lines measure, and what no certificate of analysis can prove";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  const insight = getInsight("how-to-read-a-peptide-coa")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · sourcing & quality",
      title: insight.title,
      subtitle: "Every line answers one narrow question. Read the blind spots too.",
      accent: "#5EA8FA",
    }),
    { ...size, fonts: await ogFonts() },
  );
}
