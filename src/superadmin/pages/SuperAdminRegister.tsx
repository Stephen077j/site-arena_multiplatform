import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useSuperAdminAuth } from '../lib/superAdminAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Crown, Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

// Clé d'invitation sécurisée - À changer en production !
const ADMIN_INVITATION_KEY = import.meta.env.VITE_ADMIN_INVITE_KEY || 'admin-dev-key-2026';

export default function SuperAdminRegister() {
  const navigate = useNavigate();
  const { isSuperAdmin, loading: authLoading, user } = useSuperAdminAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [invitationKey, setInvitationKey] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading && user && isSuperAdmin) {
      navigate('/super-admin/dashboard', { replace: true });
    }
  }, [authLoading, user, isSuperAdmin, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Validation de la clé d'invitation
      if (invitationKey !== ADMIN_INVITATION_KEY) {
        toast.error('Clé d\'invitation invalide');
        setSubmitting(false);
        return;
      }

      // Validation des mots de passe
      if (password !== confirmPassword) {
        toast.error('Les mots de passe ne correspondent pas');
        setSubmitting(false);
        return;
      }

      if (password.length < 8) {
        toast.error('Le mot de passe doit contenir au moins 8 caractères');
        setSubmitting(false);
        return;
      }

      if (!email || !fullname) {
        toast.error('Veuillez remplir tous les champs');
        setSubmitting(false);
        return;
      }

      // Créer le compte Supabase
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      if (!authData.user?.id) {
        throw new Error('Impossible de créer le compte utilisateur');
      }

      // Attendre un peu pour que l'utilisateur soit créé en base
      await new Promise(resolve => setTimeout(resolve, 500));

      // Assigner le rôle super_admin
      const { error: roleError } = await supabase
        .from('user_roles')
        .insert({
          user_id: authData.user.id,
          role: 'super_admin',
        });

      if (roleError) {
        // Si l'insertion du rôle échoue, supprimer l'utilisateur
        await supabase.auth.admin.deleteUser(authData.user.id).catch(() => {});
        throw new Error('Impossible d\'assigner le rôle Super Admin');
      }

      toast.success('Compte Super Admin créé avec succès !');
      navigate('/super-admin/login', { replace: true });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur lors de l\'inscription';
      toast.error(message);
      console.error('Erreur inscription:', err);
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
            <h1 className="text-2xl font-bold text-white">Créer Compte Super Admin</h1>
            <p className="text-sm text-slate-400 mt-1">Inscription sécurisée</p>
          </div>

          <Alert className="mb-6 border-amber-500/30 bg-amber-500/10">
            <AlertCircle className="h-4 w-4 text-amber-500" />
            <AlertDescription className="text-amber-200">
              Une clé d'invitation est requise pour créer un compte Super Admin.
            </AlertDescription>
          </Alert>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullname" className="text-slate-200">Nom complet</Label>
              <Input
                id="fullname"
                type="text"
                required
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
                placeholder="Nom du propriétaire"
                disabled={submitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-200">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
                placeholder="admin@entreprise.com"
                disabled={submitting}
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
                placeholder="Au moins 8 caractères"
                disabled={submitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-slate-200">Confirmer mot de passe</Label>
              <Input
                id="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-slate-800/50 border-slate-700 text-white"
                placeholder="Confirmer mot de passe"
                disabled={submitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="invitationKey" className="text-slate-200">Clé d'invitation</Label>
              <Input
                id="invitationKey"
                type="password"
                required
                value={invitationKey}
                onChange={(e) => setInvitationKey(e.target.value)}
                className="bg-slate-800/50 border-slate-700 text-white"
                placeholder="Clé secrète"
                disabled={submitting}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-semibold shadow-lg shadow-amber-500/30 mt-6"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Création en cours...
                </>
              ) : (
                'Créer compte Super Admin'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-400">
            Vous avez déjà un compte?{' '}
            <Link to="/super-admin/login" className="text-amber-500 hover:text-amber-400 font-medium">
              Se connecter
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
