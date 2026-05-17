import { useState } from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Check, UserCheck, Calendar, RefreshCw, X, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { toast } from 'sonner';
import {
  GYM_PLANS, COACHES, gymStore, useGymSubs, useGymCheckins, useGymCoachBookings,
  formatPrice, type GymPlan,
} from '@/client/lib/clientStore';

const ClientGym = () => {
  const subs = useGymSubs();
  const checkins = useGymCheckins();
  const coachBks = useGymCoachBookings();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [plan, setPlan] = useState<GymPlan>('mensuel');
  const [autoRenew, setAutoRenew] = useState(true);

  const [checkPhone, setCheckPhone] = useState('');

  const [coachId, setCoachId] = useState(COACHES[0].id);
  const [coachDate, setCoachDate] = useState(new Date().toISOString().split('T')[0]);
  const [coachTime, setCoachTime] = useState('09:00');

  const subscribe = () => {
    if (!name || !phone) return toast.error('Nom et téléphone requis');
    gymStore.subscribe({ customer: { name, phone }, plan, autoRenew });
    toast.success('Abonnement enregistré ! Paiement à l\'accueil.');
    setName(''); setPhone('');
  };

  const doCheckIn = () => {
    if (!checkPhone) return toast.error('Téléphone requis');
    const r = gymStore.checkIn(checkPhone);
    if (!r) toast.error('Aucun abonnement actif trouvé');
    else { toast.success('Présence enregistrée'); setCheckPhone(''); }
  };

  const bookCoach = () => {
    if (!name || !phone) return toast.error('Renseignez vos coordonnées dans l\'onglet abonnement');
    const c = COACHES.find(x => x.id === coachId)!;
    gymStore.bookCoach({
      coachId: c.id, coachName: c.name,
      customer: { name, phone }, date: coachDate, time: coachTime, price: c.hourPrice,
    });
    toast.success('Séance avec coach réservée');
  };

  const myCheckins = checkPhone ? checkins.filter(c => c.phone === checkPhone) : checkins.slice(0, 10);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs font-medium mb-3">
          <Dumbbell className="w-3.5 h-3.5" /> Salle de sport
        </div>
        <h1 className="font-display text-4xl sm:text-5xl tracking-tight mb-3">Restez en forme, sans paperasse.</h1>
        <p className="text-muted-foreground max-w-2xl">Choisissez un abonnement, réservez un coach, pointez vos présences — tout depuis votre téléphone.</p>
      </motion.div>

      <Tabs defaultValue="abonnement" className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="abonnement">Abonnement</TabsTrigger>
          <TabsTrigger value="coach">Réserver un coach</TabsTrigger>
          <TabsTrigger value="presence">Mes présences</TabsTrigger>
          <TabsTrigger value="mes">Mes abonnements</TabsTrigger>
        </TabsList>

        {/* ABONNEMENT */}
        <TabsContent value="abonnement" className="mt-6">
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {GYM_PLANS.map(p => (
              <button
                key={p.id}
                onClick={() => setPlan(p.id)}
                className={`text-left rounded-2xl border-2 p-5 transition ${plan === p.id ? 'border-primary bg-primary/5 shadow-trust' : 'border-border bg-card hover:border-primary/40'}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-semibold">{p.label}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{p.desc}</div>
                  </div>
                  {plan === p.id && <Check className="w-5 h-5 text-primary" />}
                </div>
                <div className="font-display text-2xl">{formatPrice(p.price)}</div>
              </button>
            ))}
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 max-w-xl">
            <h3 className="font-semibold mb-4">Vos informations</h3>
            <div className="space-y-3">
              <div className="space-y-1.5"><Label>Nom complet</Label><Input value={name} onChange={e => setName(e.target.value)} placeholder="Hery Andriamasinoro" /></div>
              <div className="space-y-1.5"><Label>Téléphone</Label><Input value={phone} onChange={e => setPhone(e.target.value)} placeholder="034 12 345 67" /></div>
              <div className="flex items-center justify-between rounded-xl bg-muted/50 px-4 py-3">
                <div>
                  <div className="text-sm font-medium flex items-center gap-1.5"><RefreshCw className="w-3.5 h-3.5" /> Renouvellement automatique</div>
                  <div className="text-xs text-muted-foreground">Reconduit votre abonnement à l'échéance</div>
                </div>
                <Switch checked={autoRenew} onCheckedChange={setAutoRenew} />
              </div>
              <Button onClick={subscribe} className="w-full h-12" size="lg">S'inscrire — paiement à l'accueil</Button>
            </div>
          </div>
        </TabsContent>

        {/* COACH */}
        <TabsContent value="coach" className="mt-6">
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {COACHES.map(c => (
              <button key={c.id} onClick={() => setCoachId(c.id)} className={`text-left rounded-2xl border-2 p-5 transition ${coachId === c.id ? 'border-primary bg-primary/5' : 'border-border bg-card hover:border-primary/40'}`}>
                <div className="w-12 h-12 rounded-full bg-primary-gradient text-white font-bold flex items-center justify-center mb-3">{c.name.charAt(0)}</div>
                <div className="font-semibold">{c.name}</div>
                <div className="text-xs text-muted-foreground">{c.specialty}</div>
                <div className="mt-3 text-sm font-bold text-primary">{formatPrice(c.hourPrice)} / h</div>
              </button>
            ))}
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 max-w-xl">
            <h3 className="font-semibold mb-4">Choisir un créneau</h3>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="space-y-1.5"><Label>Date</Label><Input type="date" value={coachDate} onChange={e => setCoachDate(e.target.value)} min={new Date().toISOString().split('T')[0]} /></div>
              <div className="space-y-1.5"><Label>Heure</Label><Input type="time" value={coachTime} onChange={e => setCoachTime(e.target.value)} /></div>
            </div>
            <Button onClick={bookCoach} className="w-full h-12" size="lg"><Calendar className="w-4 h-4 mr-2" /> Réserver le coach</Button>
          </div>

          {coachBks.length > 0 && (
            <div className="mt-8">
              <h3 className="font-semibold mb-3">Mes séances</h3>
              <div className="space-y-2">
                {coachBks.map(b => (
                  <div key={b.id} className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3">
                    <div>
                      <div className="font-medium text-sm">{b.coachName} <span className="text-muted-foreground">— {b.date} à {b.time}</span></div>
                      <div className="text-xs text-muted-foreground">{formatPrice(b.price)} • {b.status === 'annule' ? <span className="text-destructive">Annulé</span> : <span className="text-emerald-600">Confirmé</span>}</div>
                    </div>
                    {b.status === 'confirme' && <Button size="sm" variant="ghost" onClick={() => gymStore.cancelCoach(b.id)}><X className="w-4 h-4" /></Button>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        {/* PRESENCES */}
        <TabsContent value="presence" className="mt-6">
          <div className="rounded-2xl border border-border bg-card p-6 max-w-xl mb-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><UserCheck className="w-5 h-5 text-primary" /> Pointer ma présence</h3>
            <div className="flex gap-2">
              <Input value={checkPhone} onChange={e => setCheckPhone(e.target.value)} placeholder="Votre téléphone" />
              <Button onClick={doCheckIn}>Pointer</Button>
            </div>
          </div>
          <h3 className="font-semibold mb-3">Historique des présences</h3>
          {myCheckins.length === 0 ? <p className="text-muted-foreground text-sm">Aucune présence enregistrée</p> :
            <div className="space-y-2">
              {myCheckins.map(c => (
                <div key={c.id} className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3 text-sm">
                  <span>{c.phone}</span>
                  <span className="text-muted-foreground">{new Date(c.date).toLocaleString('fr-FR')}</span>
                </div>
              ))}
            </div>}
        </TabsContent>

        {/* MES ABONNEMENTS */}
        <TabsContent value="mes" className="mt-6">
          {subs.length === 0 ? <p className="text-muted-foreground">Vous n'avez aucun abonnement.</p> :
            <div className="space-y-3">
              {subs.map(s => {
                const def = GYM_PLANS.find(p => p.id === s.plan)!;
                const daysLeft = Math.ceil((new Date(s.endDate).getTime() - Date.now()) / 86400000);
                return (
                  <div key={s.id} className="rounded-2xl border border-border bg-card p-5">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <div className="font-semibold">{s.customer.name} <span className="text-muted-foreground font-normal">• {s.customer.phone}</span></div>
                        <div className="text-sm text-muted-foreground">{def.label} — expire le {new Date(s.endDate).toLocaleDateString('fr-FR')}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{formatPrice(s.price)}</div>
                        <div className={`text-xs ${s.paid ? 'text-emerald-600' : 'text-amber-600'}`}>{s.paid ? 'Payé' : 'À régler à l\'accueil'}</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                      <span>{daysLeft > 0 ? `${daysLeft} jours restants` : 'Expiré'}</span>
                      <span className="flex items-center gap-1">
                        <Star className={`w-3.5 h-3.5 ${s.autoRenew ? 'text-primary fill-primary' : ''}`} /> Auto-renouvellement {s.autoRenew ? 'activé' : 'désactivé'}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => gymStore.renew(s.id)}><RefreshCw className="w-3.5 h-3.5 mr-1" /> Renouveler</Button>
                      <Button size="sm" variant="outline" onClick={() => gymStore.toggleAuto(s.id)}>Auto: {s.autoRenew ? 'off' : 'on'}</Button>
                      <Button size="sm" variant="ghost" onClick={() => gymStore.cancel(s.id)}><X className="w-3.5 h-3.5" /></Button>
                    </div>
                  </div>
                );
              })}
            </div>}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientGym;
