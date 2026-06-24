import { ImageResponse } from "next/og";
import { ogImage, accentHex, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { FAMILIES, getFamily } from "@/lib/families";

export function generateStaticParams() {
  return FAMILIES.map((f) => ({ slug: f.slug }));
}

export const alt = "Peptide hormone signaling family";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const family = getFamily(slug);
  return new ImageResponse(
    ogImage({
      eyebrow: "Signaling family",
      title: family?.name ?? "Peptide hormones",
      subtitle: family?.tagline,
      accent: accentHex(family?.accent),
    }),
    { ...size },
  );
}
