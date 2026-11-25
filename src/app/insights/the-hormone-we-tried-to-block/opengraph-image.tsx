import { ImageResponse } from "next/og";
import { ogImage, ogFonts, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt = "The hormone we tried to block — glucagon's path from insulin contaminant and diabetes villain to a designed-in component of survodutide and retatrutide";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  const insight = getInsight("the-hormone-we-tried-to-block")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · Incretins & metabolic",
      title: insight.title,
      subtitle: "Glucagon: blamed for diabetes, now built into weight-loss drugs.",
      accent: "#34566A",
    }),
    { ...size, fonts: await ogFonts() },
  );
}
