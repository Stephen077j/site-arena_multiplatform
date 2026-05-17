import { Card } from '@/components/ui/card';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';
import type { RevenuePoint } from '../../types/dashboard';

export function RevenueChart({ data }: { data: RevenuePoint[] }) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Évolution du chiffre d'affaires</h3>
        <span className="text-xs text-muted-foreground">14 derniers jours</span>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="ca-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis dataKey="day" className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip formatter={(v: number) => `${v.toLocaleString('fr-FR')} Ar`} />
            <Area type="monotone" dataKey="ca" stroke="hsl(var(--primary))" fill="url(#ca-grad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
