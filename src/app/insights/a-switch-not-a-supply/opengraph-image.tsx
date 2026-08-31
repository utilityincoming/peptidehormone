import { ImageResponse } from "next/og";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt = "A switch, not a supply — GHK-Cu launches a phased wound-repair program, and why letting it finish is the argument for cycling";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  const insight = getInsight("a-switch-not-a-supply")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · mechanism",
      title: insight.title,
      subtitle: "GHK-Cu is a signal that starts a program, not a level you top up. Why the mechanism — not any trial — argues for letting each cycle finish.",
      accent: "#F472B6",
    }),
    { ...size },
  );
}
