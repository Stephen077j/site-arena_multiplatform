import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, X, AlertCircle, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { toast } from 'sonner';
import {
  FIELD_SLOTS, FIELD_PRICE_PER_SLOT, FIELD_CANCEL_LIMIT_HOURS,
  fieldStore, useFieldBookings, formatPrice,
} from '@/client/lib/clientStore';

const ClientField = () => {
  const bookings = useFieldBookings();
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [slot, setSlot] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const [editId, setEditId] = useState('');
  const [editDate, setEditDate] = useState('');
  const [editSlot, setEditSlot] = useState('');

  const book = () => {
    if (!name || !phone || !slot) return toast.error('Tous les champs requis');
    if (fieldStore.isTaken(date, slot)) return toast.error('Créneau déjà pris');
    fieldStore.book({ customer: { name, phone }, date, slot });
    toast.success(`Terrain réservé — ${formatPrice(FIELD_PRICE_PER_SLOT)} à régler sur place`);
    setSlot('');
  };

  const cancel = (id: string) => {
    const r = fieldStore.cancel(id);
    if (r.ok) toast.success('Réservation annulée');
    else toast.error(r.reason!);
  };

  const openEdit = (id: string, d: string, s: string) => {
    setEditId(id); setEditDate(d); setEditSlot(s);
  };
  const applyEdit = () => {
    const r = fieldStore.reschedule(editId, editDate, editSlot);
    if (r.ok) { toast.success('Créneau modifié'); setEditId(''); }
    else toast.error(r.reason!);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-lime-500/10 border border-lime-500/20 text-lime-600 text-xs font-medium mb-3">
          <Trophy className="w-3.5 h-3.5" /> Terrain de foot
        </div>
        <h1 className="font-display text-4xl sm:text-5xl tracking-tight mb-3">Réservez votre créneau, jouez.</h1>
        <p className="text-muted-foreground max-w-2xl">Choisissez l'heure, payez sur place, modifiez ou annulez jusqu'à {FIELD_CANCEL_LIMIT_HOURS}h avant le match.</p>
      </motion.div>

      <Tabs defaultValue="reserver">
        <TabsList><TabsTrigger value="reserver">Réserver</TabsTrigger><TabsTrigger value="mes">Mes réservations</TabsTrigger></TabsList>

        <TabsContent value="reserver" className="mt-6 space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6 max-w-2xl">
            <div className="space-y-1.5 mb-4">
              <Label>Date</Label>
              <Input type="date" value={date} onChange={e => setDate(e.target.value)} min={new Date().toISOString().split('T')[0]} />
            </div>
            <Label className="mb-2 block">Créneaux disponibles ({formatPrice(FIELD_PRICE_PER_SLOT)} / heure)</Label>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-5">
              {FIELD_SLOTS.map(s => {
                const taken = fieldStore.isTaken(date, s);
                return (
                  <button key={s} disabled={taken} onClick={() => setSlot(s)}
                    className={`px-3 py-3 rounded-xl text-sm font-medium border transition ${taken ? 'opacity-30 cursor-not-allowed line-through' : slot === s ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card hover:border-primary/40'}`}>
                    {s}
                  </button>
                );
              })}
            </div>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="space-y-1.5"><Label>Nom</Label><Input value={name} onChange={e => setName(e.target.value)} /></div>
              <div className="space-y-1.5"><Label>Téléphone</Label><Input value={phone} onChange={e => setPhone(e.target.value)} /></div>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground bg-amber-500/10 text-amber-700 rounded-lg px-3 py-2 mb-3">
              <AlertCircle className="w-3.5 h-3.5" /> Modification/annulation possible jusqu'à {FIELD_CANCEL_LIMIT_HOURS}h avant le créneau.
            </div>
            <Button onClick={book} className="w-full h-12" size="lg">Confirmer — paiement sur place</Button>
          </div>
        </TabsContent>

        <TabsContent value="mes" className="mt-6">
          {bookings.length === 0 ? <p className="text-muted-foreground">Aucune réservation.</p> :
            <div className="space-y-3">
              {bookings.map(b => (
                <div key={b.id} className="rounded-2xl border border-border bg-card p-5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="font-semibold">{b.date} à {b.slot}</div>
                      <div className="text-sm text-muted-foreground">{b.customer.name} • {b.customer.phone}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{formatPrice(b.price)}</div>
                      <div className={`text-xs ${b.status === 'annule' ? 'text-destructive' : 'text-emerald-600'}`}>{b.status === 'annule' ? 'Annulé' : 'Confirmé'}</div>
                    </div>
                  </div>
                  {b.status === 'confirme' && (
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => openEdit(b.id, b.date, b.slot)}><Edit2 className="w-3.5 h-3.5 mr-1" /> Modifier</Button>
                      <Button size="sm" variant="ghost" onClick={() => cancel(b.id)}><X className="w-3.5 h-3.5 mr-1" /> Annuler</Button>
                    </div>
                  )}
                </div>
              ))}
            </div>}
        </TabsContent>
      </Tabs>

      <Dialog open={!!editId} onOpenChange={o => !o && setEditId('')}>
        <DialogContent>
          <DialogHeader><DialogTitle>Modifier la réservation</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1.5"><Label>Nouvelle date</Label><Input type="date" value={editDate} onChange={e => setEditDate(e.target.value)} min={new Date().toISOString().split('T')[0]} /></div>
            <div>
              <Label className="mb-2 block">Nouveau créneau</Label>
              <div className="grid grid-cols-4 gap-2">
                {FIELD_SLOTS.map(s => {
                  const taken = fieldStore.isTaken(editDate, s);
                  return (
                    <button key={s} disabled={taken} onClick={() => setEditSlot(s)}
                      className={`px-2 py-2 rounded-lg text-xs border ${taken ? 'opacity-30 line-through' : editSlot === s ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card'}`}>
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <DialogFooter><Button onClick={applyEdit}>Appliquer</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClientField;
