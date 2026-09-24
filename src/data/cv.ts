import type { Localized } from "@/lib/localized";

// Background from the CV (Forsangam_Junior_CV_2026.pdf). Keep this and the
// PDF in public/cv/ in step: recruiters compare the two.

export const CV_PDF = "/cv/Forsangam-Junior-Priestly-CV-2026.pdf";

// Used by the /cv page (the web version of the PDF).
export const profile: Localized = {
  en: "Full-stack software engineer who builds complete web applications with TypeScript, Next.js, NestJS and PostgreSQL. Recently built a truck spare parts e-commerce platform with secure authentication, oversell-safe checkout and payment gateway integration, and PharMap, a medicine and pharmacy finder for Cameroon. Two internships in WordPress and front-end development. Fluent in English and French. Available for full-time roles and for freelance projects through JPFW Web Services.",
  fr: "Ingénieur logiciel full-stack qui construit des applications web complètes avec TypeScript, Next.js, NestJS et PostgreSQL. J'ai récemment construit une plateforme e-commerce de pièces de camion avec authentification sécurisée, paiement sans survente et intégration d'une passerelle de paiement, et PharMap, un outil pour trouver un médicament et une pharmacie au Cameroun. Deux stages en WordPress et en développement front-end. Bilingue anglais et français. Disponible pour un poste à temps plein et pour des projets freelance via JPFW Web Services.",
};

export type CvProject = {
  title: Localized;
  year: string;
  stack?: string;
  // Project slug on this site, for the case-study link.
  slug?: string;
  liveUrl?: string;
  codeUrl?: string;
  points: Localized[];
};

