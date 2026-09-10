import { ImageResponse } from "next/og";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt = "The heart is a gland — the natriuretic peptides ANP, BNP and CNP, why BNP is the heart-failure blood test, why sacubitril protects the signal instead of supplying it, and how CNP became a bone-growth drug";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  const insight = getInsight("the-heart-is-a-gland")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · Cardiovascular & natriuretic",
      title: insight.title,
      subtitle: "The peptides the heart secretes to shed the load that stretches it.",
      accent: "#2DD4A8", // cardiovascular family accent (teal)
    }),
    { ...size },
  );
}
