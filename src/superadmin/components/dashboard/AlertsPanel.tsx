import { Card } from '@/components/ui/card';
import { AlertTriangle, Info, ShieldAlert, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { AlertItem } from '../../types/dashboard';

const styles: Record<AlertItem['severity'], { icon: LucideIcon; cls: string }> = {
  info:     { icon: Info,         cls: 'text-sky-500 bg-sky-500/10' },
  warning:  { icon: AlertTriangle, cls: 'text-amber-500 bg-amber-500/10' },
  critical: { icon: ShieldAlert,  cls: 'text-rose-500 bg-rose-500/10' },
};

interface Props {
  title: string;
  items: AlertItem[];
  emptyLabel?: string;
}

export function AlertsPanel({ title, items, emptyLabel = 'Rien à signaler.' }: Props) {
  return (
    <Card className="p-5">
      <h3 className="font-semibold mb-4">{title}</h3>
      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">{emptyLabel}</p>
      ) : (
        <ul className="space-y-3">
          {items.map((a) => {
            const { icon: Icon, cls } = styles[a.severity];
            return (
              <li key={a.id} className="flex items-start gap-3">
                <div className={cn('h-8 w-8 rounded-lg flex items-center justify-center shrink-0', cls)}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium truncate">{a.title}</div>
                  {a.description && <div className="text-xs text-muted-foreground truncate">{a.description}</div>}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}
