import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Search, ArrowRight, ShoppingBag, UtensilsCrossed, Hotel, Dumbbell,
  Waves, Scissors, Calendar, MonitorPlay, Ticket, Trophy, Star,
  Sparkles, ShieldCheck, Clock, CreditCard, MapPin, ChevronRight, Quote, Mail
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

/* -------------------- Data -------------------- */

const CATEGORIES = [
  { icon: ShoppingBag,     label: 'Boutique',       hint: '128 produits',  tone: 'from-blue-500/15 to-blue-500/0', path: '/boutique' },
  { icon: UtensilsCrossed, label: 'Restaurant',     hint: 'Menu & réservation', tone: 'from-amber-500/15 to-amber-500/0', path: '/restaurant' },
  { icon: Hotel,           label: 'Hôtel',          hint: '24 chambres',  tone: 'from-indigo-500/15 to-indigo-500/0', path: '/hotel' },
  { icon: Dumbbell,        label: 'Salle de sport', hint: 'Abonnements',  tone: 'from-emerald-500/15 to-emerald-500/0', path: '/salle-de-sport' },
  { icon: Waves,           label: 'Piscine',        hint: 'Cours & forfaits', tone: 'from-sky-500/15 to-sky-500/0', path: '/piscine' },
  { icon: Scissors,        label: 'Salon',          hint: 'Prise de RDV', tone: 'from-rose-500/15 to-rose-500/0', path: '/salon' },
  { icon: Trophy,          label: 'Terrain foot',   hint: 'Créneaux dispo', tone: 'from-lime-500/15 to-lime-500/0', path: '/terrain-foot' },
  { icon: Calendar,        label: 'Événementiel',   hint: 'Devis instantané', tone: 'from-purple-500/15 to-purple-500/0', path: '/evenementiel' },
  { icon: MonitorPlay,     label: 'Cybercafé',      hint: 'Réserver un poste', tone: 'from-cyan-500/15 to-cyan-500/0', path: '/cybercafe' },
  { icon: Ticket,          label: 'Spectacles',     hint: 'E-tickets',    tone: 'from-fuchsia-500/15 to-fuchsia-500/0', path: '/spectacles' },
];

const PRODUCTS = [
  { name: 'Casque Audio Pro X', cat: 'Boutique',    price: '249 000 Ar',  old: '299 000 Ar', rating: 4.8, reviews: 124, badge: 'Top' },
  { name: 'Menu Découverte 3 plats', cat: 'Restaurant', price: '85 000 Ar', rating: 4.9, reviews: 312, badge: 'Populaire' },
  { name: 'Suite Vue Mer',         cat: 'Hôtel',     price: '420 000 Ar / nuit', rating: 4.9, reviews: 87, badge: 'Bestseller' },
  { name: 'Pass Gym Trimestriel',  cat: 'Salle de sport', price: '350 000 Ar', rating: 4.7, reviews: 56 },
  { name: 'Concert Live — Riake',  cat: 'Spectacles', price: 'À partir de 25 000 Ar', rating: 4.9, reviews: 410, badge: 'Cette semaine' },
  { name: 'Pack Coiffure Premium', cat: 'Salon',     price: '60 000 Ar',  rating: 4.8, reviews: 92 },
  { name: 'Terrain Synthétique 1h',cat: 'Football',  price: '80 000 Ar',  rating: 4.6, reviews: 73 },
  { name: 'Forfait Piscine 10 entrées', cat: 'Piscine', price: '120 000 Ar', rating: 4.7, reviews: 41 },
];

const SERVICES = [
  { title: 'Réservation chambre', desc: 'Choisissez vos dates, payez l\'acompte, check-in en ligne.', icon: Hotel },
  { title: 'Commande restaurant', desc: 'Livraison, retrait ou table — suivez la préparation en direct.', icon: UtensilsCrossed },
  { title: 'Créneau salon',       desc: 'Sélectionnez votre coiffeur et votre service en 30 secondes.', icon: Scissors },
  { title: 'Billet spectacle',    desc: 'Plan de salle interactif et QR code envoyé instantanément.', icon: Ticket },
];

