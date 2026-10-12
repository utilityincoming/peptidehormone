import { ImageResponse } from "next/og";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt =
  "The chain of command — the stress and thyroid axes run as three-tier cascades (CRH→ACTH→cortisol, TRH→TSH→thyroid) with feedback, which is why they're tested from the top";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  const insight = getInsight("the-chain-of-command")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · Neuropeptides",
      title: insight.title,
      subtitle: "The stress and thyroid axes — amplify down, report back up.",
      accent: "#B58CFA", // neuropeptides family accent (purple)
    }),
    { ...size },
  );
}
