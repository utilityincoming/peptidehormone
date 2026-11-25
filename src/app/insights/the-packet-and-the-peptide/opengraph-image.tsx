import { ImageResponse } from "next/og";
import { ogImage, ogFonts, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt =
  "The packet and the peptide — Epitalon's 503A nomination, the literature it did not carry, and what a 7–4 advisory vote actually decided";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  const insight = getInsight("the-packet-and-the-peptide")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · Repair & regenerative",
      title: insight.title,
      subtitle: "Epitalon: a nomination, a literature, and a vote are three verdicts.",
      accent: "#885768",
    }),
    { ...size, fonts: await ogFonts() },
  );
}
