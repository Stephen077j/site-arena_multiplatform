import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useSuperAdminAuth } from '../lib/superAdminAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Crown, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export default function SuperAdminLogin() {
  const navigate = useNavigate();
  const { isSuperAdmin, loading, user, refresh } = useSuperAdminAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user && isSuperAdmin) navigate('/super-admin/dashboard', { replace: true });
  }, [loading, user, isSuperAdmin, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      const { data: userData } = await supabase.auth.getUser();
      const uid = userData.user?.id;
      const { data: roleData } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', uid!)
        .eq('role', 'super_admin')
        .maybeSingle();

      if (!roleData) {
        await supabase.auth.signOut();
        toast.error("Ce compte n'a pas les privilèges Super Admin.");
        return;
      }

      await refresh();
      toast.success('Bienvenue dans le portail Super Admin');
      navigate('/super-admin/dashboard', { replace: true });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Échec de connexion');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(245,158,11,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(99,102,241,0.1),transparent_50%)]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <Card className="bg-slate-900/80 backdrop-blur-xl border-amber-500/20 p-8 shadow-2xl">
          <div className="flex flex-col items-center mb-6">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center mb-4 shadow-lg shadow-amber-500/30">
              <Crown className="h-7 w-7 text-slate-950" />
            </div>
            <h1 className="text-2xl font-bold text-white">Portail Super Admin</h1>
            <p className="text-sm text-slate-400 mt-1">Connexion sécurisée propriétaire</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-200">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
                placeholder="proprietaire@entreprise.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-200">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-slate-800/50 border-slate-700 text-white"
              />
            </div>
            <Button
              type="submit"
              disabled={submitting}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-semibold"
            >
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Se connecter'}
            </Button>
          </form>

          <p className="text-xs text-slate-500 text-center mt-6">
            Accès réservé au propriétaire de l'entreprise.
          </p>
        </Card>
      </motion.div>
    </div>
  );
}
