import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  Zap,
  Shield,
  Smartphone,
  Monitor,
  BarChart3,
  RefreshCw,
  Printer,
  ScanLine,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MODULES } from "@/data/modules";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NexusPOS — Plateforme SaaS multi-modules" },
      {
        name: "description",
        content:
          "Site officiel NexusPOS. Restaurant, boutique, hôtel, salon, sport, événementiel : un seul système synchronisé avec votre POS Desktop et mobile.",
      },
      { property: "og:title", content: "NexusPOS — Une plateforme, dix métiers" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden border-b border-border"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Plateforme unifiée · 10 modules métier
              </span>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Une plateforme,{" "}
                <span className="text-primary">tous vos métiers</span>.
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
                Vendez, réservez, encaissez et pilotez votre activité sur un seul
                système — synchronisé en temps réel entre votre site web, votre POS
                Desktop et votre application mobile.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button size="lg" asChild>
                  <Link to="/modules">
                    Découvrir les modules
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/contact">Demander une démo</Link>
                </Button>
              </div>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                {["Sans engagement", "Mise en service en 48 h", "Support local"].map(
                  (t) => (
                    <li key={t} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      {t}
                    </li>
                  ),
                )}
              </ul>
            </div>

            {/* Console mockup */}
            <div className="relative">
              <div
                className="rounded-xl border border-border bg-card p-2"
                style={{ boxShadow: "var(--shadow-lg)" }}
              >
                <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/60" />
                  <span className="ml-3 text-xs text-muted-foreground">
                    admin.nexuspos.app
                  </span>
                </div>
                <div className="grid gap-3 p-4 sm:grid-cols-3">
                  {[
                    { label: "Ventes du jour", value: "1 248 €", trend: "+12%" },
                    { label: "Réservations", value: "47", trend: "+8%" },
                    { label: "Tickets POS", value: "183", trend: "+24%" },
                  ].map((s) => (
                    <div key={s.label} className="rounded-lg bg-secondary/60 p-3">
                      <p className="text-xs text-muted-foreground">{s.label}</p>
                      <p className="mt-1 text-xl font-semibold text-foreground">
                        {s.value}
                      </p>
                      <p className="text-xs font-medium text-primary">{s.trend}</p>
                    </div>
                  ))}
                </div>
                <div className="mx-4 mb-4 h-32 rounded-lg bg-gradient-to-br from-primary/15 to-primary/5">
                  <div className="flex h-full items-end gap-1 p-3">
                    {[40, 65, 35, 80, 55, 90, 70, 60, 85, 95, 75, 100].map(
                      (h, i) => (
                        <div
                          key={i}
                          style={{ height: `${h}%` }}
                          className="flex-1 rounded-sm bg-primary/70"
                        />
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modules grid */}
      <section className="border-b border-border py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-wide text-primary">
              Modules métier
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Conçu pour votre activité
            </h2>
            <p className="mt-4 text-muted-foreground">
              Activez uniquement les modules dont vous avez besoin. Données isolées
              par activité, interface unifiée.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {MODULES.map((m) => {
              const Icon = m.icon;
              return (
                <Link
                  key={m.slug}
                  to="/modules/$slug"
                  params={{ slug: m.slug }}
                  className="group rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/50 hover:shadow-md"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-semibold text-foreground">{m.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{m.tagline}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className="border-b border-border bg-secondary/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-primary">
                Architecture
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Web, Desktop, Mobile —{" "}
                <span className="text-primary">une seule source de vérité</span>.
              </h2>
              <p className="mt-4 text-muted-foreground">
                Toute commande effectuée sur le site apparaît instantanément sur
                votre POS Desktop, votre app mobile et le panneau Admin. Pas de
                synchronisation manuelle, pas de doublon.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  { icon: Monitor, title: "Desktop POS", desc: "Windows + Electron" },
                  { icon: Smartphone, title: "Android", desc: "APK natif" },
                  { icon: BarChart3, title: "Admin Web", desc: "Pilotage temps réel" },
                  { icon: Shield, title: "Super Admin", desc: "Supervision globale" },
                ].map((c) => {
                  const Icon = c.icon;
                  return (
                    <div
                      key={c.title}
                      className="rounded-lg border border-border bg-background p-4"
                    >
                      <Icon className="h-5 w-5 text-primary" />
                      <p className="mt-2 font-semibold text-foreground">{c.title}</p>
                      <p className="text-sm text-muted-foreground">{c.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-xl border border-border bg-background p-8">
              <h3 className="font-semibold text-foreground">Matériel POS pris en charge</h3>
              <ul className="mt-5 space-y-4">
                {[
                  { icon: ScanLine, title: "Scanner QR / code-barres", port: "COM3" },
                  { icon: Monitor, title: "Afficheur client LED", port: "COM2" },
                  { icon: Printer, title: "Imprimante thermique 58 mm", port: "LPT1" },
                  { icon: Zap, title: "Clavier tactile Windows", port: "Auto" },
                ].map((h) => {
                  const Icon = h.icon;
                  return (
                    <li
                      key={h.title}
                      className="flex items-center justify-between gap-4 border-b border-border pb-3 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5 text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">
                          {h.title}
                        </span>
                      </div>
                      <span className="rounded-md bg-secondary px-2 py-0.5 font-mono text-xs text-muted-foreground">
                        {h.port}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b border-border py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: RefreshCw,
                title: "Temps réel",
                desc: "Réservations, commandes et stocks synchronisés à la milliseconde sur tous les écrans.",
              },
              {
                icon: Shield,
                title: "Sécurité par défaut",
                desc: "Authentification chiffrée, isolation des données par module et audit complet.",
              },
              {
                icon: BarChart3,
                title: "Statistiques",
                desc: "Tableaux de bord par module et vue consolidée Super Admin.",
              },
              {
                icon: Zap,
                title: "Diagnostic matériel",
                desc: "Test scanner, imprimante et afficheur en un clic.",
              },
              {
                icon: CheckCircle2,
                title: "Import Excel / JSON",
                desc: "Migrez votre catalogue existant en quelques minutes.",
              },
              {
                icon: Monitor,
                title: "Mode clair / sombre",
                desc: "Interface adaptée au comptoir comme au bureau.",
              },
            ].map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title}>
                  <Icon className="h-5 w-5 text-primary" />
                  <h3 className="mt-3 font-semibold text-foreground">{f.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Prêt à unifier votre activité ?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Rejoignez les commerces qui pilotent leur activité avec NexusPOS.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button size="lg" asChild>
              <Link to="/contact">Demander une démo</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/modules">Explorer les modules</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
