import { Radio } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { SettingRow } from "./SettingRow";
import type { PlatformSettings, PlatformSettingsUpdate } from "@/types/platform-settings";

export function RealtimeSettingsCard({
  settings,
  onChange,
}: {
  settings: PlatformSettings;
  onChange: (patch: PlatformSettingsUpdate) => void;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2 space-y-0">
        <Radio className="h-5 w-5 text-primary" />
        <CardTitle className="text-base">Synchronisation Realtime</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        <SettingRow label="Realtime activé" hint="Propagation instantanée Web ⇄ POS ⇄ Mobile">
          <Switch
            checked={settings.realtime_enabled}
            onCheckedChange={(v) => onChange({ realtime_enabled: v })}
          />
        </SettingRow>
        <SettingRow label="Mode hors-ligne" hint="Autorise la file locale et la resynchronisation">
          <Switch
            checked={settings.offline_mode_enabled}
            onCheckedChange={(v) => onChange({ offline_mode_enabled: v })}
          />
        </SettingRow>
      </CardContent>
    </Card>
  );
}