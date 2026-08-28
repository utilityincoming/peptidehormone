import { ImageResponse } from "next/og";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getHormone } from "@/lib/hormones";
import { parseComparePair, staticComparePairs, comparePairPath } from "@/lib/compare";

export function generateStaticParams() {
  return staticComparePairs().map(([a, b]) => ({ pair: comparePairPath(a, b) }));
}

export const alt = "Peptide hormone comparison";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ pair: string }> }) {
  const { pair } = await params;
  const parsed = parseComparePair(pair);
  const a = parsed ? getHormone(parsed[0]) : undefined;
  const b = parsed ? getHormone(parsed[1]) : undefined;
  const title = a && b ? `${a.abbr ?? a.name} vs ${b.abbr ?? b.name}` : "Comparison";
  return new ImageResponse(
    ogImage({
      eyebrow: "Comparison",
      title,
      subtitle: a && b ? `${a.summary} ${b.summary}` : undefined,
    }),
    { ...size },
  );
}
