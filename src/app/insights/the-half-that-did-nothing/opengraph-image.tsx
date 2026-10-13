import { ImageResponse } from "next/og";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt =
  "The half that did nothing — AOD-9604 cleanly separated growth hormone's fat-burning fragment from the rest, but the kept half produced no weight loss in human trials";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  const insight = getInsight("the-half-that-did-nothing")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · Growth & repair",
      title: insight.title,
      subtitle: "AOD-9604: the GH fragment whose fat-loss claim failed in humans.",
      accent: "#5EA8FA", // growth-repair family accent (blue)
    }),
    { ...size },
  );
}
