import { motion } from 'framer-motion';
import {
  ShoppingBag, UtensilsCrossed, Hotel, Dumbbell, Waves, Scissors,
  Trophy, Calendar, MonitorPlay, Ticket, Check, Sparkles, ShieldCheck,
  Clock, Zap, type LucideIcon,
} from 'lucide-react';

type ModuleInfo = {
  slug: string;
  eyebrow: string;
  title: string;
  highlight: string;
  tagline: string;
  description: string;
  bullets: string[];
  stats: { value: string; label: string }[];
  icon: LucideIcon;
  /** Tailwind gradient classes for the hero accent */
  gradient: string;
  /** Solid accent color for the icon halo */
  accent: string;
};

const MODULES: ModuleInfo[] = [
  {
    slug: 'boutique',
    eyebrow: 'Shopping intelligent',
    title: 'Votre boutique',
    highlight: 'ouverte 24h/24',
    tagline: 'Parcourez, comparez, commandez — sans quitter votre canapé.',
    description:
      "Des centaines de produits soigneusement sélectionnés, des prix transparents, un panier qui vous suit partout et une confirmation en moins d'une minute. Du local au premium, tout est à portée de clic.",
    bullets: [
      'Catalogue mis à jour en temps réel — fini les ruptures surprises',
      'Favoris synchronisés sur tous vos appareils',
      'Paiement Mobile Money, carte ou cash à la livraison',
      'Retrait en magasin ou livraison express',
    ],
    stats: [
      { value: '500+', label: 'produits' },
      { value: '4.8★', label: 'note clients' },
      { value: '24h', label: 'livraison' },
    ],
    icon: ShoppingBag,
    gradient: 'from-blue-500/20 via-indigo-500/10 to-transparent',
    accent: 'bg-blue-500',
  },
  {
    slug: 'restaurant',
    eyebrow: 'Gastronomie & saveurs',
    title: 'Le bon plat,',
    highlight: 'au bon moment',
    tagline: 'Réservez votre table ou commandez — la cuisine vous attend.',
    description:
      "Un menu numérique mis à jour chaque jour, des chefs passionnés, et un suivi en direct de votre commande. Que ce soit sur place, à emporter ou en livraison, vivez l'expérience d'un vrai service.",
    bullets: [
      'Réservation de table avec confirmation instantanée',
      'Commande à emporter ou livraison à domicile',
      "Suivi en direct : préparation, sortie cuisine, livraison",
      'Notes personnalisées pour vos préférences alimentaires',
    ],
    stats: [
      { value: '60+', label: 'plats' },
      { value: '25 min', label: 'préparation' },
      { value: '4.9★', label: 'satisfaction' },
    ],
    icon: UtensilsCrossed,
    gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
    accent: 'bg-amber-500',
  },
  {
    slug: 'hotel',
    eyebrow: 'Séjours & escapades',
    title: 'Votre chambre,',
    highlight: 'réservée en un clin d\'œil',
    tagline: 'Check-in en ligne, confort hors du commun.',
    description:
      "Du studio cosy à la suite vue mer, choisissez votre chambre, payez l'acompte et recevez votre QR de check-in. Plus de file d'attente à la réception : votre séjour commence à la seconde où vous validez.",
    bullets: [
      'Disponibilité en temps réel — pas de surbooking',
      'Acompte sécurisé, paiement du reste sur place',
      "Check-in / Check-out 100% digital",
      'Services additionnels (spa, petit-déj, transferts) en option',
    ],
    stats: [
      { value: '24', label: 'chambres' },
      { value: '4.9★', label: 'avis' },
      { value: '60s', label: 'pour réserver' },
    ],
    icon: Hotel,
    gradient: 'from-indigo-500/20 via-violet-500/10 to-transparent',
    accent: 'bg-indigo-500',
  },
  {
    slug: 'salle-de-sport',
    eyebrow: 'Fitness & bien-être',
    title: 'Votre corps,',
    highlight: 'votre rythme',
    tagline: 'Coachs certifiés, machines pro, abonnement flexible.',
    description:
      "Choisissez votre formule, réservez vos séances avec un coach et suivez vos progrès. Notre salle est pensée pour les débutants comme pour les athlètes — chacun y trouve son objectif.",
    bullets: [
      'Abonnements mensuels, trimestriels ou annuels',
      'Réservation de séances avec coach personnel',
      'Check-in par QR code à l\'accueil',
      'Renouvellement automatique pour ne jamais s\'interrompre',
    ],
    stats: [
      { value: '8', label: 'coachs pros' },
      { value: '6h–22h', label: 'ouvert' },
      { value: '+1200', label: 'membres actifs' },
    ],
    icon: Dumbbell,
    gradient: 'from-emerald-500/20 via-green-500/10 to-transparent',
    accent: 'bg-emerald-500',
  },
  {
    slug: 'piscine',
    eyebrow: 'Détente aquatique',
    title: 'L\'eau,',
    highlight: 'à la demande',
    tagline: 'Entrée libre, cours collectifs, leçons privées.',
    description:
      "Une eau cristalline, une équipe maître-nageur, et des forfaits pensés pour toute la famille. Achetez votre pass d'entrées ou réservez vos cours en quelques secondes.",
    bullets: [
      'Pass 10 entrées rechargeable',
      'Cours collectifs débutants, intermédiaires, avancés',
      'Leçons privées pour adultes et enfants',
      'Contrôle qualité de l\'eau affiché en direct',
    ],
    stats: [
      { value: '25m', label: 'bassin' },
      { value: '28°C', label: 'température' },
      { value: '7j/7', label: 'accès' },
    ],
    icon: Waves,
    gradient: 'from-sky-500/20 via-cyan-500/10 to-transparent',
    accent: 'bg-sky-500',
  },
  {
    slug: 'salon',
    eyebrow: 'Beauté & style',
    title: 'Votre style,',
    highlight: 'révélé',
    tagline: 'Coiffeurs experts, créneaux flexibles, résultat garanti.',
    description:
      "Coupe, couleur, soin, brushing : choisissez votre prestation, votre coiffeur préféré et votre créneau. Rappels automatiques avant le rendez-vous pour ne plus jamais l'oublier.",
    bullets: [
      'Sélection du coiffeur et du service en 30 secondes',
      'Rappels SMS et notifications avant le RDV',
      'Historique de vos coupes et préférences',
      'Annulation gratuite jusqu\'à 2h avant',
    ],
    stats: [
      { value: '6', label: 'coiffeurs' },
      { value: '20+', label: 'prestations' },
      { value: '4.8★', label: 'avis' },
    ],
    icon: Scissors,
    gradient: 'from-rose-500/20 via-pink-500/10 to-transparent',
    accent: 'bg-rose-500',
  },
  {
    slug: 'terrain-foot',
    eyebrow: 'Sport collectif',
    title: 'Le terrain,',
    highlight: 'quand vous voulez',
    tagline: 'Synthétique pro, éclairage LED, créneaux à l\'heure.',
    description:
      "Réunissez vos amis, choisissez votre créneau, le terrain est à vous. Notre synthétique dernière génération est éclairé jusqu'à 23h pour les soirées match entre potes.",
    bullets: [
      'Réservation à l\'heure avec confirmation immédiate',
      'Éclairage LED inclus en soirée',
      'Vestiaires et douches à disposition',
      'Annulation flexible jusqu\'à 24h avant',
    ],
    stats: [
      { value: '1h', label: 'minimum' },
      { value: '23h', label: 'jusqu\'à' },
      { value: 'Pro', label: 'synthétique' },
    ],
    icon: Trophy,
    gradient: 'from-lime-500/20 via-green-500/10 to-transparent',
    accent: 'bg-lime-500',
  },
  {
    slug: 'evenementiel',
    eyebrow: 'Événements sur mesure',
    title: 'Votre événement,',
    highlight: 'orchestré',
    tagline: 'Salles, traiteur, déco, animation — tout au même endroit.',
    description:
      "Mariage, anniversaire, séminaire ou lancement produit : composez votre événement en quelques clics. Devis instantané, signature électronique, acompte sécurisé — votre date est bloquée.",
    bullets: [
      'Devis en ligne en moins de 2 minutes',
      'Options modulaires (traiteur, DJ, déco, photographe)',
      'Signature électronique du contrat',
      'Acompte sécurisé, solde le jour J',
    ],
    stats: [
      { value: '4', label: 'salles' },
      { value: '50–500', label: 'invités' },
      { value: '2 min', label: 'pour le devis' },
    ],
    icon: Calendar,
    gradient: 'from-purple-500/20 via-fuchsia-500/10 to-transparent',
    accent: 'bg-purple-500',
  },
  {
    slug: 'cybercafe',
    eyebrow: 'Espace numérique',
    title: 'Postes nouvelle génération,',
    highlight: 'connexion fibre',
    tagline: 'Bureautique, gaming, impression — tout est prêt.',
    description:
      "Des PC dernière génération, une connexion fibre stable, des écrans HD, et tous les services annexes : impression, scan, retouche photo. Réservez votre poste à la minute.",
    bullets: [
      'PC haute performance pour gaming et bureautique',
      'Fibre 200 Mbps + Wi-Fi 6',
      'Services : impression, scan, retouche, gravure',
      'Forfaits à l\'heure ou abonnement mensuel',
    ],
    stats: [
      { value: '20', label: 'postes' },
      { value: '200 Mbps', label: 'fibre' },
      { value: '7j/7', label: 'ouvert' },
    ],
    icon: MonitorPlay,
    gradient: 'from-cyan-500/20 via-teal-500/10 to-transparent',
    accent: 'bg-cyan-500',
  },
  {
    slug: 'spectacles',
    eyebrow: 'Culture live',
    title: 'La scène,',
    highlight: 'à portée de billet',
    tagline: 'Plan de salle interactif, e-ticket QR, sans file d\'attente.',
    description:
      "Concerts, théâtre, humour, spectacles familiaux : visualisez la salle, choisissez vos sièges, recevez votre e-ticket. Plus jamais de mauvaise place ni de queue au guichet.",
    bullets: [
      'Plan de salle interactif avec sièges en temps réel',
      'E-ticket QR envoyé immédiatement par email',
      'Tarifs étudiants et groupes disponibles',
      'Annulation jusqu\'à 48h avant l\'événement',
    ],
    stats: [
      { value: '500+', label: 'places' },
      { value: 'QR', label: 'billet digital' },
      { value: '4.9★', label: 'expérience' },
    ],
    icon: Ticket,
    gradient: 'from-fuchsia-500/20 via-pink-500/10 to-transparent',
    accent: 'bg-fuchsia-500',
  },
];

