import { ImageResponse } from "next/og";
import { ogImage, ogFonts, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt =
  "Finished sooner — cagrilintide ends a meal rather than turning down the wanting of one, and the 20% figure belongs to the combination";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  const insight = getInsight("finished-sooner")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · experience",
      title: insight.title,
      subtitle:
        "Amylin stops the meal. GLP-1 quiets the wanting. The −20.4% is CagriSema, not cagrilintide alone.",
    }),
    { ...size, fonts: await ogFonts() },
  );
}
