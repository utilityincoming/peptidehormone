import { ImageResponse } from "next/og";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt =
  "The famine without the slowdown — late-life semaglutide extended mouse lifespan like calorie restriction without turning the metabolism down";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  const insight = getInsight("the-famine-without-the-slowdown")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · metabolic mechanisms",
      title: insight.title,
      subtitle:
        "Ninety years of ageing biology said restriction works by slowing the engine. Twenty-month-old mice on semaglutide lived about as much longer as calorie-restricted ones — and kept their metabolic rate. What that separates, and what it doesn't yet prove.",
      accent: "#7C83FF",
    }),
    { ...size },
  );
}