export const cvProjects: CvProject[] = [
  {
    title: { en: "TruckParts: Truck Spare Parts E-commerce Platform", fr: "TruckParts : plateforme e-commerce de pièces de camion" },
    year: "2026",
    stack: "Next.js, NestJS, TypeScript, PostgreSQL, Prisma, Docker, MinIO",
    slug: "truckparts",
    liveUrl: "https://truck-spare-part-store-frontend.vercel.app",
    codeUrl: "https://github.com/Naviolance/Truck-spare-part-store",
    points: [
      {
        en: "Built a full-stack store with a product catalogue, a \"Find My Part\" vehicle-compatibility lookup, and shareable search filters.",
        fr: "Construction d'une boutique full-stack avec catalogue produits, recherche de compatibilité « Find My Part » par véhicule, et filtres de recherche partageables.",
      },
      {
        en: "Implemented JWT auth with refresh-token rotation and reuse detection, bcrypt hashing, rate limiting, and security headers.",
        fr: "Authentification JWT avec rotation du jeton de rafraîchissement et détection de réutilisation, hachage bcrypt, limitation de débit et en-têtes de sécurité.",
      },
      {
        en: "Designed an atomic checkout (database transactions, stock guards) that prevents overselling under concurrent orders.",
        fr: "Conception d'un paiement atomique (transactions, contrôles de stock) qui empêche la survente quand plusieurs commandes arrivent en même temps.",
      },
      {
        en: "Built an admin dashboard (products, categories, brands, vehicles, orders) with image uploads to S3-compatible storage; integrated the Notch Pay payment gateway (sandbox) and an English/French interface.",
        fr: "Tableau de bord d'administration (produits, catégories, marques, véhicules, commandes) avec envoi d'images vers un stockage compatible S3 ; intégration de la passerelle de paiement Notch Pay (mode test) et interface anglais/français.",
      },
    ],
  },
  {
    title: { en: "PharMap: Medicine and Pharmacy Finder for Cameroon", fr: "PharMap : trouver un médicament et une pharmacie au Cameroun" },
    year: "2026",
    stack: "React, TypeScript, Vite, NestJS, PostgreSQL, Prisma, Leaflet",
    slug: "pharmap",
    liveUrl: "https://pharmap-web.vercel.app",
    // No codeUrl: the repository is private.
    points: [
      {
        en: "Built a bilingual (EN/FR) PWA showing which nearby verified pharmacies stock a medicine, with price and freshness.",
        fr: "Construction d'une PWA bilingue (EN/FR) qui montre quelles pharmacies vérifiées proches ont un médicament en stock, avec le prix et la fraîcheur des données.",
      },
      {
        en: "Implemented role-based access (patient, pharmacy, admin), an admin verification state machine with an audit trail, and restock notifications fulfilled in the same transaction as the stock update.",
        fr: "Accès par rôle (patient, pharmacie, admin), machine à états pour la vérification des pharmacies avec historique des décisions, et alertes de réapprovisionnement traitées dans la même transaction que la mise à jour du stock.",
      },
      {
        en: "Integrated OpenStreetMap (Leaflet, Nominatim, Overpass) for locations; deployed on Vercel, Render (Docker) and Neon, with unit and end-to-end tests in CI.",
        fr: "Intégration d'OpenStreetMap (Leaflet, Nominatim, Overpass) pour les adresses ; déploiement sur Vercel, Render (Docker) et Neon, avec tests unitaires et de bout en bout en CI.",
      },
    ],
  },
  {
    title: { en: "Car Rental Booking Platform", fr: "Plateforme de réservation de location de voitures" },
    year: "2026",
    stack: "Next.js, TypeScript, Prisma, PostgreSQL, Auth.js",
    slug: "car-rental",
    liveUrl: "https://car-rental-xi-lemon.vercel.app",
    codeUrl: "https://github.com/Naviolance/car-rental",
    points: [
      {
        en: "Customers filter cars (category, transmission, fuel, price), sign in with Google or email, and book by the day.",
        fr: "Les clients filtrent les voitures (catégorie, boîte de vitesses, carburant, prix), se connectent avec Google ou par email, et réservent à la journée.",
      },
      {
        en: "Added real-time availability checks that block double bookings, and show the full price before the customer submits.",
        fr: "Vérification de disponibilité en temps réel qui bloque les doubles réservations, et affichage du prix total avant la validation.",
      },
    ],
  },
  {
    title: { en: "Earlier Projects", fr: "Projets précédents" },
    year: "2021 – 2023",
    points: [
      {
        en: "E-commerce sites (React, WordPress, Bubble); Qwasar C projects: a custom printf, a Mastermind game, a standard library.",
        fr: "Sites e-commerce (React, WordPress, Bubble) ; projets en C chez Qwasar : un printf maison, un jeu Mastermind, une bibliothèque standard.",
      },
    ],
  },
];

export type Experience = {
  role: Localized;
  company: string;
  place: Localized;
  // How it fitted around studies, so the overlapping dates make sense.
  note?: Localized;
  period: Localized;
  points: Localized[];
};

const CAMEROON = { en: "Cameroon", fr: "Cameroun" };
const at = (city: string): Localized => ({ en: `${city}, ${CAMEROON.en}`, fr: `${city}, ${CAMEROON.fr}` });

