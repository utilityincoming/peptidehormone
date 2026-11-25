import { ImageResponse } from "next/og";
import { ogImage, ogFonts, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Peptide cycle planner — seller goal lists read as half-lives and shared receptors";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return new ImageResponse(
    ogImage({
      eyebrow: "Free tool · no sign-up",
      title: "Read a seller list as a set of clocks.",
      subtitle: "Same receptor or two, a measured half-life or a costume, reference ranges beside the evidence rung.",
      accent: "#865C27",
    }),
    { ...size, fonts: await ogFonts() },
  );
}
