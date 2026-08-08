// Renders a JSON-LD structured-data block. Server component — emits a single
// <script type="application/ld+json">. The `<` escape prevents any `</script>`
// sequence in the data from breaking out of the tag.
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
