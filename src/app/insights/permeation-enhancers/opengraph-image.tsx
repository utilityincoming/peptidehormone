import { ImageResponse } from "next/og";
import { ogImage, ogFonts, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt = "SNAC and sodium caprate: oral peptide absorption, barrier recovery and the bystander question";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  const insight = getInsight("permeation-enhancers")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · delivery",
      title: insight.title,
      subtitle: "SNAC ≠ C10. What changes in the gut barrier—and what the safety evidence actually shows.",
    }),
    { ...size, fonts: await ogFonts() },
  );
}
