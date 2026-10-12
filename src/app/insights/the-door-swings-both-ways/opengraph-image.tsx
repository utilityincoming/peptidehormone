import { ImageResponse } from "next/og";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt =
  "The door swings both ways — in 2026 GLP-1 compounding was walled off while a slate of research peptides got an advisory-committee nod toward the 503A list; a vote is not a rule";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  const insight = getInsight("the-door-swings-both-ways")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · Incretins & metabolic",
      title: insight.title,
      subtitle: "2026's two opposite moves in what peptides you can actually get.",
      accent: "#7C83FF", // incretins-metabolic family accent (indigo)
    }),
    { ...size },
  );
}
