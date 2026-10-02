import { test, expect } from "@playwright/test";
import { sitemapPaths } from "./helpers";

// Search basics on every page, in both languages: what Google, Bing and AI
// crawlers read before anything else.
test("every sitemap page has its SEO basics", async ({ page, request }) => {
  const paths = await sitemapPaths(request);
  expect(paths.length).toBeGreaterThanOrEqual(12);

  for (const path of paths) {
    await test.step(path, async () => {
      const response = await page.goto(path);
      expect(response?.status(), "status").toBe(200);
      await expect(page.locator("h1"), "exactly one h1").toHaveCount(1);
      expect((await page.title()).length, "title").toBeGreaterThan(10);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.{50,}/);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", new RegExp(`${path}$`));
      for (const lang of ["en", "fr", "x-default"]) {
        await expect(page.locator(`link[rel="alternate"][hreflang="${lang}"]`), `hreflang ${lang}`).toHaveCount(1);
      }
      // A missing translation renders as its raw key ("gallery.view"),
      // including text dropped from the client messages in the layout.
      const text = await page.locator("body").innerText();
      const aria = (await page.locator("[aria-label]").evaluateAll((els) => els.map((e) => e.getAttribute("aria-label")))).join(" ");
      expect(`${text} ${aria}`, "raw message key on the page").not.toMatch(
        /\b(?:nav|whatsapp|hero|work|gallery|faq|project|about|experience|contact|services|pricing|footer|faqTeaser)\.[a-z][A-Za-z]+\b/
      );

      // French: a breakable space before : ; ? ! % » (or after «) lets the
      // sign wrap onto its own line. lib/typography.ts fixes data and
      // messages; this catches text that bypasses it. Reads every text node
      // (closed FAQ answers included) plus the title and meta description.
      if (path.startsWith("/fr")) {
        const french = await page.evaluate(() => {
          const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
          const parts = [document.title, document.querySelector('meta[name="description"]')?.getAttribute("content") ?? ""];
          for (let node = walker.nextNode(); node; node = walker.nextNode()) {
            if (!node.parentElement?.closest("script, style")) parts.push(node.textContent ?? "");
          }
          return parts.join("\n");
        });
        expect(french.match(/.{0,30}(?:\S [:;?!%»]|« ).{0,10}/g), "breakable space in French").toBeNull();
      }

      // Structured data must be valid JSON, or search engines ignore it.
      for (const json of await page.locator('script[type="application/ld+json"]').allTextContents()) {
        expect(() => JSON.parse(json), "valid JSON-LD").not.toThrow();
      }
    });
  }
});

// The bug this redesign hit most: something wider than the screen on a
// phone, making the whole page scroll sideways.
for (const width of [390, 1280]) {
  test(`no page scrolls sideways at ${width}px`, async ({ page, request }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const path of await sitemapPaths(request)) {
      await page.goto(path);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, `${path} is ${overflow}px too wide`).toBeLessThanOrEqual(0);
    }
  });
}
