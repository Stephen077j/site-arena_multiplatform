import { Loader2 } from 'lucide-react';
import { useSuperAdminDashboard } from '../hooks/useSuperAdminDashboard';
import { SuperAdminHeader } from '../components/SuperAdminHeader';
import { KPICards } from '../components/dashboard/KPICards';
import { RevenueChart } from '../components/dashboard/RevenueChart';
import { ModulePerformanceChart } from '../components/dashboard/ModulePerformanceChart';
import { RevenueDistributionChart } from '../components/dashboard/RevenueDistributionChart';
import { UserGrowthChart } from '../components/dashboard/UserGrowthChart';
import { AlertsPanel } from '../components/dashboard/AlertsPanel';
import { RecentActivity } from '../components/dashboard/RecentActivity';
import { NotificationsPanel } from '../components/dashboard/NotificationsPanel';

export default function SuperAdminDashboard() {
  const { data, isLoading } = useSuperAdminDashboard();

  if (isLoading || !data) {
    return (
      <div className="p-10 flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  const notifCount =
    data.notifications.length + data.lowStock.length + data.failedPayments.length;

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <SuperAdminHeader
        title="Tableau de bord"
        subtitle="Vue d'ensemble en temps réel de toute l'entreprise"
        notificationsCount={notifCount}
      />

      <KPICards stats={data.stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <RevenueChart data={data.revenue} />
        </div>
        <ModulePerformanceChart data={data.modulePerf} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <RevenueDistributionChart data={data.revenueShare} />
        <UserGrowthChart data={data.userGrowth} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <RecentActivity items={data.activity} />
        <NotificationsPanel items={data.notifications} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AlertsPanel title="Stock faible" items={data.lowStock} emptyLabel="Tous les stocks sont OK." />
        <AlertsPanel title="Réservations en attente" items={data.pendingReservations} emptyLabel="Aucune réservation en attente." />
        <AlertsPanel title="Paiements échoués" items={data.failedPayments} emptyLabel="Aucun paiement échoué." />
      </div>
    </div>
  );
}
