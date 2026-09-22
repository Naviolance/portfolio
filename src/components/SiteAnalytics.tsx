"use client";

import { Analytics, type BeforeSendEvent } from "@vercel/analytics/next";

// Tracked links: share the site as https://<site>/?ref=acme and the landing
// pageview is recorded as the page "/ref/acme". Query/UTM filtering is a paid
// Vercel add-on, but the Pages panel is on every plan, so turning the ref into
// a path makes it visible for free.
//
// Only the landing pageview is tagged. Nothing is stored in the browser to
// follow the visitor around, which keeps this cookie-free and banner-free.
function tagRef(event: BeforeSendEvent): BeforeSendEvent {
  const url = new URL(event.url);
  const ref = url.searchParams.get("ref");
  if (!ref) return event;

  const clean = ref.toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 40);
  if (!clean) return event;

  url.searchParams.delete("ref");
  const page = url.pathname === "/" ? "" : url.pathname;
  url.pathname = `/ref/${clean}${page}`;
  return { ...event, url: url.toString() };
}

export function SiteAnalytics() {
  return <Analytics beforeSend={tagRef} />;
}
