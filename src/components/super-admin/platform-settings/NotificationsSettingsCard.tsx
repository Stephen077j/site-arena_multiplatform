import { Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { SettingRow } from "./SettingRow";
import type { PlatformSettings, PlatformSettingsUpdate } from "@/types/platform-settings";

export function NotificationsSettingsCard({
  settings,
  onChange,
}: {
  settings: PlatformSettings;
  onChange: (patch: PlatformSettingsUpdate) => void;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2 space-y-0">
        <Bell className="h-5 w-5 text-primary" />
        <CardTitle className="text-base">Notifications système</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        <SettingRow label="Notifications Email">
          <Switch
            checked={settings.email_notifications_enabled}
            onCheckedChange={(v) => onChange({ email_notifications_enabled: v })}
          />
        </SettingRow>
        <SettingRow label="Notifications Push">
          <Switch
            checked={settings.push_notifications_enabled}
            onCheckedChange={(v) => onChange({ push_notifications_enabled: v })}
          />
        </SettingRow>
        <SettingRow label="Notifications SMS">
          <Switch
            checked={settings.sms_notifications_enabled}
            onCheckedChange={(v) => onChange({ sms_notifications_enabled: v })}
          />
        </SettingRow>
      </CardContent>
    </Card>
  );
}