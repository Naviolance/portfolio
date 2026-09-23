import type { Localized } from "@/lib/localized";

// Background from the CV (Forsangam_Junior_CV_2026.pdf). Keep this and the
// PDF in public/cv/ in step: recruiters compare the two.

export const CV_PDF = "/cv/Forsangam-Junior-Priestly-CV-2026.pdf";

export type Experience = {
  role: Localized;
  company: string;
  place: string;
  period: Localized;
  points: Localized[];
};

export const experience: Experience[] = [
  {
    role: { en: "Full-Stack Developer Intern", fr: "Stagiaire développeur full-stack" },
    company: "Eagle Consulting Group",
    place: "Douala",
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
    place: "Buea",
    period: { en: "Jun 2022 – Sep 2023", fr: "juin 2022 – sept. 2023" },
    points: [
      {
        en: "Built responsive, easy-to-use features with HTML, CSS and JavaScript.",
        fr: "Développement de fonctionnalités adaptées au mobile et faciles à utiliser, en HTML, CSS et JavaScript.",
      },
      {
        en: "Updated page layouts to meet usability and performance needs.",
        fr: "Mise à jour de mises en page pour répondre aux besoins d'ergonomie et de performance.",
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
  place: string;
  period: string;
};

export const education: Education[] = [
  { title: { en: "BSc in Software Engineering", fr: "Licence (BSc) en génie logiciel" }, place: "Douala", period: "2023 – 2024" },
  { title: { en: "HND in Software Engineering", fr: "HND en génie logiciel" }, place: "Douala", period: "2022 – 2023" },
  { title: { en: "Full-Stack Development Program", fr: "Programme de développement full-stack" }, place: "Douala", period: "2022 – 2023" },
  { title: { en: "Baccalauréat TI (Computer Science)", fr: "Baccalauréat TI (informatique)" }, place: "Douala", period: "2020 – 2021" },
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
