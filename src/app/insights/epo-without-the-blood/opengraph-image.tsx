import { ImageResponse } from "next/og";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt =
  "EPO without the blood — ARA-290 is an 11-residue peptide that carries erythropoietin's tissue-protective signal through the innate repair receptor, with no effect on red cells";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  const insight = getInsight("epo-without-the-blood")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · Repair & regenerative",
      title: insight.title,
      subtitle: "ARA-290 keeps EPO's tissue protection, drops the red cells.",
      accent: "#F472B6", // repair family accent (rose)
    }),
    { ...size },
  );
}
