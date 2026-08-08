import { ImageResponse } from "next/og";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt = "Putting GLP-1 in a pill — smuggle the peptide across the gut, or stop being a peptide and rebuild the signal as a small molecule";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  const insight = getInsight("glp-1-in-a-pill")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · delivery",
      title: insight.title,
      subtitle: "Two ways past the needle — and why a small molecule that mimics the peptide changes everything.",
    }),
    { ...size },
  );
}
