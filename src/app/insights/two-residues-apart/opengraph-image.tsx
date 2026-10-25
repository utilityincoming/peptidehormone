import { ImageResponse } from "next/og";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt =
  "Two residues apart — vasopressin and oxytocin differ by just two of nine amino acids, yet vasopressin became a whole shelf of real water-balance drugs while oxytocin stayed a legend";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  const insight = getInsight("two-residues-apart")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · Neuropeptides",
      title: insight.title,
      subtitle: "Vasopressin: oxytocin's quieter, more useful twin.",
      accent: "#B58CFA", // neuropeptides family accent (purple)
    }),
    { ...size },
  );
}
