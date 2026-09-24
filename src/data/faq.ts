import type { Localized } from "@/lib/localized";

// FAQ content. To add a question: add one entry here with BOTH languages
// (TypeScript won't build if one is missing). It appears on /en/faq and
// /fr/faq automatically; `featured: true` also puts it on the homepage
// (keep that to 4). `id` becomes the shareable link: /fr/faq#<id>.
//
// ⚠ Some answers repeat prices from data/pricing.ts. Change a price there →
// update the matching answer here too.
//
// Only write what's actually true of how JPFW Web Services works: every
// answer below comes from the owner's own answers or from facts already on
// the site.

export const FAQ_CATEGORIES = ["prices", "process", "payments", "seo", "general"] as const;
export type FaqCategory = (typeof FAQ_CATEGORIES)[number];

export type FaqEntry = {
  id: string;
  category: FaqCategory;
  featured?: boolean;
  question: Localized;
  // Paragraphs are separated by a blank line ("\n\n").
  answer: Localized;
  // Optional link shown after the answer. Internal paths ("/#pricing") get
  // the current language added automatically.
  link?: { href: string; label: Localized };
};

export const faqCategoryLabels: Record<FaqCategory, Localized> = {
  prices: { en: "Prices", fr: "Prix" },
  process: { en: "How it works", fr: "Déroulement" },
  payments: { en: "Payments", fr: "Paiements" },
  seo: { en: "Google & SEO", fr: "Google et SEO" },
  general: { en: "General", fr: "Général" },
};

