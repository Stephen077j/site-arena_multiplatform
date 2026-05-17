import { Card } from '@/components/ui/card';
import type { ActivityItem } from '../../types/dashboard';

export function RecentActivity({ items }: { items: ActivityItem[] }) {
  return (
    <Card className="p-5">
      <h3 className="font-semibold mb-4">Activité récente</h3>
      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">Aucune activité enregistrée pour l'instant.</p>
      ) : (
        <ul className="divide-y divide-border">
          {items.map((log) => (
            <li key={log.id} className="py-2 flex items-center justify-between text-sm gap-3">
              <span className="min-w-0 truncate">
                <span className="font-medium">{log.action}</span>
                {log.entity && <span className="text-muted-foreground"> · {log.entity}</span>}
                {log.actor && <span className="text-muted-foreground"> · {log.actor}</span>}
              </span>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {new Date(log.createdAt).toLocaleString('fr-FR')}
              </span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
