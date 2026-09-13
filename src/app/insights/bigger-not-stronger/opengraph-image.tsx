import { ImageResponse } from "next/og";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt =
  "Bigger, but not stronger — why muscle-brake drugs grew muscle without function, and how apitegromab finally moved it";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  const insight = getInsight("bigger-not-stronger")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · mechanism",
      title: insight.title,
      subtitle:
        "ACE-083 grew muscle you couldn't use. Why size was never the endpoint — and how the pathway finally moved function.",
      accent: "#B58CFA",
    }),
    { ...size },
  );
}
