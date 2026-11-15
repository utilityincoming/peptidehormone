import { ImageResponse } from "next/og";
import { ogImage, ogFonts, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt =
  "The week is not flat — cagrilintide’s half-life is about a week, so late-week hunger is the fade, not a failure";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  const insight = getInsight("the-week-is-not-flat")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · experience",
      title: insight.title,
      subtitle: "A 159–195 hour half-life. About half gone by the next injection. The ramp lasted up to six weeks.",
    }),
    { ...size, fonts: await ogFonts() },
  );
}
