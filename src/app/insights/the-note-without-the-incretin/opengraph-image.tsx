import { ImageResponse } from "next/og";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt = "The note without the incretin — how eloralintide, a selective amylin agonist, is built and what its trials show";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  const insight = getInsight("the-note-without-the-incretin")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · molecule",
      title: insight.title,
      subtitle: "Eloralintide: 20% weight loss at 48 weeks, a thioacetal ring, a C20 tail, and no GLP-1 receptor anywhere in it.",
    }),
    { ...size },
  );
}
