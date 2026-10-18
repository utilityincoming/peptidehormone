import { ImageResponse } from "next/og";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getInsight } from "@/lib/insights";

export const alt =
  "Keep one clause — the fragment-engineering playbook cuts a pleiotropic hormone down to one activity; the same design gave teriparatide, ARA-290 and the failed AOD-9604";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  const insight = getInsight("keep-one-clause")!;
  return new ImageResponse(
    ogImage({
      eyebrow: "Insight · Across the families",
      title: insight.title,
      subtitle: "Cut a hormone to one activity — and judge the half you kept.",
      accent: "#F5B544", // melanocortins family accent (amber) — KPV/α-MSH is the archetype
    }),
    { ...size },
  );
}
