import { ImageResponse } from "next/og";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
export const alt = "SLU-PP-332 vs BAM15: burning fuel is not the same as getting fit";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export default function Image() {
  return new ImageResponse(ogImage({
    eyebrow: "Insight · metabolic mechanisms",
    title: "SLU-PP-332 vs BAM15",
    subtitle: "Burning fuel is not the same as getting fit. Two mechanisms, real mouse data, unanswered human questions.",
    accent: "#5EA8FA",
  }), { ...size });
}
