import { ImageResponse } from "next/og";
import { ogImage, ogFonts, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt =
  "The hormone built to stay home — PTHrP is a local developmental signal that paces the growth plate via the Indian Hedgehog loop, and causes systemic high calcium only when a tumor makes it circulate.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  const insight = getInsight("the-hormone-built-to-stay-home")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · calcium & bone",
      title: insight.title,
      subtitle:
        "PTHrP paces the growth plate as a local signal. A developmental hormone, a cancer's weapon, and a drug — set by where it acts.",
      accent: "#386982",
    }),
    { ...size, fonts: await ogFonts() },
  );
}
