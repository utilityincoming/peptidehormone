import { ImageResponse } from "next/og";
import { ogImage, ogFonts, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt =
  "The clock under the list — a seller’s peptide stack is a set of half-lives and receptors, and two names on one receptor are one signal";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  const insight = getInsight("the-clock-under-the-list")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · Growth & repair",
      title: insight.title,
      subtitle: "A morning label is a pharmacokinetic claim. Most lists never measure one.",
      accent: "#2C5F86",
    }),
    { ...size, fonts: await ogFonts() },
  );
}
