import { ImageResponse } from "next/og";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt = "The pulse is the message — why the reproductive axis reads the rhythm of GnRH, not its amount: pulsatile stimulates, continuous suppresses, and kisspeptin is the gate";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  const insight = getInsight("the-pulse-is-the-message")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · Reproductive & gonadal",
      title: insight.title,
      subtitle: "The same molecule, pulsed or constant, switches the axis on or off.",
      accent: "#F472B6", // reproductive-gonadal family accent (rose)
    }),
    { ...size },
  );
}
