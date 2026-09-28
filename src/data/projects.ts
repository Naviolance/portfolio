import type { StaticImageData } from "next/image";
import type { Localized } from "@/lib/localized";
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
import pharmapHome from "@/assets/screenshots/pharmap/home.png";
import pharmapSearch from "@/assets/screenshots/pharmap/search.png";
import pharmapAvailability from "@/assets/screenshots/pharmap/availability.png";
import pharmapPharmacy from "@/assets/screenshots/pharmap/pharmacy.png";
import pharmapRegisterLocation from "@/assets/screenshots/pharmap/register-location.png";
import pharmapRegisterInfo from "@/assets/screenshots/pharmap/register-info.png";
import pharmapPharmacyHome from "@/assets/screenshots/pharmap/pharmacy-home.png";
import pharmapAdminVerification from "@/assets/screenshots/pharmap/admin-verification.png";

export type TechStackEntry = {
  layer: Localized;
  choice: string; // tech names read the same in every language
  why: Localized;
};

export type ScreenshotSlot = {
  key: string;
  label: Localized; // short caption: "Checkout"
  // What the screen shows, for screen readers and Google Images. Describes
  // the picture only; no tech stack or keywords.
  alt: Localized;
  // Static imports: Next hashes the file name (so it can be cached forever),
  // reads the real width/height, and generates a blur placeholder.
  src: StaticImageData;
};

export type Project = {
  slug: string;
  title: string;
  category: Localized;
  status: "live-demo";
  summary: Localized;
  problem: Localized;
  solution: Localized;
  keyFeatures: Localized[];
  techStack: TechStackEntry[];
  challenges: Localized[];
  outcome: Localized;
  liveUrl: string;
  // Omitted for projects whose code is private: the site then shows
  // "Private repository, available on request" instead of a GitHub link.
  githubUrl?: string;
  // Optional pointer to a way into the live demo's admin side (shown under
  // the Live demo button on the project page).
  demoNote?: { text: Localized; href: string; linkLabel: Localized };
  screenshots: ScreenshotSlot[];
  // Homepage "Featured work" card: three short proofs of the engineering,
  // short tech tags, and the screenshot keys shown there (first = cover).
  highlights: Localized[];
  tags: string[];
  showcase: string[];
};

