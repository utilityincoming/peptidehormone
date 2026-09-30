import { ImageResponse } from "next/og";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt =
  "The arm that points at the liver — survodutide, the GLP-1/glucagon dual agonist that bets glucagon's fat-burning is worth its cost in glucose";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  const insight = getInsight("the-arm-that-points-at-the-liver")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · mechanism",
      title: insight.title,
      subtitle:
        "Survodutide adds one receptor to GLP-1 and picks the strange one: glucagon, the hormone diabetes drugs are built to fight. Why its headline result is a liver-disease signal, not its weight loss. Bullish on the science, sceptical on the page.",
      accent: "#7C83FF",
    }),
    { ...size },
  );
}
