import { ImageResponse } from "next/og";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt =
  "Where trust starts to mean something — why molecular complexity, not fraud, governs which peptides and biologics you can actually source";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  const insight = getInsight("the-complexity-ladder")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · sourcing & complexity",
      title: insight.title,
      subtitle: "Short peptides are cheap to verify. Folded biologics are where trust and supply differentiate.",
    }),
    { ...size },
  );
}
