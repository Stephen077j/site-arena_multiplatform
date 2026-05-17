import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Minus, Plus, Trash2, ArrowRight, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cartStore, useCart, orderStore, formatPrice, DeliveryMode, OrderType } from '../lib/clientStore';
import { toast } from 'sonner';

const ClientCart = () => {
  const cart = useCart();
  const nav = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [mode, setMode] = useState<DeliveryMode>('livraison');
  const [notes, setNotes] = useState('');

  const total = cart.reduce((s, c) => s + c.qty * c.price, 0);
  const hasRestaurant = cart.some(c => c.module === 'restaurant');
  const hasBoutique = cart.some(c => c.module === 'boutique');

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
        <h1 className="font-display text-3xl mb-3">Votre panier est vide</h1>
        <p className="text-muted-foreground mb-6">Découvrez nos produits et services.</p>
        <div className="flex gap-2 justify-center">
          <Button asChild><Link to="/boutique">Voir la boutique</Link></Button>
          <Button asChild variant="outline"><Link to="/restaurant">Voir le menu</Link></Button>
        </div>
      </div>
    );
  }

  const checkout = () => {
    if (!name || !phone) { toast.error('Nom et téléphone requis'); return; }
    if (mode === 'livraison' && !address) { toast.error('Adresse de livraison requise'); return; }

    // Split by module → 2 commandes éventuelles
    const modules: OrderType[] = [];
    if (hasRestaurant) modules.push('restaurant');
    if (hasBoutique) modules.push('boutique');

    let lastId = '';
    modules.forEach(m => {
      const items = cart.filter(c => c.module === m);
      const t = items.reduce((s, c) => s + c.qty * c.price, 0);
      const order = orderStore.create({
        type: m,
        items,
        total: t,
        mode: m === 'restaurant' ? mode : (mode === 'livraison' ? 'livraison' : 'retrait'),
        address: mode === 'livraison' ? address : undefined,
        notes: notes || undefined,
        customer: { name, phone },
        paid: true,
      });
      lastId = order.id;
    });

    cartStore.clear();
    toast.success('Commande confirmée — paiement simulé');
    nav('/mes-commandes');
    void lastId;
  };

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="font-display text-4xl mb-8">Mon panier</h1>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          {cart.map(c => (
            <div key={c.productId} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4">
              <div className="w-14 h-14 rounded-lg bg-muted flex items-center justify-center shrink-0">
                <ShoppingBag className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{c.module}</div>
                <div className="font-semibold truncate">{c.name}</div>
                {c.note && <div className="text-xs text-muted-foreground italic">Note: {c.note}</div>}
                <div className="text-sm text-muted-foreground">{formatPrice(c.price)}</div>
              </div>
              <div className="flex items-center gap-1">
                <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => cartStore.setQty(c.productId, c.qty - 1)}><Minus className="w-3.5 h-3.5" /></Button>
                <span className="w-8 text-center font-semibold">{c.qty}</span>
                <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => cartStore.setQty(c.productId, c.qty + 1)}><Plus className="w-3.5 h-3.5" /></Button>
              </div>
              <div className="font-bold w-28 text-right">{formatPrice(c.qty * c.price)}</div>
              <Button size="icon" variant="ghost" onClick={() => cartStore.remove(c.productId)} className="hover:text-destructive"><Trash2 className="w-4 h-4" /></Button>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 h-fit sticky top-24 space-y-4">
          <h2 className="font-semibold text-lg">Validation</h2>

          <div className="space-y-2">
            <Label>Mode</Label>
            <RadioGroup value={mode} onValueChange={(v: string) => setMode(v as DeliveryMode)}>
              <div className="flex items-center gap-2"><RadioGroupItem value="livraison" id="m1" /><Label htmlFor="m1" className="cursor-pointer">Livraison</Label></div>
              <div className="flex items-center gap-2"><RadioGroupItem value="retrait" id="m2" /><Label htmlFor="m2" className="cursor-pointer">Retrait</Label></div>
              {hasRestaurant && <div className="flex items-center gap-2"><RadioGroupItem value="sur_place" id="m3" /><Label htmlFor="m3" className="cursor-pointer">Sur place</Label></div>}
            </RadioGroup>
          </div>

          <div className="space-y-1"><Label>Nom</Label><Input value={name} onChange={e => setName(e.target.value)} /></div>
          <div className="space-y-1"><Label>Téléphone</Label><Input value={phone} onChange={e => setPhone(e.target.value)} /></div>
          {mode === 'livraison' && <div className="space-y-1"><Label>Adresse</Label><Input value={address} onChange={e => setAddress(e.target.value)} placeholder="Quartier, rue…" /></div>}
          <div className="space-y-1"><Label>Notes (optionnel)</Label><Textarea value={notes} onChange={e => setNotes(e.target.value)} rows={2} /></div>

          <div className="border-t border-border pt-3 space-y-1 text-sm">
            <div className="flex justify-between text-muted-foreground"><span>Sous-total</span><span>{formatPrice(total)}</span></div>
            <div className="flex justify-between font-bold text-lg text-foreground"><span>Total</span><span>{formatPrice(total)}</span></div>
          </div>

          <Button onClick={checkout} className="w-full gap-2"><CreditCard className="w-4 h-4" /> Payer & commander <ArrowRight className="w-4 h-4" /></Button>
          <p className="text-xs text-muted-foreground text-center">Paiement simulé pour démo.</p>
        </div>
      </div>
    </div>
  );
};

export default ClientCart;
