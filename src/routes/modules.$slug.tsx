import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MODULES, getModule } from "@/data/modules";

export const Route = createFileRoute("/modules/$slug")({
  loader: ({ params }) => {
    const m = getModule(params.slug);
    if (!m) throw notFound();
    return { module: m };
  },
  head: ({ loaderData }) => {
    const m = loaderData?.module;
    if (!m) return { meta: [{ title: "Module — NexusPOS" }] };
    return {
      meta: [
        { title: `${m.name} — Module NexusPOS` },
        { name: "description", content: m.description },
        { property: "og:title", content: `${m.name} — Module NexusPOS` },
        { property: "og:description", content: m.description },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="text-3xl font-semibold text-foreground">Module introuvable</h1>
      <p className="mt-3 text-muted-foreground">
        Ce module n'existe pas ou a été retiré du catalogue.
      </p>
      <Button className="mt-6" asChild>
        <Link to="/modules">Voir tous les modules</Link>
      </Button>
    </div>
  ),
  component: ModulePage,
});

function ModulePage() {
  const { module: m } = Route.useLoaderData();
  const Icon = m.icon;

  const idx = MODULES.findIndex((x) => x.slug === m.slug);
  const next = MODULES[(idx + 1) % MODULES.length];

  return (
    <>
      <section className="border-b border-border" style={{ background: "var(--gradient-hero)" }}>
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Link
            to="/modules"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Tous les modules
          </Link>

          <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center">
            <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Icon className="h-7 w-7" />
            </span>
            <div>
              <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                {m.name}
              </h1>
              <p className="mt-2 text-lg text-muted-foreground">{m.tagline}</p>
            </div>
          </div>

          <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
            {m.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/contact">Demander une démo</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/modules">Comparer les modules</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-b border-border py-16">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-primary">
              Fonctionnalités
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
              Ce que fait le module
            </h2>
            <ul className="mt-6 space-y-3">
              {m.features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="text-foreground">{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-primary">
              Parcours type
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
              Comment ça marche
            </h2>
            <ol className="mt-6 space-y-4">
              {m.workflow.map((step, i) => (
                <li
                  key={step}
                  className="flex gap-4 rounded-lg border border-border bg-card p-4"
                >
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {i + 1}
                  </span>
                  <p className="text-sm text-foreground">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            to="/modules/$slug"
            params={{ slug: next.slug }}
            className="group flex items-center justify-between rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/50"
          >
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Module suivant
              </p>
              <p className="mt-1 text-lg font-semibold text-foreground">{next.name}</p>
              <p className="text-sm text-muted-foreground">{next.tagline}</p>
            </div>
            <ArrowRight className="h-5 w-5 text-primary transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </>
  );
}