import { ImageResponse } from "next/og";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt =
  "The last three words — KPV, the C-terminal tripeptide of α-MSH: keeps the anti-inflammatory action, drops pigment and appetite, and works receptor-independently";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  const insight = getInsight("the-last-three-words")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · mechanism",
      title: insight.title,
      subtitle:
        "Cut α-MSH down to Lys-Pro-Val and it keeps one job — calm the inflammation — delivered from inside the cell, no receptor required.",
      accent: "#F5B544",
    }),
    { ...size },
  );
}