const PROMOS = [
  { title: 'Lundi gourmand',    sub: '-20% sur tous les menus du restaurant', accent: 'bg-amber-500' },
  { title: 'Pack week-end',     sub: '2 nuits + petit-déjeuner offert',      accent: 'bg-indigo-500' },
  { title: 'Gym & Piscine',     sub: 'Premier mois à 50%',                   accent: 'bg-emerald-500' },
];

const TESTIMONIALS = [
  { name: 'Hanitra R.',  role: 'Cliente fidèle', text: 'Tout en un seul compte. Je commande mon repas, je réserve ma chambre et mes places de concert au même endroit. Bluffant.', rating: 5 },
  { name: 'Tahina M.',   role: 'Membre Gym',     text: 'Le renouvellement automatique de mon abonnement m\'évite tous les déplacements. Super simple.', rating: 5 },
  { name: 'Soa A.',      role: 'Organisatrice',  text: 'Devis événementiel reçu en 2 minutes avec signature électronique. Du jamais vu en local.', rating: 5 },
];

const TRUSTS = [
  { icon: ShieldCheck, label: 'Paiements sécurisés' },
  { icon: Clock,       label: 'Confirmation instantanée' },
  { icon: CreditCard,  label: 'MVola • Orange • Airtel • Visa' },
  { icon: MapPin,      label: 'Disponible dans toute la ville' },
];

/* -------------------- Page -------------------- */

