import { ImageResponse } from "next/og";
import { ogImage, ogFonts, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt = "The hormone found after its drug — ghrelin, the hunger hormone discovered fifteen years after the synthetic peptides that imitate it, why it needs a fatty acid, and why blocking it never became an obesity drug";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  const insight = getInsight("the-hormone-found-after-its-drug")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · Gut & appetite",
      title: insight.title,
      subtitle: "Ghrelin: the drug came first, the hormone fifteen years later.",
      accent: "#2DD4A8",
    }),
    { ...size, fonts: await ogFonts() },
  );
}
