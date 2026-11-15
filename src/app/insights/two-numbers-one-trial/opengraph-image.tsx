import { ImageResponse } from "next/og";
import { ogImage, ogFonts, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt =
  "Two numbers, one trial: the same participants lose 25.0% on one analysis and 28.3% on another, and both are in the trial";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  const insight = getInsight("two-numbers-one-trial")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · Incretins & metabolic",
      title: insight.title,
      subtitle: "Why the headline and the label disagree, and which number to use.",
      accent: "#7C83FF", // incretins-metabolic family accent (indigo)
    }),
    { ...size, fonts: await ogFonts() },
  );
}
