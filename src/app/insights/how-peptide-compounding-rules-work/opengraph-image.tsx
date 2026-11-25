import { ImageResponse } from "next/og";
import { ogImage, ogFonts, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt =
  "Can a pharmacy compound it? Four gates a peptide must pass under section 503A: size, ingredient, copy rule, and a patient with a prescription";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  const insight = getInsight("how-peptide-compounding-rules-work")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · Incretins & metabolic",
      title: insight.title,
      subtitle: "503A, 503B, Category 2 and the shortage list, as four gates.",
      accent: "#34566A", // incretins-metabolic family accent (indigo)
    }),
    { ...size, fonts: await ogFonts() },
  );
}
