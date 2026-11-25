import { ImageResponse } from "next/og";
import { ogImage, ogFonts, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt = "The neuron behind the hot flash — how KNDy neurons making kisspeptin, neurokinin B and dynorphin drive both the LH pulse and the menopausal hot flash, and the NK3 blockers that followed";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  const insight = getInsight("the-neuron-behind-the-hot-flash")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · Reproductive & gonadal",
      title: insight.title,
      subtitle: "One cell, three peptides, and a thermostat left without its brake.",
      accent: "#885768",
    }),
    { ...size, fonts: await ogFonts() },
  );
}
