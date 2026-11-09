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

// The on-page index marks the section being read (CSS scroll-driven
// animations; Chromium supports them). Exactly one link, the right one.
test("index marks the section you're reading", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  for (const [url, links, target] of [
    ["/en/projects/truckparts", 'nav[aria-label="On this page"] a', "hard"],
    ["/en/faq", 'nav[aria-label="Topics"] a', "payments"],
  ] as const) {
    await page.goto(url);
    await page.evaluate((id) => {
      const top = document.getElementById(id)!.getBoundingClientRect().top + scrollY;
      window.scrollTo({ top: top - innerHeight * 0.2, behavior: "instant" });
    }, target);
    await page.waitForTimeout(100);
    const marked = await page.locator(links).evaluateAll((as) => {
      const colors = as.map((a) => getComputedStyle(a).borderLeftColor);
      return as.filter((_, i) => colors.filter((c) => c === colors[i]).length === 1).map((a) => a.getAttribute("href"));
    });
    expect(marked).toEqual([`#${target}`]);
  }
});

test("FAQ search hides questions that don't match", async ({ page }) => {
  await page.goto("/en/faq");
  const questions = page.locator("main article");
  const total = await questions.count();
  await page.getByRole("searchbox").fill("mobile money");
  await expect(questions).not.toHaveCount(total);
  await expect(page.locator("#mobile-money-store")).toBeVisible();
  await expect(page.locator("#timeline")).toHaveCount(0);
});

test("a shared FAQ link opens that answer", async ({ page }) => {
  await page.goto("/en/faq#timeline");
  await expect(page.locator("#timeline details")).toHaveAttribute("open", "");
});

// Each language offers its own PDF, and the CV page describes the same
// Person as the homepage (ProfilePage structured data).
test("CV page: PDF in the page's language, ProfilePage data", async ({ page }) => {
  for (const [locale, pdf] of [
    ["en", /CV-2026\.pdf$/],
    ["fr", /CV-2026-FR\.pdf$/],
  ] as const) {
    await page.goto(`/${locale}/cv`);
    await expect(page.locator("a[download]").first()).toHaveAttribute("href", pdf);
    const data = JSON.parse((await page.locator('script[type="application/ld+json"]').first().textContent())!);
    expect(data["@type"]).toBe("ProfilePage");
    expect(data.mainEntity["@id"]).toMatch(/\/#person$/);
  }
});

// Broken links get a real 404, rendered on the server (visible before any
// JavaScript loads), in the address's language, inside the site frame.
test("404: server-rendered, right status and language", async ({ request }) => {
  for (const [path, lang, heading] of [
    ["/en/old-page", "en", "This page doesn't exist."],
    ["/fr/projets", "fr", "Cette page n&#x27;existe pas."],
    ["/en/projects/unknown", "en", "This page doesn't exist."],
  ] as const) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(404);
    const html = await response.text();
    expect(html, path).toContain(`<html lang="${lang}"`);
    expect(html, path).toMatch(/<h1[^>]*>/);
    expect(html, path).toContain(heading.replace("'", "&#x27;"));
    expect(html, path).toContain('content="noindex"');
  }
});

// Service pages have a translated address: the language switch must land
// on the other language's address, and hreflang must point to it too.
test("service pages: language switch and hreflang use the translated address", async ({ page }) => {
  await page.goto("/en/services/ecommerce");
  await expect(page.locator('link[hreflang="fr"]')).toHaveAttribute("href", /\/fr\/services\/creation-boutique-en-ligne$/);
  await page.locator('header a[hreflang="fr"]').filter({ visible: true }).first().click();
  await expect(page).toHaveURL(/\/fr\/services\/creation-boutique-en-ligne$/);
  await expect(page.locator("h1")).toContainText("Création de boutique en ligne");
});

test("How I work: translated address, redirect and nav link", async ({ page, request }) => {
  // The wrong-language address is a real permanent redirect, not a 404.
  const wrong = await request.get("/fr/how-i-work", { maxRedirects: 0 });
  expect(wrong.status()).toBe(308);
  expect(wrong.headers().location).toMatch(/\/fr\/ma-methode$/);

  await page.goto("/en/services/ecommerce");
  await page.locator("header nav").getByRole("link", { name: "How I work" }).click();
  await expect(page).toHaveURL(/\/en\/how-i-work$/);
  await expect(page.locator("h1")).toHaveText("What happens after you message me");
  await expect(page.locator('link[hreflang="fr"]')).toHaveAttribute("href", /\/fr\/ma-methode$/);

  await page.locator('header a[hreflang="fr"]').filter({ visible: true }).first().click();
  await expect(page).toHaveURL(/\/fr\/ma-methode$/);
  await expect(page.locator("h1")).toHaveText("Ce qui se passe après votre message");
  await expect(page.locator("main ol > li")).toHaveCount(6);
});