const PROMISES = [
  { icon: ShieldCheck, label: 'Paiement sécurisé' },
  { icon: Zap, label: 'Confirmation instantanée' },
  { icon: Clock, label: 'Support 7j/7' },
  { icon: Sparkles, label: 'Sans frais cachés' },
];

export function getModuleInfo(slug: string): ModuleInfo | null {
  return MODULES.find((m) => m.slug === slug) ?? null;
}

export default function ModuleHero({ slug }: { slug: string }) {
  const info = getModuleInfo(slug);
  if (!info) return null;
  const Icon = info.icon;

  return (
    <section className="relative overflow-hidden border-b border-border bg-card">
      <div
        aria-hidden
        className={`absolute inset-0 bg-gradient-to-br ${info.gradient}`}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/70 backdrop-blur border border-border text-[11px] font-semibold uppercase tracking-[0.15em] text-primary mb-5">
              <Sparkles className="w-3.5 h-3.5" />
              {info.eyebrow}
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.02] tracking-tight text-foreground mb-4">
              {info.title}{' '}
              <span className="italic text-primary">{info.highlight}</span>
            </h1>

            <p className="text-base sm:text-lg text-foreground/80 font-medium mb-3 max-w-xl">
              {info.tagline}
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mb-6">
              {info.description}
            </p>

            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5 mb-6 max-w-2xl">
              {info.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-foreground/85">
                  <span
                    className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${info.accent}/15`}
                  >
                    <Check className="w-3.5 h-3.5 text-primary" />
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2">
              {PROMISES.map((p) => (
                <div
                  key={p.label}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground"
                >
                  <p.icon className="w-3.5 h-3.5 text-primary" />
                  {p.label}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-3xl border border-border bg-background/60 backdrop-blur p-6 sm:p-8 shadow-trust-lg">
              <div className="flex items-start gap-4 mb-6">
                <div
                  className={`w-14 h-14 rounded-2xl ${info.accent}/15 flex items-center justify-center shadow-trust`}
                >
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-semibold mb-1">
                    En chiffres
                  </div>
                  <div className="font-display text-lg leading-tight">
                    Une expérience pensée pour vous.
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {info.stats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl border border-border bg-card p-3 text-center"
                  >
                    <div className="font-display text-xl sm:text-2xl text-foreground leading-none mb-1">
                      {s.value}
                    </div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-5 border-t border-border flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Avis vérifiés</span>
                <span className="font-semibold text-amber-500">
                  ★★★★★ <span className="text-foreground">4.8/5</span>
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}