export const experience: Experience[] = [
  {
    role: { en: "Freelance Full-Stack Software Engineer", fr: "Ingénieur logiciel full-stack freelance" },
    company: "JPFW Web Services",
    place: { en: "Douala, Cameroon & remote", fr: "Douala, Cameroun et à distance" },
    note: { en: "Started in my final year of university", fr: "Commencé pendant ma dernière année d'université" },
    period: { en: "2024 – Present", fr: "2024 – aujourd'hui" },
    points: [
      {
        en: "Build websites and web apps for small businesses, from the first call to launch, including a WordPress site for a paying client.",
        fr: "Je crée des sites et des applications web pour des petites entreprises, du premier appel à la mise en ligne, dont un site WordPress pour un client payant.",
      },
      {
        en: "Find clients online and handle quotes, delivery and payment myself. Also offer SEO audits and website maintenance.",
        fr: "Je trouve mes clients en ligne et je gère moi-même les devis, la livraison et le paiement. Je propose aussi des audits SEO et la maintenance de sites.",
      },
    ],
  },
  {
    role: { en: "Full-Stack Developer Intern", fr: "Stagiaire développeur full-stack" },
    company: "Eagle Consulting Group",
    place: at("Douala"),
    note: { en: "Paid internship, alongside my studies", fr: "Stage rémunéré, en parallèle de mes études" },
    period: { en: "2022 – 2023", fr: "2022 – 2023" },
    points: [
      {
        en: "Modernized, designed and debugged WordPress websites with the team, including custom plugins.",
        fr: "Modernisation, design et débogage de sites WordPress avec l'équipe, y compris des plugins sur mesure.",
      },
      {
        en: "Built dynamic websites for JFN Center, and a teacher evaluation form with Microsoft Forms.",
        fr: "Création de sites dynamiques pour JFN Center, et d'un formulaire d'évaluation des enseignants avec Microsoft Forms.",
      },
      {
        en: "Turned designs into pages with senior developers, using HTML, CSS, JavaScript and MySQL.",
        fr: "Intégration de maquettes avec des développeurs seniors, en HTML, CSS, JavaScript et MySQL.",
      },
    ],
  },
  {
    role: { en: "Full-Stack Developer Intern", fr: "Stagiaire développeur full-stack" },
    company: "Bonthe Media",
    place: at("Buea"),
    note: { en: "In person, during school holidays", fr: "Sur place, pendant les vacances scolaires" },
    period: { en: "Jun 2022 – Sep 2023", fr: "juin 2022 – sept. 2023" },
    points: [
      {
        en: "Built responsive features and page layouts (HTML, CSS, JavaScript) with client services, sales, and design teams, on deadlines.",
        fr: "Développement de fonctionnalités et de mises en page adaptées au mobile (HTML, CSS, JavaScript) avec les équipes service client, ventes et design, dans des délais serrés.",
      },
    ],
  },
];

export type Education = {
  title: Localized;
  place: Localized;
  period: string;
};

const DOUALA: Localized = { en: "Douala", fr: "Douala" };

export const education: Education[] = [
  { title: { en: "BSc in Software Engineering", fr: "Licence (BSc) en génie logiciel" }, place: DOUALA, period: "2023 – 2024" },
  { title: { en: "HND in Software Engineering", fr: "HND en génie logiciel" }, place: DOUALA, period: "2022 – 2023" },
  {
    title: { en: "Full Stack Developer Program", fr: "Programme Full Stack Developer" },
    place: { en: "Qwasar Silicon Valley (remote)", fr: "Qwasar Silicon Valley (à distance)" },
    period: "2022 – 2023",
  },
  { title: { en: "Baccalauréat TI (Computer Science)", fr: "Baccalauréat TI (informatique)" }, place: DOUALA, period: "2020 – 2021" },
];

export type SkillGroup = { label: Localized; items: string[] };

export const skills: SkillGroup[] = [
  {
    label: { en: "Languages", fr: "Langages" },
    items: ["TypeScript", "JavaScript", "PHP", "Python", "C", "C++", "C#", "Ruby", "SQL", "HTML", "CSS"],
  },
  {
    label: { en: "Frontend", fr: "Frontend" },
    items: ["React", "Next.js", "Vite", "Leaflet (maps)", "PWA", "Responsive design", "WordPress"],
  },
  {
    label: { en: "Backend & data", fr: "Backend et données" },
    items: ["Node.js", "NestJS", "REST APIs", "JWT authentication", "PostgreSQL", "MySQL", "Prisma ORM"],
  },
  {
    label: { en: "Tools & DevOps", fr: "Outils et DevOps" },
    items: ["Docker", "GitHub Actions (CI)", "Vitest", "Vercel", "Render", "Neon", "MinIO (S3)", "WSL2", "Bubble"],
  },
];

export const spokenLanguages: Localized = {
  en: "English and French, both fluent",
  fr: "Français et anglais, courants",
};
