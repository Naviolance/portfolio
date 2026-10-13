import { test, expect } from "@playwright/test";
import { sitemapPaths } from "./helpers";

// Every internal link on every page leads somewhere (no 404s). External
// links (demos, GitHub, WhatsApp) aren't checked: their uptime isn't ours.
test("no broken internal links", async ({ page, request }) => {
  const targets = new Set<string>();
  for (const path of await sitemapPaths(request)) {
    await page.goto(path);
    const hrefs = await page.locator("a[href]").evaluateAll((links) =>
      links.map((a) => (a as HTMLAnchorElement).href).filter((h) => h.startsWith(location.origin))
    );
    for (const href of hrefs) {
      const url = new URL(href);
      targets.add(url.pathname);
      // Same-page anchors (#pricing) must point at an element that exists.
      if (url.hash && url.pathname === new URL(page.url()).pathname) {
        await expect(page.locator(url.hash), `${path} → ${url.hash}`).toHaveCount(1);
      }
    }
  }
  for (const target of targets) {
    const response = await request.get(target);
    expect(response.status(), target).toBeLessThan(400);
  }
});

// The old address must keep every shared link working: same page on the
// real domain, query string kept, and permanent (308), the code that tells
// search engines to move their ranking over (data/domains.ts).
test("the old address redirects permanently to the real domain", async ({ request }) => {
  const { OLD_DOMAINS, SITE_DOMAIN } = await import("../src/data/domains");
  for (const host of OLD_DOMAINS) {
    for (const path of ["/", "/fr/ma-methode", "/en/projects/pharmap?ref=linkedin", "/sitemap.xml"]) {
      const response = await request.get(path, { headers: { host }, maxRedirects: 0 });
      expect(response.status(), `${host}${path}`).toBe(308);
      // Compared as URLs: the homepage's Location is "https://domain", no "/".
      expect(new URL(response.headers().location).href, `${host}${path}`).toBe(new URL(path, `https://${SITE_DOMAIN}`).href);
    }
  }
  // The real address itself is served, not redirected.
  expect((await request.get("/en", { maxRedirects: 0 })).status()).toBe(200);
});
