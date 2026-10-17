import { ImageResponse } from "next/og";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt =
  "The body keeps time — across GnRH, growth hormone, PTH, cortisol and insulin, the endocrine system encodes meaning in the timing of release, not just the amount";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  const insight = getInsight("the-body-keeps-time")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · Across the families",
      title: insight.title,
      subtitle: "Pulsatility as a code — why timing, not amount, is the signal.",
      accent: "#F472B6", // reproductive-gonadal family accent (rose) — GnRH is the flagship case
    }),
    { ...size },
  );
}
