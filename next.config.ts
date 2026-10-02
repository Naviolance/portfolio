import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

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
};

export default withNextIntl(nextConfig);
