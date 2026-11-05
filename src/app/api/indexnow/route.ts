import sitemap from "@/app/sitemap";
import { INDEXNOW_KEY, SITE_DOMAIN } from "@/data/domains";

// Tells IndexNow (Bing, and through it ChatGPT search and Copilot; also
// Yandex, Seznam, Naver) which pages changed, so they re-read them within
// hours. Google doesn't use IndexNow: the sitemap's dates do that job there.
//
// Called once a day by Vercel Cron (vercel.json), on the live deployment, so
// the pages are already online when crawlers come. Sends only changed pages:
// sitemap entries dated yesterday or today (CI's check:dates keeps those
// dates honest). A page may be sent on two days in a row; IndexNow accepts
// that, and it's better than missing one.
//
// Protected: Vercel Cron sends "Authorization: Bearer <CRON_SECRET>", set in
// the Vercel project's environment variables. Without that variable the
// route refuses everything. With the secret, by hand:
//   ?since=YYYY-MM-DD   another start date (e.g. to resend everything)
//   ?dry=1              list the pages without notifying anyone

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  const params = new URL(request.url).searchParams;
  const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);
  const since = params.get("since") ?? yesterday;
  const urls = sitemap()
    .filter((page) => String(page.lastModified ?? "").slice(0, 10) >= since)
    .map((page) => page.url);

  if (urls.length === 0 || params.get("dry")) {
    return Response.json({ since, sent: false, urls });
  }

  // One shared endpoint: participating engines pass notifications on to
  // each other. IndexNow checks the key against public/<key>.txt.
  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: SITE_DOMAIN,
      key: INDEXNOW_KEY,
      keyLocation: `https://${SITE_DOMAIN}/${INDEXNOW_KEY}.txt`,
      urlList: urls,
    }),
  });
  // 200 = received; 202 = received, key check pending (normal the first time).
  const ok = response.status === 200 || response.status === 202;
  console.log(`IndexNow: ${urls.length} page(s) since ${since}, answered ${response.status}`);
  return Response.json({ since, sent: ok, status: response.status, urls }, { status: ok ? 200 : 502 });
}
