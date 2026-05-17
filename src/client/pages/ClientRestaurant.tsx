import { useMemo, useState } from 'react';
import { Search, UtensilsCrossed, Calendar, ShoppingBag, Plus } from 'lucide-react';
import { productsDB } from '@/lib/productsDB';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { cartStore, tableStore, formatPrice } from '../lib/clientStore';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

const ClientRestaurant = () => {
  const all = productsDB.getByModule('restaurant');
  const [q, setQ] = useState('');
  const [activeCat, setActiveCat] = useState<string>('all');
  const [noteFor, setNoteFor] = useState<typeof all[number] | null>(null);
  const [note, setNote] = useState('');

  // Table reservation
  const [resOpen, setResOpen] = useState(false);
  const [resName, setResName] = useState('');
  const [resPhone, setResPhone] = useState('');
  const [resDate, setResDate] = useState('');
  const [resTime, setResTime] = useState('');
  const [resGuests, setResGuests] = useState(2);
  const [resNotes, setResNotes] = useState('');

  const categories = useMemo(() => Array.from(new Set(all.map(p => p.category))), [all]);
  const filtered = useMemo(() => {
    let list = all;
    if (activeCat !== 'all') list = list.filter(p => p.category === activeCat);
    if (q.trim()) {
      const s = q.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(s));
    }
    return list;
  }, [all, activeCat, q]);

  const quickAdd = (p: typeof all[number]) => {
    cartStore.add({ productId: p.id, name: p.name, price: p.price, module: 'restaurant' });
    toast.success(`${p.name} ajouté`);
  };

  const addWithNote = () => {
    if (!noteFor) return;
    cartStore.add({ productId: noteFor.id, name: noteFor.name, price: noteFor.price, module: 'restaurant', note: note || undefined });
    toast.success(`${noteFor.name} ajouté avec note`);
    setNoteFor(null);
    setNote('');
  };

  const submitReservation = () => {
    if (!resName || !resPhone || !resDate || !resTime || resGuests <= 0) {
      toast.error('Remplissez tous les champs');
      return;
    }
    tableStore.create({ name: resName, phone: resPhone, date: resDate, time: resTime, guests: resGuests, notes: resNotes || undefined });
    toast.success('Table réservée !');
    setResOpen(false);
    setResName(''); setResPhone(''); setResDate(''); setResTime(''); setResGuests(2); setResNotes('');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-primary font-semibold mb-2">Restaurant</div>
          <h1 className="font-display text-4xl sm:text-5xl tracking-tight">Notre menu</h1>
          <p className="text-muted-foreground mt-2">Commandez en livraison, à emporter, ou réservez une table.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setResOpen(true)} className="gap-2"><Calendar className="w-4 h-4" /> Réserver une table</Button>
          <Button asChild className="gap-2"><Link to="/panier"><ShoppingBag className="w-4 h-4" /> Mon panier</Link></Button>
        </div>
      </div>

      <Tabs defaultValue="menu">
        <TabsList>
          <TabsTrigger value="menu">Menu</TabsTrigger>
          <TabsTrigger value="info">Livraison / Retrait</TabsTrigger>
        </TabsList>

        <TabsContent value="menu" className="mt-6">
          <div className="flex flex-wrap gap-3 mb-4">
            <div className="relative flex-1 min-w-[220px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input value={q} onChange={e => setQ(e.target.value)} placeholder="Rechercher un plat…" className="pl-9 h-11" />
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 mb-6 -mx-1 px-1">
            <button onClick={() => setActiveCat('all')} className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition border ${activeCat === 'all' ? 'bg-primary text-primary-foreground border-primary' : 'bg-card border-border text-muted-foreground hover:text-foreground'}`}>Tout</button>
            {categories.map(c => (
              <button key={c} onClick={() => setActiveCat(c)} className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition border ${activeCat === c ? 'bg-primary text-primary-foreground border-primary' : 'bg-card border-border text-muted-foreground hover:text-foreground'}`}>{c}</button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-24 border border-dashed border-border rounded-2xl">
              <UtensilsCrossed className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
              <p className="text-muted-foreground">Aucun plat trouvé.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map(p => (
                <article key={p.id} className="card-lift rounded-2xl border border-border bg-card p-5 flex items-start gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-500/5 flex items-center justify-center shrink-0">
                    <UtensilsCrossed className="w-7 h-7 text-amber-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{p.category}</div>
                    <h3 className="font-semibold text-sm leading-tight mb-2">{p.name}</h3>
                    <div className="flex items-center justify-between gap-2 mt-3">
                      <div className="font-bold text-foreground text-sm">{formatPrice(p.price)}</div>
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline" className="h-8" onClick={() => { setNoteFor(p); setNote(''); }}>Note</Button>
                        <Button size="sm" className="h-8 gap-1" onClick={() => quickAdd(p)}><Plus className="w-3.5 h-3.5" /> Ajouter</Button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="info" className="mt-6">
          <div className="grid md:grid-cols-2 gap-5">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-semibold mb-2">Livraison à domicile</h3>
              <p className="text-sm text-muted-foreground">Délai estimé : 30–45 min. Suivez la préparation depuis « Mes commandes ».</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-semibold mb-2">Retrait sur place</h3>
              <p className="text-sm text-muted-foreground">Commandez et passez chercher votre repas en 15–20 min. Aucun frais.</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Note dialog */}
      <Dialog open={!!noteFor} onOpenChange={(o) => !o && setNoteFor(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Note spéciale — {noteFor?.name}</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <Textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Ex: Sans oignons, bien cuit, sauce à part…" rows={4} />
            <Button onClick={addWithNote} className="w-full">Ajouter au panier</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Table reservation dialog */}
      <Dialog open={resOpen} onOpenChange={setResOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Réserver une table</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1"><Label>Nom</Label><Input value={resName} onChange={e => setResName(e.target.value)} /></div>
              <div className="space-y-1"><Label>Téléphone</Label><Input value={resPhone} onChange={e => setResPhone(e.target.value)} /></div>
              <div className="space-y-1"><Label>Date</Label><Input type="date" value={resDate} onChange={e => setResDate(e.target.value)} /></div>
              <div className="space-y-1"><Label>Heure</Label><Input type="time" value={resTime} onChange={e => setResTime(e.target.value)} /></div>
              <div className="space-y-1 col-span-2"><Label>Nombre de convives</Label><Input type="number" min={1} value={resGuests} onChange={e => setResGuests(+e.target.value)} /></div>
              <div className="space-y-1 col-span-2"><Label>Notes (optionnel)</Label><Textarea value={resNotes} onChange={e => setResNotes(e.target.value)} rows={3} /></div>
            </div>
            <Button onClick={submitReservation} className="w-full">Confirmer la réservation</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClientRestaurant;
