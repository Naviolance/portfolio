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
      // The hreflang list lives in the HTML and the sitemap only. A second
      // list in a Link header (the i18n middleware's) gave Google wrong,
      // 404ing addresses for translated pages (i18n/routing.ts).
      expect(response?.headers().link ?? "", "no hreflang Link header").not.toContain("hreflang");
      await expect(page.locator("h1"), "exactly one h1").toHaveCount(1);
      // Lengths Google shows in full on a computer: ~60 characters of title,
      // ~160 of description. Longer gets cut, often at the important part.
      const title = await page.title();
      expect(title.length, `title: "${title}"`).toBeGreaterThan(10);
      expect(title.length, `title over 60: "${title}"`).toBeLessThanOrEqual(60);
      const description = (await page.locator('meta[name="description"]').getAttribute("content")) ?? "";
      expect(description.length, "description").toBeGreaterThanOrEqual(50);
      expect(description.length, `description over 160: "${description}"`).toBeLessThanOrEqual(160);
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

      // Link previews (WhatsApp, LinkedIn, X): exactly one share image that
      // loads, and the X title is this page's, not the homepage's. A page
      // setting its own openGraph replaces the layout's (lib/seo.ts).
      const images = await page.locator('meta[property="og:image"]').evaluateAll((els) => els.map((e) => e.getAttribute("content") ?? ""));
      expect(images, "one share image").toHaveLength(1);
      const image = new URL(images[0]);
      expect((await request.get(image.pathname + image.search)).status(), "share image loads").toBe(200);
      const ogTitle = await page.locator('meta[property="og:title"]').getAttribute("content");
      await expect(page.locator('meta[name="twitter:title"]'), "X preview title").toHaveAttribute("content", ogTitle ?? "");

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
