import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Star, Package, Filter } from 'lucide-react';
import { productsDB } from '@/lib/productsDB';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cartStore, favStore, useFavoris, formatPrice } from '../lib/clientStore';
import { toast } from 'sonner';

const ClientBoutique = () => {
  const all = productsDB.getAll().filter(p => ['boutique', 'general'].includes(p.moduleType));
  const fav = useFavoris();
  const [q, setQ] = useState('');
  const [cat, setCat] = useState<string>('all');
  const [sort, setSort] = useState<string>('recent');

  const categories = useMemo(() => Array.from(new Set(all.map(p => p.category))), [all]);

  const filtered = useMemo(() => {
    let list = all;
    if (cat !== 'all') list = list.filter(p => p.category === cat);
    if (q.trim()) {
      const s = q.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(s) || p.category.toLowerCase().includes(s));
    }
    if (sort === 'price_asc') list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === 'price_desc') list = [...list].sort((a, b) => b.price - a.price);
    else if (sort === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [all, q, cat, sort]);

  const add = (p: typeof all[number]) => {
    if (p.stock <= 0) { toast.error('Rupture de stock'); return; }
    cartStore.add({ productId: p.id, name: p.name, price: p.price, module: 'boutique' });
    toast.success(`${p.name} ajouté au panier`);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-primary font-semibold mb-2">Boutique</div>
          <h1 className="font-display text-4xl sm:text-5xl tracking-tight">Tous nos produits</h1>
          <p className="text-muted-foreground mt-2">Parcourez, ajoutez aux favoris et commandez en ligne.</p>
        </div>
        <Link to="/favoris" className="text-sm text-primary hover:underline flex items-center gap-1">
          <Heart className="w-4 h-4" /> Mes favoris ({fav.length})
        </Link>
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input value={q} onChange={e => setQ(e.target.value)} placeholder="Rechercher un produit…" className="pl-9 h-11" />
        </div>
        <Select value={cat} onValueChange={setCat}>
          <SelectTrigger className="w-48 h-11"><Filter className="w-4 h-4 mr-2" /><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes catégories</SelectItem>
            {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-44 h-11"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Plus récents</SelectItem>
            <SelectItem value="price_asc">Prix croissant</SelectItem>
            <SelectItem value="price_desc">Prix décroissant</SelectItem>
            <SelectItem value="name">Nom (A–Z)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-24 border border-dashed border-border rounded-2xl">
          <Package className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
          <p className="text-muted-foreground">Aucun produit ne correspond à votre recherche.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map(p => {
            const isFav = fav.includes(p.id);
            return (
              <article key={p.id} className="card-lift rounded-2xl border border-border bg-card overflow-hidden flex flex-col">
                <div className="relative aspect-[4/3] bg-gradient-to-br from-accent/30 to-secondary/40 flex items-center justify-center">
                  <Package className="w-12 h-12 text-primary/60" />
                  <button
                    onClick={() => favStore.toggle(p.id)}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-card/90 backdrop-blur flex items-center justify-center hover:bg-card transition"
                    aria-label="Ajouter aux favoris"
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-destructive text-destructive' : 'text-muted-foreground'}`} />
                  </button>
                  {p.stock <= 0 && (
                    <span className="absolute top-3 left-3 px-2 py-1 rounded-full bg-destructive text-destructive-foreground text-[10px] font-semibold uppercase">Rupture</span>
                  )}
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mb-1">{p.category}</div>
                  <h3 className="font-semibold text-sm leading-tight line-clamp-2 mb-2 min-h-[2.5rem]">{p.name}</h3>
                  <div className="flex items-center gap-1.5 mb-3 text-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-semibold">4.8</span>
                    <span className="text-muted-foreground">· Stock: {p.stock}</span>
                  </div>
                  <div className="flex items-end justify-between mt-auto">
                    <div className="font-bold text-foreground">{formatPrice(p.price)}</div>
                    <Button size="sm" onClick={() => add(p)} disabled={p.stock <= 0} className="h-8 gap-1">
                      <ShoppingBag className="w-3.5 h-3.5" /> Ajouter
                    </Button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ClientBoutique;
