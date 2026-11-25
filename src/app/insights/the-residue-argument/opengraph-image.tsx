import { ImageResponse } from "next/og";
import { ogImage, ogFonts, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt =
  "The residue argument: a hormone and a billion-dollar drug can differ by a single amino acid, the same design move recurring across unrelated peptide families";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  const insight = getInsight("the-residue-argument")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · Incretins & metabolic",
      title: insight.title,
      subtitle: "One amino acid separates a hormone from a drug — in family after unrelated family.",
      accent: "#34566A", // incretins-metabolic family accent (indigo)
    }),
    { ...size, fonts: await ogFonts() },
  );
}
