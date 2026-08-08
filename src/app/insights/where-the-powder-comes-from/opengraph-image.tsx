import { ImageResponse } from "next/og";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt = "Where the powder comes from — the peptide supply chain and why fewest hand-offs wins on purity";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  const insight = getInsight("where-the-powder-comes-from")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · supply chain",
      title: insight.title,
      subtitle: "Most peptide traces back to China — and fewest hand-offs wins on purity.",
    }),
    { ...size },
  );
}
