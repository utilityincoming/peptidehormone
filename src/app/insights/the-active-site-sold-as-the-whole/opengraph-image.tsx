import { ImageResponse } from "next/og";
import { ogImage, ogFonts, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt =
  "The active site, sold as the whole — TB-500 is the seven-residue actin-binding fragment of thymosin β4, marketed as if it carried the whole peptide's biology, with no controlled human trial.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  const insight = getInsight("the-active-site-sold-as-the-whole")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · evidence",
      title: insight.title,
      subtitle:
        "TB-500 is Ac-LKKTETQ — seven of thymosin β4's forty-three residues. Real biology, borrowed name, missing trial.",
      accent: "#885768",
    }),
    { ...size, fonts: await ogFonts() },
  );
}
