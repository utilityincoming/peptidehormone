import { ImageResponse } from "next/og";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt = "The half-life, backwards — IGF-1 LR3's structure, the half-life claim vendor pages get wrong, and what the human evidence actually shows";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  const insight = getInsight("igf-1-lr3")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · mechanism",
      title: insight.title,
      subtitle: "Evading the binding proteins doesn't lengthen IGF-1's half-life — it shortens it.",
      accent: "#5EA8FA",
    }),
    { ...size },
  );
}
