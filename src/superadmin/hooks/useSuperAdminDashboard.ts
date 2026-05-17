import { useQuery } from '@tanstack/react-query';
import { superAdminService } from '../services/superAdminService';
import type { DashboardData } from '../types/dashboard';

export function useSuperAdminDashboard() {
  return useQuery<DashboardData>({
    queryKey: ['super-admin-dashboard'],
    queryFn: () => superAdminService.getAll(),
    staleTime: 60_000,
    refetchInterval: 60_000,
  });
}