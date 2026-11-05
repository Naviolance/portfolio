// Analytics consent: GA4 runs through Google Tag Manager with Google Consent
// Mode, so nothing is recorded until the visitor accepts in <CookieBanner>.
// The choice is kept in this browser only (localStorage), never sent to us.

export const GTM_ID = "GTM-NFMQQNFF";

export type ConsentChoice = "granted" | "denied";

const KEY = "analytics-consent";

// Dispatched by the footer's "Cookie settings" link to reopen the banner.
export const CONSENT_OPEN_EVENT = "consent:open";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

// Inlined first in <head> (SiteShell), before GTM loads after hydration:
// every signal starts denied (Consent Mode v2), and a visitor who already
// accepted gets analytics back on this page view. Ads signals are never
// granted: GA4 is the only tag. gtag() must push `arguments`, not an array,
// or Google ignores the command.
export const consentDefaultScript = `window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments)};gtag("consent","default",{ad_storage:"denied",ad_user_data:"denied",ad_personalization:"denied",analytics_storage:"denied",wait_for_update:500});try{if(localStorage.getItem("${KEY}")==="granted")gtag("consent","update",{analytics_storage:"granted"})}catch(e){}`;

// localStorage can throw (private windows, blocked site data): treat that as
// "not chosen yet", so the banner asks again rather than breaking the page.
export function readConsent(): ConsentChoice | null {
  try {
    const value = localStorage.getItem(KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function saveConsent(choice: ConsentChoice) {
  try {
    localStorage.setItem(KEY, choice);
  } catch {}
  window.gtag?.("consent", "update", { analytics_storage: choice });
  // Taking consent back also removes what GA4 already stored (_ga, _ga_*).
  if (choice === "denied") {
    for (const name of document.cookie.split("; ").map((c) => c.split("=")[0])) {
      if (!name.startsWith("_ga")) continue;
      for (const domain of ["", `; domain=.${location.hostname}`]) {
        document.cookie = `${name}=; max-age=0; path=/${domain}`;
      }
    }
  }
}
