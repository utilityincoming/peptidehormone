import { ImageResponse } from "next/og";
import { ogImage, ogFonts, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt =
  "The receptor outlived the drug — calcitonin's osteoporosis spray faded, but its receptor, paired with a RAMP, is the amylin receptor behind today's obesity drugs.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  const insight = getInsight("the-receptor-outlived-the-drug")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · calcium & bone",
      title: insight.title,
      subtitle:
        "Calcitonin's drug faded; its receptor, paired with a RAMP, became the amylin receptor behind the obesity agonists.",
      accent: "#386982",
    }),
    { ...size, fonts: await ogFonts() },
  );
}
