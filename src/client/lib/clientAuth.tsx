import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from './supabase';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { toast } from 'sonner';

interface ClientUser {
  id: string;
  email: string;
  fullname: string;
  phone?: string;
  avatar_url?: string;
  role: string;
}

interface ClientAuthContextType {
  user: ClientUser | null;
  supabaseUser: SupabaseUser | null;
  loading: boolean;
  signUp: (email: string, password: string, fullname: string, phone?: string) => Promise<{ success: boolean; error?: string }>;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  resendConfirmationEmail: (email: string) => Promise<{ success: boolean; error?: string }>;
  isAuthenticated: boolean;
}

const ClientAuthContext = createContext<ClientAuthContextType | null>(null);

export const ClientAuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<ClientUser | null>(null);
  const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Charger l'utilisateur au démarrage
  useEffect(() => {
    // Vérifier la session existante
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setSupabaseUser(session.user);
        loadUserProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setSupabaseUser(session.user);
        loadUserProfile(session.user.id);
      } else {
        setSupabaseUser(null);
        setUser(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Charger le profil utilisateur depuis la table users
  const loadUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;

      if (data) {
        setUser({
          id: data.id,
          email: data.email,
          fullname: data.fullname,
          phone: data.phone,
          avatar_url: data.avatar_url,
          role: data.role || 'client',
        });
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  // Inscription
  const signUp = async (email: string, password: string, fullname: string, phone?: string) => {
    try {
      // 1. Créer le compte Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        // Gérer l'erreur de rate limit
        if (authError.message.includes('rate limit') || authError.message.includes('too many')) {
          return {
            success: false,
            error: 'Trop de tentatives. Veuillez attendre 1 heure ou augmenter les limites sur Supabase Dashboard (Authentication → Rate Limits).'
          };
        }
        throw authError;
      }

      if (!authData.user) {
        throw new Error('Erreur lors de la création du compte');
      }

      // 2. Créer le profil dans la table users
      const { error: profileError } = await supabase
        .from('users')
        .insert({
          id: authData.user.id,
          email,
          fullname,
          phone,
          role: 'client',
        });

      if (profileError) throw profileError;

      // 3. Créer un panier vide pour l'utilisateur
      const { error: cartError } = await supabase
        .from('carts')
        .insert({
          user_id: authData.user.id,
        });

      if (cartError) console.warn('Cart creation warning:', cartError);

      toast.success('Compte créé avec succès ! 📧 Vérifiez votre email pour confirmer votre compte.', {
        duration: 6000,
      });
      return { success: true };
    } catch (error: any) {
      console.error('Sign up error:', error);
      
      // Gérer les erreurs spécifiques
      if (error.message.includes('rate limit') || error.message.includes('too many')) {
        return {
          success: false,
          error: 'Trop de tentatives. Attendez 1 heure ou augmentez les limites sur Supabase.'
        };
      }
      
      return { 
        success: false, 
        error: error.message || 'Erreur lors de la création du compte' 
      };
    }
  };

  // Connexion
  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // Vérifier si c'est une erreur de confirmation email
        if (error.message.includes('Email not confirmed')) {
          return { 
            success: false, 
            error: 'Veuillez confirmer votre email avant de vous connecter. Vérifiez votre boîte mail.' 
          };
        }
        throw error;
      }

      if (data.user) {
        // Vérifier si l'email est confirmé
        if (!data.user.email_confirmed_at) {
          return { 
            success: false, 
            error: 'Veuillez confirmer votre email avant de vous connecter. Vérifiez votre boîte mail.' 
          };
        }
        
        toast.success('Connexion réussie !');
        return { success: true };
      }

      return { success: false, error: 'Erreur de connexion' };
    } catch (error: any) {
      console.error('Sign in error:', error);
      return { 
        success: false, 
        error: error.message || 'Email ou mot de passe incorrect' 
      };
    }
  };

  // Déconnexion
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      setSupabaseUser(null);
      toast.success('Déconnexion réussie');
    } catch (error: any) {
      console.error('Sign out error:', error);
      toast.error('Erreur lors de la déconnexion');
    }
  };

  // Renvoyer l'email de confirmation
  const resendConfirmationEmail = async (email: string) => {
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
      });

      if (error) throw error;

      toast.success('Email de confirmation renvoyé ! Vérifiez votre boîte mail.');
      return { success: true };
    } catch (error: any) {
      console.error('Resend email error:', error);
      return { 
        success: false, 
        error: error.message || 'Erreur lors de l\'envoi de l\'email' 
      };
    }
  };

  return (
    <ClientAuthContext.Provider
      value={{
        user,
        supabaseUser,
        loading,
        signUp,
        signIn,
        signOut,
        resendConfirmationEmail,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </ClientAuthContext.Provider>
  );
};

export const useClientAuth = () => {
  const context = useContext(ClientAuthContext);
  if (!context) {
    throw new Error('useClientAuth must be used within ClientAuthProvider');
  }
  return context;
};
