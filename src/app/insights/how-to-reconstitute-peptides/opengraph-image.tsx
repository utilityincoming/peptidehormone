import { ImageResponse } from "next/og";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt = "How to reconstitute peptides — why the vial is not a recipe";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  const insight = getInsight("how-to-reconstitute-peptides")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · preparation safety",
      title: insight.title,
      subtitle: "Four variables. One label. No universal recipe.",
      accent: "#5EA8FA",
    }),
    { ...size },
  );
}
