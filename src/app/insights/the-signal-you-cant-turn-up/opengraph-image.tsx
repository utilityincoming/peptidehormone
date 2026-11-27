import { ImageResponse } from "next/og";
import { ogImage, ogFonts, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt =
  "The signal you can't turn up — why more leptin doesn't treat common obesity (a saturable transport ceiling and SOCS-3 feedback), and where leptin genuinely works: the low end.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  const insight = getInsight("the-signal-you-cant-turn-up")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · adipokines",
      title: insight.title,
      subtitle:
        "Leptin resistance isn't a broken receptor — it's a transport ceiling and a built-in brake. A one-way signal, loudest in its absence.",
      accent: "#865C27",
    }),
    { ...size, fonts: await ogFonts() },
  );
}
