import { ImageResponse } from "next/og";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt =
  "The molecule that is both halves — amycretin folds GLP-1 and amylin agonism into a single peptide, the unimolecular counterpart to the CagriSema combination";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  const insight = getInsight("the-molecule-that-is-both-halves")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · Incretins & metabolic",
      title: insight.title,
      subtitle: "GLP-1 and amylin agonism welded into one peptide — and an oral form.",
      accent: "#7C83FF", // incretins-metabolic family accent (indigo)
    }),
    { ...size },
  );
}
