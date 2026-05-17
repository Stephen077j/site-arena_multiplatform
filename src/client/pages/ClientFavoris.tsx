import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Package } from 'lucide-react';
import { productsDB } from '@/lib/productsDB';
import { Button } from '@/components/ui/button';
import { useFavoris, favStore, cartStore, formatPrice } from '../lib/clientStore';
import { toast } from 'sonner';

const ClientFavoris = () => {
  const favIds = useFavoris();
  const all = productsDB.getAll();
  const items = all.filter(p => favIds.includes(p.id));

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="font-display text-4xl mb-2">Mes favoris</h1>
      <p className="text-muted-foreground mb-8">Retrouvez tous les produits que vous avez sauvegardés.</p>

      {items.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-border rounded-2xl">
          <Heart className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
          <p className="text-muted-foreground mb-4">Aucun favori pour le moment.</p>
          <Button asChild><Link to="/boutique">Découvrir la boutique</Link></Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map(p => (
            <div key={p.id} className="rounded-2xl border border-border bg-card p-4">
              <div className="aspect-square rounded-lg bg-gradient-to-br from-accent/30 to-secondary/30 flex items-center justify-center mb-3">
                <Package className="w-10 h-10 text-primary/60" />
              </div>
              <div className="text-xs uppercase text-muted-foreground">{p.category}</div>
              <h3 className="font-semibold text-sm line-clamp-2 mb-2 min-h-[2.5rem]">{p.name}</h3>
              <div className="font-bold mb-3">{formatPrice(p.price)}</div>
              <div className="flex gap-1">
                <Button size="sm" className="flex-1 gap-1" onClick={() => { cartStore.add({ productId: p.id, name: p.name, price: p.price, module: p.moduleType }); toast.success('Ajouté'); }}>
                  <ShoppingBag className="w-3.5 h-3.5" /> Panier
                </Button>
                <Button size="icon" variant="outline" onClick={() => favStore.toggle(p.id)} className="h-9 w-9">
                  <Heart className="w-4 h-4 fill-destructive text-destructive" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientFavoris;
