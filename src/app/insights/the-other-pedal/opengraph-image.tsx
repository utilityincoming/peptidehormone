import { ImageResponse } from "next/og";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt = "The other pedal — the IGF-1 accelerator arm of muscle: MGF, IGF-1 LR3, and why pushing growth is harder than releasing the brake";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  const insight = getInsight("the-other-pedal")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · mechanism",
      title: insight.title,
      subtitle: "Muscle has a brake and an accelerator. The IGF-1 axis is the accelerator — older, stronger, and harder to steer.",
      accent: "#5EA8FA",
    }),
    { ...size },
  );
}
