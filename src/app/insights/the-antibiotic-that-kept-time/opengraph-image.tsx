import { ImageResponse } from "next/og";
import { ogImage, ogFonts, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt =
  "The antibiotic that kept time — motilin paces the between-meal housekeeper wave, and erythromycin, by chance a motilin-receptor agonist, is used to empty a sluggish stomach.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  const insight = getInsight("the-antibiotic-that-kept-time")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · gut & appetite",
      title: insight.title,
      subtitle:
        "Motilin paces the gut between meals — and erythromycin, by accident, is a motilin agonist. The side effect was the pharmacology.",
      accent: "#3E6B58",
    }),
    { ...size, fonts: await ogFonts() },
  );
}
