import { ImageResponse } from "next/og";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt = "From insulin to the peptide boom — a century of peptide medicine";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  const insight = getInsight("insulin-to-the-peptide-boom")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · history",
      title: insight.title,
      subtitle: "A hundred years from the first miracle to the 2026 cultural moment.",
    }),
    { ...size },
  );
}
