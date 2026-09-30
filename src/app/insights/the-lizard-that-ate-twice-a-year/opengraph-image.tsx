import { ImageResponse } from "next/og";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt =
  "The lizard that ate twice a year — how exendin-4 from Gila monster venom became exenatide and the template for every GLP-1 drug after it";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  const insight = getInsight("the-lizard-that-ate-twice-a-year")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · history",
      title: insight.title,
      subtitle:
        "A Gila monster fasts between a few meals a year. The peptide that kept its pancreas intact became exenatide, the first GLP-1 drug — and the template for semaglutide, tirzepatide, retatrutide and cagrilintide. The whole lineage, no dosing.",
      accent: "#7C83FF",
    }),
    { ...size },
  );
}
