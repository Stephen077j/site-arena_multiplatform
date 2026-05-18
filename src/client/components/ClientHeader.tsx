import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Heart, User, Menu, X, ClipboardList, Bell, Check, Trash2, LogOut, UserCircle, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartCount, useNotifs, useUnreadNotifs, notifStore } from '@/client/lib/clientStore';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useClientAuth } from '../lib/clientAuth';
import { useSuperAdminAuth } from '@/superadmin/lib/superAdminAuth';

const NAV = [
  { label: 'Boutique', to: '/boutique' },
  { label: 'Restaurant', to: '/restaurant' },
  { label: 'Hôtel', to: '/hotel' },
  { label: 'Salle sport', to: '/salle-de-sport' },
  { label: 'Piscine', to: '/piscine' },
  { label: 'Salon', to: '/salon' },
  { label: 'Terrain foot', to: '/terrain-foot' },
  { label: 'Événementiel', to: '/evenementiel' },
  { label: 'Cybercafé', to: '/cybercafe' },
  { label: 'Spectacles', to: '/spectacles' },
  { label: 'Mes commandes', to: '/mes-commandes' },
];

const ClientHeader = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const cartCount = useCartCount();
  const notifs = useNotifs();
  const unread = useUnreadNotifs();
  const { user, loading, signOut } = useClientAuth();
  const { isSuperAdmin } = useSuperAdminAuth();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img 
              src="/logo-arenah-icon.svg" 
              alt="ARENAH Logo" 
              className="w-9 h-9 rounded-xl shadow-trust-glow"
            />
            <div className="leading-none">
              <div className="font-bold text-[15px] tracking-tight">ARENAH</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Self-service</div>
            </div>
          </Link>

          {/* Search bar (desktop) */}
          <div className="hidden md:flex flex-1 max-w-xl">
            <button
              type="button"
              className="group w-full flex items-center gap-3 h-11 rounded-full border border-border bg-card px-4 text-left text-sm text-muted-foreground hover:border-primary/50 hover:shadow-trust transition"
            >
              <Search className="w-4 h-4 text-primary" />
              <span className="flex-1 truncate">Chercher produit, chambre, créneau, spectacle…</span>
              <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 rounded border border-border text-[10px] font-mono text-muted-foreground bg-muted">⌘K</kbd>
            </button>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1">
            <Button asChild variant="ghost" size="icon" className="hidden sm:inline-flex">
              <Link to="/favoris" aria-label="Favoris"><Heart className="w-5 h-5" /></Link>
            </Button>
            <Button asChild variant="ghost" size="icon" className="hidden sm:inline-flex">
              <Link to="/mes-commandes" aria-label="Mes commandes"><ClipboardList className="w-5 h-5" /></Link>
            </Button>
            <Button asChild variant="ghost" size="icon" className="relative">
              <Link to="/panier" aria-label="Panier">
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 rounded-full bg-primary text-[10px] font-semibold text-primary-foreground flex items-center justify-center">{cartCount}</span>
                )}
              </Link>
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
                  <Bell className="w-5 h-5" />
                  {unread > 0 && (
                    <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 rounded-full bg-destructive text-[10px] font-semibold text-destructive-foreground flex items-center justify-center">{unread}</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-80 p-0">
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-border">
                  <div className="font-semibold text-sm">Notifications</div>
                  <div className="flex gap-1">
                    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => notifStore.markAllRead()}><Check className="w-3.5 h-3.5" /></Button>
                    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => notifStore.clear()}><Trash2 className="w-3.5 h-3.5" /></Button>
                  </div>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifs.length === 0 ? (
                    <p className="px-4 py-8 text-center text-sm text-muted-foreground">Aucune notification</p>
                  ) : notifs.map(n => (
                    <div key={n.id} className={`px-4 py-3 border-b border-border last:border-0 ${!n.read ? 'bg-primary/5' : ''}`}>
                      <div className="text-sm font-medium">{n.title}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{n.body}</div>
                      <div className="text-[10px] text-muted-foreground mt-1">{new Date(n.createdAt).toLocaleString('fr-FR')}</div>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            
            {/* User Menu */}
            {loading ? (
              <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hidden sm:inline-flex rounded-full">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user.avatar_url} alt={user.fullname} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        {getInitials(user.fullname)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{user.fullname}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/mes-commandes" className="cursor-pointer">
                      <ClipboardList className="w-4 h-4 mr-2" />
                      Mes commandes
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/favoris" className="cursor-pointer">
                      <Heart className="w-4 h-4 mr-2" />
                      Mes favoris
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profil" className="cursor-pointer">
                      <UserCircle className="w-4 h-4 mr-2" />
                      Mon profil
                    </Link>
                  </DropdownMenuItem>
                  {isSuperAdmin && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/super-admin/dashboard" className="cursor-pointer text-amber-600 dark:text-amber-500 font-medium">
                          <Crown className="w-4 h-4 mr-2" />
                          Portail Admin
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut} className="cursor-pointer text-destructive">
                    <LogOut className="w-4 h-4 mr-2" />
                    Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                variant="ghost" 
                size="sm" 
                className="hidden sm:inline-flex gap-2"
                onClick={() => navigate('/login')}
              >
                <User className="w-4 h-4" />
                Connexion
              </Button>
            )}
            
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(!open)}>
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Sub-nav (desktop) */}
        <nav className="hidden md:flex items-center gap-1 h-11 -mt-1">
          {NAV.map(n => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                `px-3 py-1.5 text-sm rounded-md hover:bg-muted transition ${isActive ? 'text-foreground font-semibold bg-muted' : 'text-muted-foreground hover:text-foreground'}`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden border-t border-border py-3 space-y-1">
            {NAV.map(n => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="block px-3 py-2.5 text-sm text-foreground rounded-md hover:bg-muted">
                {n.label}
              </Link>
            ))}
            <Link to="/favoris" onClick={() => setOpen(false)} className="block px-3 py-2.5 text-sm text-foreground rounded-md hover:bg-muted">Favoris</Link>
            <Link to="/panier" onClick={() => setOpen(false)} className="block px-3 py-2.5 text-sm text-foreground rounded-md hover:bg-muted">Panier ({cartCount})</Link>
            {user ? (
              <>
                <div className="px-3 py-2 border-t border-border mt-2">
                  <p className="text-sm font-medium">{user.fullname}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <Link 
                  to="/profil"
                  onClick={() => setOpen(false)} 
                  className="block px-3 py-2.5 text-sm text-foreground rounded-md hover:bg-muted"
                >
                  <div className="flex items-center gap-2">
                    <UserCircle className="w-4 h-4" />
                    Mon profil
                  </div>
                </Link>
                <button 
                  onClick={() => { setOpen(false); signOut(); }} 
                  className="w-full text-left px-3 py-2.5 text-sm text-destructive rounded-md hover:bg-muted flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Déconnexion
                </button>
              </>
            ) : (
              <button 
                onClick={() => { setOpen(false); navigate('/login'); }} 
                className="w-full text-left px-3 py-2.5 text-sm text-foreground rounded-md hover:bg-muted flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                Connexion
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default ClientHeader;
