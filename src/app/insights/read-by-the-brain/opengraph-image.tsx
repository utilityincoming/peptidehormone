import { ImageResponse } from "next/og";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt =
  "Read by the brain — brenipatide points tirzepatide's GIP/GLP-1 machinery at addiction and depression, a bold Phase 3 bet that incretin signaling reaches the brain's reward circuitry";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  const insight = getInsight("read-by-the-brain")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · Incretins & metabolic",
      title: insight.title,
      subtitle: "Brenipatide's bet: the incretin signal, read by the reward system.",
      accent: "#7C83FF", // incretins-metabolic family accent (indigo)
    }),
    { ...size },
  );
}
