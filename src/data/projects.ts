import type { StaticImageData } from "next/image";
import truckpartsHome from "@/assets/screenshots/truckparts/home.png";
import truckpartsListing from "@/assets/screenshots/truckparts/listing.png";
import truckpartsDetail from "@/assets/screenshots/truckparts/detail.png";
import truckpartsFindMyPart from "@/assets/screenshots/truckparts/find-my-part.png";
import truckpartsCart from "@/assets/screenshots/truckparts/cart.png";
import truckpartsCheckout from "@/assets/screenshots/truckparts/checkout.png";
import truckpartsOrderTracking from "@/assets/screenshots/truckparts/order-tracking.png";
import truckpartsAdminProducts from "@/assets/screenshots/truckparts/admin-products.png";
import truckpartsAdminOrders from "@/assets/screenshots/truckparts/admin-orders.png";
import carRentalHome from "@/assets/screenshots/car-rental/home.png";
import carRentalFindMyCar from "@/assets/screenshots/car-rental/find-my-car.png";
import carRentalListing from "@/assets/screenshots/car-rental/listing.png";
import carRentalDetail from "@/assets/screenshots/car-rental/detail.png";
import carRentalBooking from "@/assets/screenshots/car-rental/booking.png";
import carRentalConfirmation from "@/assets/screenshots/car-rental/confirmation.png";
import carRentalAdminCars from "@/assets/screenshots/car-rental/admin-cars.png";
import carRentalAdminBookings from "@/assets/screenshots/car-rental/admin-bookings.png";

export type TechStackEntry = {
  layer: string;
  choice: string;
  why: string;
};

