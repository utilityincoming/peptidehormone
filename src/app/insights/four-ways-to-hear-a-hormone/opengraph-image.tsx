import { ImageResponse } from "next/og";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt =
  "Four ways to hear a hormone — the receptor classes the whole peptide catalog collapses into: GPCRs, receptor tyrosine kinases, cytokine receptors, and guanylyl cyclases";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  const insight = getInsight("four-ways-to-hear-a-hormone")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · How a cell listens",
      title: insight.title,
      subtitle: "GPCR, tyrosine kinase, cytokine receptor, guanylyl cyclase — the class decides the biology.",
      accent: "#7C83FF", // house indigo — a site-level mechanistic synthesis
    }),
    { ...size },
  );
}
