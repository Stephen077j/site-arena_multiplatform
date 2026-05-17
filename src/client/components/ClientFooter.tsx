import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Shield } from 'lucide-react';

const COLS = [
  {
    title: 'Découvrir',
    links: ['Boutique', 'Restaurant', 'Hôtel', 'Salle de sport', 'Piscine', 'Salon', 'Terrain de foot', 'Spectacles'],
  },
  {
    title: 'Mon compte',
    links: ['Connexion', 'Créer un compte', 'Mes commandes', 'Mes réservations', 'Mes abonnements', 'Favoris'],
  },
  {
    title: 'Aide',
    links: ['Centre d\'aide', 'Suivi de commande', 'Retours', 'Conditions d\'utilisation', 'Confidentialité', 'Cookies'],
  },
];

const ClientFooter = () => (
  <footer className="bg-trust-gradient text-white mt-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* Brand col */}
        <div className="md:col-span-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center border border-white/20">
              <span className="font-bold">G</span>
            </div>
            <div>
              <div className="font-bold">GestPro</div>
              <div className="text-xs text-white/60 uppercase tracking-[0.18em]">Self-service</div>
            </div>
          </div>
          <p className="text-sm text-white/70 leading-relaxed mb-6 max-w-xs">
            Une plateforme unique pour réserver, commander et vivre toutes vos expériences en quelques clics.
          </p>
          <div className="space-y-2 text-sm text-white/70">
            <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-white/40" /> +261 34 00 000 00</div>
            <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-white/40" /> contact@gestpro.app</div>
            <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-white/40" /> Antananarivo, Madagascar</div>
          </div>
          <div className="flex items-center gap-2 mt-6">
            {[Facebook, Instagram, Twitter].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center transition">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Link cols */}
        <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
          {COLS.map(col => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map(l => (
                  <li key={l}>
                    <a href="#" className="text-sm text-white/65 hover:text-white transition">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-white/50">
        <div className="flex items-center gap-2">
          <Shield className="w-3.5 h-3.5" />
          Paiements sécurisés • MVola, Orange Money, Airtel Money, Visa, MasterCard, PayPal
        </div>
        <div className="flex items-center gap-4">
          <span>© {new Date().getFullYear()} GestPro</span>
          <Link to="/admin" className="hover:text-white/80 transition">Espace administrateur</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default ClientFooter;
