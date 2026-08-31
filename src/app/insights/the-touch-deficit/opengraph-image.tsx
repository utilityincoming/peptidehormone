import { ImageResponse } from "next/og";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt = "The touch deficit — why injected oxytocin misses the bonding circuit, and what couples' strategies actually rest on";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  const insight = getInsight("the-touch-deficit")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · Neuropeptides",
      title: insight.title,
      subtitle: "Injected oxytocin stays in the blood for minutes — the bonding circuit only answers to touch.",
      accent: "#B58CFA", // neuropeptides family accent
    }),
    { ...size },
  );
}
