import { useState } from 'react';
import { motion } from 'framer-motion';
import { Waves, Check, Calendar, X, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { toast } from 'sonner';
import {
  POOL_PASSES, POOL_COURSES, poolStore, usePoolPasses, usePoolCourses, usePoolEntries,
  formatPrice,
} from '@/client/lib/clientStore';

const ClientPool = () => {
  const passes = usePoolPasses();
  const courses = usePoolCourses();
  const entries = usePoolEntries();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [passId, setPassId] = useState(POOL_PASSES[0].id);

  const [courseId, setCourseId] = useState(POOL_COURSES[0].id);
  const [slot, setSlot] = useState(POOL_COURSES[0].slots[0]);

  const [entryPhone, setEntryPhone] = useState('');

  const buy = () => {
    if (!name || !phone) return toast.error('Nom et téléphone requis');
    poolStore.buy({ customer: { name, phone }, passId });
    toast.success('Forfait acheté — paiement à l\'accueil');
  };

  const book = () => {
    if (!name || !phone) return toast.error('Nom et téléphone requis');
    const c = POOL_COURSES.find(x => x.id === courseId)!;
    poolStore.bookCourse({ customer: { name, phone }, courseId: c.id, courseLabel: c.label, coach: c.coach, slot, price: c.price });
    toast.success('Cours réservé');
  };

  const useOne = () => {
    if (!entryPhone) return toast.error('Téléphone requis');
    const r = poolStore.useEntry(entryPhone);
    if (!r) toast.error('Aucun forfait valide');
    else toast.success('Entrée validée');
  };

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-600 text-xs font-medium mb-3">
          <Waves className="w-3.5 h-3.5" /> Piscine
        </div>
        <h1 className="font-display text-4xl sm:text-5xl tracking-tight mb-3">Plongez quand vous voulez.</h1>
        <p className="text-muted-foreground max-w-2xl">Achetez un forfait, réservez vos cours, contrôlez vos entrées en un geste.</p>
      </motion.div>

      <Tabs defaultValue="forfaits">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="forfaits">Forfaits</TabsTrigger>
          <TabsTrigger value="cours">Cours</TabsTrigger>
          <TabsTrigger value="entree">Contrôle d'entrée</TabsTrigger>
          <TabsTrigger value="mes">Mes forfaits</TabsTrigger>
        </TabsList>

        <TabsContent value="forfaits" className="mt-6">
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {POOL_PASSES.map(p => (
              <button key={p.id} onClick={() => setPassId(p.id)}
                className={`text-left rounded-2xl border-2 p-5 transition ${passId === p.id ? 'border-primary bg-primary/5 shadow-trust' : 'border-border bg-card hover:border-primary/40'}`}>
                <div className="flex items-start justify-between mb-2">
                  <div className="font-semibold">{p.label}</div>
                  {passId === p.id && <Check className="w-5 h-5 text-primary" />}
                </div>
                <div className="text-xs text-muted-foreground mb-3">{p.desc}</div>
                <div className="font-display text-2xl">{formatPrice(p.price)}</div>
                <div className="text-xs text-muted-foreground mt-1">{p.entries === 999 ? 'Illimité' : `${p.entries} entrée(s)`}</div>
              </button>
            ))}
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 max-w-xl">
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="space-y-1.5"><Label>Nom</Label><Input value={name} onChange={e => setName(e.target.value)} /></div>
              <div className="space-y-1.5"><Label>Téléphone</Label><Input value={phone} onChange={e => setPhone(e.target.value)} /></div>
            </div>
            <Button onClick={buy} className="w-full h-12" size="lg">Acheter — paiement à l'accueil</Button>
          </div>
        </TabsContent>

        <TabsContent value="cours" className="mt-6">
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {POOL_COURSES.map(c => (
              <button key={c.id} onClick={() => { setCourseId(c.id); setSlot(c.slots[0]); }}
                className={`text-left rounded-2xl border-2 p-5 transition ${courseId === c.id ? 'border-primary bg-primary/5' : 'border-border bg-card hover:border-primary/40'}`}>
                <div className="font-semibold">{c.label}</div>
                <div className="text-xs text-muted-foreground mt-0.5">Coach {c.coach}</div>
                <div className="text-sm font-bold text-primary mt-3">{formatPrice(c.price)}</div>
              </button>
            ))}
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 max-w-xl">
            <Label className="mb-2 block">Créneau</Label>
            <div className="flex flex-wrap gap-2 mb-4">
              {POOL_COURSES.find(c => c.id === courseId)!.slots.map(s => (
                <button key={s} onClick={() => setSlot(s)} className={`px-4 py-2 rounded-lg text-sm border transition ${slot === s ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card hover:border-primary/40'}`}>{s}</button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="space-y-1.5"><Label>Nom</Label><Input value={name} onChange={e => setName(e.target.value)} /></div>
              <div className="space-y-1.5"><Label>Téléphone</Label><Input value={phone} onChange={e => setPhone(e.target.value)} /></div>
            </div>
            <Button onClick={book} className="w-full h-12" size="lg"><Calendar className="w-4 h-4 mr-2" /> Réserver</Button>
          </div>

          {courses.length > 0 && (
            <div className="mt-8">
              <h3 className="font-semibold mb-3">Mes cours</h3>
              <div className="space-y-2">
                {courses.map(b => (
                  <div key={b.id} className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3">
                    <div>
                      <div className="font-medium text-sm">{b.courseLabel} <span className="text-muted-foreground">— {b.slot}</span></div>
                      <div className="text-xs text-muted-foreground">Coach {b.coach} • {formatPrice(b.price)} • {b.status === 'annule' ? <span className="text-destructive">Annulé</span> : <span className="text-emerald-600">Confirmé</span>}</div>
                    </div>
                    {b.status === 'confirme' && <Button size="sm" variant="ghost" onClick={() => poolStore.cancelCourse(b.id)}><X className="w-4 h-4" /></Button>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="entree" className="mt-6">
          <div className="rounded-2xl border border-border bg-card p-6 max-w-xl mb-6">
            <h3 className="font-semibold mb-4">Valider mon entrée</h3>
            <div className="flex gap-2">
              <Input value={entryPhone} onChange={e => setEntryPhone(e.target.value)} placeholder="Votre téléphone" />
              <Button onClick={useOne}>Entrer</Button>
            </div>
          </div>
          <h3 className="font-semibold mb-3">Dernières entrées</h3>
          {entries.length === 0 ? <p className="text-muted-foreground text-sm">Aucune entrée enregistrée</p> :
            <div className="space-y-2">
              {entries.slice(0, 15).map(e => (
                <div key={e.id} className="flex justify-between rounded-xl border border-border bg-card px-4 py-3 text-sm">
                  <span>{e.phone}</span><span className="text-muted-foreground">{new Date(e.date).toLocaleString('fr-FR')}</span>
                </div>
              ))}
            </div>}
        </TabsContent>

        <TabsContent value="mes" className="mt-6">
          {passes.length === 0 ? <p className="text-muted-foreground">Aucun forfait actif.</p> :
            <div className="space-y-3">
              {passes.map(p => {
                const lowAlert = p.entriesLeft <= 2 && p.entriesLeft > 0;
                return (
                  <div key={p.id} className="rounded-2xl border border-border bg-card p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-semibold">{p.customer.name} <span className="text-muted-foreground font-normal">• {p.customer.phone}</span></div>
                        <div className="text-sm text-muted-foreground">{p.passLabel} — expire le {new Date(p.expiresAt).toLocaleDateString('fr-FR')}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{p.entriesLeft === 999 ? '∞' : p.entriesLeft}</div>
                        <div className="text-xs text-muted-foreground">entrée(s)</div>
                      </div>
                    </div>
                    {lowAlert && <div className="mt-3 flex items-center gap-2 text-xs text-amber-600 bg-amber-500/10 rounded-lg px-3 py-2"><AlertCircle className="w-3.5 h-3.5" /> Plus que {p.entriesLeft} entrée(s), pensez à renouveler.</div>}
                  </div>
                );
              })}
            </div>}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientPool;
