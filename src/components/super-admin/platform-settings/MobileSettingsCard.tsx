import { Smartphone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { SettingRow } from "./SettingRow";
import type { PlatformSettings, PlatformSettingsUpdate } from "@/types/platform-settings";

export function MobileSettingsCard({
  settings,
  onChange,
}: {
  settings: PlatformSettings;
  onChange: (patch: PlatformSettingsUpdate) => void;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2 space-y-0">
        <Smartphone className="h-5 w-5 text-primary" />
        <CardTitle className="text-base">Application Mobile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        <SettingRow label="Activer l'application mobile">
          <Switch
            checked={settings.mobile_enabled}
            onCheckedChange={(v) => onChange({ mobile_enabled: v })}
          />
        </SettingRow>
        <SettingRow label="Version minimale" hint="Format SemVer (ex. 1.4.0)">
          <Input
            value={settings.mobile_min_version ?? ""}
            onChange={(e) => onChange({ mobile_min_version: e.target.value })}
            placeholder="1.0.0"
          />
        </SettingRow>
        <SettingRow label="Forcer la mise à jour" hint="Bloque les versions obsolètes">
          <Switch
            checked={settings.force_mobile_update}
            onCheckedChange={(v) => onChange({ force_mobile_update: v })}
          />
        </SettingRow>
      </CardContent>
    </Card>
  );
}