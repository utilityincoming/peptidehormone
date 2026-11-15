import { ImageResponse } from "next/og";
import { ogImage, ogFonts, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt =
  "How to read a peptide dose — why a label milligram, a trial milligram, a preclinical milligram and a community milligram are not the same object";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  const insight = getInsight("how-to-read-peptide-dosing")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · dosing literacy",
      title: insight.title,
      subtitle: "Four kinds of milligram. Mixing them is the error.",
      accent: "#5EA8FA",
    }),
    { ...size, fonts: await ogFonts() },
  );
}
