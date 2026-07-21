import { ImageResponse } from "next/og";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt = "Is there a GLP-4? Why the metabolic-peptide frontier branches sideways instead of counting up";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  const insight = getInsight("is-there-a-glp-4")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · frontier",
      title: insight.title,
      subtitle: "There is no GLP-4 — and why the frontier branches sideways instead of counting up.",
    }),
    { ...size },
  );
}
