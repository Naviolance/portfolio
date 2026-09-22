// Structured data for search engines (schema.org). Rendered as a plain
// <script> tag, as the Next.js JSON-LD guide recommends. `<` is escaped so
// no string in the data can close the script tag early.
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
