export type TechStackEntry = {
  layer: string;
  choice: string;
  why: string;
};

export type ScreenshotSlot = {
  key: string;
  label: string;
  src: string;
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  status: "live-demo";
  summary: string;
  problem: string;
  solution: string;
  keyFeatures: string[];
  techStack: TechStackEntry[];
  challenges: string[];
  outcome: string;
  liveUrl: string;
  githubUrl: string;
  screenshots: ScreenshotSlot[];
};

export const projects: Project[] = [
  {
    slug: "truckspart",
    title: "TruckSpart",
    category: "Automotive / E-commerce / Marketplace",
    status: "live-demo",
    summary:
      "A single-vendor e-commerce store for truck spare parts, with a vehicle-compatibility search, real payment integration, and a mobile-ready admin panel.",
    problem:
      "A truck spare-parts seller needs more than a static catalog: customers need to confirm a part actually fits their specific vehicle before buying, payment has to be real (not a mock button), and stock can't be oversold when two customers race for the last unit. None of that is solved by a generic storefront template.",
    solution:
      "A full-stack store built end to end: a Next.js storefront with a \"Find My Part\" vehicle-compatibility search, cart and two checkout paths (online via Notch Pay or cash-at-pickup), order tracking, coupons and reviews, plus a NestJS admin API covering the full catalog and order lifecycle.",
    keyFeatures: [
      "Vehicle-compatibility search (\"Find My Part\") so customers can filter parts by the vehicle they actually own",
      "Real payment integration: Notch Pay hosted checkout, HMAC-SHA256-verified webhook over the raw request body, plus active reconciliation against Notch Pay's API for orders whose webhook hasn't arrived yet",
      "Concurrency-safe checkout: stock is reserved with a single conditional UPDATE inside a database transaction, so two customers can't both win the last unit",
      "JWT access tokens kept in memory (never localStorage) with an httpOnly refresh cookie and CSRF double-submit token for session persistence",
      "Passed an axe-core accessibility audit: landmark roles, labeled navigation, WCAG AA color contrast",
      "Mobile-first admin panel — every list view (products, coupons, reviews) renders as a responsive card list instead of a sideways-scrolling table below the sm breakpoint",
      "EN/FR interface via next-intl, using a cookie rather than /en /fr URL prefixes",
      "Prices handled correctly in XAF, a zero-decimal currency — every amount is formatted and rounded as a whole number, never floating-point cents",
      "Uploaded product images are auto-converted to WebP and dimension-capped, then served through the backend rather than exposing object storage directly",
    ],
    techStack: [
      { layer: "Frontend", choice: "Next.js + TypeScript + Tailwind", why: "App Router serves the storefront and the admin panel from one codebase, with server components where they help and no separate SPA build to host." },
      { layer: "Backend", choice: "NestJS + TypeScript", why: "Structured, testable modules per domain (auth, orders, payments, uploads, ...) instead of a flat Express app." },
      { layer: "Database", choice: "PostgreSQL + Prisma", why: "Relational integrity for orders, stock and payments, where correctness matters more than schema flexibility." },
      { layer: "Object storage", choice: "MinIO (S3-compatible)", why: "Same API shape as production S3, runs locally with zero cloud accounts needed for development." },
      { layer: "Auth", choice: "JWT + httpOnly refresh cookie", why: "Short-lived access token in memory (XSS can't read it), long-lived session in a cookie JS can't touch." },
      { layer: "Payments", choice: "Notch Pay", why: "Hosted checkout and webhooks, appropriate for mobile-money coverage in Central Africa." },
    ],
    challenges: [
      "Preventing overselling under concurrency: checkout uses a single conditional UPDATE ... WHERE quantity >= requested inside a transaction, instead of a read-then-write race.",
      "Payment webhooks aren't guaranteed to arrive promptly, so a still-pending order also gets actively reconciled against Notch Pay's own API rather than trusting the webhook alone.",
      "Retrofitting accessibility after the initial build: ran an axe-core audit pass and fixed landmark roles, unlabeled navigation, and color-contrast failures it flagged.",
      "The admin panel needed to be usable from a phone, not just a desktop: every list view was rebuilt as a responsive card list below the sm breakpoint instead of a horizontally-scrolling table.",
    ],
    outcome:
      "Deployed as a working sandbox demo on Vercel. The full order lifecycle — browse, compatibility-check, cart, checkout (online or cash-at-pickup), payment confirmation, order tracking, and admin fulfillment — runs end to end against seeded test accounts. No real payments are processed; the live demo runs against Notch Pay's sandbox environment.",
    liveUrl: "https://truck-spare-part-store-frontend.vercel.app",
    githubUrl: "https://github.com/Naviolance/Truck-spare-part-store",
    screenshots: [
      { key: "home", label: "Homepage", src: "/images/truckspart/home.png" },
      { key: "listing", label: "Product listing", src: "/images/truckspart/listing.png" },
      { key: "detail", label: "Product detail page", src: "/images/truckspart/detail.png" },
      { key: "find-my-part", label: "Find My Part (vehicle compatibility search)", src: "/images/truckspart/find-my-part.png" },
      { key: "cart", label: "Cart", src: "/images/truckspart/cart.png" },
      { key: "checkout", label: "Checkout", src: "/images/truckspart/checkout.png" },
      { key: "order-tracking", label: "Order tracking page", src: "/images/truckspart/order-tracking.png" },
      { key: "admin-products", label: "Admin — product list", src: "/images/truckspart/admin-products.png" },
      { key: "admin-orders", label: "Admin — order management", src: "/images/truckspart/admin-orders.png" },
    ],
  },
  {
    slug: "car-rental",
    title: "Car Rental",
    category: "Vehicle Rental / Business Application",
    status: "live-demo",
    summary:
      "A car rental booking platform: search the fleet by dates and category, book by the day, and manage the fleet and bookings from an admin panel.",
    problem:
      "A car rental operator needs customers to search a live fleet by availability and category, book with pricing that can't be silently altered after the fact, and enforce basic policy (a minimum driver age) consistently everywhere it applies — while giving staff an admin view to manage cars and bookings.",
    solution:
      "A Next.js booking application with a find-my-car search wizard, per-car detail pages with reviews, a full booking flow that validates driver age and books by the day, a real confirmation screen on success, and an admin panel for managing the fleet and reviewing bookings.",
    keyFeatures: [
      "Search and browse the fleet by category, transmission and fuel type, with a dedicated find-my-car wizard",
      "Book by the day with a date-range picker; the total price is computed once at booking time and stored, so a later change to a car's daily rate never retroactively changes an existing booking",
      "Minimum driver age (18+) is enforced and carried through consistently: search, booking form, and the admin booking view",
      "Authentication via Auth.js: Google OAuth and email/password (bcrypt-hashed) in one system, JWT sessions",
      "Reviews are tied one-to-one to a completed booking, not left open to anyone",
      "Admin panel for cars and bookings; a car with existing bookings can't be hard-deleted (onDelete: Restrict) — it's archived (isActive) instead, preserving booking history",
      "A real \"Done\" confirmation screen after a successful booking, not just a redirect to the homepage",
      "Responsive booking forms and admin views, including explicit fixes for date/time fields overlapping or overflowing on mobile and iOS Safari",
      "Open Graph and Twitter card metadata so a shared link renders a proper preview instead of a blank card",
    ],
    techStack: [
      { layer: "Frontend", choice: "Next.js 16 (App Router) + TypeScript + Tailwind v4", why: "Server components for data-heavy pages (car listings, bookings) with client components only where interaction demands it." },
      { layer: "Database", choice: "PostgreSQL (Supabase) + Prisma 7", why: "Relational integrity for cars, bookings and reviews, with Prisma's typed client over hand-written SQL." },
      { layer: "Auth", choice: "Auth.js (NextAuth v5)", why: "One system for Google OAuth and email/password, with the Prisma adapter persisting users/accounts/sessions." },
      { layer: "Animation", choice: "Motion", why: "Used for the interactive booking flow, not as decoration on every element." },
      { layer: "Hosting", choice: "Vercel", why: "Matches the Next.js deployment model with zero server management." },
    ],
    challenges: [
      "Keeping booking prices honest: a booking's totalPrice is computed and frozen at booking time instead of being derived live from the car's current daily rate.",
      "Protecting booking history: a car with existing bookings can't be deleted outright (onDelete: Restrict) — archiving (isActive) is the normal admin path instead of an edge case admins would hit as an error.",
      "Mobile usability took several dedicated passes: pick-up/return date fields overlapping their time dropdown, search-form fields needing to stack full-width, and an iOS-Safari-specific overflow on the booking page that didn't reproduce elsewhere.",
      "Vercel builds were failing because the Prisma client wasn't generated at build time — fixed by generating it on install.",
      "Auth.js only trusts the request's Host header automatically on Vercel/Cloudflare — any other production host needed that trust set explicitly, which is a real security trade-off, not a default to flip blindly.",
    ],
    outcome:
      "Deployed as a fully working demo on Vercel, backed by a live Postgres database. The entire booking lifecycle — search, book, confirm, and admin management of cars and bookings — runs end to end. The app is explicit in its own metadata that this is a portfolio demo, not a live commercial rental business.",
    liveUrl: "https://car-rental-xi-lemon.vercel.app",
    githubUrl: "https://github.com/Naviolance/car-rental",
    screenshots: [
      { key: "home", label: "Homepage", src: "/images/car-rental/home.png" },
      { key: "find-my-car", label: "Find-my-car search wizard", src: "/images/car-rental/find-my-car.png" },
      { key: "listing", label: "Fleet listing with filters", src: "/images/car-rental/listing.png" },
      { key: "detail", label: "Car detail page", src: "/images/car-rental/detail.png" },
      { key: "booking", label: "Booking form (dates, driver age)", src: "/images/car-rental/booking.png" },
      { key: "confirmation", label: "Booking confirmation screen", src: "/images/car-rental/confirmation.png" },
      { key: "admin-cars", label: "Admin — car management", src: "/images/car-rental/admin-cars.png" },
      { key: "admin-bookings", label: "Admin — booking management", src: "/images/car-rental/admin-bookings.png" },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
