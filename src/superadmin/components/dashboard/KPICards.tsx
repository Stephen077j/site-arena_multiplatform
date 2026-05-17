import {
  DollarSign, Users, ShieldCheck, ShoppingCart, Calendar,
  Boxes, AlertTriangle, Activity,
} from 'lucide-react';
import { KpiCard } from '../KpiCard';
import type { DashboardStats } from '../../types/dashboard';

const fmtAr = (v: number) => `${v.toLocaleString('fr-FR')} Ar`;

export function KPICards({ stats }: { stats: DashboardStats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <KpiCard label="Chiffre d'affaires" value={fmtAr(stats.revenue)} icon={DollarSign} accent="amber" trend="+12% vs sem. dernière" delay={0} />
      <KpiCard label="Clients" value={stats.clients} icon={Users} accent="sky" delay={0.05} />
      <KpiCard label="Admins modules" value={stats.moduleAdmins} icon={ShieldCheck} accent="emerald" delay={0.1} />
      <KpiCard label="Commandes" value={stats.orders} icon={ShoppingCart} accent="violet" trend="+8% aujourd'hui" delay={0.15} />
      <KpiCard label="Réservations" value={stats.reservations} icon={Calendar} accent="sky" delay={0.2} />
      <KpiCard label="Modules actifs" value={stats.activeModules} icon={Boxes} accent="emerald" delay={0.25} />
      <KpiCard label="Alertes critiques" value={stats.criticalAlerts} icon={AlertTriangle} accent="rose" delay={0.3} />
      <KpiCard label="Sessions actives" value={stats.activeSessions} icon={Activity} accent="violet" trend="24 dernières heures" delay={0.35} />
    </div>
  );
}