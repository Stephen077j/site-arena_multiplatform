import { useState, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { Calendar, FileSignature, CreditCard, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { toast } from 'sonner';
import {
  EVENT_HALLS, EVENT_OPTIONS, EVENT_DEPOSIT_RATE,
  eventStore, useEventBookings, formatPrice,
} from '@/client/lib/clientStore';

const ClientEvent = () => {
  const bookings = useEventBookings();
  const [hallId, setHallId] = useState(EVENT_HALLS[0].id);
  const [guests, setGuests] = useState(50);
  const [optionIds, setOptionIds] = useState<string[]>([]);
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const [signOpen, setSignOpen] = useState(false);
  const [signature, setSignature] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const quote = useMemo(() => eventStore.computeQuote(hallId, guests, optionIds), [hallId, guests, optionIds]);

  const toggleOpt = (id: string) => setOptionIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  // Signature pad
  const drawing = useRef(false);
  const startDraw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    drawing.current = true;
    const c = canvasRef.current!; const r = c.getBoundingClientRect();
    const ctx = c.getContext('2d')!;
    ctx.beginPath(); ctx.moveTo(e.clientX - r.left, e.clientY - r.top);
  };
  const moveDraw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;
    const c = canvasRef.current!; const r = c.getBoundingClientRect();
    const ctx = c.getContext('2d')!;
    ctx.lineWidth = 2; ctx.lineCap = 'round'; ctx.strokeStyle = '#111';
    ctx.lineTo(e.clientX - r.left, e.clientY - r.top); ctx.stroke();
  };
  const endDraw = () => { drawing.current = false; };
  const clearSign = () => {
    const c = canvasRef.current!; c.getContext('2d')!.clearRect(0, 0, c.width, c.height);
    setSignature('');
  };
  const confirmSign = () => {
    const dataUrl = canvasRef.current!.toDataURL();
    setSignature(dataUrl);
    setSignOpen(false);
    toast.success('Devis signé');
  };

  const submit = () => {
    if (!name || !phone || !date || guests <= 0) return toast.error('Remplissez tous les champs');
    const hall = EVENT_HALLS.find(h => h.id === hallId)!;
    const opts = optionIds.map(id => {
      const o = EVENT_OPTIONS.find(x => x.id === id)!;
      return { id: o.id, label: o.label, price: o.perGuest ? o.price * guests : o.price };
    });
    eventStore.submit({
      customer: { name, phone }, hallId, hallName: hall.name, date, guests,
      options: opts, total: quote.total, deposit: quote.deposit, signature,
    });
    toast.success(signature ? 'Devis signé enregistré' : 'Devis enregistré');
    setSignature('');
  };

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 text-xs font-medium mb-3">
          <Calendar className="w-3.5 h-3.5" /> Espace événementiel
        </div>
        <h1 className="font-display text-4xl sm:text-5xl tracking-tight mb-3">Configurez votre événement en 3 minutes.</h1>
        <p className="text-muted-foreground max-w-2xl">Salle, catering, décoration, DJ — composez votre pack, obtenez un devis instantané, signez et payez l'acompte ({Math.round(EVENT_DEPOSIT_RATE * 100)}%).</p>
      </motion.div>

      <Tabs defaultValue="configurer">
        <TabsList><TabsTrigger value="configurer">Configurer</TabsTrigger><TabsTrigger value="mes">Mes devis</TabsTrigger></TabsList>

        <TabsContent value="configurer" className="mt-6 space-y-8">
          {/* Halls */}
          <div>
            <Label className="mb-3 block">Choisissez votre salle</Label>
            <div className="grid md:grid-cols-3 gap-4">
              {EVENT_HALLS.map(h => (
                <button key={h.id} onClick={() => setHallId(h.id)}
                  className={`text-left rounded-2xl border-2 p-5 transition ${hallId === h.id ? 'border-primary bg-primary/5 shadow-trust' : 'border-border bg-card hover:border-primary/40'}`}>
                  <div className="font-semibold">{h.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{h.desc}</div>
                  <div className="text-xs text-muted-foreground mt-2">Jusqu'à {h.capacity} invités</div>
                  <div className="text-lg font-bold text-primary mt-2">{formatPrice(h.basePrice)}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label className="mb-2 block">Date de l'événement</Label>
              <Input type="date" value={date} onChange={e => setDate(e.target.value)} min={new Date().toISOString().split('T')[0]} />
            </div>
            <div>
              <Label className="mb-2 block">Nombre d'invités</Label>
              <Input type="number" min={1} value={guests} onChange={e => setGuests(+e.target.value)} />
            </div>
          </div>

          {/* Options */}
          <div>
            <Label className="mb-3 block">Services additionnels</Label>
            <div className="grid md:grid-cols-2 gap-3">
              {EVENT_OPTIONS.map(o => {
                const sel = optionIds.includes(o.id);
                const cost = o.perGuest ? o.price * guests : o.price;
                return (
                  <button key={o.id} onClick={() => toggleOpt(o.id)}
                    className={`flex items-start gap-3 text-left rounded-xl border-2 p-4 transition ${sel ? 'border-primary bg-primary/5' : 'border-border bg-card hover:border-primary/40'}`}>
                    <Checkbox checked={sel} className="mt-0.5 pointer-events-none" />
                    <div className="flex-1">
                      <div className="font-medium text-sm">{o.label}</div>
                      <div className="text-xs text-muted-foreground">{o.perGuest ? `${formatPrice(o.price)} / personne` : formatPrice(o.price)}</div>
                    </div>
                    <div className="text-sm font-semibold text-primary">{formatPrice(cost)}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quote */}
          <div className="rounded-2xl border-2 border-primary bg-primary-soft p-6 max-w-2xl">
            <h3 className="font-semibold mb-3 flex items-center gap-2"><FileSignature className="w-5 h-5 text-primary" /> Devis automatique</h3>
            <div className="space-y-1.5 text-sm mb-4">
              {quote.breakdown.map((b, i) => (
                <div key={i} className="flex justify-between"><span className="text-muted-foreground">{b.label}</span><span className="font-medium">{formatPrice(b.amount)}</span></div>
              ))}
              <div className="border-t border-border pt-2 mt-2 flex justify-between font-bold text-base"><span>Total</span><span>{formatPrice(quote.total)}</span></div>
              <div className="flex justify-between text-primary font-semibold"><span>Acompte ({Math.round(EVENT_DEPOSIT_RATE * 100)}%)</span><span>{formatPrice(quote.deposit)}</span></div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="space-y-1.5"><Label>Nom</Label><Input value={name} onChange={e => setName(e.target.value)} /></div>
              <div className="space-y-1.5"><Label>Téléphone</Label><Input value={phone} onChange={e => setPhone(e.target.value)} /></div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={() => setSignOpen(true)}>
                <FileSignature className="w-4 h-4 mr-1.5" /> {signature ? 'Signature ajoutée ✓' : 'Signer électroniquement'}
              </Button>
              <Button onClick={submit} className="flex-1 min-w-[200px]">Enregistrer le devis</Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="mes" className="mt-6">
          {bookings.length === 0 ? <p className="text-muted-foreground">Aucun devis.</p> :
            <div className="space-y-3">
              {bookings.map(b => (
                <div key={b.id} className="rounded-2xl border border-border bg-card p-5">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <div className="font-semibold">{b.hallName} <span className="text-muted-foreground font-normal">— {b.date}</span></div>
                      <div className="text-sm text-muted-foreground">{b.guests} invités • {b.customer.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{formatPrice(b.total)}</div>
                      <div className="text-xs text-muted-foreground">Acompte {formatPrice(b.deposit)}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs mb-3">
                    <span className={`px-2 py-0.5 rounded-full ${b.status === 'devis' ? 'bg-muted text-muted-foreground' : b.status === 'signe' ? 'bg-amber-500/10 text-amber-600' : b.status === 'confirme' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-destructive/10 text-destructive'}`}>
                      {b.status === 'devis' ? 'En attente' : b.status === 'signe' ? 'Signé' : b.status === 'confirme' ? 'Confirmé (acompte payé)' : 'Annulé'}
                    </span>
                    {b.signature && <span className="text-muted-foreground flex items-center gap-1"><Check className="w-3 h-3" /> Signature électronique</span>}
                  </div>
                  <div className="flex gap-2">
                    {b.status !== 'confirme' && b.status !== 'annule' && (
                      <Button size="sm" onClick={() => eventStore.markDepositPaid(b.id)}><CreditCard className="w-3.5 h-3.5 mr-1" /> Marquer acompte payé</Button>
                    )}
                    {b.status !== 'annule' && <Button size="sm" variant="ghost" onClick={() => eventStore.cancel(b.id)}><X className="w-3.5 h-3.5" /></Button>}
                  </div>
                </div>
              ))}
            </div>}
        </TabsContent>
      </Tabs>

      <Dialog open={signOpen} onOpenChange={setSignOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Signature électronique</DialogTitle></DialogHeader>
          <p className="text-sm text-muted-foreground">Signez ci-dessous avec votre souris ou votre doigt. En signant, vous acceptez les termes du devis.</p>
          <div className="rounded-xl border-2 border-dashed border-border bg-muted/30">
            <canvas ref={canvasRef} width={500} height={180}
              onPointerDown={startDraw} onPointerMove={moveDraw} onPointerUp={endDraw} onPointerLeave={endDraw}
              className="w-full h-[180px] touch-none cursor-crosshair" />
          </div>
          <DialogFooter className="gap-2">
            <Button variant="ghost" onClick={clearSign}>Effacer</Button>
            <Button onClick={confirmSign}>Valider la signature</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClientEvent;
