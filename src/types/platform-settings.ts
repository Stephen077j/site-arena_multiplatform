export interface PlatformSettings {
  id: string;
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
  active_modules?: string[];
  created_at: string;
  updated_at: string;
}

export type PlatformSettingsUpdate = Partial<Omit<PlatformSettings, "id" | "created_at" | "updated_at">>;