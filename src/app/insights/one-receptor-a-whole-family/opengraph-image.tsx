import { ImageResponse } from "next/og";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt =
  "One receptor, a whole family - myostatin, activin A, and GDF-11 converge on the activin type II receptors, and why that redundancy sets drug strategy";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  const insight = getInsight("one-receptor-a-whole-family")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · mechanism",
      title: insight.title,
      subtitle:
        "Myostatin, activin A, and GDF-11 share one receptor. The redundancy, not any single molecule, decides how you drug it.",
      accent: "#B58CFA",
    }),
    { ...size },
  );
}
