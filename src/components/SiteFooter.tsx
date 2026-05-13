import { Link } from "@tanstack/react-router";
import { Layers } from "lucide-react";
import { MODULES } from "@/data/modules";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Layers className="h-4 w-4" />
              </span>
              <span>Nexus<span className="text-primary">POS</span></span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Plateforme SaaS unifiée pour gérer ventes, réservations et opérations sur tous vos points de contact.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">Plateforme</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/modules" className="hover:text-foreground">Tous les modules</Link></li>
              <li><Link to="/about" className="hover:text-foreground">À propos</Link></li>
              <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-sm font-semibold text-foreground">Modules</h4>
            <ul className="mt-3 grid grid-cols-2 gap-2 text-sm text-muted-foreground">
              {MODULES.map((m) => (
                <li key={m.slug}>
                  <Link
                    to="/modules/$slug"
                    params={{ slug: m.slug }}
                    className="hover:text-foreground"
                  >
                    {m.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} NexusPOS. Tous droits réservés.</p>
          <p>Desktop POS · Android · Admin · Super Admin</p>
        </div>
      </div>
    </footer>
  );
}