import { Card } from '@/components/ui/card';
import { Bell } from 'lucide-react';
import type { NotificationItem } from '../../types/dashboard';

export function NotificationsPanel({ items }: { items: NotificationItem[] }) {
  return (
    <Card className="p-5">
      <h3 className="font-semibold mb-4">Notifications système</h3>
      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">Aucune notification.</p>
      ) : (
        <ul className="space-y-3">
          {items.map((n) => (
            <li key={n.id} className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                <Bell className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-medium truncate">{n.title}</div>
                {n.message && <div className="text-xs text-muted-foreground truncate">{n.message}</div>}
                <div className="text-[11px] text-muted-foreground mt-0.5">
                  {new Date(n.createdAt).toLocaleString('fr-FR')}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}