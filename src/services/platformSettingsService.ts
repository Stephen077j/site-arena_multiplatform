import { supabase } from "@/integrations/supabase/client";
import type { PlatformSettings, PlatformSettingsUpdate } from "@/types/platform-settings";

export const platformSettingsService = {
  async get(): Promise<PlatformSettings | null> {
    const { data, error } = await supabase
      .from("platform_settings")
      .select("*")
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle();
    if (error) throw error;
    return (data as unknown as PlatformSettings) ?? null;
  },

  async update(id: string, patch: PlatformSettingsUpdate): Promise<void> {
    const { error } = await supabase
      .from("platform_settings")
      .update({ ...patch, updated_at: new Date().toISOString() })
      .eq("id", id);
    if (error) throw error;
  },

  subscribe(onChange: (s: PlatformSettings) => void) {
    const channel = supabase
      .channel("platform_settings_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "platform_settings" },
        (payload) => {
          if (payload.new) onChange(payload.new as PlatformSettings);
        },
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  },
};