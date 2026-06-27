import { ImageResponse } from "next/og";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE, accentHex } from "@/lib/og";
import { getInsight } from "@/lib/insights";
import { getFamily } from "@/lib/families";

export const alt = "The growth-hormone axis — pulses, brakes, and feedback";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  const insight = getInsight("growth-hormone-axis")!;
  const accent = accentHex(getFamily(insight.family)?.accent);
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · mechanism",
      title: insight.title,
      subtitle: "Brief signals, a pulsatile rhythm, and feedback that keeps GH in check.",
      accent,
    }),
    { ...size },
  );
}
