import { useMemo, useState } from 'react';
import { Hotel, Users, BedDouble, Check, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ROOMS, hotelStore, formatPrice, Room } from '../lib/clientStore';
import { toast } from 'sonner';

const nightsBetween = (a: string, b: string) => {
  if (!a || !b) return 0;
  const ms = new Date(b).getTime() - new Date(a).getTime();
  return Math.max(0, Math.round(ms / (1000 * 60 * 60 * 24)));
};

const ClientHotel = () => {
  const today = new Date().toISOString().slice(0, 10);
  const tomorrow = new Date(Date.now() + 86400000).toISOString().slice(0, 10);
  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [guests, setGuests] = useState(2);

  const [booking, setBooking] = useState<Room | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const nights = nightsBetween(checkIn, checkOut);
  const available = useMemo(
    () => ROOMS.map(r => ({ ...r, available: hotelStore.isAvailable(r.id, checkIn, checkOut) && r.capacity >= guests })),
    [checkIn, checkOut, guests]
  );

  const confirm = () => {
    if (!booking || !name || !phone || nights <= 0) {
      toast.error('Remplissez tous les champs');
      return;
    }
    const total = booking.pricePerNight * nights;
    const deposit = Math.round(total * 0.3);
    hotelStore.create({
      roomId: booking.id,
      roomName: booking.name,
      pricePerNight: booking.pricePerNight,
      checkIn, checkOut, nights, total, deposit, guests,
      customer: { name, phone, email: email || undefined },
      paid: true, // acompte simulé
    });
    toast.success(`Réservation confirmée — acompte ${formatPrice(deposit)} payé`);
    setBooking(null); setName(''); setPhone(''); setEmail('');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <div className="text-xs uppercase tracking-[0.18em] text-primary font-semibold mb-2">Hôtel</div>
        <h1 className="font-display text-4xl sm:text-5xl tracking-tight">Réservez votre séjour</h1>
        <p className="text-muted-foreground mt-2">Vérifiez les disponibilités, payez un acompte, faites votre check-in en ligne.</p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5 mb-8 grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="space-y-1"><Label className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Arrivée</Label><Input type="date" value={checkIn} min={today} onChange={e => setCheckIn(e.target.value)} /></div>
        <div className="space-y-1"><Label className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Départ</Label><Input type="date" value={checkOut} min={checkIn} onChange={e => setCheckOut(e.target.value)} /></div>
        <div className="space-y-1"><Label className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> Personnes</Label><Input type="number" min={1} value={guests} onChange={e => setGuests(+e.target.value)} /></div>
        <div className="flex items-end">
          <div className="text-sm text-muted-foreground">{nights > 0 ? `${nights} nuit${nights > 1 ? 's' : ''}` : 'Choisissez vos dates'}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {available.map(r => (
          <article key={r.id} className="card-lift rounded-2xl border border-border bg-card overflow-hidden">
            <div className="aspect-[16/9] bg-gradient-to-br from-indigo-500/20 to-indigo-500/5 flex items-center justify-center relative">
              <BedDouble className="w-16 h-16 text-indigo-400" />
              {!r.available && (
                <div className="absolute inset-0 bg-background/70 flex items-center justify-center">
                  <span className="px-3 py-1 rounded-full bg-destructive text-destructive-foreground text-xs font-semibold">Indisponible</span>
                </div>
              )}
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="font-semibold text-lg flex items-center gap-2"><Hotel className="w-4 h-4 text-primary" /> {r.name}</h3>
                <div className="text-right">
                  <div className="font-bold">{formatPrice(r.pricePerNight)}</div>
                  <div className="text-xs text-muted-foreground">/ nuit</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{r.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {r.amenities.map(a => (
                  <span key={a} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border">{a}</span>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">Jusqu'à {r.capacity} personnes</div>
                <Button size="sm" disabled={!r.available || nights <= 0} onClick={() => setBooking(r)}>
                  Réserver — {formatPrice(r.pricePerNight * nights)}
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <Dialog open={!!booking} onOpenChange={(o) => !o && setBooking(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Réservation — {booking?.name}</DialogTitle></DialogHeader>
          {booking && (
            <div className="space-y-4">
              <div className="rounded-lg bg-muted p-3 text-sm space-y-1">
                <div className="flex justify-between"><span>Du {checkIn} au {checkOut}</span><span>{nights} nuit(s)</span></div>
                <div className="flex justify-between"><span>Personnes</span><span>{guests}</span></div>
                <div className="flex justify-between font-semibold text-foreground border-t border-border pt-1 mt-1"><span>Total</span><span>{formatPrice(booking.pricePerNight * nights)}</span></div>
                <div className="flex justify-between text-primary"><span>Acompte (30%)</span><span>{formatPrice(Math.round(booking.pricePerNight * nights * 0.3))}</span></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1 col-span-2"><Label>Nom complet</Label><Input value={name} onChange={e => setName(e.target.value)} /></div>
                <div className="space-y-1"><Label>Téléphone</Label><Input value={phone} onChange={e => setPhone(e.target.value)} /></div>
                <div className="space-y-1"><Label>Email (facture)</Label><Input type="email" value={email} onChange={e => setEmail(e.target.value)} /></div>
              </div>
              <Button onClick={confirm} className="w-full gap-2"><Check className="w-4 h-4" /> Payer l'acompte & confirmer</Button>
              <p className="text-xs text-muted-foreground text-center">Paiement simulé pour démo.</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClientHotel;
