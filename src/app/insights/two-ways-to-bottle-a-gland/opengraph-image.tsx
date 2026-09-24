import { ImageResponse } from "next/og";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt =
  "Two ways to bottle a gland — thymalin, an uncharacterised thymic extract, versus thymosin α1, the same tissue run down to one defined 28-residue peptide with a receptor and a drug label";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  const insight = getInsight("two-ways-to-bottle-a-gland")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · mechanism",
      title: insight.title,
      subtitle:
        "The thymus, bottled two ways: thymalin, a crude extract with a startling longevity claim you cannot audit — and thymosin α1, one defined 28-residue peptide with a TLR9 receptor and a drug label. Bullish on the science, sceptical on the page.",
      accent: "#F472B6",
    }),
    { ...size },
  );
}
