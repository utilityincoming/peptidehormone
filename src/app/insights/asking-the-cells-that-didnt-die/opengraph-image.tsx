import { ImageResponse } from "next/og";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt =
  "Asking the cells that didn't die — humanin, the 24-residue peptide encoded in mitochondrial DNA that tells a cell not to kill itself";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  const insight = getInsight("asking-the-cells-that-didnt-die")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · mitochondrial peptides",
      title: insight.title,
      subtitle:
        "Humanin was overheard, not designed: pulled from the surviving neurons of an Alzheimer's brain, written in mitochondrial DNA. A hormone outside the cell, a Bax-blocker inside it. Reference-grade, and honest about how little is tested in people.",
      accent: "#B58CFA",
    }),
    { ...size },
  );
}
