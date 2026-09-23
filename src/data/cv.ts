import type { Localized } from "@/lib/localized";

// Background from the CV (Forsangam_Junior_CV_2026.pdf). Keep this and the
// PDF in public/cv/ in step: recruiters compare the two.

export const CV_PDF = "/cv/Forsangam-Junior-Priestly-CV-2026.pdf";

// Used by the /cv page (the web version of the PDF).
export const profile: Localized = {
  en: "Full-stack software engineer who builds complete web applications with TypeScript, Next.js, NestJS and PostgreSQL. Recently built a truck spare parts e-commerce platform with vehicle-compatibility search, secure authentication, oversell-safe checkout and payment gateway integration. Two internships in WordPress and front-end development. Fluent in English and French. Available for full-time roles and for freelance projects through JPFW Web Services.",
  fr: "Ingénieur logiciel full-stack qui construit des applications web complètes avec TypeScript, Next.js, NestJS et PostgreSQL. J'ai récemment construit une plateforme e-commerce de pièces de camion avec recherche de compatibilité par véhicule, authentification sécurisée, paiement sans survente et intégration d'une passerelle de paiement. Deux stages en WordPress et en développement front-end. Bilingue anglais et français. Disponible pour un poste à temps plein et pour des projets freelance via JPFW Web Services.",
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
        en: "Built a full-stack online store with a product catalogue, a \"Find My Part\" vehicle-compatibility lookup, and search filters with shareable URLs.",
        fr: "Construction d'une boutique en ligne full-stack avec catalogue produits, recherche de compatibilité « Find My Part » par véhicule, et filtres de recherche avec des URL partageables.",
      },
      {
        en: "Implemented JWT authentication with refresh-token rotation and token-reuse detection, bcrypt password hashing, rate limiting and security headers.",
        fr: "Authentification JWT avec rotation du jeton de rafraîchissement et détection de réutilisation, hachage des mots de passe avec bcrypt, limitation de débit et en-têtes de sécurité.",
      },
      {
        en: "Designed an atomic checkout with database transactions and stock guards that prevent overselling when many customers buy at once.",
        fr: "Conception d'un paiement atomique avec transactions et contrôles de stock qui empêchent la survente quand plusieurs clients achètent en même temps.",
      },
      {
        en: "Built an admin dashboard to manage products, categories, brands, vehicles and orders, with image uploads to MinIO object storage.",
        fr: "Tableau de bord d'administration pour gérer produits, catégories, marques, véhicules et commandes, avec envoi d'images vers le stockage objet MinIO.",
      },
      {
        en: "Integrated the Notch Pay payment gateway (sandbox) and delivered a bilingual English/French interface.",
        fr: "Intégration de la passerelle de paiement Notch Pay (mode test) et interface bilingue anglais/français.",
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
        en: "Built a rental website where customers filter cars by category, transmission, fuel type and price, then book by the day.",
        fr: "Construction d'un site de location où les clients filtrent les voitures par catégorie, boîte de vitesses, carburant et prix, puis réservent à la journée.",
      },
      {
        en: "Added real-time availability checks that block double bookings, and show the full price before the customer submits.",
        fr: "Vérification de disponibilité en temps réel qui bloque les doubles réservations, et affichage du prix total avant la validation.",
      },
      {
        en: "Added user accounts with Google sign-in or email and password, using Auth.js.",
        fr: "Comptes utilisateurs avec connexion Google ou email et mot de passe, avec Auth.js.",
      },
    ],
  },
  {
    title: { en: "Earlier Projects", fr: "Projets précédents" },
    year: "2021 – 2023",
    points: [
      {
        en: "E-commerce websites (React, WordPress, Bubble, JavaScript); C projects from the Qwasar program: a custom printf, a Mastermind game, and standard library re-implementations.",
        fr: "Sites e-commerce (React, WordPress, Bubble, JavaScript) ; projets en C du programme Qwasar : un printf maison, un jeu Mastermind et des réimplémentations de la bibliothèque standard.",
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
    period: { en: "2024 – Present", fr: "2024 – aujourd'hui" },
    points: [
      {
        en: "Build websites and web apps for small businesses, from the first call to launch, including a WordPress site for a paying client. Started in my final year of university.",
        fr: "Je crée des sites et des applications web pour des petites entreprises, du premier appel à la mise en ligne, dont un site WordPress pour un client payant. J'ai commencé pendant ma dernière année d'université.",
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
        en: "Built responsive, easy-to-use features and updated page layouts for usability and performance (HTML, CSS, JavaScript).",
        fr: "Développement de fonctionnalités adaptées au mobile et mise à jour de mises en page pour l'ergonomie et la performance (HTML, CSS, JavaScript).",
      },
      {
        en: "Worked with client services, sales and design teams on projects with tight deadlines.",
        fr: "Travail avec les équipes service client, ventes et design sur des projets aux délais serrés.",
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
  { label: { en: "Frontend", fr: "Frontend" }, items: ["Next.js", "React", "TypeScript", "Responsive design", "WordPress"] },
  { label: { en: "Backend", fr: "Backend" }, items: ["Node.js", "NestJS", "REST APIs", "JWT authentication"] },
  { label: { en: "Databases", fr: "Bases de données" }, items: ["PostgreSQL", "MySQL", "Prisma ORM"] },
  { label: { en: "Tools", fr: "Outils" }, items: ["Docker", "Docker Compose", "MinIO (S3)", "Vercel", "WSL2", "Bubble"] },
  {
    label: { en: "Other languages", fr: "Autres langages" },
    items: ["JavaScript", "PHP", "Python", "C", "C++", "C#", "Ruby", "SQL", "HTML", "CSS"],
  },
];

export const spokenLanguages: Localized = {
  en: "English and French, both fluent",
  fr: "Français et anglais, courants",
};
