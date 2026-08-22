import { ImageResponse } from "next/og";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt =
  "Born switched off - how latent myostatin is armed by two proteolytic cuts, and why the pro-form is the most selective drug target";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  const insight = getInsight("born-switched-off")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · mechanism",
      title: insight.title,
      subtitle:
        "Myostatin ships disabled. Two enzyme cuts arm the muscle brake, and the pro-form is the cleanest way to block it.",
      accent: "#B58CFA",
    }),
    { ...size },
  );
}
