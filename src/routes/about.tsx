import { createFileRoute } from "@tanstack/react-router";
import { Target, Eye, Heart, Users } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "À propos — NexusPOS" },
      {
        name: "description",
        content:
          "NexusPOS unifie ventes, réservations et opérations multi-modules pour commerces et services en Afrique francophone et au-delà.",
      },
      { property: "og:title", content: "À propos — NexusPOS" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="border-b border-border" style={{ background: "var(--gradient-hero)" }}>
        <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
          <p className="text-sm font-medium uppercase tracking-wide text-primary">À propos</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Une plateforme pensée pour les commerces qui n'entrent pas dans une seule case.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            NexusPOS est née d'un constat simple : la plupart des entreprises gèrent
            plusieurs activités en parallèle (boutique + restauration, hôtel +
            piscine, salon + revente de produits) et s'épuisent à jongler entre des
            outils qui ne se parlent pas.
          </p>
        </div>
      </section>

      <section className="border-b border-border py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Target,
                title: "Notre mission",
                desc: "Donner à chaque commerce un système central, sans complexité technique, qui s'adapte à son métier.",
              },
              {
                icon: Eye,
                title: "Notre vision",
                desc: "Une plateforme où ajouter un module métier prend une journée, pas un projet de six mois.",
              },
              {
                icon: Heart,
                title: "Nos valeurs",
                desc: "Fiabilité, transparence et support local. Vos données restent les vôtres, à tout moment.",
              },
            ].map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.title} className="rounded-xl border border-border bg-card p-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-semibold text-foreground">{c.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-secondary/30 py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            { value: "10+", label: "Modules métier" },
            { value: "4", label: "Surfaces synchronisées" },
            { value: "<1s", label: "Latence temps réel" },
            { value: "24/7", label: "Disponibilité" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-4xl font-semibold tracking-tight text-primary">{s.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Users className="h-6 w-6 text-primary" />
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
            Pour qui ?
          </h2>
          <p className="mt-3 text-muted-foreground">
            NexusPOS s'adresse aux commerces et structures de services qui veulent
            arrêter d'empiler les outils. Que vous gériez une boutique unique ou un
            réseau multi-sites avec plusieurs activités, la plateforme s'adapte à
            votre fonctionnement.
          </p>
        </div>
      </section>
    </>
  );
}