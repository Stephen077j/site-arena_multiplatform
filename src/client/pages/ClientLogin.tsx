import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Mail, Lock, Phone, ArrowRight, Sparkles, ShieldCheck, Zap, Star, Users, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { useClientAuth } from '../lib/clientAuth';

const ClientLogin = () => {
  const navigate = useNavigate();
  const { user, signIn, signUp } = useClientAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirm, setRegisterConfirm] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!loginEmail || !loginPassword) {
      toast.error('Veuillez remplir tous les champs');
      setLoading(false);
      return;
    }

    const result = await signIn(loginEmail, loginPassword);

    if (result.success) {
      toast.success('Connexion réussie !');
      navigate('/');
    } else {
      toast.error(result.error || 'Erreur de connexion');
    }

    setLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!registerName || !registerEmail || !registerPhone || !registerPassword) {
      toast.error('Veuillez remplir tous les champs');
      setLoading(false);
      return;
    }

    if (registerPassword !== registerConfirm) {
      toast.error('Les mots de passe ne correspondent pas');
      setLoading(false);
      return;
    }

    if (registerPassword.length < 6) {
      toast.error('Le mot de passe doit contenir au moins 6 caractères');
      setLoading(false);
      return;
    }

    const result = await signUp(registerEmail, registerPassword, registerName, registerPhone);

    if (result.success) {
      toast.success('Compte créé avec succès !');
      navigate('/');
    } else {
      toast.error(result.error || 'Erreur lors de la création du compte');
    }

    setLoading(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .login-root {
          font-family: 'DM Sans', sans-serif;
        }

        .login-root h1,
        .login-root h2,
        .login-root h3,
        .brand-title {
          font-family: 'Syne', sans-serif;
        }

        /* Left panel */
        .brand-panel {
          background: linear-gradient(145deg, #0f0f1a 0%, #1a1040 50%, #0d1f3c 100%);
          position: relative;
          overflow: hidden;
        }

        .brand-panel::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 50% at 20% 20%, rgba(99, 60, 255, 0.35) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 80% 80%, rgba(14, 165, 233, 0.25) 0%, transparent 55%);
        }

        /* Grid lines decoration */
        .brand-panel::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 40px 40px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
        }

        .logo-ring {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.15);
          backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 32px rgba(99,60,255,0.3), inset 0 1px 0 rgba(255,255,255,0.2);
        }

        .feature-card {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 20px;
          border-radius: 16px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(8px);
          transition: all 0.3s ease;
        }

        .feature-card:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.14);
          transform: translateX(4px);
        }

        .feature-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: linear-gradient(135deg, rgba(99,60,255,0.4), rgba(14,165,233,0.3));
          border: 1px solid rgba(255,255,255,0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        /* Right panel */
        .form-panel {
          background: #fafaf9;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .auth-card {
          width: 100%;
          max-width: 440px;
          background: #ffffff;
          border-radius: 24px;
          border: 1px solid rgba(0,0,0,0.08);
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.04), 0 20px 60px -10px rgba(0,0,0,0.08);
          overflow: hidden;
        }

        .auth-card-header {
          padding: 32px 32px 0;
        }

        .auth-card-body {
          padding: 24px 32px 32px;
        }

        .card-eyebrow {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #6366f1;
          margin-bottom: 8px;
        }

        /* Custom tabs */
        .custom-tabs-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4px;
          background: #f3f4f6;
          border-radius: 12px;
          padding: 4px;
          margin-bottom: 24px;
        }

        .custom-tab {
          border-radius: 9px;
          padding: 8px 16px;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.2s;
          cursor: pointer;
          border: none;
          background: transparent;
          color: #6b7280;
        }

        .custom-tab[data-state='active'] {
          background: #ffffff;
          color: #111827;
          box-shadow: 0 1px 4px rgba(0,0,0,0.1);
          font-weight: 600;
        }

        /* Input fields */
        .input-wrapper {
          position: relative;
          margin-bottom: 16px;
        }

        .input-wrapper label {
          display: block;
          font-size: 13px;
          font-weight: 500;
          color: #374151;
          margin-bottom: 6px;
        }

        .input-icon-wrap {
          position: relative;
        }

        .input-icon-wrap .icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
          width: 16px;
          height: 16px;
          pointer-events: none;
        }

        .input-icon-wrap input {
          padding-left: 40px !important;
          height: 44px;
          border-radius: 10px;
          border: 1.5px solid #e5e7eb;
          background: #f9fafb;
          font-size: 14px;
          transition: all 0.2s;
          width: 100%;
        }

        .input-icon-wrap input:focus {
          border-color: #6366f1;
          background: #fff;
          outline: none;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.1);
        }

        .input-icon-wrap input:disabled {
          opacity: 0.6;
        }

        /* Submit button */
        .submit-btn {
          width: 100%;
          height: 48px;
          border-radius: 12px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          font-size: 15px;
          font-weight: 600;
          font-family: 'Syne', sans-serif;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s;
          box-shadow: 0 4px 14px rgba(99,102,241,0.35);
          margin-top: 8px;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(99,102,241,0.45);
        }

        .submit-btn:active:not(:disabled) {
          transform: translateY(0);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .forgot-link {
          display: block;
          text-align: center;
          margin-top: 14px;
          font-size: 13px;
          color: #6366f1;
          text-decoration: none;
          cursor: pointer;
          background: none;
          border: none;
          transition: opacity 0.2s;
        }

        .forgot-link:hover { opacity: 0.7; text-decoration: underline; }

        .terms-text {
          font-size: 12px;
          text-align: center;
          color: #9ca3af;
          margin-top: 14px;
        }

        .terms-text button {
          color: #6366f1;
          background: none;
          border: none;
          cursor: pointer;
          text-decoration: underline;
          font-size: inherit;
        }

        .back-home {
          margin-top: 20px;
          text-align: center;
        }

        .back-home button {
          font-size: 13px;
          color: #9ca3af;
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.2s;
        }

        .back-home button:hover { color: #374151; }

        /* Mobile logo */
        .mobile-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
        }

        .mobile-logo-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Divider */
        .section-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, #e5e7eb 30%, #e5e7eb 70%, transparent);
          margin: 20px 0;
        }

        /* Loading dots */
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .loading-dot {
          display: inline-block;
          width: 5px; height: 5px;
          border-radius: 50%;
          background: white;
          margin: 0 2px;
          animation: bounce 0.6s infinite;
        }
        .loading-dot:nth-child(2) { animation-delay: 0.1s; }
        .loading-dot:nth-child(3) { animation-delay: 0.2s; }
      `}</style>

      <div className="login-root min-h-screen flex">
        {/* ── LEFT: BRAND PANEL ── */}
        <div className="brand-panel hidden lg:flex lg:w-1/2 p-12 flex-col justify-between">
          <div className="relative z-10">
            {/* Logo */}
            <div className="flex items-center gap-4 mb-14">
              <img 
                src="/logo-arenah.svg" 
                alt="ARENAH Logo" 
                className="w-14 h-14 rounded-2xl shadow-2xl"
              />
              <div>
                <h1 className="brand-title" style={{ fontSize: 28, fontWeight: 800, color: 'white', letterSpacing: '-0.02em', lineHeight: 1 }}>
                  ARENAH
                </h1>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, marginTop: 2 }}>Votre plateforme tout-en-un</p>
              </div>
            </div>

            {/* Headline */}
            <div style={{ marginBottom: 48 }}>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 12 }}>
                Pourquoi nous choisir
              </p>
              <h2 className="brand-title" style={{ fontSize: 36, fontWeight: 700, color: 'white', lineHeight: 1.2, maxWidth: 320 }}>
                Tout ce dont vous avez besoin, au même endroit.
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, lineHeight: 1.55, marginTop: 14, maxWidth: 360 }}>
                10 services premium réunis : boutique, restaurant, hôtel, salle de sport, piscine, salon, terrain, événements, cybercafé et spectacles — un seul compte, zéro friction.
              </p>

              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 24, maxWidth: 380 }}>
                {[
                  { v: '10K+', l: 'clients actifs' },
                  { v: '4.9★', l: 'note moyenne' },
                  { v: '24/7', l: 'disponible' },
                ].map((s) => (
                  <div
                    key={s.l}
                    style={{
                      borderRadius: 12,
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      padding: '10px 8px',
                      textAlign: 'center',
                    }}
                  >
                    <div className="brand-title" style={{ color: 'white', fontSize: 18, fontWeight: 700, lineHeight: 1 }}>
                      {s.v}
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 4 }}>
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div className="feature-card">
                <div className="feature-icon">
                  <ShieldCheck style={{ width: 20, height: 20, color: 'white' }} />
                </div>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: 'white', marginBottom: 4 }}>Sécurisé et fiable</h3>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>
                    Vos données sont protégées avec les dernières technologies
                  </p>
                </div>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <Zap style={{ width: 20, height: 20, color: 'white' }} />
                </div>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: 'white', marginBottom: 4 }}>Rapide et efficace</h3>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>
                    Accédez à tous nos services en quelques clics
                  </p>
                </div>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <Sparkles style={{ width: 20, height: 20, color: 'white' }} />
                </div>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: 'white', marginBottom: 4 }}>Expérience premium</h3>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>
                    Une interface moderne et intuitive pour tous vos besoins
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="relative z-10">
            <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', marginBottom: 20 }} />
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>© 2026 ARENAH. Tous droits réservés.</p>
          </div>
        </div>

        {/* ── RIGHT: FORM PANEL ── */}
        <div className="form-panel flex-1">
          <div style={{ width: '100%', maxWidth: 440 }}>

            {/* Mobile Logo */}
            <div className="mobile-logo lg:hidden">
              <img 
                src="/logo-arenah-icon.svg" 
                alt="ARENAH Logo" 
                className="w-11 h-11 rounded-xl"
              />
              <div>
                <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 22, fontWeight: 800, color: '#111827' }}>ARENAH</h1>
                <p style={{ fontSize: 12, color: '#9ca3af' }}>Votre plateforme tout-en-un</p>
              </div>
            </div>

            {/* Auth Card */}
            <div className="auth-card">
              <div className="auth-card-header">
                <p className="card-eyebrow">Accès sécurisé</p>
                <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 26, fontWeight: 700, color: '#111827', marginBottom: 4 }}>
                  Bienvenue 👋
                </h2>
                <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 24 }}>
                  Connectez-vous ou créez votre compte
                </p>
              </div>

              <div className="auth-card-body">
                <Tabs defaultValue="login" className="w-full">
                  <TabsList className="custom-tabs-list grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="login" className="custom-tab">Connexion</TabsTrigger>
                    <TabsTrigger value="register" className="custom-tab">Inscription</TabsTrigger>
                  </TabsList>

                  {/* ── LOGIN ── */}
                  <TabsContent value="login">
                    <form onSubmit={handleLogin}>
                      <div className="input-wrapper">
                        <label htmlFor="login-email">Adresse email</label>
                        <div className="input-icon-wrap">
                          <Mail className="icon" />
                          <Input
                            id="login-email"
                            type="email"
                            placeholder="votre@email.com"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            disabled={loading}
                          />
                        </div>
                      </div>

                      <div className="input-wrapper">
                        <label htmlFor="login-password">Mot de passe</label>
                        <div className="input-icon-wrap">
                          <Lock className="icon" />
                          <Input
                            id="login-password"
                            type="password"
                            placeholder="••••••••"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            disabled={loading}
                          />
                        </div>
                      </div>

                      <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? (
                          <>
                            <span className="loading-dot" />
                            <span className="loading-dot" />
                            <span className="loading-dot" />
                          </>
                        ) : (
                          <>
                            Se connecter
                            <ArrowRight style={{ width: 16, height: 16 }} />
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        className="forgot-link"
                        onClick={() => toast.info('Fonctionnalité à venir')}
                      >
                        Mot de passe oublié ?
                      </button>
                    </form>
                  </TabsContent>

                  {/* ── REGISTER ── */}
                  <TabsContent value="register">
                    <form onSubmit={handleRegister}>
                      <div className="input-wrapper">
                        <label htmlFor="register-name">Nom complet</label>
                        <div className="input-icon-wrap">
                          <User className="icon" />
                          <Input
                            id="register-name"
                            type="text"
                            placeholder="Jean Dupont"
                            value={registerName}
                            onChange={(e) => setRegisterName(e.target.value)}
                            disabled={loading}
                          />
                        </div>
                      </div>

                      <div className="input-wrapper">
                        <label htmlFor="register-email">Adresse email</label>
                        <div className="input-icon-wrap">
                          <Mail className="icon" />
                          <Input
                            id="register-email"
                            type="email"
                            placeholder="votre@email.com"
                            value={registerEmail}
                            onChange={(e) => setRegisterEmail(e.target.value)}
                            disabled={loading}
                          />
                        </div>
                      </div>

                      <div className="input-wrapper">
                        <label htmlFor="register-phone">Téléphone</label>
                        <div className="input-icon-wrap">
                          <Phone className="icon" />
                          <Input
                            id="register-phone"
                            type="tel"
                            placeholder="+229 XX XX XX XX"
                            value={registerPhone}
                            onChange={(e) => setRegisterPhone(e.target.value)}
                            disabled={loading}
                          />
                        </div>
                      </div>

                      <div className="input-wrapper">
                        <label htmlFor="register-password">Mot de passe</label>
                        <div className="input-icon-wrap">
                          <Lock className="icon" />
                          <Input
                            id="register-password"
                            type="password"
                            placeholder="••••••••"
                            value={registerPassword}
                            onChange={(e) => setRegisterPassword(e.target.value)}
                            disabled={loading}
                          />
                        </div>
                      </div>

                      <div className="input-wrapper">
                        <label htmlFor="register-confirm">Confirmer le mot de passe</label>
                        <div className="input-icon-wrap">
                          <Lock className="icon" />
                          <Input
                            id="register-confirm"
                            type="password"
                            placeholder="••••••••"
                            value={registerConfirm}
                            onChange={(e) => setRegisterConfirm(e.target.value)}
                            disabled={loading}
                          />
                        </div>
                      </div>

                      <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? (
                          <>
                            <span className="loading-dot" />
                            <span className="loading-dot" />
                            <span className="loading-dot" />
                          </>
                        ) : (
                          <>
                            Créer mon compte
                            <ArrowRight style={{ width: 16, height: 16 }} />
                          </>
                        )}
                      </button>

                      <p className="terms-text">
                        En créant un compte, vous acceptez nos{' '}
                        <button type="button">conditions d'utilisation</button>
                      </p>
                    </form>
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            {/* Back to home */}
            <div className="back-home">
              <button onClick={() => navigate('/')}>← Retour à l'accueil</button>
            </div>

            {/* Trust badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 14, marginTop: 18, fontSize: 11, color: '#9ca3af' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <CheckCircle2 style={{ width: 13, height: 13, color: '#10b981' }} /> Données chiffrées
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <Users style={{ width: 13, height: 13, color: '#6366f1' }} /> 10 000+ utilisateurs
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <Star style={{ width: 13, height: 13, color: '#f59e0b' }} /> 4.9/5 sur 1 200 avis
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientLogin;