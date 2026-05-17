export interface DashboardStats {
  revenue: number;
  clients: number;
  moduleAdmins: number;
  orders: number;
  reservations: number;
  activeModules: number;
  criticalAlerts: number;
  activeSessions: number;
}

export interface RevenuePoint {
  day: string;
  ca: number;
}

export interface ModulePerformance {
  name: string;
  value: number;
}

export interface RevenueShare {
  name: string;
  value: number;
  color: string;
}

export interface UserGrowthPoint {
  month: string;
  users: number;
}

export type AlertSeverity = 'info' | 'warning' | 'critical';

export interface AlertItem {
  id: string;
  title: string;
  description?: string;
  severity: AlertSeverity;
  createdAt: string;
}

export interface ActivityItem {
  id: string;
  action: string;
  entity?: string | null;
  actor?: string | null;
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message?: string;
  createdAt: string;
}

export interface DashboardData {
  stats: DashboardStats;
  revenue: RevenuePoint[];
  modulePerf: ModulePerformance[];
  revenueShare: RevenueShare[];
  userGrowth: UserGrowthPoint[];
  alerts: AlertItem[];
  activity: ActivityItem[];
  notifications: NotificationItem[];
  lowStock: AlertItem[];
  pendingReservations: AlertItem[];
  failedPayments: AlertItem[];
}