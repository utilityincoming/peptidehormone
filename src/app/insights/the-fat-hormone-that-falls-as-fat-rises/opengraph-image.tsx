import { ImageResponse } from "next/og";
import { ogImage, ogFonts, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt = "The fat hormone that falls as fat rises — adiponectin, why it is lower in obesity, the adiponectin paradox, and why a hormone that predicts diabetes has never become a drug";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  const insight = getInsight("the-fat-hormone-that-falls-as-fat-rises")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · Adipokines & energy balance",
      title: insight.title,
      subtitle: "Adiponectin: made by fat, lowest when there is most of it.",
      accent: "#F5B544",
    }),
    { ...size, fonts: await ogFonts() },
  );
}
