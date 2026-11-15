import { ImageResponse } from "next/og";
import { ogImage, ogFonts, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt =
  "Two families, one syringe — EloraTZP, eloralintide plus tirzepatide, and the 23.3% phase 2b readout";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  const insight = getInsight("eloratzp")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · combination",
      title: insight.title,
      subtitle: "EloraTZP: 23.3% vs 14.8% on tirzepatide alone. Press release, not a paper.",
    }),
    { ...size, fonts: await ogFonts() },
  );
}
