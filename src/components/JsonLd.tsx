import { headers } from "next/headers";

// Renders a JSON-LD structured-data block. Server component — emits a single
// <script type="application/ld+json">. The `<` escape prevents any `</script>`
// sequence in the data from breaking out of the tag. The nonce matches the
// Content-Security-Policy set in middleware so this inline block is allowed
// without script-src 'unsafe-inline'.
export async function JsonLd({ data }: { data: object }) {
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  return (
    <script
      nonce={nonce}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
