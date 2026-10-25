import { ImageResponse } from "next/og";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt =
  "Mechanism is not proof — the evidence ladder from plausible mechanism up to replicated human outcomes, and why most peptide claims sell a low rung as if it were a high one";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  const insight = getInsight("mechanism-is-not-proof")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · Reading the evidence",
      title: insight.title,
      subtitle: "The ladder from a receptor and a story to a replicated human outcome.",
      accent: "#7C83FF", // house indigo — a site-level methodological essay
    }),
    { ...size },
  );
}
