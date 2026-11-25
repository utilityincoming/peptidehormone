import { ImageResponse } from "next/og";
import { ogImage, ogFonts, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt =
  "When the mix goes solid: opposite charge bricks a peptide blend, and the molecules that stay dissolved are chemically rewritten before a receptor ever sees them";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  const insight = getInsight("when-the-mix-goes-solid")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · Incretins & metabolic",
      title: insight.title,
      subtitle: "Charge crashes the vial. Chemistry rewrites what remains.",
      accent: "#34566A",
    }),
    { ...size, fonts: await ogFonts() },
  );
}
