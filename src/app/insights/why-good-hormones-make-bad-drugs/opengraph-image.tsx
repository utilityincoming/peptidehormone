import { ImageResponse } from "next/og";
import { ogImage, ogFonts, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt =
  "Why good hormones make bad drugs — the four recurring reasons physiology resists pharmacology: homeostatic compensation, receptor desensitization, deficiency-only efficacy, and indication mismatch.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  const insight = getInsight("why-good-hormones-make-bad-drugs")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · Across the families",
      title: insight.title,
      subtitle:
        "Four recurring reasons a vivid hormone resists becoming a drug. Physiology is not a bank of knobs you can turn up.",
      accent: "#34566A",
    }),
    { ...size, fonts: await ogFonts() },
  );
}
