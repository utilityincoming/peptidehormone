import { ImageResponse } from "next/og";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt = "Keeping the muscle on GLP-1 — myostatin inhibition and the combination therapies that spare lean mass";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  const insight = getInsight("glp-1-muscle-preservation")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · mechanism",
      title: insight.title,
      subtitle: "Pair GLP-1 with myostatin inhibition and you lose fat while sparing muscle. The TGF-β biology behind it.",
      accent: "#B58CFA",
    }),
    { ...size },
  );
}