export const projects: Project[] = [
  {
    slug: "truckparts",
    title: "TruckParts",
    category: { en: "Automotive / E-commerce", fr: "Automobile / E-commerce" },
    status: "live-demo",
    summary: {
      en: "An online store for truck spare parts. Customers can check that a part fits their truck, pay online or at pickup, and track their order. The owner runs everything from an admin panel that also works on a phone.",
      fr: "Une boutique en ligne de pièces de camion. Les clients vérifient qu'une pièce va sur leur camion, paient en ligne ou au retrait, et suivent leur commande. Le propriétaire gère tout depuis un espace d'administration qui marche aussi sur téléphone.",
    },
    problem: {
      en: "A truck parts seller needs more than a list of products. Customers need to know a part fits their truck before they buy. Payments have to be real, not a fake button. And if two people try to buy the last unit at the same time, only one of them should get it. A basic store template doesn't handle any of this.",
      fr: "Un vendeur de pièces de camion a besoin de plus qu'une liste de produits. Les clients doivent savoir qu'une pièce va sur leur camion avant d'acheter. Les paiements doivent être réels, pas un faux bouton. Et si deux personnes achètent la dernière pièce en même temps, une seule doit l'avoir. Un modèle de boutique basique ne gère rien de tout ça.",
    },
    solution: {
      en: "I built the whole store, frontend and backend. The storefront is in Next.js. It has a \"Find My Part\" search, a cart, and two ways to pay: online with Notch Pay, or cash at pickup. It also has order tracking, coupons and reviews. Behind it is a NestJS API that handles products, orders and payments for the admin side.",
      fr: "J'ai construit toute la boutique, frontend et backend. La vitrine est en Next.js. Elle a une recherche « Find My Part », un panier et deux façons de payer : en ligne avec Notch Pay, ou en espèces au retrait. Il y a aussi le suivi des commandes, les codes promo et les avis. Derrière, une API NestJS gère les produits, les commandes et les paiements pour l'administration.",
    },
    keyFeatures: [
      {
        en: "\"Find My Part\" search: customers filter parts by the truck they own",
        fr: "Recherche « Find My Part » : les clients filtrent les pièces selon leur camion",
      },
      {
        en: "Real payments with Notch Pay. Every webhook is checked with an HMAC-SHA256 signature, and if a webhook is late, the backend asks Notch Pay for the payment status directly",
        fr: "Vrais paiements avec Notch Pay. Chaque webhook est vérifié avec une signature HMAC-SHA256, et si un webhook arrive en retard, le backend demande directement le statut du paiement à Notch Pay",
      },
      {
        en: "Safe checkout: stock is reserved with one conditional UPDATE inside a transaction, so two customers can't both buy the last unit",
        fr: "Paiement sûr : le stock est réservé avec un seul UPDATE conditionnel dans une transaction, donc deux clients ne peuvent pas acheter la dernière pièce",
      },
      {
        en: "Access tokens stay in memory, never in localStorage. The session lives in an httpOnly refresh cookie, protected by a CSRF token",
        fr: "Les jetons d'accès restent en mémoire, jamais dans le localStorage. La session est dans un cookie httpOnly, protégé par un jeton CSRF",
      },
      {
        en: "Passed an axe-core accessibility audit: landmarks, labeled navigation and WCAG AA color contrast",
        fr: "Audit d'accessibilité axe-core réussi : repères de page, navigation étiquetée et contrastes de couleur WCAG AA",
      },
      {
        en: "The admin panel works on phones too. On small screens, lists show as cards instead of tables you have to scroll sideways",
        fr: "L'administration marche aussi sur téléphone. Sur petit écran, les listes s'affichent en cartes au lieu de tableaux à faire défiler sur le côté",
      },
      {
        en: "English and French with next-intl. The language is saved in a cookie, not in the URL",
        fr: "Anglais et français avec next-intl. La langue est gardée dans un cookie, pas dans l'URL",
      },
      {
        en: "Prices in XAF, a currency with no decimals. Every amount is a whole number, so there are no rounding errors",
        fr: "Prix en FCFA, une monnaie sans centimes. Chaque montant est un nombre entier, donc pas d'erreurs d'arrondi",
      },
      {
        en: "Product images are converted to WebP and resized on upload, then served through the backend so the storage is never exposed",
        fr: "Les images des produits sont converties en WebP et redimensionnées à l'envoi, puis servies par le backend pour ne jamais exposer le stockage",
      },
      {
        en: "A read-only demo admin, so anyone can explore the admin panel. It's enforced in the backend: the account's token carries a demo flag, and one global NestJS interceptor rejects every change it tries to make",
        fr: "Un compte admin de démo en lecture seule, pour que chacun puisse explorer l'administration. C'est le backend qui l'impose : le jeton du compte porte un indicateur « démo », et un intercepteur NestJS global refuse chaque modification",
      },
    ],
    techStack: [
      {
        layer: { en: "Frontend", fr: "Frontend" },
        choice: "Next.js + TypeScript + Tailwind",
        why: {
          en: "One codebase for the store and the admin panel. Server components where they help, and no separate app to host.",
          fr: "Un seul code pour la boutique et l'administration. Des server components là où ils aident, et pas d'application séparée à héberger.",
        },
      },
      {
        layer: { en: "Backend", fr: "Backend" },
        choice: "NestJS + TypeScript",
        why: {
          en: "One module per area (auth, orders, payments, uploads...). Easier to test and maintain than one big Express app.",
          fr: "Un module par domaine (auth, commandes, paiements, images...). Plus facile à tester et à maintenir qu'une grosse application Express.",
        },
      },
      {
        layer: { en: "Database", fr: "Base de données" },
        choice: "PostgreSQL + Prisma",
        why: {
          en: "Orders, stock and payments have to stay correct. A relational database is the right tool for that.",
          fr: "Les commandes, le stock et les paiements doivent rester justes. Une base relationnelle est le bon outil pour ça.",
        },
      },
      {
        layer: { en: "Object storage", fr: "Stockage des fichiers" },
        choice: "MinIO locally, Backblaze B2 in production",
        why: {
          en: "Both speak the Amazon S3 protocol, so the same code works on my machine (no cloud account needed) and in production. Switching is only settings.",
          fr: "Les deux utilisent le protocole Amazon S3, donc le même code marche en local (sans compte cloud) et en production. Changer ne demande que des réglages.",
        },
      },
      {
        layer: { en: "Auth", fr: "Authentification" },
        choice: "JWT + httpOnly refresh cookie",
        why: {
          en: "The short-lived token stays in memory, where injected scripts can't read it. The longer session is in a cookie JavaScript can't touch.",
          fr: "Le jeton de courte durée reste en mémoire, où un script injecté ne peut pas le lire. La session plus longue est dans un cookie que JavaScript ne peut pas toucher.",
        },
      },
      {
        layer: { en: "Payments", fr: "Paiements" },
        choice: "Notch Pay",
        why: {
          en: "Hosted checkout and webhooks, with mobile money support for Central Africa.",
          fr: "Page de paiement hébergée et webhooks, avec le Mobile Money pour l'Afrique centrale.",
        },
      },
    ],
    challenges: [
      {
        en: "Stopping overselling. Reading the stock and then updating it can race, so checkout runs one UPDATE ... WHERE quantity >= requested inside a transaction instead.",
        fr: "Éviter de vendre plus que le stock. Lire le stock puis le modifier peut créer un conflit, donc le paiement lance un seul UPDATE ... WHERE quantity >= demandé dans une transaction.",
      },
      {
        en: "Webhooks don't always arrive on time. When an order stays pending, the backend checks the payment status with Notch Pay's API instead of just waiting.",
        fr: "Les webhooks n'arrivent pas toujours à temps. Quand une commande reste en attente, le backend vérifie le statut du paiement auprès de l'API Notch Pay au lieu d'attendre.",
      },
      {
        en: "Adding accessibility after the first build. I ran an axe-core audit and fixed what it found: missing landmarks, unlabeled navigation and low color contrast.",
        fr: "Ajouter l'accessibilité après la première version. J'ai lancé un audit axe-core et corrigé ce qu'il a trouvé : repères manquants, navigation sans étiquette et contrastes trop faibles.",
      },
      {
        en: "Making the admin panel usable on a phone. I rebuilt every list as cards on small screens, instead of a table that scrolls sideways.",
        fr: "Rendre l'administration utilisable sur téléphone. J'ai refait chaque liste en cartes sur petit écran, au lieu d'un tableau qui défile sur le côté.",
      },
    ],
    outcome: {
      en: "It's live as a demo on Vercel. With the test accounts you can go through the whole flow: browse, check a part fits, add to cart, pay online or at pickup, confirm the payment, track the order, and handle it from the admin side. Payments run on Notch Pay's sandbox, so no real money is charged.",
      fr: "Elle est en ligne comme démo sur Vercel. Avec les comptes de test, on peut faire tout le parcours : parcourir, vérifier qu'une pièce va, ajouter au panier, payer en ligne ou au retrait, confirmer le paiement, suivre la commande et la traiter côté administration. Les paiements passent par le mode test de Notch Pay, donc aucun vrai argent n'est débité.",
    },
    liveUrl: "https://truck-spare-part-store-frontend.vercel.app",
    githubUrl: "https://github.com/Naviolance/Truck-spare-part-store",
    demoNote: {
      text: {
        en: "Want to see the admin panel? The login page has a read-only demo account you can use. Look around freely, nothing you do will change the store.",
        fr: "Envie de voir l'administration ? La page de connexion propose un compte de démo en lecture seule. Explorez librement, rien de ce que vous faites ne modifiera la boutique.",
      },
      href: "https://truck-spare-part-store-frontend.vercel.app/login",
      linkLabel: { en: "Go to the login page", fr: "Aller à la page de connexion" },
    },
    highlights: [
      {
        en: "Find My Part: customers filter parts by the truck they own",
        fr: "Find My Part : les clients filtrent les pièces selon leur camion",
      },
      {
        en: "Payments verified with signed webhooks (HMAC-SHA256)",
        fr: "Paiements vérifiés par webhooks signés (HMAC-SHA256)",
      },
      {
        en: "Stock reserved in one transaction, so the last unit sells once",
        fr: "Stock réservé en une transaction : la dernière pièce ne se vend qu'une fois",
      },
    ],
    tags: ["Next.js", "NestJS", "PostgreSQL", "Prisma", "Notch Pay"],
    showcase: ["home", "find-my-part", "checkout", "admin-orders"],
    screenshots: [
      {
        key: "home",
        label: { en: "Homepage", fr: "Page d'accueil" },
        alt: {
          en: "TruckParts homepage: “Truck parts that fit, without the guesswork”, with Find My Part and Browse all parts buttons",
          fr: "Page d'accueil de TruckParts : « Truck parts that fit, without the guesswork », avec les boutons Find My Part et Browse all parts",
        },
        src: truckpartsHome,
      },
      {
        key: "listing",
        label: { en: "Product listing", fr: "Liste des produits" },
        alt: {
          en: "TruckParts catalogue of truck parts with search, category, brand, condition and price filters",
          fr: "Catalogue de pièces de camion de TruckParts avec filtres de recherche, catégorie, marque, état et prix",
        },
        src: truckpartsListing,
      },
      {
        key: "detail",
        label: { en: "Product page", fr: "Page produit" },
        alt: {
          en: "TruckParts product page for an Eaton electrical part: photos, price in FCFA, stock, compatible trucks and Add to cart",
          fr: "Page produit TruckParts d'une pièce électrique Eaton : photos, prix en FCFA, stock, camions compatibles et bouton Ajouter au panier",
        },
        src: truckpartsDetail,
      },
      {
        key: "find-my-part",
        label: { en: "Find My Part search", fr: "Recherche Find My Part" },
        alt: {
          en: "Find My Part: choose the truck's manufacturer, model and year to see only the parts that fit it",
          fr: "Find My Part : choisir le constructeur, le modèle et l'année du camion pour ne voir que les pièces qui lui vont",
        },
        src: truckpartsFindMyPart,
      },
      {
        key: "cart",
        label: { en: "Cart", fr: "Panier" },
        alt: {
          en: "TruckParts cart with a Detroit Diesel transmission, quantity, subtotal in FCFA and Checkout button",
          fr: "Panier TruckParts avec une transmission Detroit Diesel, la quantité, le sous-total en FCFA et le bouton de paiement",
        },
        src: truckpartsCart,
      },
      {
        key: "checkout",
        label: { en: "Checkout", fr: "Paiement" },
        alt: {
          en: "TruckParts checkout: coupon code, contact details, and a choice between paying online (mobile money or card) or cash at pickup",
          fr: "Paiement TruckParts : code promo, coordonnées, et choix entre payer en ligne (mobile money ou carte) ou en espèces au retrait",
        },
        src: truckpartsCheckout,
      },
      {
        key: "order-tracking",
        label: { en: "Order tracking", fr: "Suivi de commande" },
        alt: {
          en: "Order page after payment: “Payment confirmed”, order number, items, total and Paid status",
          fr: "Page de commande après paiement : « Paiement confirmé », numéro de commande, articles, total et statut payé",
        },
        src: truckpartsOrderTracking,
      },
      {
        key: "admin-products",
        label: { en: "Admin: products", fr: "Admin : produits" },
        alt: {
          en: "TruckParts admin product table with price, stock and published status, and a warning that an out-of-stock product is hidden from the store",
          fr: "Tableau des produits de l'administration TruckParts : prix, stock, statut publié, et une alerte indiquant qu'un produit en rupture est masqué de la boutique",
        },
        src: truckpartsAdminProducts,
      },
      {
        key: "admin-orders",
        label: { en: "Admin: orders", fr: "Admin : commandes" },
        alt: {
          en: "TruckParts admin order list with customer, date, total, payment status and a cancel-and-refund action",
          fr: "Liste des commandes de l'administration TruckParts : client, date, total, statut du paiement et action annuler et rembourser",
        },
        src: truckpartsAdminOrders,
      },
    ],
  },
  {
    slug: "pharmap",
    title: "PharMap",
    category: { en: "Health / Location-based web app", fr: "Santé / Application web géolocalisée" },
    status: "live-demo",
    summary: {
      en: "An app that helps people in Cameroon find a medicine: which nearby pharmacies have it in stock, at what price, and how fresh that information is. Pharmacies manage their own listings, and an admin verifies them.",
      fr: "Une application qui aide les gens au Cameroun à trouver un médicament : quelles pharmacies proches l'ont en stock, à quel prix, et à quel point l'information est récente. Les pharmacies gèrent leurs propres fiches, et un administrateur les vérifie.",
    },
    problem: {
      en: "When someone in Cameroon needs a medicine, they usually go from pharmacy to pharmacy or phone around. Stock information, where it exists at all, is often out of date, and there's no easy way to know which pharmacy to trust.",
      fr: "Quand quelqu'un au Cameroun a besoin d'un médicament, il va souvent de pharmacie en pharmacie ou appelle partout. L'information sur les stocks, quand elle existe, est souvent dépassée, et il n'y a pas de moyen simple de savoir à quelle pharmacie se fier.",
    },
    solution: {
      en: "I built PharMap as an installable web app (PWA) with a React frontend and a NestJS API. Patients search for a medicine and see which verified pharmacies have it, with the price and how recently the stock was updated. Pharmacies register themselves on a map and keep their inventory up to date. An admin verifies each pharmacy before it's shown as verified. It works in English and French.",
      fr: "J'ai construit PharMap comme une application web installable (PWA), avec un frontend React et une API NestJS. Les patients cherchent un médicament et voient quelles pharmacies vérifiées l'ont, avec le prix et la date de mise à jour du stock. Les pharmacies s'inscrivent elles-mêmes sur une carte et tiennent leur stock à jour. Un administrateur vérifie chaque pharmacie avant qu'elle apparaisse comme vérifiée. Elle fonctionne en français et en anglais.",
    },
    keyFeatures: [
      {
        en: "Search medicines by name, generic name or local brand name (e.g. Doliprane or Panadol for paracetamol)",
        fr: "Recherche de médicaments par nom, nom générique ou marque locale (par ex. Doliprane ou Panadol pour le paracétamol)",
      },
      {
        en: "See which pharmacies have a medicine, with the price in FCFA, the stock status and how fresh the data is (\"Reported 2 hours ago\", flagged after 14 days)",
        fr: "Voir quelles pharmacies ont un médicament, avec le prix en FCFA, l'état du stock et la fraîcheur de l'information (« Signalé il y a 2 heures », signalé après 14 jours)",
      },
      {
        en: "Pharmacies near me on a map (Leaflet + OpenStreetMap), with opening hours and \"open now\" on each pharmacy",
        fr: "Pharmacies proches sur une carte (Leaflet + OpenStreetMap), avec les horaires et « ouvert maintenant » pour chaque pharmacie",
      },
      {
        en: "Pharmacy registration in 3 steps: find the pharmacy on OpenStreetMap or drop a pin, add the details, review. The browser's Back button works at every step",
        fr: "Inscription d'une pharmacie en 3 étapes : la trouver sur OpenStreetMap ou placer un repère, ajouter les infos, vérifier. Le bouton Retour du navigateur marche à chaque étape",
      },
      {
        en: "Pharmacies manage their own stock: status, quantity and price for each medicine",
        fr: "Les pharmacies gèrent leur stock : état, quantité et prix pour chaque médicament",
      },
      {
        en: "Admin verification with a real state machine (pending, under review, verified, rejected, suspended) and an audit trail of who decided what",
        fr: "Vérification par un administrateur avec une vraie machine à états (en attente, en cours d'examen, vérifiée, refusée, suspendue) et un historique de qui a décidé quoi",
      },
      {
        en: "Restock notifications: a patient can ask to be told when an out-of-stock medicine is back at a pharmacy",
        fr: "Alertes de réapprovisionnement : un patient peut demander à être prévenu quand un médicament en rupture revient dans une pharmacie",
      },
      {
        en: "Ratings and reviews, and a way to report a wrong listing",
        fr: "Notes et avis, et un moyen de signaler une fiche erronée",
      },
      {
        en: "English and French, installable on a phone like an app, with a mobile bottom navigation that adapts to the account type",
        fr: "Français et anglais, installable sur un téléphone comme une application, avec une barre de navigation mobile qui s'adapte au type de compte",
      },
      {
        en: "Automated tests (unit and end-to-end) run on every push in CI",
        fr: "Tests automatisés (unitaires et de bout en bout) lancés à chaque push dans la CI",
      },
    ],
    techStack: [
      {
        layer: { en: "Frontend", fr: "Frontend" },
        choice: "React + TypeScript + Vite + Tailwind",
        why: {
          en: "A fast, installable PWA. It's an app people log into, so it doesn't need server rendering.",
          fr: "Une PWA rapide et installable. C'est une application où l'on se connecte, donc pas besoin de rendu serveur.",
        },
      },
      {
        layer: { en: "Maps", fr: "Cartes" },
        choice: "Leaflet + OpenStreetMap",
        why: {
          en: "Free, with no billing account or API key, and good place search for Cameroon.",
          fr: "Gratuit, sans compte de facturation ni clé API, avec une bonne recherche de lieux au Cameroun.",
        },
      },
      {
        layer: { en: "Backend", fr: "Backend" },
        choice: "NestJS + TypeScript",
        why: {
          en: "One module per area (auth, medicines, pharmacies, reviews, notifications), with role checks enforced on the server.",
          fr: "Un module par domaine (auth, médicaments, pharmacies, avis, notifications), avec les contrôles de rôle faits côté serveur.",
        },
      },
      {
        layer: { en: "Database", fr: "Base de données" },
        choice: "PostgreSQL (Neon) + Prisma",
        why: {
          en: "Pharmacies, stock, members and reviews are all linked, and stock updates need transactions.",
          fr: "Pharmacies, stocks, membres et avis sont tous liés, et les mises à jour de stock ont besoin de transactions.",
        },
      },
      {
        layer: { en: "Hosting", fr: "Hébergement" },
        choice: "Vercel + Render (Docker)",
        why: {
          en: "The web app on Vercel, the API on Render from its own Dockerfile. Free tiers that fit this app without losing features.",
          fr: "L'application sur Vercel, l'API sur Render depuis son propre Dockerfile. Des offres gratuites qui conviennent sans perdre de fonctionnalités.",
        },
      },
    ],
    challenges: [
      {
        en: "Search had to change to go live. It started on Meilisearch, but free hosting wipes the disk on restart, which deletes its index. I moved search into Postgres, trading typo tolerance for something that runs on the database we already have.",
        fr: "La recherche a dû changer pour la mise en ligne. Elle utilisait Meilisearch, mais l'hébergement gratuit efface le disque au redémarrage, ce qui supprime son index. J'ai déplacé la recherche dans Postgres, en échangeant la tolérance aux fautes contre une solution qui tourne sur la base qu'on a déjà.",
      },
      {
        en: "Keeping notifications exact. When a pharmacy marks a medicine back in stock, waiting patients are notified in the same database transaction, so there's never a moment where stock says \"in stock\" and a subscriber was missed.",
        fr: "Des notifications exactes. Quand une pharmacie remet un médicament en stock, les patients en attente sont prévenus dans la même transaction, donc il n'y a jamais un moment où le stock dit « en stock » et un abonné a été oublié.",
      },
      {
        en: "Cold starts on free hosting. The database sleeps after 5 minutes and the API after 15, so deployments failed while the database woke up. A longer connection timeout fixed the deploys, and a scheduled ping keeps the API awake.",
        fr: "Les démarrages à froid en hébergement gratuit. La base s'endort après 5 minutes et l'API après 15, donc les déploiements échouaient pendant le réveil de la base. Un délai de connexion plus long a réglé les déploiements, et un appel programmé garde l'API éveillée.",
      },
      {
        en: "One account, several roles. A person can be a patient and a pharmacy owner at the same time, so roles are worked out from their data instead of being stored as a single value.",
        fr: "Un compte, plusieurs rôles. Une personne peut être patient et propriétaire de pharmacie en même temps, donc les rôles sont déduits de ses données au lieu d'être une seule valeur enregistrée.",
      },
    ],
    outcome: {
      en: "It's live as an MVP: the web app on Vercel, the API on Render and the database on Neon, with unit and end-to-end tests running on every push. The code is in a private repository.",
      fr: "Elle est en ligne comme MVP : l'application sur Vercel, l'API sur Render et la base sur Neon, avec des tests unitaires et de bout en bout lancés à chaque push. Le code est dans un dépôt privé.",
    },
    liveUrl: "https://pharmap-web.vercel.app",
    highlights: [
      {
        en: "Search by generic or local brand name (Doliprane, Panadol)",
        fr: "Recherche par nom générique ou marque locale (Doliprane, Panadol)",
      },
      {
        en: "Price, stock status and how fresh the data is, per pharmacy",
        fr: "Prix, état du stock et fraîcheur des données, pour chaque pharmacie",
      },
      {
        en: "Admin verification with a state machine and an audit trail",
        fr: "Vérification admin avec une machine à états et un historique des décisions",
      },
    ],
    tags: ["React", "Vite", "Leaflet", "NestJS", "PostgreSQL"],
    showcase: ["home", "search", "availability", "admin-verification"],
    screenshots: [
      {
        key: "home",
        label: { en: "Homepage", fr: "Page d'accueil" },
        alt: {
          en: "PharMap homepage: “Find medicines and nearby pharmacies you can trust”, with Search medicines and Pharmacies near me buttons",
          fr: "Page d'accueil de PharMap : trouver des médicaments et des pharmacies proches de confiance, avec les boutons de recherche de médicaments et de pharmacies à proximité",
        },
        src: pharmapHome,
      },
      {
        key: "search",
        label: { en: "Medicine search with local brand names", fr: "Recherche avec les marques locales" },
        alt: {
          en: "PharMap medicine search: typing “para” finds Paracetamol and its local brand names Doliprane, Panadol, Efferalgan and Dafalgan",
          fr: "Recherche de médicaments PharMap : en tapant « para », on trouve le paracétamol et ses marques locales Doliprane, Panadol, Efferalgan et Dafalgan",
        },
        src: pharmapSearch,
      },
      {
        key: "availability",
        label: { en: "Pharmacies with a medicine: price, stock, freshness", fr: "Pharmacies avec un médicament : prix, stock, fraîcheur" },
        alt: {
          en: "Pharmacies that have the medicine: Pharmacie Kotto in Douala, in stock at 1,500 FCFA, reported 27 seconds ago",
          fr: "Pharmacies qui ont le médicament : Pharmacie Kotto à Douala, en stock à 1 500 FCFA, signalé il y a 27 secondes",
        },
        src: pharmapAvailability,
      },
      {
        key: "pharmacy",
        label: { en: "Pharmacy page with opening hours", fr: "Page d'une pharmacie avec les horaires" },
        alt: {
          en: "Pharmacie Kotto's page: verified badge, open or closed now, Call and Get directions buttons, address and opening hours",
          fr: "Page de la Pharmacie Kotto : badge vérifié, ouverte ou fermée en ce moment, boutons appeler et itinéraire, adresse et horaires",
        },
        src: pharmapPharmacy,
      },
      {
        key: "register-location",
        label: { en: "Registration: place the pharmacy on the map", fr: "Inscription : placer la pharmacie sur la carte" },
        alt: {
          en: "Pharmacy registration, step 1: find the pharmacy on a map of Cameroon or use the current location",
          fr: "Inscription d'une pharmacie, étape 1 : trouver la pharmacie sur une carte du Cameroun ou utiliser la position actuelle",
        },
        src: pharmapRegisterLocation,
      },
      {
        key: "register-info",
        label: { en: "Registration: pharmacy details", fr: "Inscription : informations de la pharmacie" },
        alt: {
          en: "Pharmacy registration, step 2: pharmacy name, phone and description",
          fr: "Inscription d'une pharmacie, étape 2 : nom, téléphone et description de la pharmacie",
        },
        src: pharmapRegisterInfo,
      },
      {
        key: "pharmacy-home",
        label: { en: "Pharmacy account home", fr: "Accueil du compte pharmacie" },
        alt: {
          en: "Pharmacy owner's account: a verified pharmacy with Manage inventory, View public page and Remove pharmacy actions",
          fr: "Compte du propriétaire : une pharmacie vérifiée avec les actions gérer le stock, voir la page publique et supprimer la pharmacie",
        },
        src: pharmapPharmacyHome,
      },
      {
        key: "admin-verification",
        label: { en: "Admin: pharmacy verification", fr: "Admin : vérification des pharmacies" },
        alt: {
          en: "Admin pharmacy verification queue: a pending pharmacy with Start review and Reject buttons",
          fr: "File de vérification des pharmacies (admin) : une pharmacie en attente avec les boutons commencer l'examen et refuser",
        },
        src: pharmapAdminVerification,
      },
    ],
  },
  {
    slug: "car-rental",
    title: "Car Rental",
    category: { en: "Vehicle Rental / Business App", fr: "Location de voitures / Application métier" },
    status: "live-demo",
    summary: {
      en: "A car rental booking site. Customers search for a car by dates and type, then book it by the day. Staff manage the cars and bookings from an admin panel.",
      fr: "Un site de réservation de location de voitures. Les clients cherchent une voiture par dates et par type, puis la réservent à la journée. L'équipe gère les voitures et les réservations depuis un espace d'administration.",
    },
    problem: {
      en: "A car rental business needs customers to see which cars are free for their dates and book them. The price shouldn't change after someone has booked. The minimum driver age has to be checked the same way everywhere. And staff need a simple way to manage cars and bookings.",
      fr: "Une agence de location doit montrer aux clients quelles voitures sont libres à leurs dates, et les laisser réserver. Le prix ne doit pas changer après la réservation. L'âge minimum du conducteur doit être vérifié partout de la même façon. Et l'équipe a besoin d'un moyen simple de gérer les voitures et les réservations.",
    },
    solution: {
      en: "I built a Next.js app with a \"find my car\" search wizard, a page for each car with reviews, and a booking flow that checks the driver's age and books by the day. After booking, customers see a real confirmation screen. Staff get an admin panel for the cars and bookings.",
      fr: "J'ai construit une application Next.js avec un assistant de recherche « find my car », une page par voiture avec les avis, et un parcours de réservation qui vérifie l'âge du conducteur et réserve à la journée. Après la réservation, le client voit un vrai écran de confirmation. L'équipe a un espace d'administration pour les voitures et les réservations.",
    },
    keyFeatures: [
      {
        en: "Search cars by category, transmission and fuel type, or use the step-by-step \"find my car\" wizard",
        fr: "Recherche par catégorie, boîte de vitesses et carburant, ou avec l'assistant « find my car » étape par étape",
      },
      {
        en: "Book by the day with a date picker. The total price is saved when you book, so if the daily rate changes later, your booking stays the same",
        fr: "Réservation à la journée avec un calendrier. Le prix total est enregistré au moment de réserver, donc si le tarif change plus tard, votre réservation ne bouge pas",
      },
      {
        en: "No double bookings: before a booking is saved, it's checked against the car's existing bookings for those dates, and the search hides cars that are already taken",
        fr: "Pas de double réservation : avant d'enregistrer une réservation, elle est vérifiée contre les réservations existantes de la voiture à ces dates, et la recherche cache les voitures déjà prises",
      },
      {
        en: "Drivers must be 18 or older. This is checked in the search, the booking form and the admin view",
        fr: "Les conducteurs doivent avoir 18 ans ou plus. C'est vérifié dans la recherche, le formulaire de réservation et l'administration",
      },
      {
        en: "Sign in with Google or with email and password (hashed with bcrypt), all through Auth.js",
        fr: "Connexion avec Google ou avec email et mot de passe (haché avec bcrypt), le tout avec Auth.js",
      },
      {
        en: "Only customers who completed a booking can leave a review, and only one per booking",
        fr: "Seuls les clients qui ont terminé une réservation peuvent laisser un avis, et un seul par réservation",
      },
      {
        en: "Admin panel for cars and bookings. A car that has bookings can't be deleted, only archived, so the booking history is kept",
        fr: "Administration des voitures et des réservations. Une voiture qui a des réservations ne peut pas être supprimée, seulement archivée, pour garder l'historique",
      },
      {
        en: "A real confirmation screen after booking, not just a redirect to the homepage",
        fr: "Un vrai écran de confirmation après la réservation, pas juste un retour à l'accueil",
      },
      {
        en: "Forms and admin pages work on mobile, including fixes for date fields breaking the layout on iOS Safari",
        fr: "Les formulaires et l'administration marchent sur mobile, y compris des corrections pour les champs de date qui cassaient la mise en page sur Safari iOS",
      },
      {
        en: "Proper link previews: sharing the site on social media shows a card with the title and an image",
        fr: "De vrais aperçus de lien : partager le site sur les réseaux sociaux affiche une carte avec le titre et une image",
      },
    ],
    techStack: [
      {
        layer: { en: "Frontend", fr: "Frontend" },
        choice: "Next.js 16 (App Router) + TypeScript + Tailwind v4",
        why: {
          en: "Server components for pages with lots of data, like car lists and bookings. Client components only where the user interacts.",
          fr: "Des server components pour les pages avec beaucoup de données, comme la liste des voitures et les réservations. Des client components seulement là où l'utilisateur interagit.",
        },
      },
      {
        layer: { en: "Database", fr: "Base de données" },
        choice: "PostgreSQL (Supabase) + Prisma 7",
        why: {
          en: "Cars, bookings and reviews are all linked, so a relational database fits. Prisma gives typed queries instead of raw SQL.",
          fr: "Les voitures, les réservations et les avis sont liés, donc une base relationnelle convient. Prisma donne des requêtes typées au lieu de SQL brut.",
        },
      },
      {
        layer: { en: "Auth", fr: "Authentification" },
        choice: "Auth.js (NextAuth v5)",
        why: {
          en: "One system for Google sign-in and email/password. The Prisma adapter saves users and sessions in the database.",
          fr: "Un seul système pour la connexion Google et email/mot de passe. L'adaptateur Prisma enregistre les utilisateurs et les sessions dans la base.",
        },
      },
      {
        layer: { en: "Animation", fr: "Animation" },
        choice: "Motion",
        why: {
          en: "Used in the booking flow where it helps, not on every element.",
          fr: "Utilisé dans le parcours de réservation là où ça aide, pas sur chaque élément.",
        },
      },
      {
        layer: { en: "Hosting", fr: "Hébergement" },
        choice: "Vercel",
        why: {
          en: "Made for Next.js, with no server to manage.",
          fr: "Fait pour Next.js, sans serveur à gérer.",
        },
      },
    ],
    challenges: [
      {
        en: "Keeping prices fair. The total price is calculated and saved when the booking is made, instead of being recalculated from the car's current rate.",
        fr: "Garder des prix justes. Le prix total est calculé et enregistré au moment de la réservation, au lieu d'être recalculé avec le tarif actuel de la voiture.",
      },
      {
        en: "Keeping booking history. A car with bookings can't be deleted (onDelete: Restrict). Archiving is the normal way to remove a car, so admins don't run into errors.",
        fr: "Garder l'historique des réservations. Une voiture avec des réservations ne peut pas être supprimée (onDelete: Restrict). L'archivage est la façon normale de retirer une voiture, donc les admins ne tombent pas sur des erreurs.",
      },
      {
        en: "Mobile took several rounds of fixes: date fields overlapping the time dropdown, search fields that needed to stack full width, and an overflow bug that only showed up on iOS Safari.",
        fr: "Le mobile a demandé plusieurs séries de corrections : des champs de date qui chevauchaient le choix de l'heure, des champs de recherche à empiler sur toute la largeur, et un débordement qui n'apparaissait que sur Safari iOS.",
      },
      {
        en: "Builds were failing on Vercel because the Prisma client wasn't generated. I fixed it by generating the client on install.",
        fr: "Les builds échouaient sur Vercel parce que le client Prisma n'était pas généré. Je l'ai corrigé en générant le client à l'installation.",
      },
      {
        en: "Auth.js only trusts the Host header automatically on Vercel and Cloudflare. On other hosts you have to allow it yourself, and that's a security decision, not a setting to switch on without thinking.",
        fr: "Auth.js ne fait confiance à l'en-tête Host automatiquement que sur Vercel et Cloudflare. Ailleurs, il faut l'autoriser soi-même, et c'est une décision de sécurité, pas un réglage à activer sans réfléchir.",
      },
    ],
    outcome: {
      en: "It's live as a working demo on Vercel, with a real Postgres database. The full flow works: search, book, confirm, and manage cars and bookings as an admin. The site says clearly that it's a portfolio demo, not a real rental business.",
      fr: "Elle est en ligne comme démo fonctionnelle sur Vercel, avec une vraie base Postgres. Tout le parcours marche : rechercher, réserver, confirmer, et gérer les voitures et les réservations en admin. Le site indique clairement que c'est une démo de portfolio, pas une vraie agence de location.",
    },
    liveUrl: "https://car-rental-xi-lemon.vercel.app",
    githubUrl: "https://github.com/Naviolance/car-rental",
    highlights: [
      {
        en: "No double bookings: dates are checked before a booking is saved",
        fr: "Aucune double réservation : les dates sont vérifiées avant l'enregistrement",
      },
      {
        en: "The price is locked in at booking, even if the daily rate changes",
        fr: "Le prix est fixé à la réservation, même si le tarif journalier change",
      },
      {
        en: "Minimum driver age checked in search, booking and admin",
        fr: "Âge minimum du conducteur vérifié dans la recherche, la réservation et l'admin",
      },
    ],
    tags: ["Next.js 16", "PostgreSQL", "Prisma", "Auth.js", "Motion"],
    showcase: ["home", "find-my-car", "booking", "admin-bookings"],
    screenshots: [
      {
        key: "home",
        label: { en: "Homepage", fr: "Page d'accueil" },
        alt: {
          en: "Car Rental homepage: “Rent the right car, right now”, with a search form for category, pick-up and return dates and driver's age",
          fr: "Page d'accueil de Car Rental : « Rent the right car, right now », avec un formulaire de recherche par catégorie, dates de prise et de retour et âge du conducteur",
        },
        src: carRentalHome,
      },
      {
        key: "find-my-car",
        label: { en: "Find my car wizard", fr: "Assistant Find my car" },
        alt: {
          en: "Find my car wizard: picking a pick-up date on a calendar and the number of days",
          fr: "Assistant Find my car : choix de la date de prise sur un calendrier et du nombre de jours",
        },
        src: carRentalFindMyCar,
      },
      {
        key: "listing",
        label: { en: "Car list with filters", fr: "Liste des voitures avec filtres" },
        alt: {
          en: "All cars page with filters for category, transmission, fuel, price and dates, and each car's price per day",
          fr: "Page de toutes les voitures avec filtres (catégorie, boîte, carburant, prix, dates) et le prix par jour de chaque voiture",
        },
        src: carRentalListing,
      },
      {
        key: "detail",
        label: { en: "Car page", fr: "Page d'une voiture" },
        alt: {
          en: "Volkswagen Golf page: $42 per day, compact, manual, petrol, 5 seats, with a booking form",
          fr: "Page de la Volkswagen Golf : 42 $ par jour, compacte, manuelle, essence, 5 places, avec un formulaire de réservation",
        },
        src: carRentalDetail,
      },
      {
        key: "booking",
        label: { en: "Booking form", fr: "Formulaire de réservation" },
        alt: {
          en: "Booking a Volkswagen Golf, step 2 of 4: choosing the dates",
          fr: "Réservation d'une Volkswagen Golf, étape 2 sur 4 : le choix des dates",
        },
        src: carRentalBooking,
      },
      {
        key: "confirmation",
        label: { en: "Booking confirmed", fr: "Réservation confirmée" },
        alt: {
          en: "Booking sent: summary with the car, pick-up and return dates, duration, total price and pending status",
          fr: "Réservation envoyée : récapitulatif avec la voiture, les dates de prise et de retour, la durée, le prix total et le statut en attente",
        },
        src: carRentalConfirmation,
      },
      {
        key: "admin-cars",
        label: { en: "Admin: cars", fr: "Admin : voitures" },
        alt: {
          en: "Car Rental admin fleet list: each car with its price per day, location, and Edit and Archive buttons",
          fr: "Flotte dans l'administration Car Rental : chaque voiture avec son prix par jour, son lieu, et les boutons modifier et archiver",
        },
        src: carRentalAdminCars,
      },
      {
        key: "admin-bookings",
        label: { en: "Admin: bookings", fr: "Admin : réservations" },
        alt: {
          en: "Car Rental admin bookings: pending bookings with Confirm and Cancel buttons, and cancelled ones",
          fr: "Réservations dans l'administration Car Rental : réservations en attente avec les boutons confirmer et annuler, et réservations annulées",
        },
        src: carRentalAdminBookings,
      },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
