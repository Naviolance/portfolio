import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { PROCESS_PATH } from "./src/data/page-paths";
import { OLD_DOMAINS, SITE_DOMAIN } from "./src/data/domains";

// Points next-intl at src/i18n/request.ts (its default location).
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  experimental: {
    // app/global-not-found.tsx: the 404 page, rendered on the server. With
    // the root layout under [locale], a [locale]/not-found.tsx is only
    // rendered in the browser (blank until JavaScript loads), so there is
    // deliberately none: unknown addresses match no route and land here.
    globalNotFound: true,
  },
  // Translated addresses (data/page-paths.ts) exist as one folder per
  // language, so the other language's folder also answers: /fr/how-i-work.
  // Send it to the right address with a permanent (308) redirect, before
  // anything renders.
  //
  // A former address (data/domains.ts) sends every page to the same page on
  // the real domain, query string included (?ref= links keep their source).
  // Matched on the Host header, so preview deployments are untouched.
  async redirects() {
    return [
      ...OLD_DOMAINS.map((host) => ({
        source: "/:path*",
        has: [{ type: "host" as const, value: host }],
        destination: `https://${SITE_DOMAIN}/:path*`,
        permanent: true,
      })),
      { source: `/fr${PROCESS_PATH.en}`, destination: `/fr${PROCESS_PATH.fr}`, permanent: true },
      { source: `/en${PROCESS_PATH.fr}`, destination: `/en${PROCESS_PATH.en}`, permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
