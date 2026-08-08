import { ImageResponse } from "next/og";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt = "The GIP paradox — how one drug activating and another blocking the same receptor both cause weight loss";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  const insight = getInsight("the-gip-paradox")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · mechanism",
      title: insight.title,
      subtitle: "Tirzepatide turns GIP on, maridebart turns it off — and both drive weight loss.",
    }),
    { ...size },
  );
}