export const faq: FaqEntry[] = [
  {
    id: "website-cost",
    category: "prices",
    featured: true,
    question: {
      en: "How much does a website cost?",
      fr: "Combien coûte un site internet ?",
    },
    answer: {
      en: "It depends on what the site needs to do. My price ranges:\n\n• Showcase website: 150K–350K FCFA\n• Starter online store: 150K–500K FCFA\n• Business e-commerce site: 800K–3M FCFA\n• Custom platform: from 5M FCFA\n\nThese are JPFW Web Services' own ranges, not an international standard or a price set by law. Tell me what you need and I'll give you an exact quote.",
      fr: "Ça dépend de ce que le site doit faire. Mes fourchettes de prix :\n\n• Site vitrine : 150K–350K FCFA\n• Boutique en ligne simple : 150K–500K FCFA\n• Site e-commerce professionnel : 800K–3M FCFA\n• Plateforme sur mesure : à partir de 5M FCFA\n\nCe sont les fourchettes de JPFW Web Services, pas une norme internationale ni un prix fixé par la loi. Dites-moi ce dont vous avez besoin et je vous donne un devis précis.",
    },
    link: { href: "/#pricing", label: { en: "See all prices", fr: "Voir tous les tarifs" } },
  },
  {
    id: "showcase-website",
    category: "prices",
    question: {
      en: "What is a showcase website, and how much is it?",
      fr: "C'est quoi un site vitrine, et combien ça coûte ?",
    },
    answer: {
      en: "A showcase website presents your business online: what you do, your services, photos, how to contact you and where to find you. There's no online payment on it.\n\nMine cost 150K–350K FCFA, depending on the number of pages and what you need on them. Every one is fast, works on phones and is ready for Google.",
      fr: "Un site vitrine présente votre activité en ligne : ce que vous faites, vos services, vos photos, comment vous contacter et où vous trouver. Il n'y a pas de paiement en ligne dessus.\n\nLes miens coûtent entre 150K et 350K FCFA, selon le nombre de pages et ce que vous voulez dessus. Chacun est rapide, marche sur téléphone et est prêt pour Google.",
    },
  },
  {
    id: "cost-after-launch",
    category: "prices",
    question: {
      en: "What will I pay after the website is live?",
      fr: "Qu'est-ce que je paie une fois le site en ligne ?",
    },
    answer: {
      en: "Your domain name and your hosting. You pay them directly to the provider, in your name, so they stay yours. I help you choose them and set everything up.\n\nIf you want, I can also look after the site for 25K–75K FCFA a month: updates, backups, small fixes and security checks. That part is optional.",
      fr: "Votre nom de domaine et votre hébergement. Vous les payez directement au fournisseur, à votre nom, pour qu'ils restent à vous. Je vous aide à les choisir et je mets tout en place.\n\nSi vous voulez, je peux aussi m'occuper du site pour 25K–75K FCFA par mois : mises à jour, sauvegardes, petites corrections et sécurité. Cette partie est en option.",
    },
  },
  {
    id: "timeline",
    category: "process",
    featured: true,
    question: {
      en: "How long does it take to build a website?",
      fr: "Combien de temps pour créer un site ?",
    },
    answer: {
      en: "Usually:\n\n• Showcase website: 1–2 weeks\n• Starter online store: 2–3 weeks\n• Business e-commerce site: 3–6 weeks\n• Custom platform: depends on the project\n\nThe clock starts once I have your content. You get the exact timeline with your quote.",
      fr: "En général :\n\n• Site vitrine : 1 à 2 semaines\n• Boutique en ligne simple : 2 à 3 semaines\n• Site e-commerce professionnel : 3 à 6 semaines\n• Plateforme sur mesure : selon le projet\n\nLe délai commence quand j'ai votre contenu. Vous recevez le délai exact avec votre devis.",
    },
  },
  {
    id: "what-to-provide",
    category: "process",
    featured: true,
    question: {
      en: "What do I need to give you?",
      fr: "Qu'est-ce que je dois vous fournir ?",
    },
    answer: {
      en: "Your logo, the texts for your pages and your photos.\n\nDon't have them yet? No problem. I can help you write the texts and find free-to-use photos. If there's a lot of it, I'll quote that part separately so there are no surprises.",
      fr: "Votre logo, les textes de vos pages et vos photos.\n\nVous ne les avez pas encore ? Pas de souci. Je peux vous aider à écrire les textes et à trouver des photos libres de droits. S'il y en a beaucoup, je fais un devis à part pour cette partie, pour éviter les surprises.",
    },
  },
  {
    id: "how-to-pay",
    category: "payments",
    featured: true,
    question: {
      en: "How do I pay?",
      fr: "Comment je paie ?",
    },
    answer: {
      en: "50% when we start and 50% when the site is delivered.\n\nYou can pay by MTN Mobile Money or Orange Money. Paying from outside Cameroon? Tell me and we'll agree on a method that works for you.",
      fr: "50 % au démarrage et 50 % à la livraison du site.\n\nVous pouvez payer par MTN Mobile Money ou Orange Money. Vous payez depuis l'étranger ? Dites-le-moi et on trouvera un moyen qui vous convient.",
    },
  },
  {
    id: "mobile-money-store",
    category: "payments",
    question: {
      en: "Can my online store accept Mobile Money?",
      fr: "Ma boutique en ligne peut-elle accepter le Mobile Money ?",
    },
    answer: {
      en: "Yes. My TruckParts store takes Mobile Money through Notch Pay, with a secure payment page, and it also offers cash at pickup. The right payment provider depends on your country and your business, and we choose it together.",
      fr: "Oui. Ma boutique TruckParts accepte le Mobile Money via Notch Pay, avec une page de paiement sécurisée, et propose aussi le paiement en espèces au retrait. Le bon prestataire de paiement dépend de votre pays et de votre activité, et on le choisit ensemble.",
    },
    link: { href: "/projects/truckparts", label: { en: "See the TruckParts project", fr: "Voir le projet TruckParts" } },
  },
  {
    id: "wordpress-or-custom",
    category: "general",
    question: {
      en: "WordPress or a custom website: which one do I need?",
      fr: "WordPress ou un site sur mesure : lequel me faut-il ?",
    },
    answer: {
      en: "WordPress is a good choice when you want to edit your content yourself and your needs are standard: a showcase site, a blog or a simple store.\n\nA custom site makes sense when your business has its own rules, like checking that a part fits a truck, stock that can't be oversold, a booking system, or showing which nearby pharmacy has a medicine in stock. Not every project needs custom code, and I'll tell you honestly which one fits.",
      fr: "WordPress est un bon choix quand vous voulez modifier votre contenu vous-même et que vos besoins sont classiques : un site vitrine, un blog ou une boutique simple.\n\nUn site sur mesure a du sens quand votre activité a ses propres règles, comme vérifier qu'une pièce va sur un camion, un stock qui ne doit jamais être survendu, un système de réservation, ou montrer quelle pharmacie proche a un médicament en stock. Tous les projets n'ont pas besoin de code sur mesure, et je vous dis honnêtement lequel vous convient.",
    },
  },
  {
    id: "app-or-website",
    category: "general",
    question: {
      en: "Do I need a mobile app, or is a website enough?",
      fr: "Ai-je besoin d'une application mobile, ou un site suffit ?",
    },
    answer: {
      en: "Often a web app is enough. PharMap, a medicine finder I built, opens in the browser and can be installed on the phone's home screen like an app, without the Play Store or the App Store. It's one version for Android, iPhone and computers, so it costs less to build and to keep up to date.\n\nTell me what your app needs to do and I'll tell you honestly if a web app fits.",
      fr: "Souvent, une application web suffit. PharMap, un outil de recherche de médicaments que j'ai construit, s'ouvre dans le navigateur et peut s'installer sur l'écran d'accueil du téléphone comme une application, sans passer par le Play Store ni l'App Store. C'est une seule version pour Android, iPhone et ordinateur, donc moins chère à construire et à tenir à jour.\n\nDites-moi ce que votre application doit faire et je vous dis honnêtement si une application web convient.",
    },
    link: { href: "/projects/pharmap", label: { en: "See the PharMap project", fr: "Voir le projet PharMap" } },
  },
  {
    id: "where-do-you-work",
    category: "general",
    question: {
      en: "Do you only work with clients in Cameroon?",
      fr: "Travaillez-vous seulement avec des clients au Cameroun ?",
    },
    answer: {
      en: "No. I'm based in Douala, where we can also meet in person. For clients anywhere else, in Cameroon, in Africa or abroad, I work remotely. I work in English and in French.",
      fr: "Non. Je suis basé à Douala, où on peut aussi se rencontrer en personne. Pour les clients ailleurs, au Cameroun, en Afrique ou à l'étranger, je travaille à distance. Je travaille en français et en anglais.",
    },
  },
  {
    id: "show-up-on-google",
    category: "seo",
    question: {
      en: "Can you help my business show up on Google?",
      fr: "Pouvez-vous aider mon entreprise à apparaître sur Google ?",
    },
    answer: {
      en: "Yes. Every site I build is ready for Google from day one: fast pages, a clean structure and the technical details search engines check.\n\nFor an existing site, I can audit it and give you a written report (75K–150K FCFA), audit it and fix what I find (200K–450K FCFA), or follow it every month (100K–250K FCFA a month).",
      fr: "Oui. Chaque site que je crée est prêt pour Google dès le premier jour : pages rapides, structure propre et les détails techniques que les moteurs de recherche vérifient.\n\nPour un site existant, je peux l'auditer et vous donner un rapport écrit (75K–150K FCFA), l'auditer et corriger ce que je trouve (200K–450K FCFA), ou le suivre chaque mois (100K–250K FCFA par mois).",
    },
    link: { href: "/#pricing", label: { en: "See SEO prices", fr: "Voir les tarifs SEO" } },
  },
];
