import type { Localized } from "@/lib/localized";

// The "How I work" page (/en/how-i-work, /fr/ma-methode): what happens
// from the first message to launch, step by step.
//
// ⚠ These are promises clients will hold you to: the 24-hour reply, 2 rounds
// of changes, the editing video and 30 days of free fixes. Repeat them in
// every written quote, and change them here if they change.
// The 50/50 payment, the timelines and what the client provides also appear
// in the FAQ (data/faq.ts: how-to-pay, timeline, what-to-provide).
// {care} is replaced with the care price range from data/pricing.ts.

export type ProcessStep = {
  // Short time marker shown above the title ("Day 1", "1–6 weeks").
  when: Localized;
  title: Localized;
  you: Localized;
  me: Localized;
  get: Localized;
  // Money and ownership moments, shown as tags under the title.
  pays?: boolean;
  handover?: boolean;
};

export const processPage = {
  title: {
    en: "How I work: from your first message to launch",
    fr: "Ma méthode : de votre premier message à la mise en ligne",
  },
  metaDescription: {
    en: "How a website project with me works: a written quote before you pay, 50% to start, previews as it's built, and a domain and hosting in your name.",
    fr: "Comment se passe un projet de site avec moi : devis écrit avant de payer, 50 % au démarrage, aperçus pendant la création, domaine et hébergement à votre nom.",
  },
  eyebrow: { en: "How I work", fr: "Ma méthode" },
  heading: { en: "What happens after you message me", fr: "Ce qui se passe après votre message" },
  lead: {
    en: "Six steps from the first WhatsApp message to a site that's live and yours. At each one you'll know what you do, what I do, and what you walk away with.",
    fr: "Six étapes, du premier message WhatsApp au site en ligne qui vous appartient. À chaque étape, vous savez ce que vous faites, ce que je fais et ce que vous obtenez.",
  },
  whatsapp: {
    en: "Hi Priestly, I read how you work and I'd like a quote for my website.",
    fr: "Bonjour Priestly, j'ai lu votre méthode et j'aimerais un devis pour mon site.",
  },

  ticket: {
    title: { en: "Work order", fr: "Bon de travail" },
    number: "Nº JPFW-NEXT",
    stamp: { en: "No surprises", fr: "Sans surprise" },
    rows: [
      { label: { en: "Price", fr: "Prix" }, value: { en: "Fixed, in writing, before you pay", fr: "Fixé par écrit, avant de payer" } },
      { label: { en: "Payment", fr: "Paiement" }, value: { en: "50% to start · 50% at launch", fr: "50 % au début · 50 % à la mise en ligne" } },
      { label: { en: "Timeline", fr: "Délai" }, value: { en: "1–6 weeks, from your content", fr: "1 à 6 semaines, dès vos contenus reçus" } },
      { label: { en: "Owner", fr: "Propriétaire" }, value: { en: "You. Domain, hosting, files.", fr: "Vous. Domaine, hébergement, fichiers." }, highlight: true },
    ],
    footer: { en: "Douala · remote worldwide", fr: "Douala · à distance partout" },
  },

  stepsTitle: { en: "The six steps", fr: "Les six étapes" },
  labels: {
    step: { en: "Step", fr: "Étape" },
    of: { en: "of", fr: "sur" },
    you: { en: "You", fr: "Vous" },
    me: { en: "Me", fr: "Moi" },
    get: { en: "You get", fr: "Vous obtenez" },
    pay: { en: "You pay 50%", fr: "Vous payez 50 %" },
    handover: { en: "Keys → you", fr: "Clés → vous" },
    done: { en: "Live and yours", fr: "En ligne et à vous" },
  },

  steps: [
    {
      when: { en: "Day 1", fr: "Jour 1" },
      title: { en: "You tell me what you need", fr: "Vous m'expliquez votre besoin" },
      you: {
        en: "Send a WhatsApp message: what your business does and what the site is for.",
        fr: "Un message WhatsApp : ce que fait votre entreprise et à quoi doit servir le site.",
      },
      me: { en: "I reply within 24 hours with a few questions.", fr: "Je réponds sous 24 heures avec quelques questions." },
      get: {
        en: "A straight answer on what fits: showcase site, store, WordPress or custom.",
        fr: "Une réponse claire sur ce qui vous convient : vitrine, boutique, WordPress ou sur mesure.",
      },
    },
    {
      when: { en: "Days 1–3", fr: "Jours 1–3" },
      title: { en: "Written quote", fr: "Devis écrit" },
      you: { en: "Answer the questions, or take a short call if you prefer.", fr: "Vous répondez aux questions, ou on fait un court appel." },
      me: { en: "I write the quote: pages, features, price and timeline.", fr: "Je rédige le devis : pages, fonctionnalités, prix et délai." },
      get: {
        en: "An exact price and timeline in writing. Free, before you pay anything.",
        fr: "Un prix et un délai exacts, par écrit. Gratuit, avant de payer quoi que ce soit.",
      },
    },
    {
      when: { en: "Start", fr: "Démarrage" },
      title: { en: "Deposit and content", fr: "Acompte et contenus" },
      you: {
        en: "Pay 50% by MTN MoMo or Orange Money. Send your logo, texts and photos.",
        fr: "Vous payez 50 % par MTN MoMo ou Orange Money, et envoyez logo, textes et photos.",
      },
      me: {
        en: "I help with the texts and photos if you don't have them yet.",
        fr: "Je vous aide pour les textes et les photos si vous ne les avez pas encore.",
      },
      get: { en: "A start date. The timeline counts from here.", fr: "Une date de début. Le délai compte à partir d'ici." },
      pays: true,
    },
    {
      when: { en: "1–6 weeks", fr: "1 à 6 semaines" },
      title: { en: "Build, with previews", fr: "Création, avec aperçus" },
      you: {
        en: "Open the preview link on your phone and send changes. 2 rounds of changes are included.",
        fr: "Vous ouvrez le lien d'aperçu sur votre téléphone et demandez des changements. 2 séries de modifications sont incluses.",
      },
      me: {
        en: "I build it, and put every version on a private preview link.",
        fr: "Je construis le site et mets chaque version sur un lien d'aperçu privé.",
      },
      get: {
        en: "You watch your site take shape, instead of a surprise at the end.",
        fr: "Vous voyez votre site avancer, au lieu d'une surprise à la fin.",
      },
    },
    {
      when: { en: "Launch day", fr: "Jour J" },
      title: { en: "Launch and handover", fr: "Mise en ligne et remise des clés" },
      you: { en: "Approve the site and pay the remaining 50%.", fr: "Vous validez le site et payez les 50 % restants." },
      me: {
        en: "I put it online on your domain and connect Google Search Console.",
        fr: "Je le mets en ligne sur votre domaine et connecte Google Search Console.",
      },
      get: {
        en: "Domain, hosting and accounts in your name, plus a short video on how to edit it.",
        fr: "Domaine, hébergement et comptes à votre nom, et une courte vidéo pour le modifier.",
      },
      pays: true,
      handover: true,
    },
    {
      when: { en: "After", fr: "Ensuite" },
      title: { en: "After launch", fr: "Après la mise en ligne" },
      you: { en: "Use your site. Tell me if anything breaks.", fr: "Vous utilisez votre site et me signalez tout problème." },
      me: { en: "I fix bugs for free for 30 days.", fr: "Je corrige les bugs gratuitement pendant 30 jours." },
      get: {
        en: "Optional care, {care} FCFA a month: updates, backups and security.",
        fr: "Maintenance en option, {care} FCFA par mois : mises à jour, sauvegardes et sécurité.",
      },
    },
  ] satisfies ProcessStep[] as ProcessStep[],

  own: {
    title: { en: "Always yours", fr: "Toujours à vous" },
    text: {
      en: "Some developers keep the domain or the passwords. I don't. Everything is in your name from day one.",
      fr: "Certains développeurs gardent le domaine ou les mots de passe. Pas moi. Tout est à votre nom dès le premier jour.",
    },
    items: [
      { what: { en: "Domain name", fr: "Nom de domaine" }, status: { en: "In your name", fr: "À votre nom" } },
      { what: { en: "Hosting account", fr: "Hébergement" }, status: { en: "Paid by you, directly", fr: "Payé directement par vous" } },
      { what: { en: "Texts, photos and logo", fr: "Textes, photos et logo" }, status: { en: "Yours", fr: "À vous" } },
      { what: { en: "Site files and admin access", fr: "Fichiers du site et accès administrateur" }, status: { en: "Handed over", fr: "Remis à la livraison" } },
    ],
  },

  need: {
    title: { en: "What I need from you", fr: "Ce dont j'ai besoin" },
    text: {
      en: "Missing something? Say so. I'll help, and anything big gets quoted separately so there are no surprises.",
      fr: "Il vous manque quelque chose ? Dites-le. Je vous aide, et tout ce qui est important est chiffré à part, sans surprise.",
    },
    items: [
      { en: "Your logo", fr: "Votre logo" },
      { en: "Texts for each page, or notes I can turn into texts", fr: "Les textes de chaque page, ou des notes que je transforme en textes" },
      { en: "Photos, or I find free-to-use ones", fr: "Des photos, ou j'en trouve de libres de droits" },
      { en: "Answers to my questions within a few days", fr: "Des réponses à mes questions sous quelques jours" },
    ],
  },

  cta: {
    eyebrow: { en: "Step 01 starts here", fr: "L'étape 01 commence ici" },
    title: { en: "Send the first message.", fr: "Envoyez le premier message." },
    text: {
      en: "Tell me what your business does. You'll get a written quote before paying anything.",
      fr: "Dites-moi ce que fait votre entreprise. Vous recevez un devis écrit avant de payer quoi que ce soit.",
    },
    button: { en: "Start on WhatsApp", fr: "Commencer sur WhatsApp" },
    prices: { en: "See prices", fr: "Voir les tarifs" },
    faq: { en: "More questions? Read the FAQ", fr: "D'autres questions ? Lisez la FAQ" },
  },
};
