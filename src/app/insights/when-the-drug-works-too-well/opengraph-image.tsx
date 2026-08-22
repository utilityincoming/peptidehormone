import { ImageResponse } from "next/og";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt = "When the drug works too well - why GLP-1 weight loss is hard to stop, and how to think about time off";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  const insight = getInsight("when-the-drug-works-too-well")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · maintenance",
      title: insight.title,
      subtitle: "The body defends the weight it lost; the drug holds that defense at bay. Why stopping is hard - and how to do time off well.",
      accent: "#7C83FF",
    }),
    { ...size },
  );
}
