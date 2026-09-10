import { ImageResponse } from "next/og";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt = "The gut's full report — the enteroendocrine chorus behind the GLP-1 era: CCK, secretin, GLP-1, PYY and motilin, and the surgery that proves the whole report drives appetite";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  const insight = getInsight("the-guts-full-report")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · Gut & appetite",
      title: insight.title,
      subtitle: "GLP-1 is one line of it. Surgery reads the whole thing.",
      accent: "#2DD4A8", // gut-appetite family accent (teal)
    }),
    { ...size },
  );
}
