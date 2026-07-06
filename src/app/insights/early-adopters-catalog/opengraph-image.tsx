import { ImageResponse } from "next/og";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt = "The community found it first — how the peptide community shaped the field, and the foundation-first idea the science is proving right";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  const insight = getInsight("early-adopters-catalog")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · history",
      title: insight.title,
      subtitle: "The community was the field's informal R&D — and foundation-first is now getting its trials.",
      accent: "#5EA8FA",
    }),
    { ...size },
  );
}
