import { ImageResponse } from "next/og";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt =
  "The off switch — somatostatin is the body's universal inhibitory hormone, and its analogs octreotide, lanreotide and pasireotide differ only in which receptor subtypes they grip";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  const insight = getInsight("the-off-switch")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · Growth & repair",
      title: insight.title,
      subtitle: "Somatostatin: the brake, and the analogs tuned by receptor subtype.",
      accent: "#5EA8FA", // growth-repair family accent (blue)
    }),
    { ...size },
  );
}
