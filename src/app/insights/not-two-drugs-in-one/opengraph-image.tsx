import { ImageResponse } from "next/og";
import { ogImage, ogFonts, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt = "Why tirzepatide isn't two drugs in one — how it is an imbalanced, biased dual GIP and GLP-1 receptor agonist built on the GIP sequence, and the one thing the semaglutide head-to-head trial cannot tell you";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  const insight = getInsight("not-two-drugs-in-one")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · Incretins & metabolic",
      title: insight.title,
      subtitle: "Imbalanced, biased, and built on GIP — not a tidy pairing.",
      accent: "#34566A",
    }),
    { ...size, fonts: await ogFonts() },
  );
}
