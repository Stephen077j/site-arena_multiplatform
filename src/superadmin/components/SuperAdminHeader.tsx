import { Bell, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { useSuperAdminAuth } from '../lib/superAdminAuth';

interface Props {
  title?: string;
  subtitle?: string;
  notificationsCount?: number;
}

export function SuperAdminHeader({ title, subtitle, notificationsCount = 0 }: Props) {
  const { user } = useSuperAdminAuth();
  const initials = (user?.email ?? 'SA').slice(0, 2).toUpperCase();

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between border-b border-border/60 pb-5"
    >
      <div>
        {title && <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">{title}</h1>}
        {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 lg:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher utilisateurs, modules…"
            className="pl-9 bg-background/60 backdrop-blur"
          />
        </div>

        <button
          className="relative h-10 w-10 rounded-xl border border-border/60 bg-background/60 backdrop-blur flex items-center justify-center hover:bg-accent transition-colors"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          {notificationsCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 min-w-[20px] px-1 rounded-full bg-amber-500 text-[10px] font-semibold text-slate-900 flex items-center justify-center">
              {notificationsCount > 9 ? '9+' : notificationsCount}
            </span>
          )}
        </button>

        <div className="flex items-center gap-2 pl-2 border-l border-border/60">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-slate-900 font-bold flex items-center justify-center text-sm">
            {initials}
          </div>
          <div className="hidden md:block leading-tight">
            <div className="text-sm font-medium truncate max-w-[160px]">{user?.email ?? '—'}</div>
            <div className="text-[11px] text-amber-500">Super Admin</div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}