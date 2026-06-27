import { ImageResponse } from "next/og";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE, accentHex } from "@/lib/og";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

export const alt = "The melanocortin system — one peptide family, five receptors";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  const insight = getInsight("melanocortin-system")!;
  const accent = accentHex(getFamily(insight.family)?.accent);
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · mechanism",
      title: insight.title,
      subtitle: "Pigment, cortisol, appetite — sorted by receptor, not by ligand.",
      accent,
    }),
    { ...size },
  );
}
