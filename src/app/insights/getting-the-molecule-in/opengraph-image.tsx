import { ImageResponse } from "next/og";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt = "The delivery problem — why peptides resist every route but the needle";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  const insight = getInsight("getting-the-molecule-in")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · delivery",
      title: insight.title,
      subtitle: "Gut, skin, nose, needle — why only one route reliably works.",
    }),
    { ...size },
  );
}
