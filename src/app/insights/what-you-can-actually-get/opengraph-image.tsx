import { ImageResponse } from "next/og";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt =
  "Cataloged vs. reachable — which research peptides you can actually get at research grade right now";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  const insight = getInsight("what-you-can-actually-get")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · availability",
      title: insight.title,
      subtitle: "Every catalogue lists what exists. This maps what you can actually reach.",
    }),
    { ...size },
  );
}
