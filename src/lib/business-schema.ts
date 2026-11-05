import type { Locale } from "@/i18n/routing";
import { site } from "@/data/site";

// The business, for search engines and AI answer tools: JPFW Web Services as
// its own entity (not only "where Priestly works"), with where it is, where
// it works and its listings. One @id everywhere, so every page that mentions
// it (homepage, service pages, the Person's worksFor) adds to the same entity.
export const businessId = `${site.url}/#business`;
export const websiteId = `${site.url}/#website`;

// Cameroon first, then Central and West Africa (French- and English-speaking
// markets alike), then clients anywhere. Used by the business and by every
// Service.
export const areaServed = [
  { "@type": "Country", name: "Cameroon" },
  { "@type": "Place", name: "Central Africa" },
  { "@type": "Place", name: "West Africa" },
  "Worldwide",
];

const logo = `${site.url}/brand/jpfw-logo-512.png`;

export function businessSchema(locale: Locale) {
  return {
    // A LocalBusiness type: a real business in Douala, without a shop front
    // (no street address: the work happens at clients' places and remotely).
    "@type": "ProfessionalService",
    "@id": businessId,
    name: site.brand,
    alternateName: site.shortBrand,
    description: site.description[locale],
    url: site.url,
    logo,
    image: logo,
    email: site.email,
    telephone: site.whatsapp.display,
    address: { "@type": "PostalAddress", addressLocality: "Douala", addressCountry: "CM" },
    areaServed,
    founder: { "@id": `${site.url}/#person` },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: site.email,
      telephone: site.whatsapp.display,
      availableLanguage: ["English", "French"],
    },
    sameAs: [site.sortlist],
  };
}

// The site itself, so search engines know its name ("JPFW Web Services",
// short "JPFW"). Google reads this on the homepage for the site name it
// shows in results.
export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    url: site.url,
    name: site.brand,
    alternateName: site.shortBrand,
    inLanguage: ["en", "fr"],
    publisher: { "@id": businessId },
  };
}
