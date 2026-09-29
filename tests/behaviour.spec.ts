import { test, expect } from "@playwright/test";

// Tracked links: a visitor from ?ref=upwork gets "(ref: upwork)" on every
// WhatsApp message, once, even through the / → /en redirect.
test("tracked links tag every WhatsApp button once", async ({ page }) => {
  await page.goto("/?ref=Upwork");
  await expect(page).toHaveURL(/\/en\?ref=Upwork/i);
  // Stop the navigation after the site's own click handler has run.
  await page.evaluate(() => document.addEventListener("click", (e) => e.preventDefault()));

  const links = page.locator('a[href^="https://wa.me/"]').filter({ visible: true });
  expect(await links.count()).toBeGreaterThan(3);
  for (const link of await links.all()) {
    await link.click();
    await link.click();
    const text = decodeURIComponent((await link.getAttribute("href"))!.split("text=")[1]);
    expect(text.match(/\(ref: upwork\)/g)).toHaveLength(1);
  }
});

test("WhatsApp messages are untagged without a tracked link", async ({ page }) => {
  await page.goto("/en");
  await page.evaluate(() => document.addEventListener("click", (e) => e.preventDefault()));
  const link = page.locator('a[href^="https://wa.me/"]').filter({ visible: true }).first();
  await link.click();
  expect(await link.getAttribute("href")).not.toContain("ref");
});

// Switching language keeps the reader's place and doesn't replay the hero.
test("language switch keeps your place", async ({ page }) => {
  await page.goto("/en");
  await page.evaluate(() => {
    const pricing = document.getElementById("pricing")!;
    window.scrollTo({ top: pricing.getBoundingClientRect().top + scrollY + 300, behavior: "instant" });
  });
  await page.locator('a[hreflang="fr"]').filter({ visible: true }).first().click();
  await expect(page).toHaveURL(/\/fr$/);

  const top = await page.evaluate(() => document.getElementById("pricing")!.getBoundingClientRect().top);
  expect(Math.abs(top + 300)).toBeLessThan(5);
  const running = await page.evaluate(
    () => [...document.querySelectorAll(".hero-rise, .draw-x, .draw-y, .deck-fan-in")].flatMap((e) => e.getAnimations()).length
  );
  expect(running).toBe(0);
});
