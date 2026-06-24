import { ImageResponse } from "next/og";
import { ogImage, accentHex, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { HORMONES, getHormone } from "@/lib/hormones";
import { getFamily } from "@/lib/families";

export function generateStaticParams() {
  return HORMONES.map((h) => ({ slug: h.slug }));
}

export const alt = "Peptide hormone reference";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const h = getHormone(slug);
  const family = h ? getFamily(h.family) : undefined;
  const title = h ? (h.abbr ? `${h.name} (${h.abbr})` : h.name) : "Peptide hormone";
  return new ImageResponse(
    ogImage({
      eyebrow: family?.name ?? "Peptide hormone",
      title,
      subtitle: h?.summary,
      accent: accentHex(family?.accent),
    }),
    { ...size },
  );
}
