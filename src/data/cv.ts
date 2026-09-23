import type { Localized } from "@/lib/localized";

// Background from the CV (Forsangam_Junior_CV_2026.pdf). Keep this and the
// PDF in public/cv/ in step: recruiters compare the two.

export const CV_PDF = "/cv/Forsangam-Junior-Priestly-CV-2026.pdf";

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
