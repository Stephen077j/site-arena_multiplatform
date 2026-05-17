import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Users, Shield, Boxes, Settings, BarChart3,
  ScrollText, Bell, CreditCard, Activity, LogOut, Crown,
} from 'lucide-react';
import { useSuperAdminAuth } from '../lib/superAdminAuth';
import { cn } from '@/lib/utils';

const items = [
  { to: '/super-admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/super-admin/users', icon: Users, label: 'Utilisateurs' },
  { to: '/super-admin/roles', icon: Shield, label: 'Rôles' },
  { to: '/super-admin/modules', icon: Boxes, label: 'Modules' },
  { to: '/super-admin/platform-settings', icon: Settings, label: 'Plateforme' },
  { to: '/super-admin/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/super-admin/audit-logs', icon: ScrollText, label: "Journaux d'audit" },
  { to: '/super-admin/notifications', icon: Bell, label: 'Notifications' },
  { to: '/super-admin/billing', icon: CreditCard, label: 'Facturation' },
  { to: '/super-admin/system-health', icon: Activity, label: 'Santé système' },
];

export function SuperAdminSidebar() {
  const { user, signOut } = useSuperAdminAuth();

  return (
    <aside className="hidden lg:flex w-64 flex-col bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-r border-amber-500/10 text-slate-100">
      <div className="px-6 py-6 border-b border-amber-500/10">
        <div className="flex items-center gap-2">
          <Crown className="h-6 w-6 text-amber-400" />
          <div>
            <div className="text-sm font-semibold tracking-wide">GestPro</div>
            <div className="text-xs text-amber-400/80">Super Admin</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {items.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                isActive
                  ? 'bg-amber-500/10 text-amber-200 border border-amber-500/20'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              )
            }
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-amber-500/10 p-4 space-y-2">
        <div className="text-xs text-slate-400 truncate">{user?.email}</div>
        <button
          onClick={signOut}
          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Se déconnecter
        </button>
      </div>
    </aside>
  );
}
