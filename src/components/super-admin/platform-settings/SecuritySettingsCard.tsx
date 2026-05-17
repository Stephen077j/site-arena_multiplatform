import { ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { SettingRow } from "./SettingRow";
import type { PlatformSettings, PlatformSettingsUpdate } from "@/types/platform-settings";

export function SecuritySettingsCard({
  settings,
  onChange,
}: {
  settings: PlatformSettings;
  onChange: (patch: PlatformSettingsUpdate) => void;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2 space-y-0">
        <ShieldCheck className="h-5 w-5 text-primary" />
        <CardTitle className="text-base">Sessions & Sécurité</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        <SettingRow label="Sessions max par utilisateur">
          <Input
            type="number"
            min={1}
            max={20}
            value={settings.max_sessions_per_user}
            onChange={(e) =>
              onChange({ max_sessions_per_user: Math.max(1, parseInt(e.target.value) || 1) })
            }
          />
        </SettingRow>
        <SettingRow label="Timeout de session (minutes)">
          <Input
            type="number"
            min={5}
            max={1440}
            value={settings.session_timeout_minutes}
            onChange={(e) =>
              onChange({ session_timeout_minutes: Math.max(5, parseInt(e.target.value) || 5) })
            }
          />
        </SettingRow>
        <SettingRow label="Authentification à deux facteurs" hint="2FA obligatoire pour tous les rôles">
          <Switch
            checked={settings.enable_two_factor_auth}
            onCheckedChange={(v) => onChange({ enable_two_factor_auth: v })}
          />
        </SettingRow>
      </CardContent>
    </Card>
  );
}