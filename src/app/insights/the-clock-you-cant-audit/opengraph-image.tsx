import { ImageResponse } from "next/og";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt =
  "The clock you can't audit — epitalon, a pineal tetrapeptide with bold telomerase and longevity claims and almost no independent replication";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  const insight = getInsight("the-clock-you-cant-audit")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · Repair & regenerative",
      title: insight.title,
      subtitle: "Epitalon: an elegant telomerase claim that never left one building.",
      accent: "#F472B6", // repair family accent (rose)
    }),
    { ...size },
  );
}
