import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — NexusPOS" },
      {
        name: "description",
        content:
          "Contactez l'équipe NexusPOS pour une démo personnalisée ou pour activer un module métier.",
      },
      { property: "og:title", content: "Contact — NexusPOS" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Message envoyé", {
        description: "Nous vous répondons sous 24 h ouvrées.",
      });
      (e.target as HTMLFormElement).reset();
    }, 600);
  };

  return (
    <>
      <section className="border-b border-border" style={{ background: "var(--gradient-hero)" }}>
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-medium uppercase tracking-wide text-primary">Contact</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Parlons de votre projet.
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Démo personnalisée, devis ou question technique — notre équipe vous
            répond rapidement.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          <div className="space-y-6 lg:col-span-1">
            {[
              { icon: Mail, label: "Email", value: "contact@nexuspos.app" },
              { icon: Phone, label: "Téléphone", value: "+261 20 22 000 00" },
              { icon: MapPin, label: "Adresse", value: "Antananarivo, Madagascar" },
              { icon: MessageSquare, label: "Support", value: "support@nexuspos.app" },
            ].map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.label} className="flex items-start gap-4">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{c.label}</p>
                    <p className="mt-0.5 text-foreground">{c.value}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-xl border border-border bg-card p-6 lg:col-span-2"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="name">Nom complet</Label>
                <Input id="name" name="name" required maxLength={100} className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="company">Entreprise</Label>
                <Input id="company" name="company" maxLength={100} className="mt-1.5" />
              </div>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required maxLength={255} className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="phone">Téléphone</Label>
                <Input id="phone" name="phone" maxLength={30} className="mt-1.5" />
              </div>
            </div>
            <div className="mt-4">
              <Label htmlFor="message">Votre message</Label>
              <Textarea
                id="message"
                name="message"
                required
                rows={5}
                maxLength={2000}
                placeholder="Parlez-nous de votre activité et des modules qui vous intéressent…"
                className="mt-1.5"
              />
            </div>
            <Button type="submit" size="lg" className="mt-6 w-full sm:w-auto" disabled={submitting}>
              {submitting ? "Envoi…" : "Envoyer le message"}
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}