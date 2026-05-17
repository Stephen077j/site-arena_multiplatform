import { Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { SettingRow } from "./SettingRow";
import type { PlatformSettings, PlatformSettingsUpdate } from "@/types/platform-settings";

export function WebSettingsCard({
  settings,
  onChange,
}: {
  settings: PlatformSettings;
  onChange: (patch: PlatformSettingsUpdate) => void;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2 space-y-0">
        <Globe className="h-5 w-5 text-primary" />
        <CardTitle className="text-base">Portail Web</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        <SettingRow label="Activer le portail client" hint="Désactive l'accès public au site">
          <Switch
            checked={settings.web_enabled}
            onCheckedChange={(v) => onChange({ web_enabled: v })}
          />
        </SettingRow>
        <SettingRow label="Domaine principal" hint="Ex. app.entreprise.com">
          <Input
            value={settings.web_domain ?? ""}
            onChange={(e) => onChange({ web_domain: e.target.value })}
            placeholder="app.entreprise.com"
          />
        </SettingRow>
      </CardContent>
    </Card>
  );
}