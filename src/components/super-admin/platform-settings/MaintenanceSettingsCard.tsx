import { Wrench } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { SettingRow } from "./SettingRow";
import type { PlatformSettings, PlatformSettingsUpdate } from "@/types/platform-settings";

export function MaintenanceSettingsCard({
  settings,
  onChange,
}: {
  settings: PlatformSettings;
  onChange: (patch: PlatformSettingsUpdate) => void;
}) {
  return (
    <Card
      className={
        settings.maintenance_mode ? "border-destructive/40 bg-destructive/5" : undefined
      }
    >
      <CardHeader className="flex flex-row items-center gap-2 space-y-0">
        <Wrench className="h-5 w-5 text-primary" />
        <CardTitle className="text-base">Mode maintenance</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        <SettingRow
          label="Activer le mode maintenance"
          hint="Affiche une page d'indisponibilité sur le Web, Mobile et Desktop"
        >
          <Switch
            checked={settings.maintenance_mode}
            onCheckedChange={(v) => onChange({ maintenance_mode: v })}
          />
        </SettingRow>
      </CardContent>
    </Card>
  );
}