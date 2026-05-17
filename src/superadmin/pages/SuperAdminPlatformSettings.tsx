import { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Loader2, Save } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

type Settings = {
  id?: string;
  web_enabled: boolean;
  mobile_enabled: boolean;
  desktop_enabled: boolean;
  web_domain: string | null;
  mobile_min_version: string | null;
  desktop_min_version: string | null;
  force_mobile_update: boolean;
  force_desktop_update: boolean;
  auto_update_enabled: boolean;
  realtime_enabled: boolean;
  offline_mode_enabled: boolean;
  max_sessions_per_user: number;
  session_timeout_minutes: number;
  enable_two_factor_auth: boolean;
  email_notifications_enabled: boolean;
  push_notifications_enabled: boolean;
  sms_notifications_enabled: boolean;
  maintenance_mode: boolean;
};

export default function SuperAdminPlatformSettings() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ['platform-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('platform_settings')
        .select('*')
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      return data as Settings | null;
    },
  });

  const [form, setForm] = useState<Settings | null>(null);
  useEffect(() => { if (data) setForm(data); }, [data]);

  const mutation = useMutation({
    mutationFn: async (s: Settings) => {
      const { error } = await supabase
        .from('platform_settings')
        .update({ ...s, updated_at: new Date().toISOString() })
        .eq('id', s.id!);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Paramètres enregistrés');
      qc.invalidateQueries({ queryKey: ['platform-settings'] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (isLoading || !form) {
    return <div className="p-8 flex items-center gap-2 text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /> Chargement…</div>;
  }

  const set = <K extends keyof Settings>(k: K, v: Settings[K]) => setForm({ ...form, [k]: v });

  const sections: { title: string; content: React.ReactNode }[] = [
    {
      title: 'Site Web',
      content: (
        <>
          <Row label="Activer le site web"><Switch checked={form.web_enabled} onCheckedChange={(v) => set('web_enabled', v)} /></Row>
          <Row label="Domaine"><Input value={form.web_domain ?? ''} onChange={(e) => set('web_domain', e.target.value)} placeholder="app.entreprise.com" /></Row>
          <Row label="Mode maintenance"><Switch checked={form.maintenance_mode} onCheckedChange={(v) => set('maintenance_mode', v)} /></Row>
        </>
      ),
    },
    {
      title: 'Application Mobile',
      content: (
        <>
          <Row label="Activer le mobile"><Switch checked={form.mobile_enabled} onCheckedChange={(v) => set('mobile_enabled', v)} /></Row>
          <Row label="Version minimum"><Input value={form.mobile_min_version ?? ''} onChange={(e) => set('mobile_min_version', e.target.value)} placeholder="1.0.0" /></Row>
          <Row label="Forcer la mise à jour"><Switch checked={form.force_mobile_update} onCheckedChange={(v) => set('force_mobile_update', v)} /></Row>
        </>
      ),
    },
    {
      title: 'Application Desktop',
      content: (
        <>
          <Row label="Activer le desktop"><Switch checked={form.desktop_enabled} onCheckedChange={(v) => set('desktop_enabled', v)} /></Row>
          <Row label="Version minimum"><Input value={form.desktop_min_version ?? ''} onChange={(e) => set('desktop_min_version', e.target.value)} placeholder="1.0.0" /></Row>
          <Row label="Forcer la mise à jour"><Switch checked={form.force_desktop_update} onCheckedChange={(v) => set('force_desktop_update', v)} /></Row>
          <Row label="Mise à jour automatique"><Switch checked={form.auto_update_enabled} onCheckedChange={(v) => set('auto_update_enabled', v)} /></Row>
        </>
      ),
    },
    {
      title: 'Synchronisation',
      content: (
        <>
          <Row label="Realtime activé"><Switch checked={form.realtime_enabled} onCheckedChange={(v) => set('realtime_enabled', v)} /></Row>
          <Row label="Mode hors-ligne"><Switch checked={form.offline_mode_enabled} onCheckedChange={(v) => set('offline_mode_enabled', v)} /></Row>
        </>
      ),
    },
    {
      title: 'Sessions & Sécurité',
      content: (
        <>
          <Row label="Sessions max par utilisateur"><Input type="number" min={1} value={form.max_sessions_per_user} onChange={(e) => set('max_sessions_per_user', parseInt(e.target.value) || 1)} /></Row>
          <Row label="Timeout session (minutes)"><Input type="number" min={5} value={form.session_timeout_minutes} onChange={(e) => set('session_timeout_minutes', parseInt(e.target.value) || 5)} /></Row>
          <Row label="Double authentification"><Switch checked={form.enable_two_factor_auth} onCheckedChange={(v) => set('enable_two_factor_auth', v)} /></Row>
        </>
      ),
    },
    {
      title: 'Notifications',
      content: (
        <>
          <Row label="Email"><Switch checked={form.email_notifications_enabled} onCheckedChange={(v) => set('email_notifications_enabled', v)} /></Row>
          <Row label="Push"><Switch checked={form.push_notifications_enabled} onCheckedChange={(v) => set('push_notifications_enabled', v)} /></Row>
          <Row label="SMS"><Switch checked={form.sms_notifications_enabled} onCheckedChange={(v) => set('sms_notifications_enabled', v)} /></Row>
        </>
      ),
    },
  ];

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-5xl">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Paramètres plateforme</h1>
          <p className="text-muted-foreground mt-1">Configuration globale Web, Mobile et Desktop</p>
        </div>
        <Button onClick={() => mutation.mutate(form)} disabled={mutation.isPending}>
          {mutation.isPending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
          Enregistrer
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map((s, i) => (
          <motion.div key={s.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="p-5">
              <h2 className="font-semibold mb-4">{s.title}</h2>
              <div className="space-y-4">{s.content}</div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <Label className="text-sm font-normal">{label}</Label>
      <div className="min-w-[160px] flex justify-end">{children}</div>
    </div>
  );
}
