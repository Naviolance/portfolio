import type { APIRequestContext } from "@playwright/test";

// Every page the site publishes, read from its own sitemap, so a new page
// is tested automatically. Returns paths ("/en", "/fr/faq", ...): the
// sitemap's host is the production URL, not this test server.
export async function sitemapPaths(request: APIRequestContext): Promise<string[]> {
  const xml = await (await request.get("/sitemap.xml")).text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
}
