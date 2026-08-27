import { ImageResponse } from "next/og";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt =
  "The peptide exercise writes — MOTS-c is an exercise-induced mitochondrial peptide, not a pre-workout";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  const insight = getInsight("the-peptide-exercise-writes")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · mitochondrial peptides",
      title: insight.title,
      subtitle:
        "MOTS-c isn't a pre-workout — it's the signal hard training writes. Why the stimulus comes first, and where SS-31 fits.",
      accent: "#5EA8FA",
    }),
    { ...size },
  );
}
