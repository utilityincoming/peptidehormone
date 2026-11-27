import { ImageResponse } from "next/og";
import { ogImage, ogFonts, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt =
  "The first word — secretin, the 1902 discovery that founded endocrinology and named the hormone, from pancreatic bicarbonate to a debunked autism fad to a brown-fat second act.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  const insight = getInsight("the-first-word")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · Gut & appetite",
      title: insight.title,
      subtitle:
        "Secretin founded endocrinology in 1902 and named the hormone. Founded a field, survived a fad, earned a second look.",
      accent: "#3E6B58",
    }),
    { ...size, fonts: await ogFonts() },
  );
}
