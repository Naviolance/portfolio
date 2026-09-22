export type Service = {
  title: string;
  description: string;
  evidence: string;
};

export const services: Service[] = [
  {
    title: "Business websites",
    description:
      "Websites for businesses and organizations. They load fast, work well on phones and are easy to find on Google.",
    evidence: "WordPress site: theastuteink.com",
  },
  {
    title: "E-commerce",
    description:
      "Online stores with a product catalog, cart, checkout and real payments. Plus the admin tools you need to run the store every day.",
    evidence: "TruckParts: truck parts store with Notch Pay checkout and a full admin panel",
  },
  {
    title: "Web applications",
    description:
      "Custom tools built around how your business works: dashboards, booking systems and management portals.",
    evidence: "Car Rental: booking system, driver age rules and an admin panel for the cars",
  },
  {
    title: "WordPress",
    description:
      "Business websites, theme changes and ongoing maintenance, when WordPress is the better choice for the project.",
    evidence: "theastuteink.com",
  },
];
