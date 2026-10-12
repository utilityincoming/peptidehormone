import { ImageResponse } from "next/og";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt =
  "The hormone discovered twice — leptin proved fat is an endocrine organ, was expected to cure obesity, and turned out to be a starvation alarm the obese brain learns to ignore";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  const insight = getInsight("the-hormone-discovered-twice")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · Adipokines & energy balance",
      title: insight.title,
      subtitle: "Leptin: the fat signal that was never a weight-loss drug.",
      accent: "#F5B544", // adipokines family accent (amber)
    }),
    { ...size },
  );
}