export type ScreenshotSlot = {
  key: string;
  label: string;
  // Static imports: Next hashes the file name (so it can be cached forever),
  // reads the real width/height, and generates a blur placeholder.
  src: StaticImageData;
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
    slug: "truckparts",
    title: "TruckParts",
    category: "Automotive / E-commerce",
    status: "live-demo",
    summary:
      "An online store for truck spare parts. Customers can check that a part fits their truck, pay online or at pickup, and track their order. The owner runs everything from an admin panel that also works on a phone.",
    problem:
      "A truck parts seller needs more than a list of products. Customers need to know a part fits their truck before they buy. Payments have to be real, not a fake button. And if two people try to buy the last unit at the same time, only one of them should get it. A basic store template doesn't handle any of this.",
    solution:
      "I built the whole store, frontend and backend. The storefront is in Next.js. It has a \"Find My Part\" search, a cart, and two ways to pay: online with Notch Pay, or cash at pickup. It also has order tracking, coupons and reviews. Behind it is a NestJS API that handles products, orders and payments for the admin side.",
    keyFeatures: [
      "\"Find My Part\" search: customers filter parts by the truck they own",
      "Real payments with Notch Pay. Every webhook is checked with an HMAC-SHA256 signature, and if a webhook is late, the backend asks Notch Pay for the payment status directly",
      "Safe checkout: stock is reserved with one conditional UPDATE inside a transaction, so two customers can't both buy the last unit",
      "Access tokens stay in memory, never in localStorage. The session lives in an httpOnly refresh cookie, protected by a CSRF token",
      "Passed an axe-core accessibility audit: landmarks, labeled navigation and WCAG AA color contrast",
      "The admin panel works on phones too. On small screens, lists show as cards instead of tables you have to scroll sideways",
      "English and French with next-intl. The language is saved in a cookie, not in the URL",
      "Prices in XAF, a currency with no decimals. Every amount is a whole number, so there are no rounding errors",
      "Product images are converted to WebP and resized on upload, then served through the backend so the storage is never exposed",
    ],
    techStack: [
      { layer: "Frontend", choice: "Next.js + TypeScript + Tailwind", why: "One codebase for the store and the admin panel. Server components where they help, and no separate app to host." },
      { layer: "Backend", choice: "NestJS + TypeScript", why: "One module per area (auth, orders, payments, uploads...). Easier to test and maintain than one big Express app." },
      { layer: "Database", choice: "PostgreSQL + Prisma", why: "Orders, stock and payments have to stay correct. A relational database is the right tool for that." },
      { layer: "Object storage", choice: "MinIO (S3-compatible)", why: "Works like Amazon S3 but runs locally, so no cloud account is needed during development." },
      { layer: "Auth", choice: "JWT + httpOnly refresh cookie", why: "The short-lived token stays in memory, where injected scripts can't read it. The longer session is in a cookie JavaScript can't touch." },
      { layer: "Payments", choice: "Notch Pay", why: "Hosted checkout and webhooks, with mobile money support for Central Africa." },
    ],
    challenges: [
      "Stopping overselling. Reading the stock and then updating it can race, so checkout runs one UPDATE ... WHERE quantity >= requested inside a transaction instead.",
      "Webhooks don't always arrive on time. When an order stays pending, the backend checks the payment status with Notch Pay's API instead of just waiting.",
      "Adding accessibility after the first build. I ran an axe-core audit and fixed what it found: missing landmarks, unlabeled navigation and low color contrast.",
      "Making the admin panel usable on a phone. I rebuilt every list as cards on small screens, instead of a table that scrolls sideways.",
    ],
    outcome:
      "It's live as a demo on Vercel. With the test accounts you can go through the whole flow: browse, check a part fits, add to cart, pay online or at pickup, confirm the payment, track the order, and handle it from the admin side. Payments run on Notch Pay's sandbox, so no real money is charged.",
    liveUrl: "https://truck-spare-part-store-frontend.vercel.app",
    githubUrl: "https://github.com/Naviolance/Truck-spare-part-store",
    screenshots: [
      { key: "home", label: "Homepage", src: truckpartsHome },
      { key: "listing", label: "Product listing", src: truckpartsListing },
      { key: "detail", label: "Product page", src: truckpartsDetail },
      { key: "find-my-part", label: "Find My Part search", src: truckpartsFindMyPart },
      { key: "cart", label: "Cart", src: truckpartsCart },
      { key: "checkout", label: "Checkout", src: truckpartsCheckout },
      { key: "order-tracking", label: "Order tracking", src: truckpartsOrderTracking },
      { key: "admin-products", label: "Admin: products", src: truckpartsAdminProducts },
      { key: "admin-orders", label: "Admin: orders", src: truckpartsAdminOrders },
    ],
  },
  {
    slug: "car-rental",
    title: "Car Rental",
    category: "Vehicle Rental / Business App",
    status: "live-demo",
    summary:
      "A car rental booking site. Customers search for a car by dates and type, then book it by the day. Staff manage the cars and bookings from an admin panel.",
    problem:
      "A car rental business needs customers to see which cars are free for their dates and book them. The price shouldn't change after someone has booked. The minimum driver age has to be checked the same way everywhere. And staff need a simple way to manage cars and bookings.",
    solution:
      "I built a Next.js app with a \"find my car\" search wizard, a page for each car with reviews, and a booking flow that checks the driver's age and books by the day. After booking, customers see a real confirmation screen. Staff get an admin panel for the cars and bookings.",
    keyFeatures: [
      "Search cars by category, transmission and fuel type, or use the step-by-step \"find my car\" wizard",
      "Book by the day with a date picker. The total price is saved when you book, so if the daily rate changes later, your booking stays the same",
      "Drivers must be 18 or older. This is checked in the search, the booking form and the admin view",
      "Sign in with Google or with email and password (hashed with bcrypt), all through Auth.js",
      "Only customers who completed a booking can leave a review, and only one per booking",
      "Admin panel for cars and bookings. A car that has bookings can't be deleted, only archived, so the booking history is kept",
      "A real confirmation screen after booking, not just a redirect to the homepage",
      "Forms and admin pages work on mobile, including fixes for date fields breaking the layout on iOS Safari",
      "Proper link previews: sharing the site on social media shows a card with the title and an image",
    ],
    techStack: [
      { layer: "Frontend", choice: "Next.js 16 (App Router) + TypeScript + Tailwind v4", why: "Server components for pages with lots of data, like car lists and bookings. Client components only where the user interacts." },
      { layer: "Database", choice: "PostgreSQL (Supabase) + Prisma 7", why: "Cars, bookings and reviews are all linked, so a relational database fits. Prisma gives typed queries instead of raw SQL." },
      { layer: "Auth", choice: "Auth.js (NextAuth v5)", why: "One system for Google sign-in and email/password. The Prisma adapter saves users and sessions in the database." },
      { layer: "Animation", choice: "Motion", why: "Used in the booking flow where it helps, not on every element." },
      { layer: "Hosting", choice: "Vercel", why: "Made for Next.js, with no server to manage." },
    ],
    challenges: [
      "Keeping prices fair. The total price is calculated and saved when the booking is made, instead of being recalculated from the car's current rate.",
      "Keeping booking history. A car with bookings can't be deleted (onDelete: Restrict). Archiving is the normal way to remove a car, so admins don't run into errors.",
      "Mobile took several rounds of fixes: date fields overlapping the time dropdown, search fields that needed to stack full width, and an overflow bug that only showed up on iOS Safari.",
      "Builds were failing on Vercel because the Prisma client wasn't generated. I fixed it by generating the client on install.",
      "Auth.js only trusts the Host header automatically on Vercel and Cloudflare. On other hosts you have to allow it yourself, and that's a security decision, not a setting to switch on without thinking.",
    ],
    outcome:
      "It's live as a working demo on Vercel, with a real Postgres database. The full flow works: search, book, confirm, and manage cars and bookings as an admin. The site says clearly that it's a portfolio demo, not a real rental business.",
    liveUrl: "https://car-rental-xi-lemon.vercel.app",
    githubUrl: "https://github.com/Naviolance/car-rental",
    screenshots: [
      { key: "home", label: "Homepage", src: carRentalHome },
      { key: "find-my-car", label: "Find my car wizard", src: carRentalFindMyCar },
      { key: "listing", label: "Car list with filters", src: carRentalListing },
      { key: "detail", label: "Car page", src: carRentalDetail },
      { key: "booking", label: "Booking form", src: carRentalBooking },
      { key: "confirmation", label: "Booking confirmed", src: carRentalConfirmation },
      { key: "admin-cars", label: "Admin: cars", src: carRentalAdminCars },
      { key: "admin-bookings", label: "Admin: bookings", src: carRentalAdminBookings },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
