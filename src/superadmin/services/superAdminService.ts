import { supabase } from '@/integrations/supabase/client';
import type {
  ActivityItem,
  AlertItem,
  DashboardData,
  DashboardStats,
  ModulePerformance,
  NotificationItem,
  RevenuePoint,
  RevenueShare,
  UserGrowthPoint,
} from '../types/dashboard';

/** Liste des modules connus (référentiel local — pas encore en base). */
const KNOWN_MODULES = [
  'restaurant', 'boutique', 'hotel', 'salon', 'gym', 'pool', 'field',
  'cybercafe', 'event', 'spectacles',
];

/**
 * Service centralisé pour le tableau de bord Super Admin.
 * Lit ce qui existe réellement en base (profiles, user_roles, audit_logs,
 * platform_settings) et complète avec des séries dérivées / démos pour
 * les modules pas encore branchés (payments, notifications, stocks…).
 */
export const superAdminService = {
  async getStats(): Promise<DashboardStats> {
    const [profiles, admins, logsCount, settings] = await Promise.all([
      supabase.from('profiles').select('id', { count: 'exact', head: true }),
      supabase.from('user_roles').select('id', { count: 'exact', head: true }).eq('role', 'admin_module'),
      supabase.from('audit_logs').select('id', { count: 'exact', head: true })
        .gte('created_at', new Date(Date.now() - 24 * 3600 * 1000).toISOString()),
      supabase.from('platform_settings').select('active_modules,max_sessions_per_user').maybeSingle(),
    ]);

    const activeModules = settings.data?.active_modules?.length ?? KNOWN_MODULES.length;

    return {
      revenue: 2_450_000,
      clients: profiles.count ?? 0,
      moduleAdmins: admins.count ?? 0,
      orders: 342,
      reservations: 128,
      activeModules,
      criticalAlerts: 0,
      activeSessions: logsCount.count ?? 0,
    };
  },

  async getRevenueSeries(): Promise<RevenuePoint[]> {
    return Array.from({ length: 14 }).map((_, i) => ({
      day: `J${i + 1}`,
      ca: Math.round(50_000 + Math.random() * 200_000),
    }));
  },

  async getModulePerformance(): Promise<ModulePerformance[]> {
    return [
      { name: 'Restaurant', value: 320 },
      { name: 'Boutique', value: 245 },
      { name: 'Hôtel', value: 180 },
      { name: 'Salle Sport', value: 140 },
      { name: 'Piscine', value: 95 },
      { name: 'Salon', value: 75 },
    ];
  },

  async getRevenueShare(): Promise<RevenueShare[]> {
    return [
      { name: 'Restaurant', value: 38, color: '#f59e0b' },
      { name: 'Hôtel', value: 27, color: '#10b981' },
      { name: 'Boutique', value: 18, color: '#0ea5e9' },
      { name: 'Loisirs', value: 12, color: '#8b5cf6' },
      { name: 'Autres', value: 5, color: '#f43f5e' },
    ];
  },

  async getUserGrowth(): Promise<UserGrowthPoint[]> {
    const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
    let base = 20;
    return months.map((m) => {
      base += Math.round(5 + Math.random() * 15);
      return { month: m, users: base };
    });
  },

  async getRecentActivity(limit = 8): Promise<ActivityItem[]> {
    const { data } = await supabase
      .from('audit_logs')
      .select('id,action,entity,actor_email,created_at')
      .order('created_at', { ascending: false })
      .limit(limit);
    return (data ?? []).map((l) => ({
      id: l.id,
      action: l.action,
      entity: l.entity,
      actor: l.actor_email,
      createdAt: l.created_at,
    }));
  },

  async getAlerts(): Promise<AlertItem[]> {
    return [];
  },

  async getNotifications(): Promise<NotificationItem[]> {
    return [
      { id: 'n1', title: 'Mise à jour plateforme disponible', message: 'Version 1.4 prête à déployer.', createdAt: new Date().toISOString() },
      { id: 'n2', title: 'Sauvegarde quotidienne réussie', createdAt: new Date(Date.now() - 3600_000).toISOString() },
    ];
  },

  async getLowStock(): Promise<AlertItem[]> {
    return [
      { id: 'ls1', title: 'Coca 33cl', description: 'Stock: 4 / Seuil: 20', severity: 'warning', createdAt: new Date().toISOString() },
      { id: 'ls2', title: 'Serviettes hôtel', description: 'Stock: 12 / Seuil: 50', severity: 'warning', createdAt: new Date().toISOString() },
    ];
  },

  async getPendingReservations(): Promise<AlertItem[]> {
    return [
      { id: 'pr1', title: 'Chambre 204 — Rakoto', description: 'Check-in demain', severity: 'info', createdAt: new Date().toISOString() },
      { id: 'pr2', title: 'Table 8 — 4 pers.', description: 'Ce soir 19h30', severity: 'info', createdAt: new Date().toISOString() },
    ];
  },

  async getFailedPayments(): Promise<AlertItem[]> {
    return [];
  },

  async getAll(): Promise<DashboardData> {
    const [
      stats, revenue, modulePerf, revenueShare, userGrowth,
      activity, alerts, notifications, lowStock, pendingReservations, failedPayments,
    ] = await Promise.all([
      this.getStats(),
      this.getRevenueSeries(),
      this.getModulePerformance(),
      this.getRevenueShare(),
      this.getUserGrowth(),
      this.getRecentActivity(),
      this.getAlerts(),
      this.getNotifications(),
      this.getLowStock(),
      this.getPendingReservations(),
      this.getFailedPayments(),
    ]);
    return {
      stats, revenue, modulePerf, revenueShare, userGrowth,
      alerts, activity, notifications, lowStock, pendingReservations, failedPayments,
    };
  },
};