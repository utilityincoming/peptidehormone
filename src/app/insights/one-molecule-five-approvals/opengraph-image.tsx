import { ImageResponse } from "next/og";
import { ogImage, ogFonts, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt =
  "One molecule, five approvals: semaglutide was approved separately for blood sugar, weight, heart, kidney and liver, each on a different measurement";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  const insight = getInsight("one-molecule-five-approvals")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · Incretins & metabolic",
      title: insight.title,
      subtitle: "What each claim on a drug label has to prove.",
      accent: "#7C83FF", // incretins-metabolic family accent (indigo)
    }),
    { ...size, fonts: await ogFonts() },
  );
}
