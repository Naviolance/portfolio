export type Service = {
  title: string;
  description: string;
  evidence: string;
};

export const services: Service[] = [
  {
    title: "Business websites",
    description:
      "Modern, responsive websites for businesses and organizations — built for speed, clarity and search visibility, not just visual polish.",
    evidence: "WordPress build: theastuteink.com",
  },
  {
    title: "E-commerce",
    description:
      "Product catalogs, cart and checkout, real payment integration, and the admin tooling a business actually needs to run the store day to day.",
    evidence: "TruckSpart — single-vendor store with Notch Pay checkout and a full admin panel",
  },
  {
    title: "Web applications",
    description:
      "Custom systems, dashboards, booking flows and management portals — the kind of software a specific business process needs, not a generic template.",
    evidence: "Car Rental — booking engine, driver-age policy enforcement, fleet admin panel",
  },
  {
    title: "WordPress",
    description:
      "Business websites, theme customization, and ongoing maintenance on WordPress where that's the right tool for the job.",
    evidence: "theastuteink.com",
  },
];
