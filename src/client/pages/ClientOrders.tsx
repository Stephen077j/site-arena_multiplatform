import { useOrders, useTableReservations, useHotelBookings, orderStore, tableStore, hotelStore, formatPrice, OrderStatus } from '../lib/clientStore';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Package, ChefHat, Truck, Check, X, Hotel, Calendar, Clock, ArrowRight } from 'lucide-react';

const STATUS_META: Record<OrderStatus, { label: string; icon: any; tone: string }> = {
  en_attente: { label: 'En attente', icon: Clock, tone: 'bg-warning/20 text-warning' },
  preparation: { label: 'En préparation', icon: ChefHat, tone: 'bg-info/20 text-info' },
  expediee: { label: 'Expédiée', icon: Truck, tone: 'bg-primary/20 text-primary' },
  livree: { label: 'Livrée', icon: Check, tone: 'bg-success/20 text-success' },
  annulee: { label: 'Annulée', icon: X, tone: 'bg-destructive/20 text-destructive' },
};

const ClientOrders = () => {
  const orders = useOrders();
  const tables = useTableReservations();
  const hotels = useHotelBookings();

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="font-display text-4xl mb-2">Mes commandes & réservations</h1>
      <p className="text-muted-foreground mb-8">Suivez l'état d'avancement de vos demandes en temps réel.</p>

      <Tabs defaultValue="orders">
        <TabsList>
          <TabsTrigger value="orders">Commandes ({orders.length})</TabsTrigger>
          <TabsTrigger value="tables">Tables ({tables.length})</TabsTrigger>
          <TabsTrigger value="hotels">Chambres ({hotels.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="mt-6 space-y-4">
          {orders.length === 0 ? (
            <Empty icon={Package} text="Aucune commande pour le moment" />
          ) : orders.map(o => {
            const meta = STATUS_META[o.status];
            const Icon = meta.icon;
            return (
              <div key={o.id} className="rounded-2xl border border-border bg-card p-5">
                <div className="flex items-start justify-between flex-wrap gap-3 mb-3">
                  <div>
                    <div className="text-xs text-muted-foreground">#{o.id.slice(0, 8)} · {new Date(o.createdAt).toLocaleString('fr-FR')}</div>
                    <div className="font-semibold capitalize">{o.type} — {o.mode.replace('_', ' ')}</div>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${meta.tone}`}>
                    <Icon className="w-3.5 h-3.5" /> {meta.label}
                  </span>
                </div>
                <div className="text-sm space-y-1 mb-3">
                  {o.items.map(i => (
                    <div key={i.productId} className="flex justify-between text-muted-foreground">
                      <span>{i.qty}× {i.name}{i.note && <em className="text-xs"> · {i.note}</em>}</span>
                      <span>{formatPrice(i.qty * i.price)}</span>
                    </div>
                  ))}
                </div>
                {o.address && <div className="text-xs text-muted-foreground mb-2">📍 {o.address}</div>}
                <div className="flex items-center justify-between border-t border-border pt-3">
                  <div className="font-bold">{formatPrice(o.total)}</div>
                  <div className="flex gap-2">
                    {o.status !== 'livree' && o.status !== 'annulee' && (
                      <>
                        <Button size="sm" variant="outline" onClick={() => orderStore.cancel(o.id)}>Annuler / Retour</Button>
                        <Button size="sm" onClick={() => orderStore.advance(o.id)} className="gap-1">Étape suivante <ArrowRight className="w-3.5 h-3.5" /></Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </TabsContent>

        <TabsContent value="tables" className="mt-6 space-y-4">
          {tables.length === 0 ? <Empty icon={Calendar} text="Aucune réservation de table" /> : tables.map(t => (
            <div key={t.id} className="rounded-2xl border border-border bg-card p-5 flex items-center justify-between flex-wrap gap-3">
              <div>
                <div className="font-semibold">{t.name} · {t.guests} pers.</div>
                <div className="text-sm text-muted-foreground">{t.date} à {t.time} — {t.phone}</div>
                {t.notes && <div className="text-xs text-muted-foreground italic">{t.notes}</div>}
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-1 rounded-full ${t.status === 'confirmee' ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'}`}>{t.status}</span>
                {t.status === 'confirmee' && <Button size="sm" variant="outline" onClick={() => tableStore.cancel(t.id)}>Annuler</Button>}
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="hotels" className="mt-6 space-y-4">
          {hotels.length === 0 ? <Empty icon={Hotel} text="Aucune réservation de chambre" /> : hotels.map(b => (
            <div key={b.id} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-start justify-between flex-wrap gap-3 mb-2">
                <div>
                  <div className="font-semibold flex items-center gap-2"><Hotel className="w-4 h-4 text-primary" /> {b.roomName}</div>
                  <div className="text-sm text-muted-foreground">Du {b.checkIn} au {b.checkOut} · {b.nights} nuit(s) · {b.guests} pers.</div>
                  <div className="text-xs text-muted-foreground">{b.customer.name} · {b.customer.phone}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold">{formatPrice(b.total)}</div>
                  <div className="text-xs text-primary">Acompte payé : {formatPrice(b.deposit)}</div>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-2">
                {b.checkedIn ? (
                  <span className="text-xs px-2 py-1 rounded-full bg-success/20 text-success inline-flex items-center gap-1"><Check className="w-3 h-3" /> Check-in effectué</span>
                ) : (
                  <Button size="sm" onClick={() => hotelStore.checkIn(b.id)}>Check-in en ligne</Button>
                )}
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

const Empty = ({ icon: Icon, text }: { icon: any; text: string }) => (
  <div className="text-center py-16 border border-dashed border-border rounded-2xl">
    <Icon className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
    <p className="text-muted-foreground">{text}</p>
  </div>
);

export default ClientOrders;
