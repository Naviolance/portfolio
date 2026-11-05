// Tells IndexNow (Bing, and through it ChatGPT search and Copilot; also
// Yandex, Seznam, Naver) which pages just changed, so they re-read them in
// hours instead of waiting for their next visit. Google doesn't use IndexNow:
// the sitemap's dates do that job there.
//
// The daily run is src/app/api/indexnow/route.ts (Vercel Cron). This script
// is the manual version, from any computer, once a deploy is live: never
// during the build, the pages must already be online when a crawler comes.
// Sends only the changed pages: sitemap entries whose lastmod is on or after
// SINCE. CI already makes every content change update its date
// (scripts/check-dates.mjs), so lastmod is a reliable "changed" signal.
//
//   SINCE=2026-11-05 node --experimental-strip-types scripts/indexnow.mjs
//   DRY_RUN=1 …   lists the pages without notifying anyone
const { INDEXNOW_KEY, SITE_DOMAIN } = await import("../src/data/domains.ts");

const site = `https://${SITE_DOMAIN}`;
const since = process.env.SINCE ?? new Date().toISOString().slice(0, 10);

const sitemap = await (await fetch(`${site}/sitemap.xml`)).text();
const changed = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)]
  .map(([, entry]) => ({ url: entry.match(/<loc>(.*?)<\/loc>/)[1], lastmod: entry.match(/<lastmod>(.*?)<\/lastmod>/)?.[1] ?? "" }))
  .filter((page) => page.lastmod.slice(0, 10) >= since)
  .map((page) => page.url);

console.log(`${changed.length} page(s) changed since ${since}:`);
for (const url of changed) console.log(`  ${url}`);
if (changed.length === 0 || process.env.DRY_RUN) process.exit(0);

// IndexNow fetches this file to check the key; a missing one rejects the
// whole request, so fail here with a clearer message.
const keyLocation = `${site}/${INDEXNOW_KEY}.txt`;
const served = await (await fetch(keyLocation)).text();
if (served.trim() !== INDEXNOW_KEY) {
  console.error(`${keyLocation} doesn't serve the key: not deployed yet?`);
  process.exit(1);
}

// One shared endpoint: participating engines pass notifications on to each
// other, so Bing gets it even when another engine receives it.
const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: SITE_DOMAIN, key: INDEXNOW_KEY, keyLocation, urlList: changed }),
});
// 200 = received, 202 = received, key check pending (normal the first time).
console.log(`IndexNow answered ${response.status} ${response.statusText}`);
if (response.status !== 200 && response.status !== 202) {
  console.error(await response.text());
  process.exit(1);
}