const ClientHome = () => {
  const navigate = useNavigate();
  return (
    <div>
      {/* ============== HERO ============== */}
      <section className="relative overflow-hidden bg-hero-gradient">
        <div className="absolute inset-0 grid-pattern opacity-60" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-24 lg:pt-24 lg:pb-32">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-soft border border-primary/20 text-xs font-medium text-primary mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                Nouvelle expérience self-service • 100% en ligne
              </div>

              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-foreground mb-6">
                Tout ce dont vous avez besoin,
                <span className="block text-primary italic">en un seul endroit.</span>
              </h1>

              <p className="text-lg text-muted-foreground max-w-xl leading-relaxed mb-8">
                Réservez une chambre, commandez votre repas, achetez vos billets, gérez votre abonnement gym — sans appeler personne. Vous décidez, le système exécute.
              </p>

              {/* Universal search */}
              <div className="bg-card rounded-2xl shadow-trust-lg border border-border p-2 max-w-2xl">
                <div className="flex flex-col sm:flex-row items-stretch gap-2">
                  <div className="flex items-center gap-3 flex-1 px-4">
                    <Search className="w-5 h-5 text-primary shrink-0" />
                    <input
                      placeholder="Que cherchez-vous ? (chambre, plat, créneau, spectacle…)"
                      className="flex-1 bg-transparent outline-none py-3 text-sm placeholder:text-muted-foreground"
                    />
                  </div>
                  <Button size="lg" className="bg-primary-gradient text-white border-0 shadow-trust px-6">
                    Rechercher
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
                <div className="flex flex-wrap items-center gap-2 px-3 pt-3 pb-1">
                  <span className="text-xs text-muted-foreground mr-1">Suggestions :</span>
                  {['Chambre ce week-end', 'Pizza margherita', 'Cours de natation', 'Concert samedi', 'Coupe homme'].map(s => (
                    <button key={s} className="text-xs px-2.5 py-1 rounded-full bg-muted hover:bg-accent text-foreground transition">
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Trust row */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-8">
                {TRUSTS.map(t => (
                  <div key={t.label} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <t.icon className="w-4 h-4 text-primary" />
                    {t.label}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Floating preview cards */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-5 relative h-[460px] hidden lg:block"
            >
              <FloatingCard
                className="absolute top-0 right-4 w-72"
                delay={0}
                title="Suite Vue Mer"
                meta="420 000 Ar / nuit"
                tag="Hôtel"
                rating={4.9}
                icon={Hotel}
              />
              <FloatingCard
                className="absolute top-44 left-0 w-64"
                delay={0.3}
                title="Menu Découverte"
                meta="85 000 Ar — Livraison 25 min"
                tag="Restaurant"
                rating={4.9}
                icon={UtensilsCrossed}
              />
              <FloatingCard
                className="absolute bottom-0 right-12 w-72"
                delay={0.6}
                title="Concert Riake"
                meta="Samedi 20h • E-ticket QR"
                tag="Spectacle"
                rating={4.9}
                icon={Ticket}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============== CATEGORIES ============== */}
      <Section title="Explorez par catégorie" sub="Tous les services GestPro, accessibles 24/7.">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {CATEGORIES.map((c, i) => (
            <motion.button
              key={c.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              onClick={() => navigate(c.path)}
              className="card-lift group relative overflow-hidden rounded-2xl border border-border bg-card p-5 text-left"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${c.tone} opacity-70 group-hover:opacity-100 transition`} />
              <div className="relative">
                <div className="w-11 h-11 rounded-xl bg-background border border-border flex items-center justify-center mb-4 shadow-trust">
                  <c.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="font-semibold text-sm">{c.label}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{c.hint}</div>
              </div>
            </motion.button>
          ))}
        </div>
      </Section>

      {/* ============== POPULAR PRODUCTS ============== */}
      <Section
        title="Produits & services populaires"
        sub="Ce que nos clients adorent en ce moment."
        action={<Button variant="ghost" size="sm" className="gap-1">Tout voir <ChevronRight className="w-4 h-4" /></Button>}
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {PRODUCTS.map((p, i) => (
            <motion.article
              key={p.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.03 }}
              className="card-lift rounded-2xl border border-border bg-card overflow-hidden"
            >
              <div className="relative aspect-[4/3] bg-gradient-to-br from-accent to-secondary flex items-center justify-center">
                <div className="absolute inset-0 grid-pattern opacity-40" />
                <div className="relative w-14 h-14 rounded-2xl bg-card shadow-trust flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-primary" />
                </div>
                {p.badge && (
                  <span className="absolute top-3 left-3 px-2 py-1 rounded-full bg-foreground text-background text-[10px] font-semibold uppercase tracking-wider">
                    {p.badge}
                  </span>
                )}
                <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-card/90 backdrop-blur flex items-center justify-center hover:bg-card transition">
                  <Star className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
              <div className="p-4">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mb-1">{p.cat}</div>
                <h3 className="font-semibold text-sm leading-tight line-clamp-2 mb-2 min-h-[2.5rem]">{p.name}</h3>
                <div className="flex items-center gap-1.5 mb-3 text-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-semibold">{p.rating}</span>
                  <span className="text-muted-foreground">({p.reviews})</span>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <div className="font-bold text-sm text-foreground">{p.price}</div>
                    {p.old && <div className="text-xs text-muted-foreground line-through">{p.old}</div>}
                  </div>
                  <Button size="sm" variant="outline" className="h-8 px-3">+</Button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </Section>

      {/* ============== SERVICES BAND ============== */}
      <section className="py-20 bg-trust-gradient text-white relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <div className="text-xs uppercase tracking-[0.2em] text-white/60 mb-3">Services les plus réservés</div>
            <h2 className="font-display text-4xl sm:text-5xl text-white leading-tight">
              Réservez, payez, c'est fait.
            </h2>
            <p className="text-white/70 mt-4 max-w-lg">
              Plus de file d'attente, plus de coup de téléphone. Vos demandes sont confirmées instantanément.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVICES.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="group rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 p-6 transition cursor-pointer"
              >
                <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center mb-5">
                  <s.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-white/65 leading-relaxed">{s.desc}</p>
                <div className="flex items-center gap-1 text-xs text-white/80 mt-5 group-hover:gap-2 transition-all">
                  Réserver maintenant <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============== PROMOTIONS ============== */}
      <Section title="Promotions du moment" sub="Offres limitées, à saisir avant qu'elles ne disparaissent.">
        <div className="grid md:grid-cols-3 gap-5">
          {PROMOS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="card-lift relative overflow-hidden rounded-3xl bg-card border border-border p-7"
            >
              <div className={`absolute -top-12 -right-12 w-44 h-44 rounded-full ${p.accent} opacity-15 blur-2xl`} />
              <div className="relative">
                <span className="inline-block text-[10px] uppercase tracking-[0.18em] font-semibold text-primary mb-3">Promo</span>
                <h3 className="font-display text-3xl mb-2 leading-tight">{p.title}</h3>
                <p className="text-muted-foreground text-sm mb-6">{p.sub}</p>
                <Button variant="outline" size="sm" className="gap-1">
                  En profiter <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ============== TESTIMONIALS ============== */}
      <Section title="Ils nous font confiance" sub="Notes vérifiées par nos clients après leur expérience.">
        <div className="grid md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-border bg-card p-6 relative"
            >
              <Quote className="absolute top-5 right-5 w-7 h-7 text-primary/15" />
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-foreground leading-relaxed mb-6">"{t.text}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-10 h-10 rounded-full bg-primary-gradient flex items-center justify-center text-white font-semibold text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ============== NEWSLETTER ============== */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-primary-gradient p-10 sm:p-14 text-white">
            <div className="absolute inset-0 grid-pattern opacity-15" />
            <div className="relative grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-xs mb-5">
                  <Mail className="w-3.5 h-3.5" /> Newsletter
                </div>
                <h2 className="font-display text-4xl sm:text-5xl leading-tight mb-3">
                  Recevez nos meilleures offres
                </h2>
                <p className="text-white/85 max-w-md">
                  Promotions exclusives, nouveautés et événements — directement dans votre boîte mail.
                </p>
              </div>
              <form className="flex flex-col sm:flex-row gap-3" onSubmit={e => e.preventDefault()}>
                <Input
                  type="email"
                  placeholder="votre@email.com"
                  className="h-12 bg-white text-foreground border-0 placeholder:text-muted-foreground"
                />
                <Button size="lg" className="h-12 bg-foreground text-background hover:bg-foreground/90 border-0 px-6">
                  S'inscrire
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

/* -------------------- Helpers -------------------- */

const Section = ({
  title, sub, action, children,
}: {
  title: string;
  sub?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <section className="py-16">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between gap-6 mb-8">
        <div>
          <h2 className="font-display text-3xl sm:text-4xl leading-tight">{title}</h2>
          {sub && <p className="text-muted-foreground mt-2 text-sm">{sub}</p>}
        </div>
        {action}
      </div>
      {children}
    </div>
  </section>
);

const FloatingCard = ({
  className, delay, title, meta, tag, rating, icon: Icon,
}: {
  className?: string;
  delay: number;
  title: string;
  meta: string;
  tag: string;
  rating: number;
  icon: React.ComponentType<{ className?: string }>;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay }}
    className={`rounded-2xl bg-card shadow-trust-lg border border-border p-4 ${className}`}
  >
    <div className="flex items-center gap-3 mb-3">
      <div className="w-11 h-11 rounded-xl bg-primary-soft flex items-center justify-center">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{tag}</div>
        <div className="font-semibold text-sm truncate">{title}</div>
      </div>
    </div>
    <div className="text-xs text-muted-foreground mb-3">{meta}</div>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1 text-xs">
        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
        <span className="font-semibold">{rating}</span>
      </div>
      <Button size="sm" className="h-7 px-3 text-xs bg-primary-gradient text-white border-0">Réserver</Button>
    </div>
  </motion.div>
);

export default ClientHome;
