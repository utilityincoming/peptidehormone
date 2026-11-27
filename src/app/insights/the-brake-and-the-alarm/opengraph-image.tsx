import { ImageResponse } from "next/og";
import { ogImage, ogFonts, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt =
  "The brake and the alarm — cholecystokinin is the gut's satiety brake through CCK-1 and, via CCK-4 at the brain's CCK-2 receptor, a reliable trigger of panic.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  const insight = getInsight("the-brake-and-the-alarm")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · Gut & appetite",
      title: insight.title,
      subtitle:
        "One peptide, two receptors, two worlds: a satiety brake in the gut, a panic alarm in the head. Vivid biology, uncooperative pharmacology.",
      accent: "#3E6B58",
    }),
    { ...size, fonts: await ogFonts() },
  );
}
