import { ImageResponse } from "next/og";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt =
  "The rest of the cascade — why some men report mood and wellbeing benefits when hCG is added to testosterone therapy, read honestly through estradiol, neurosteroids, and expectancy";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  const insight = getInsight("the-rest-of-the-cascade")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · mechanism",
      title: insight.title,
      subtitle:
        "Testosterone replacement fixes one hormone and switches off the gland that made it. What some men feel when hCG relights the rest of the steroid cascade — graded honestly.",
      accent: "#F472B6",
    }),
    { ...size },
  );
}
