import { ImageResponse } from "next/og";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt = "From insulin to GLP-1 — a short history of peptide medicine";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  const insight = getInsight("from-insulin-to-glp-1")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · history",
      title: insight.title,
      subtitle: "Replace, then steer, then engineer — a century of peptide medicine.",
    }),
    { ...size },
  );
}
