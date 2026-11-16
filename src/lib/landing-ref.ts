// Where a visitor came from, for tracked links and QR codes:
//   https://<site>/?ref=upwork                     (our own short form)
//   https://<site>/?utm_source=rollup_banner&...   (standard UTM tags, e.g.
//                                                   the roll-up banner's QR)
// ?ref= wins when both are present. Lower case, letters, digits, - and _
// only, at most 40 characters: it ends up in a WhatsApp message and a path.
export function refFrom(params: URLSearchParams): string | null {
  const raw = params.get("ref") ?? params.get("utm_source");
  return (
    raw
      ?.toLowerCase()
      .replace(/[^a-z0-9_-]/g, "")
      .slice(0, 40) || null
  );
}

// The source of the URL the visitor landed on, read once. Lives in memory
// only (nothing stored in the browser, so no cookie banner), and survives
// client-side navigation because this module is evaluated once per page load.
export const landingRef: string | null =
  typeof window === "undefined" ? null : refFrom(new URLSearchParams(window.location.search));
