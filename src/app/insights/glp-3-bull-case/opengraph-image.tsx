import { ImageResponse } from "next/og";
import { ogImage, ogFonts, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt = "The GLP-3 bull case — what retatrutide's phase 3 data support";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  const insight = getInsight("glp-3-bull-case")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · evidence",
      title: insight.title,
      subtitle: "Five positive phase 3 trials, four honest asterisks.",
    }),
    { ...size, fonts: await ogFonts() },
  );
}
