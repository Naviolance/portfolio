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
