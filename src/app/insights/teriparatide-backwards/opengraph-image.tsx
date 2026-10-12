import { ImageResponse } from "next/og";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt =
  "Teriparatide, backwards — continuous PTH dissolves bone, but the same hormone given as a daily pulse builds it, the first anabolic osteoporosis drug";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  const insight = getInsight("teriparatide-backwards")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · Calcium & bone",
      title: insight.title,
      subtitle: "The bone-dissolving hormone, turned bone-building by the clock.",
      accent: "#5EA8FA", // calcium-bone family accent (blue)
    }),
    { ...size },
  );
}
