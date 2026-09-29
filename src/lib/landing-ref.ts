// The ?ref= from a tracked link (https://<site>/?ref=upwork), read once from
// the URL the visitor landed on. Lives in memory only (nothing stored in the
// browser, so no cookie banner), and survives client-side navigation because
// this module is evaluated once per page load.
export const landingRef: string | null =
  typeof window === "undefined"
    ? null
    : new URLSearchParams(window.location.search)
        .get("ref")
        ?.toLowerCase()
        .replace(/[^a-z0-9-]/g, "")
        .slice(0, 40) || null;
