// Renders sanitized JSON-LD structured data. JSON.stringify alone doesn't
// escape `<`, which would let a literal "</script>" break out of the tag —
// see node_modules/next/dist/docs/01-app/02-guides/json-ld.md.
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
