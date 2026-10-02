"use client";

import { usePathname } from "next/navigation";

// The address the visitor tried, for the 404 label's "TO" field. A 404 page
// gets no props, so the path is read in the browser (Next.js's recommended
// way for not-found pages).
export function RequestedPath() {
  return <>{usePathname()}</>;
}
