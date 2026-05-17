import { Monitor } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { SettingRow } from "./SettingRow";
import type { PlatformSettings, PlatformSettingsUpdate } from "@/types/platform-settings";

export function DesktopSettingsCard({
  settings,
  onChange,
}: {
  settings: PlatformSettings;
  onChange: (patch: PlatformSettingsUpdate) => void;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2 space-y-0">
        <Monitor className="h-5 w-5 text-primary" />
        <CardTitle className="text-base">Application Desktop</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        <SettingRow label="Activer le POS desktop">
          <Switch
            checked={settings.desktop_enabled}
            onCheckedChange={(v) => onChange({ desktop_enabled: v })}
          />
        </SettingRow>
        <SettingRow label="Version minimale">
          <Input
            value={settings.desktop_min_version ?? ""}
            onChange={(e) => onChange({ desktop_min_version: e.target.value })}
            placeholder="1.0.0"
          />
        </SettingRow>
        <SettingRow label="Forcer la mise à jour">
          <Switch
            checked={settings.force_desktop_update}
            onCheckedChange={(v) => onChange({ force_desktop_update: v })}
          />
        </SettingRow>
        <SettingRow label="Mise à jour automatique" hint="Auto-update Electron au lancement">
          <Switch
            checked={settings.auto_update_enabled}
            onCheckedChange={(v) => onChange({ auto_update_enabled: v })}
          />
        </SettingRow>
      </CardContent>
    </Card>
  );
}