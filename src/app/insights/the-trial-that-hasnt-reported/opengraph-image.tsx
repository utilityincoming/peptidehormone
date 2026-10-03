import { ImageResponse } from "next/og";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt = "The trial that hasn't reported — BPC-157's entire human record is thirty people and no placebo; the first controlled trial reads out in 2027";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  const insight = getInsight("the-trial-that-hasnt-reported")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · evidence",
      title: insight.title,
      subtitle: "BPC-157 in people: three uncontrolled pilots, one recruiting trial, one advisory vote — and no result yet.",
      accent: "#F472B6",
    }),
    { ...size },
  );
}
