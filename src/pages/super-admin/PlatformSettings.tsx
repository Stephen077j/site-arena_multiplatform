import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Save, Settings as SettingsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { usePlatformSettings } from "@/hooks/usePlatformSettings";
import { WebSettingsCard } from "@/components/super-admin/platform-settings/WebSettingsCard";
import { MobileSettingsCard } from "@/components/super-admin/platform-settings/MobileSettingsCard";
import { DesktopSettingsCard } from "@/components/super-admin/platform-settings/DesktopSettingsCard";
import { RealtimeSettingsCard } from "@/components/super-admin/platform-settings/RealtimeSettingsCard";
import { SecuritySettingsCard } from "@/components/super-admin/platform-settings/SecuritySettingsCard";
import { NotificationsSettingsCard } from "@/components/super-admin/platform-settings/NotificationsSettingsCard";
import { MaintenanceSettingsCard } from "@/components/super-admin/platform-settings/MaintenanceSettingsCard";
import type { PlatformSettings, PlatformSettingsUpdate } from "@/types/platform-settings";

export default function PlatformSettings() {
  const { settings, isLoading, save, isSaving } = usePlatformSettings();
  const [draft, setDraft] = useState<PlatformSettings | null>(null);

  useEffect(() => {
    if (settings) setDraft(settings);
  }, [settings]);

  if (isLoading || !draft) {
    return (
      <div className="p-8 flex items-center gap-2 text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" /> Chargement des paramètres…
      </div>
    );
  }

  const dirty = settings ? JSON.stringify(settings) !== JSON.stringify(draft) : false;
  const onChange = (patch: PlatformSettingsUpdate) => setDraft({ ...draft, ...patch });

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start justify-between flex-wrap gap-4"
      >
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-primary/10 p-2.5">
            <SettingsIcon className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Paramètres plateforme</h1>
            <p className="text-muted-foreground mt-1">
              Configuration centrale Web, Mobile, Desktop — appliquée en temps réel sur toutes les applications.
            </p>
            <div className="flex gap-2 mt-3">
              {draft.maintenance_mode && <Badge variant="destructive">Maintenance active</Badge>}
              {draft.realtime_enabled && <Badge variant="secondary">Realtime ON</Badge>}
              {dirty && <Badge>Modifications non enregistrées</Badge>}
            </div>
          </div>
        </div>
        <Button
          onClick={() => save({ id: draft.id, patch: draft })}
          disabled={!dirty || isSaving}
          size="lg"
        >
          {isSaving ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          Enregistrer
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {[
          <WebSettingsCard key="web" settings={draft} onChange={onChange} />,
          <MobileSettingsCard key="mobile" settings={draft} onChange={onChange} />,
          <DesktopSettingsCard key="desktop" settings={draft} onChange={onChange} />,
          <RealtimeSettingsCard key="realtime" settings={draft} onChange={onChange} />,
          <SecuritySettingsCard key="security" settings={draft} onChange={onChange} />,
          <NotificationsSettingsCard key="notif" settings={draft} onChange={onChange} />,
          <MaintenanceSettingsCard key="maintenance" settings={draft} onChange={onChange} />,
        ].map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            {card}
          </motion.div>
        ))}
      </div>
    </div>
  );
}