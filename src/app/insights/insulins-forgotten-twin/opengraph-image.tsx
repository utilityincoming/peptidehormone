import { ImageResponse } from "next/og";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt = "Insulin's forgotten twin — amylin, the second beta-cell hormone and the metabolic frontier's newest axis";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  const insight = getInsight("insulins-forgotten-twin")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · mechanism",
      title: insight.title,
      subtitle: "Amylin: co-secreted with insulin, running a borrowed receptor — and the frontier's newest axis.",
    }),
    { ...size },
  );
}
