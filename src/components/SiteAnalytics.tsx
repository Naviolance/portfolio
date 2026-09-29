"use client";

import { useEffect } from "react";
import { Analytics, type BeforeSendEvent } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { landingRef } from "@/lib/landing-ref";

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

// Adds "(ref: acme)" to the pre-typed message of ANY WhatsApp link the
// visitor taps (hero, pricing, contact, footer, FAQ, floating button), so a
// client who came from a tracked link says where from in their first message.
// One listener instead of per-button code: server components stay server
// components. Runs in the capture phase, before the browser follows the link.
function useRefOnWhatsAppLinks() {
  useEffect(() => {
    if (!landingRef) return;
    const tag = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.<HTMLAnchorElement>('a[href^="https://wa.me/"]');
      if (!link) return;
      const [base, query = ""] = link.href.split("?");
      const text = new URLSearchParams(query).get("text") ?? "";
      if (text.includes("(ref: ")) return;
      // encodeURIComponent, not URLSearchParams: WhatsApp shows "+" literally.
      link.href = `${base}?text=${encodeURIComponent(`${text} (ref: ${landingRef})`.trim())}`;
    };
    document.addEventListener("click", tag, true);
    document.addEventListener("auxclick", tag, true);
    return () => {
      document.removeEventListener("click", tag, true);
      document.removeEventListener("auxclick", tag, true);
    };
  }, []);
}

export function SiteAnalytics() {
  useRefOnWhatsAppLinks();
  return (
    <>
      <Analytics beforeSend={tagRef} />
      {/* Real visitors' Core Web Vitals (LCP, INP, CLS) in the Vercel
          dashboard: what Google measures for ranking, on real phones. */}
      <SpeedInsights />
    </>
  );
}
