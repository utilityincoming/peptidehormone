import { ImageResponse } from "next/og";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "PeptideHormone — a research-grade reference on the peptide hormone system";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return new ImageResponse(
    ogImage({
      eyebrow: "Research-grade reference",
      title: "The peptide hormone system, explained from the source.",
      subtitle: "Mechanism first. Citations always. No products.",
    }),
    { ...size },
  );
}
