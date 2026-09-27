import { ImageResponse } from "next/og";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt =
  "Wrong end of the hormone — KPV and HSDD: the tripeptide lacks the melanocortin pharmacophore that bremelanotide's desire effect runs through, and has never been studied for sexual function";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  const insight = getInsight("wrong-end-of-the-hormone")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · record straightened",
      title: insight.title,
      subtitle:
        "KPV and bremelanotide come from opposite ends of α-MSH. Only one carries the receptor message that desire runs through — and even that one is a modest drug.",
      accent: "#F5B544",
    }),
    { ...size },
  );
}
