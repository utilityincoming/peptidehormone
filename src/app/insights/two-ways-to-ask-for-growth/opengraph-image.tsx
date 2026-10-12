import { ImageResponse } from "next/og";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt =
  "Two ways to ask for growth — GHRH analogs push one receptor, ghrelin mimetics and GHRPs push another, and together they release more growth hormone than either alone";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  const insight = getInsight("two-ways-to-ask-for-growth")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · Growth & repair",
      title: insight.title,
      subtitle: "GHRH or ghrelin — two receptors, one pulsatile gland.",
      accent: "#5EA8FA", // growth-repair family accent (blue)
    }),
    { ...size },
  );
}
