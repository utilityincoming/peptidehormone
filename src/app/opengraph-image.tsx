import { ImageResponse } from "next/og";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "PeptideHormone — the research-grade catalog of peptide science";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return new ImageResponse(
    ogImage({
      eyebrow: "Independent · research-grade",
      title: "The peptide frontier, mapped from the source.",
      subtitle: "The catalog of peptide science — families, molecules, evidence. No products.",
    }),
    { ...size },
  );
}
