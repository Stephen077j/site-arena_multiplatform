
-- Enum app_role
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('super_admin', 'admin_module', 'caissier');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- user_roles table
CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

DROP POLICY IF EXISTS "Users see own roles" ON public.user_roles;
CREATE POLICY "Users see own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Super admins manage roles" ON public.user_roles;
CREATE POLICY "Super admins manage roles" ON public.user_roles FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'super_admin'))
  WITH CHECK (public.has_role(auth.uid(), 'super_admin'));

-- updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- platform_settings table
CREATE TABLE IF NOT EXISTS public.platform_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  web_enabled BOOLEAN NOT NULL DEFAULT TRUE,
  mobile_enabled BOOLEAN NOT NULL DEFAULT TRUE,
  desktop_enabled BOOLEAN NOT NULL DEFAULT TRUE,
  web_domain TEXT,
  mobile_min_version TEXT DEFAULT '1.0.0',
  desktop_min_version TEXT DEFAULT '1.0.0',
  force_mobile_update BOOLEAN NOT NULL DEFAULT FALSE,
  force_desktop_update BOOLEAN NOT NULL DEFAULT FALSE,
  auto_update_enabled BOOLEAN NOT NULL DEFAULT TRUE,
  realtime_enabled BOOLEAN NOT NULL DEFAULT TRUE,
  offline_mode_enabled BOOLEAN NOT NULL DEFAULT FALSE,
  max_sessions_per_user INTEGER NOT NULL DEFAULT 3,
  session_timeout_minutes INTEGER NOT NULL DEFAULT 60,
  enable_two_factor_auth BOOLEAN NOT NULL DEFAULT FALSE,
  email_notifications_enabled BOOLEAN NOT NULL DEFAULT TRUE,
  push_notifications_enabled BOOLEAN NOT NULL DEFAULT TRUE,
  sms_notifications_enabled BOOLEAN NOT NULL DEFAULT FALSE,
  maintenance_mode BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.platform_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read platform settings" ON public.platform_settings;
CREATE POLICY "Anyone can read platform settings" ON public.platform_settings FOR SELECT USING (TRUE);

DROP POLICY IF EXISTS "Super admins update platform settings" ON public.platform_settings;
CREATE POLICY "Super admins update platform settings" ON public.platform_settings FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'super_admin'))
  WITH CHECK (public.has_role(auth.uid(), 'super_admin'));

DROP POLICY IF EXISTS "Super admins insert platform settings" ON public.platform_settings;
CREATE POLICY "Super admins insert platform settings" ON public.platform_settings FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'super_admin'));

DROP TRIGGER IF EXISTS trg_platform_settings_updated_at ON public.platform_settings;
CREATE TRIGGER trg_platform_settings_updated_at BEFORE UPDATE ON public.platform_settings
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed single row
INSERT INTO public.platform_settings (web_enabled) 
SELECT TRUE WHERE NOT EXISTS (SELECT 1 FROM public.platform_settings);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.platform_settings;
