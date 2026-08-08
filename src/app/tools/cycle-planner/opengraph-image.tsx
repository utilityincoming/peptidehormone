import { ImageResponse } from "next/og";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Peptide cycle planner — plan a research cycle by goal, length, and level";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return new ImageResponse(
    ogImage({
      eyebrow: "Free tool · no sign-up",
      title: "Plan a peptide cycle from goal to schedule.",
      subtitle: "Goal stacks, a week-by-week timeline, reference dosing, and an estimated supply list. Research-use only.",
      accent: "#F5B544",
    }),
    { ...size },
  );
}
