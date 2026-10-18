import { ImageResponse } from "next/og";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt =
  "What a peptide hormone is — a short chain of amino acids that signals from one cell to another";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return new ImageResponse(
    ogImage({
      eyebrow: "The primer",
      title: "What a peptide hormone actually is",
      subtitle:
        "A short chain of amino acids that one cell releases to signal another — how they are made, how they work, and the families they fall into.",
      accent: "#7C83FF",
    }),
    { ...size },
  );
}
