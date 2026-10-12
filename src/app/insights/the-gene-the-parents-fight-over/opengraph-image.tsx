import { ImageResponse } from "next/og";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt =
  "The gene the parents fight over — IGF-2 is expressed only from the father's copy, buffered by a maternally expressed receptor that destroys it, the parental tug-of-war over fetal growth";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  const insight = getInsight("the-gene-the-parents-fight-over")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · Growth & repair",
      title: insight.title,
      subtitle: "IGF-2: imprinting, a borrowed receptor, and a receptor that destroys.",
      accent: "#5EA8FA", // growth-repair family accent (blue)
    }),
    { ...size },
  );
}