// "Test your site": the request opens in WhatsApp, written in the page's
// language; missing fields are named before anything opens.
test("Test your site: checks the fields, then opens the written request in WhatsApp", async ({ page }) => {
  await page.goto("/fr/services/referencement-google-ia");
  await page.evaluate(() => {
    (window as unknown as { opened: string[] }).opened = [];
    window.open = (url?: string | URL) => {
      (window as unknown as { opened: string[] }).opened.push(String(url));
      return null;
    };
  });
  const form = page.locator("#test-site");
  await form.getByRole("button", { name: /Envoyer la demande sur WhatsApp/ }).click();
  await expect(form.getByRole("alert")).toHaveText("Indiquez l'adresse de votre site, par exemple monentreprise.cm.");
  await expect(page.locator("#test-site")).toBeVisible();
  await expect(page.locator("#test-field-site")).toBeFocused();
  await form.getByLabel(/Adresse de votre site/).fill("clinique-exemple.cm");
  await form.getByLabel(/Votre nom/).fill("Marie Ngo");
  await form.getByRole("button", { name: /Envoyer la demande sur WhatsApp/ }).click();
  await expect(form.getByRole("alert")).toHaveText("Indiquez un numéro WhatsApp ou une adresse e-mail pour recevoir le rapport.");
  await expect(page.locator("#test-field-contact")).toBeFocused();
  await form.getByLabel(/Où recevoir le rapport/).fill("+237 6 99 11 22 33");
  await form.getByLabel(/Ville/).fill("Douala");
  await form.getByRole("button", { name: /Envoyer la demande sur WhatsApp/ }).click();
  await expect(form.getByRole("alert")).toBeHidden();
  const [url] = await page.evaluate(() => (window as unknown as { opened: string[] }).opened);
  expect(url).toMatch(/^https:\/\/wa\.me\/237678369216\?text=/);
  const text = decodeURIComponent(url!.split("text=")[1]!).replace(/[  ]/g, " ");
  expect(text).toBe(
    "Bonjour Priestly, je voudrais faire tester mon site (analyse à 50K FCFA).\n\nSite : https://clinique-exemple.cm/\nNom : Marie Ngo\nVille : Douala\nEnvoyez-moi le rapport sur : +237 6 99 11 22 33",
  );
});

// GA4 waits for consent (lib/consent.ts): every Google signal starts denied,
// the banner asks once, the choice sticks, and the footer link reopens it.
test.describe("cookie banner", () => {
  test.use({ storageState: { cookies: [], origins: [] } });
  const consentCommands = (page: import("@playwright/test").Page) =>
    page.evaluate(() =>
      (window.dataLayer ?? [])
        .map((entry) => Array.from(entry as ArrayLike<unknown>))
        .filter((args) => args[0] === "consent")
        .map((args) => `${args[1]} ${(args[2] as Record<string, string>).analytics_storage}`)
    );

  test("asks once; accepting turns analytics on, refusing keeps it off", async ({ page }) => {
    for (const width of [390, 1280]) {
      await page.setViewportSize({ width, height: 844 });
      await page.goto("/fr");
      await page.evaluate(() => localStorage.clear());
      await page.reload();
      const banner = page.getByRole("region", { name: "Consentement aux cookies" });
      await expect(banner).toBeVisible();
      expect(await consentCommands(page)).toEqual(["default denied"]);
      // Within the screen: no sideways scroll at phone width.
      expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(0);

      await banner.getByRole("button", { name: "Accepter" }).click();
      await expect(banner).toBeHidden();
      expect(await consentCommands(page)).toEqual(["default denied", "update granted"]);
      // Next page view: no banner, analytics granted from the start.
      await page.reload();
      await expect(banner).toBeHidden();
      expect(await consentCommands(page)).toEqual(["default denied", "update granted"]);

      // The footer link reopens it; refusing turns analytics back off.
      await page.getByRole("button", { name: "Paramètres des cookies" }).click();
      await banner.getByRole("button", { name: "Refuser" }).click();
      await expect(banner).toBeHidden();
      await page.reload();
      await expect(banner).toBeHidden();
      expect(await consentCommands(page)).toEqual(["default denied"]);
    }
  });

  test("Google Tag Manager only loads on the live site", async ({ page }) => {
    await page.goto("/en");
    await expect(page.locator('script[src*="googletagmanager.com"]')).toHaveCount(0);
  });
});

// Light/dark: follows the device until the visitor chooses; the choice is
// applied before the first paint on the next page (no flash) and wins over
// the device setting.
test("theme toggle: follows the device, then remembers the choice", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/en");
  const paper = () => page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  expect(await paper()).toBe("rgb(4, 22, 42)"); // device says dark

  await page.getByRole("button", { name: "Light or dark mode" }).click();
  expect(await page.evaluate(() => document.documentElement.dataset.theme)).toBe("light");
  expect(await paper()).toBe("rgb(246, 248, 250)");

  // Next page: already light in the server HTML + head script, before React.
  await page.goto("/en/faq", { waitUntil: "commit" });
  await page.waitForSelector("body");
  expect(await page.evaluate(() => document.documentElement.dataset.theme)).toBe("light");
  expect(await paper()).toBe("rgb(246, 248, 250)");
});
