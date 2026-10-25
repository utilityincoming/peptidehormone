import { ImageResponse } from "next/og";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt =
  "Written for the brain — semax and selank, two Russian-registered neuropeptides engineered from endogenous fragments, with plausible mechanisms and little independent evidence";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  const insight = getInsight("written-for-the-brain")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · Neuropeptides",
      title: insight.title,
      subtitle: "Semax and selank: real use, plausible mechanism, missing audit.",
      accent: "#B58CFA", // neuropeptides family accent (purple)
    }),
    { ...size },
  );
}
