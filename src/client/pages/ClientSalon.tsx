import { useState } from 'react';
import { motion } from 'framer-motion';
import { Scissors, Star, X, Bell, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { toast } from 'sonner';
import {
  SALON_SERVICES, HAIRDRESSERS, SALON_SLOTS, salonStore, useSalonBookings,
  formatPrice,
} from '@/client/lib/clientStore';

const ClientSalon = () => {
  const bookings = useSalonBookings();
  const [serviceId, setServiceId] = useState(SALON_SERVICES[0].id);
  const [hId, setHId] = useState(HAIRDRESSERS[0].id);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [slot, setSlot] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const [rateOpen, setRateOpen] = useState(false);
  const [rateId, setRateId] = useState('');
  const [stars, setStars] = useState(5);
  const [comment, setComment] = useState('');

  const book = () => {
    if (!name || !phone || !slot) return toast.error('Tous les champs requis');
    if (salonStore.isSlotTaken(hId, date, slot)) return toast.error('Créneau déjà pris, choisissez-en un autre');
    const svc = SALON_SERVICES.find(s => s.id === serviceId)!;
    const h = HAIRDRESSERS.find(x => x.id === hId)!;
    salonStore.book({
      customer: { name, phone }, serviceId, serviceLabel: svc.label, price: svc.price,
      hairdresserId: h.id, hairdresserName: h.name, date, slot,
    });
    toast.success('RDV confirmé ! Rappel automatique activé.');
    setSlot('');
  };

  const submitRate = () => {
    salonStore.rate(rateId, stars, comment);
    setRateOpen(false); setComment(''); setStars(5);
    toast.success('Merci pour votre avis !');
  };

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-600 text-xs font-medium mb-3">
          <Scissors className="w-3.5 h-3.5" /> Salon de coiffure
        </div>
        <h1 className="font-display text-4xl sm:text-5xl tracking-tight mb-3">Votre nouveau style, en un clic.</h1>
        <p className="text-muted-foreground max-w-2xl">Choisissez votre service, votre coiffeur, votre créneau. Vous recevez un rappel et notez votre expérience après.</p>
      </motion.div>

      <Tabs defaultValue="reserver">
        <TabsList><TabsTrigger value="reserver">Réserver</TabsTrigger><TabsTrigger value="mes">Mes RDV</TabsTrigger></TabsList>

        <TabsContent value="reserver" className="mt-6 space-y-6">
          <div>
            <Label className="mb-3 block">Service</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {SALON_SERVICES.map(s => (
                <button key={s.id} onClick={() => setServiceId(s.id)}
                  className={`text-left rounded-xl border-2 p-4 transition ${serviceId === s.id ? 'border-primary bg-primary/5' : 'border-border bg-card hover:border-primary/40'}`}>
                  <div className="font-medium text-sm">{s.label}</div>
                  <div className="text-xs text-muted-foreground">{s.duration} min</div>
                  <div className="text-sm font-bold text-primary mt-2">{formatPrice(s.price)}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label className="mb-3 block">Coiffeur</Label>
            <div className="grid md:grid-cols-3 gap-3">
              {HAIRDRESSERS.map(h => (
                <button key={h.id} onClick={() => setHId(h.id)}
                  className={`flex items-center gap-3 text-left rounded-xl border-2 p-4 transition ${hId === h.id ? 'border-primary bg-primary/5' : 'border-border bg-card hover:border-primary/40'}`}>
                  <div className="w-10 h-10 rounded-full bg-primary-gradient text-white font-bold flex items-center justify-center text-sm">{h.name.charAt(0)}</div>
                  <div>
                    <div className="font-medium text-sm">{h.name}</div>
                    <div className="text-xs text-muted-foreground">{h.specialty}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label className="mb-2 block">Date</Label>
              <Input type="date" value={date} onChange={e => setDate(e.target.value)} min={new Date().toISOString().split('T')[0]} />
            </div>
            <div>
              <Label className="mb-2 block">Créneau</Label>
              <div className="flex flex-wrap gap-2">
                {SALON_SLOTS.map(s => {
                  const taken = salonStore.isSlotTaken(hId, date, s);
                  return (
                    <button key={s} disabled={taken} onClick={() => setSlot(s)}
                      className={`px-3 py-2 rounded-lg text-sm border transition ${taken ? 'opacity-30 cursor-not-allowed line-through' : slot === s ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card hover:border-primary/40'}`}>
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 max-w-xl">
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="space-y-1.5"><Label>Nom</Label><Input value={name} onChange={e => setName(e.target.value)} /></div>
              <div className="space-y-1.5"><Label>Téléphone</Label><Input value={phone} onChange={e => setPhone(e.target.value)} /></div>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3 bg-primary-soft rounded-lg px-3 py-2">
              <Bell className="w-3.5 h-3.5 text-primary" /> Vous recevrez un rappel automatique avant votre RDV
            </div>
            <Button onClick={book} className="w-full h-12" size="lg">Confirmer le RDV — paiement sur place</Button>
          </div>
        </TabsContent>

        <TabsContent value="mes" className="mt-6">
          {bookings.length === 0 ? <p className="text-muted-foreground">Aucun RDV.</p> :
            <div className="space-y-3">
              {bookings.map(b => (
                <div key={b.id} className="rounded-2xl border border-border bg-card p-5">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <div className="font-semibold">{b.serviceLabel}</div>
                      <div className="text-sm text-muted-foreground">Avec {b.hairdresserName} • {b.date} à {b.slot}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{formatPrice(b.price)}</div>
                      <div className={`text-xs ${b.status === 'confirme' ? 'text-emerald-600' : b.status === 'annule' ? 'text-destructive' : 'text-muted-foreground'}`}>{b.status === 'confirme' ? 'Confirmé' : b.status === 'annule' ? 'Annulé' : 'Terminé'}</div>
                    </div>
                  </div>
                  {b.rating && <div className="flex items-center gap-1 text-xs text-amber-600 mb-2">{Array.from({ length: b.rating }).map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)} <span className="text-muted-foreground ml-1">"{b.comment}"</span></div>}
                  <div className="flex gap-2">
                    {b.status === 'confirme' && <>
                      <Button size="sm" variant="ghost" onClick={() => salonStore.cancel(b.id)}><X className="w-3.5 h-3.5 mr-1" /> Annuler</Button>
                      <Button size="sm" variant="outline" onClick={() => { setRateId(b.id); setRateOpen(true); }}><Check className="w-3.5 h-3.5 mr-1" /> Service rendu, noter</Button>
                    </>}
                  </div>
                </div>
              ))}
            </div>}
        </TabsContent>
      </Tabs>

      <Dialog open={rateOpen} onOpenChange={setRateOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Noter votre expérience</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map(n => (
                <button key={n} onClick={() => setStars(n)}>
                  <Star className={`w-8 h-8 ${n <= stars ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground'}`} />
                </button>
              ))}
            </div>
            <Textarea value={comment} onChange={e => setComment(e.target.value)} placeholder="Votre commentaire (optionnel)" />
          </div>
          <DialogFooter>
            <Button onClick={submitRate}>Envoyer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClientSalon;
