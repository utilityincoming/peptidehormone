import { ImageResponse } from "next/og";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt =
  "Distilled to three letters — Cartalax (AED) is a cartilage complex reduced to one tripeptide, and the bold claim that it tunes chondrocyte genes";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  const insight = getInsight("distilled-to-three-letters")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · mechanism",
      title: insight.title,
      subtitle:
        "A whole cartilage extract reduced to one tripeptide — Ala-Glu-Asp — and the boldest claim in peptide science: that it tunes chondrocyte genes. Bullish on the science, sceptical on the page.",
      accent: "#5EA8FA",
    }),
    { ...size },
  );
}
