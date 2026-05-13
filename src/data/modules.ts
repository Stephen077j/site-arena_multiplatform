import {
  UtensilsCrossed,
  ShoppingBag,
  Scissors,
  Trophy,
  Hotel,
  Waves,
  PartyPopper,
  Cloud,
  Music,
  Dumbbell,
  type LucideIcon,
} from "lucide-react";

export interface ModuleInfo {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  workflow: string[];
  accent: string;
}

export const MODULES: ModuleInfo[] = [
  {
    slug: "restaurant",
    name: "Restaurant",
    tagline: "Salle, cuisine et caisse synchronisées",
    description:
      "Gérez la prise de commande à table, l'envoi en cuisine, la facturation et la livraison depuis une seule interface connectée à votre POS.",
    icon: UtensilsCrossed,
    features: [
      "Carte digitale et menus du jour",
      "Commande à table avec QR code",
      "Cuisine ticket imprimé temps réel",
      "Pourboires, divisions d'addition",
      "Suivi des stocks d'ingrédients",
    ],
    workflow: [
      "Le client scanne le QR à sa table",
      "Commande envoyée au POS et en cuisine",
      "Paiement en ligne ou en caisse",
      "Ticket imprimé sur l'imprimante 58 mm",
    ],
    accent: "from-orange-500 to-red-500",
  },
  {
    slug: "boutique",
    name: "Boutique",
    tagline: "Catalogue, panier et stock unifiés",
    description:
      "Vente en ligne et en magasin avec un seul stock. Scanner code-barres, étiquettes, promotions et fidélité intégrés.",
    icon: ShoppingBag,
    features: [
      "Catalogue produit illimité",
      "Stock multi-points de vente",
      "Codes-barres et étiquettes",
      "Promotions, coupons, fidélité",
      "Click & Collect, livraison",
    ],
    workflow: [
      "Le client commande sur le site",
      "Stock décrémenté en temps réel",
      "Préparation notifiée en magasin",
      "Encaissement ou retrait en boutique",
    ],
    accent: "from-blue-500 to-indigo-500",
  },
  {
    slug: "salon-coiffure",
    name: "Salon de coiffure",
    tagline: "Réservation en ligne et fiche client",
    description:
      "Calendrier par coiffeur, prestations, produits revendus et historique client. Rappel SMS et acompte en ligne.",
    icon: Scissors,
    features: [
      "Agenda par professionnel",
      "Prestations et durées",
      "Acompte de réservation",
      "Fiche client et historique",
      "Rappels automatiques",
    ],
    workflow: [
      "Le client choisit prestation et créneau",
      "Acompte payé en ligne",
      "Rappel envoyé la veille",
      "Encaissement final au salon",
    ],
    accent: "from-pink-500 to-rose-500",
  },
  {
    slug: "terrain-basket",
    name: "Terrain de basket",
    tagline: "Réservation de créneaux à l'heure",
    description:
      "Calendrier multi-terrains, tarifs par plage horaire, abonnements mensuels et tournois.",
    icon: Trophy,
    features: [
      "Calendrier multi-terrains",
      "Tarifs heures pleines / creuses",
      "Abonnements et carnets",
      "Gestion d'équipes et tournois",
      "Paiement à la réservation",
    ],
    workflow: [
      "Le joueur réserve un créneau",
      "Paiement en ligne sécurisé",
      "Confirmation envoyée par email",
      "Accès validé sur place",
    ],
    accent: "from-amber-500 to-orange-500",
  },
  {
    slug: "hotel",
    name: "Hôtel",
    tagline: "Chambres, services et tarifs dynamiques",
    description:
      "Disponibilités en temps réel, tarifs saisonniers, options petit-déjeuner et services additionnels.",
    icon: Hotel,
    features: [
      "Catalogue de chambres",
      "Tarifs saisonniers",
      "Services additionnels",
      "Politique d'annulation",
      "Check-in / Check-out",
    ],
    workflow: [
      "Le client cherche par dates",
      "Réserve et paie l'acompte",
      "Reçoit confirmation et facture",
      "Check-in synchronisé au POS",
    ],
    accent: "from-cyan-500 to-blue-500",
  },
  {
    slug: "piscine",
    name: "Piscine",
    tagline: "Entrées, abonnements et cours",
    description:
      "Vente d'entrées à l'unité, carnets, abonnements et inscription aux cours d'aquagym.",
    icon: Waves,
    features: [
      "Entrées à l'unité",
      "Abonnements mensuels / annuels",
      "Cours d'aquagym",
      "Cartes de fidélité",
      "Contrôle d'accès QR",
    ],
    workflow: [
      "Achat en ligne ou en caisse",
      "QR généré pour l'accès",
      "Scan à l'entrée du complexe",
      "Suivi des entrées par client",
    ],
    accent: "from-sky-500 to-cyan-500",
  },
  {
    slug: "evenementiel",
    name: "Événementiel",
    tagline: "Billetterie, places assises et invités",
    description:
      "Création d'événements, plan de salle, catégories de billets, codes promo et listing des participants.",
    icon: PartyPopper,
    features: [
      "Catégories de billets",
      "Plan de salle interactif",
      "Codes promo et early bird",
      "Liste invités exportable",
      "Scan QR à l'entrée",
    ],
    workflow: [
      "Création de l'événement par l'admin",
      "Vente en ligne ouverte",
      "Billet QR envoyé par email",
      "Scan validé à l'entrée",
    ],
    accent: "from-purple-500 to-fuchsia-500",
  },
  {
    slug: "services-numeriques",
    name: "Services numériques",
    tagline: "Abonnements et licences logicielles",
    description:
      "Vente de services numériques, abonnements récurrents, licences avec activation par clé.",
    icon: Cloud,
    features: [
      "Abonnements récurrents",
      "Licences à clé",
      "Téléchargements protégés",
      "Renouvellement automatique",
      "Factures PDF",
    ],
    workflow: [
      "Le client souscrit en ligne",
      "Compte activé immédiatement",
      "Facture envoyée automatiquement",
      "Renouvellement programmé",
    ],
    accent: "from-teal-500 to-emerald-500",
  },
  {
    slug: "spectacles",
    name: "Spectacles",
    tagline: "Séances, salles et placement",
    description:
      "Programmation des séances, gestion des salles, placement libre ou numéroté, tarifs réduits.",
    icon: Music,
    features: [
      "Programmation des séances",
      "Placement libre ou numéroté",
      "Tarifs réduits / étudiants",
      "Pass multi-spectacles",
      "Statistiques de remplissage",
    ],
    workflow: [
      "Choix de la séance et des places",
      "Paiement et e-billet QR",
      "Contrôle à l'entrée",
      "Rapport de fréquentation",
    ],
    accent: "from-violet-500 to-purple-500",
  },
  {
    slug: "sport",
    name: "Sport / activités",
    tagline: "Cours, coachs et abonnements",
    description:
      "Catalogue d'activités sportives, coachs, créneaux et abonnements mensuels avec contrôle d'accès.",
    icon: Dumbbell,
    features: [
      "Catalogue d'activités",
      "Coachs et profils",
      "Abonnements et cartes",
      "Réservation de cours",
      "Suivi de présence",
    ],
    workflow: [
      "Inscription en ligne",
      "Réservation des cours",
      "Accès validé par QR",
      "Suivi des séances effectuées",
    ],
    accent: "from-lime-500 to-green-500",
  },
];

export const getModule = (slug: string) =>
  MODULES.find((m) => m.slug === slug);