import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { platformSettingsService } from "@/services/platformSettingsService";
import type { PlatformSettings, PlatformSettingsUpdate } from "@/types/platform-settings";

const QUERY_KEY = ["platform-settings"] as const;

export function usePlatformSettings() {
  const qc = useQueryClient();

  const query = useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => platformSettingsService.get(),
  });

  // Realtime sync — toute modification (web, mobile, desktop, admin) propagée.
  useEffect(() => {
    const unsub = platformSettingsService.subscribe((next) => {
      qc.setQueryData(QUERY_KEY, next);
    });
    return unsub;
  }, [qc]);

  const mutation = useMutation({
    mutationFn: async ({ id, patch }: { id: string; patch: PlatformSettingsUpdate }) => {
      await platformSettingsService.update(id, patch);
    },
    onSuccess: () => {
      toast.success("Paramètres enregistrés");
      qc.invalidateQueries({ queryKey: QUERY_KEY });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return {
    settings: query.data as PlatformSettings | null | undefined,
    isLoading: query.isLoading,
    isError: query.isError,
    save: mutation.mutate,
    isSaving: mutation.isPending,
  };
}