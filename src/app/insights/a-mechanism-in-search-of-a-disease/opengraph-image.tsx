import { ImageResponse } from "next/og";
import { ogImage, ogFonts, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt =
  "A mechanism in search of a disease — elamipretide (SS-31) stabilizes cardiolipin, failed its big trials in mitochondrial myopathy and dry AMD, and found a home in Barth syndrome, a cardiolipin defect.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  const insight = getInsight("a-mechanism-in-search-of-a-disease")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · mitochondrial",
      title: insight.title,
      subtitle:
        "Elamipretide stabilizes cardiolipin. It missed its big trials — and fit the one disease whose defect is cardiolipin itself.",
      accent: "#386982",
    }),
    { ...size, fonts: await ogFonts() },
  );
}
