import { ImageResponse } from "next/og";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt = "Two minutes to seven days — how a peptide is engineered from a two-minute half-life to a weekly one";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  const insight = getInsight("peptide-half-life-engineering")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · pharmacokinetics",
      title: insight.title,
      subtitle: "How a two-minute hormone was engineered into a week-long drug — by borrowing what the body keeps.",
    }),
    { ...size },
  );
}
