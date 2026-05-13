import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { MODULES } from "@/data/modules";

export const Route = createFileRoute("/modules/")({
  head: () => ({
    meta: [
      { title: "Modules métier — NexusPOS" },
      {
        name: "description",
        content:
          "Restaurant, boutique, hôtel, salon, sport, événementiel, spectacles… Découvrez les 10 modules métier de NexusPOS.",
      },
      { property: "og:title", content: "Modules métier — NexusPOS" },
    ],
  }),
  component: ModulesIndex,
});

function ModulesIndex() {
  return (
    <>
      <section className="border-b border-border" style={{ background: "var(--gradient-hero)" }}>
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-medium uppercase tracking-wide text-primary">Modules</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            10 modules. Une plateforme.
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Activez les modules dont vous avez besoin. Chaque module possède ses
            propres produits, services, commandes, réservations et rapports —
            isolés mais pilotés depuis le même panneau.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {MODULES.map((m) => {
              const Icon = m.icon;
              return (
                <Link
                  key={m.slug}
                  to="/modules/$slug"
                  params={{ slug: m.slug }}
                  className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-md"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-secondary text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h2 className="mt-4 text-lg font-semibold text-foreground">{m.name}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{m.tagline}</p>
                  <p className="mt-3 line-clamp-3 text-sm text-muted-foreground/90">
                    {m.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Voir le module
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}