import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User, MapPin, ShoppingBag, Calendar, CreditCard, FileText,
  Heart, Star, Bell, Settings, LogOut, Camera, Mail, Phone,
  Edit2, Save, X, Package, Hotel, Dumbbell, Ticket, Upload, Download,
  Lock, Trash2, AlertCircle, Plus, MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { useClientAuth } from '../lib/clientAuth';
import { supabase } from '../lib/supabase';
import { generateInvoicePDF } from '@/lib/pdfService';

const ClientProfile = () => {
  const navigate = useNavigate();
  const { user, signOut } = useClientAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [fullname, setFullname] = useState(user?.fullname || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [email] = useState(user?.email || '');
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar_url || '');

  // Password change state
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Real data from Supabase
  const [orders, setOrders] = useState<any[]>([]);
  const [reservations, setReservations] = useState<any[]>([]);
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  // Review form state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewItem, setReviewItem] = useState('');

  // Load user data from Supabase
  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = async () => {
    setLoadingData(true);
    try {
      // Charger les commandes depuis Supabase
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .eq('client_id', user?.id)
        .order('created_at', { ascending: false });

      if (ordersError) {
        console.error('Erreur chargement commandes:', ordersError);
        // Utiliser des données de démo en cas d'erreur
        setOrders([
          { id: '1', type: 'Restaurant', item: 'Menu Découverte', date: '15 Mai 2026', status: 'Livré', amount: '85 000 Ar' },
          { id: '2', type: 'Boutique', item: 'Casque Audio Pro X', date: '12 Mai 2026', status: 'Livré', amount: '249 000 Ar' },
          { id: '3', type: 'Hôtel', item: 'Suite Vue Mer', date: '10 Mai 2026', status: 'Terminé', amount: '420 000 Ar' },
        ]);
      } else {
        setOrders(ordersData || []);
      }

      // Charger les réservations depuis Supabase
      const { data: reservationsData, error: reservationsError } = await supabase
        .from('reservations')
        .select('*')
        .eq('client_id', user?.id)
        .gte('date', new Date().toISOString())
        .order('date', { ascending: true });

      if (reservationsError) {
        console.error('Erreur chargement réservations:', reservationsError);
        // Utiliser des données de démo
        setReservations([
          { id: '1', type: 'Spectacle', name: 'Concert Live — Riake', date: '20 Mai 2026', time: '20h00', icon: Ticket },
          { id: '2', type: 'Salon', name: 'Coupe + Coloration', date: '22 Mai 2026', time: '14h30', icon: User },
          { id: '3', type: 'Hôtel', name: 'Chambre Deluxe', date: '25 Mai 2026', time: 'Check-in 15h', icon: Hotel },
        ]);
      } else {
        setReservations(reservationsData || []);
      }

      // Charger les abonnements depuis Supabase
      const { data: subscriptionsData, error: subscriptionsError } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('client_id', user?.id)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (subscriptionsError) {
        console.error('Erreur chargement abonnements:', subscriptionsError);
        // Utiliser des données de démo
        setSubscriptions([
          { id: '1', name: 'Pass Gym Trimestriel', type: 'Salle de sport', expires: '15 Août 2026', icon: Dumbbell },
          { id: '2', name: 'Forfait Piscine 10 entrées', type: 'Piscine', remaining: '7 entrées', icon: Package },
        ]);
      } else {
        setSubscriptions(subscriptionsData || []);
      }

      // Charger les avis depuis Supabase
      const { data: reviewsData, error: reviewsError } = await supabase
        .from('reviews')
        .select('*')
        .eq('client_id', user?.id)
        .order('created_at', { ascending: false });

      if (reviewsError) {
        console.error('Erreur chargement avis:', reviewsError);
        // Utiliser des données de démo
        setReviews([
          { id: '1', item: 'Menu Découverte', rating: 5, comment: 'Excellent !', date: '15 Mai 2026' },
          { id: '2', item: 'Suite Vue Mer', rating: 5, comment: 'Magnifique vue', date: '10 Mai 2026' },
        ]);
      } else {
        setReviews(reviewsData || []);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
      toast.error('Erreur lors du chargement des données');
    } finally {
      setLoadingData(false);
    }
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      // Mise à jour du profil dans Supabase
      const { error } = await supabase
        .from('client_profiles')
        .update({
          fullname,
          phone,
          updated_at: new Date().toISOString()
        })
        .eq('id', user?.id);

      if (error) throw error;

      toast.success('Profil mis à jour avec succès !');
      setIsEditing(false);
      
      // Recharger les données
      await loadUserData();
    } catch (error: any) {
      console.error('Erreur lors de la mise à jour du profil:', error);
      toast.error(error.message || 'Erreur lors de la mise à jour du profil');
    } finally {
      setLoading(false);
    }
  };

  const handleUploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Vérifier le type de fichier
    if (!file.type.startsWith('image/')) {
      toast.error('Veuillez sélectionner une image');
      return;
    }

    // Vérifier la taille (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error('L\'image ne doit pas dépasser 2 MB');
      return;
    }

    setUploading(true);
    try {
      // Générer un nom de fichier unique
      const fileExt = file.name.split('.').pop();
      const fileName = `${user?.id}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      // Upload vers Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('client-avatars')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) throw uploadError;

      // Obtenir l'URL publique
      const { data: { publicUrl } } = supabase.storage
        .from('client-avatars')
        .getPublicUrl(filePath);

      // Mettre à jour le profil avec la nouvelle URL
      const { error: updateError } = await supabase
        .from('client_profiles')
        .update({
          avatar_url: publicUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', user?.id);

      if (updateError) throw updateError;

      setAvatarUrl(publicUrl);
      toast.success('Photo de profil mise à jour !');
      
      // Recharger les données
      await loadUserData();
    } catch (error: any) {
      console.error('Erreur lors de l\'upload:', error);
      toast.error(error.message || 'Erreur lors de l\'upload de la photo');
    } finally {
      setUploading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!newPassword || !confirmPassword) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    if (newPassword.length < 6) {
      toast.error('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas');
      return;
    }

    setLoading(true);
    try {
      // Changer le mot de passe avec Supabase
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;

      toast.success('Mot de passe changé avec succès !');
      setShowPasswordChange(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      console.error('Erreur lors du changement de mot de passe:', error);
      toast.error(error.message || 'Erreur lors du changement de mot de passe');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')) {
      return;
    }

    setLoading(true);
    try {
      // TODO: Implémenter la suppression du compte
      // Cela nécessite une fonction Edge de Supabase pour supprimer l'utilisateur
      toast.info('Fonctionnalité à venir');
    } catch (error: any) {
      console.error('Erreur lors de la suppression du compte:', error);
      toast.error(error.message || 'Erreur lors de la suppression du compte');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadInvoice = (order: any) => {
    try {
      toast.info('Génération de la facture en cours...');
      
      // Générer le PDF avec les données de la commande
      generateInvoicePDF({
        id: order.id,
        type: order.type,
        item: order.item,
        date: order.date,
        amount: order.amount,
        status: order.status,
        clientName: user?.fullname || '',
        clientEmail: user?.email || ''
      });
      
      toast.success('Facture téléchargée !');
    } catch (error) {
      console.error('Erreur lors de la génération de la facture:', error);
      toast.error('Erreur lors de la génération de la facture');
    }
  };

  const handleAddReview = async () => {
    if (!reviewItem || !reviewComment) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    setLoading(true);
    try {
      // Ajouter l'avis dans Supabase
      const { error } = await supabase
        .from('reviews')
        .insert({
          client_id: user?.id,
          item: reviewItem,
          rating: reviewRating,
          comment: reviewComment,
          created_at: new Date().toISOString()
        });

      if (error) throw error;

      toast.success('Avis ajouté avec succès !');
      setShowReviewForm(false);
      setReviewItem('');
      setReviewComment('');
      setReviewRating(5);
      
      // Recharger les avis
      await loadUserData();
    } catch (error: any) {
      console.error('Erreur lors de l\'ajout de l\'avis:', error);
      toast.error(error.message || 'Erreur lors de l\'ajout de l\'avis');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet avis ?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', reviewId);

      if (error) throw error;

      toast.success('Avis supprimé avec succès !');
      await loadUserData();
    } catch (error: any) {
      console.error('Erreur lors de la suppression de l\'avis:', error);
      toast.error(error.message || 'Erreur lors de la suppression de l\'avis');
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const stats = [
    { label: 'Commandes', value: orders.length.toString(), icon: ShoppingBag, color: 'text-blue-500' },
    { label: 'Réservations', value: reservations.length.toString(), icon: Calendar, color: 'text-purple-500' },
    { label: 'Favoris', value: '24', icon: Heart, color: 'text-rose-500' },
    { label: 'Avis', value: reviews.length.toString(), icon: Star, color: 'text-amber-500' },
  ];

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header avec profil */}
        <div className="mb-8">
          <Card className="border-2">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                {/* Avatar */}
                <div className="relative">
                  <Avatar className="w-24 h-24 border-4 border-background shadow-lg">
                    <AvatarImage src={avatarUrl} alt={user.fullname} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                      {getInitials(user.fullname)}
                    </AvatarFallback>
                  </Avatar>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleUploadAvatar}
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:bg-primary/90 transition disabled:opacity-50"
                  >
                    {uploading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Camera className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Infos */}
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h1 className="text-2xl font-bold">{user.fullname}</h1>
                      <p className="text-muted-foreground">{user.email}</p>
                    </div>
                    <Badge variant="secondary" className="gap-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      Client Premium
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      {user.email}
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="w-4 h-4" />
                      {user.phone || 'Non renseigné'}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Membre depuis Mai 2026
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                    <Edit2 className="w-4 h-4 mr-2" />
                    Modifier
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Déconnexion
                  </Button>
                </div>
              </div>

              {/* Stats */}
              <Separator className="my-6" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full bg-muted mb-2 ${stat.color}`}>
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="profile">Profil</TabsTrigger>
            <TabsTrigger value="orders">Commandes</TabsTrigger>
            <TabsTrigger value="reservations">Réservations</TabsTrigger>
            <TabsTrigger value="subscriptions">Abonnements</TabsTrigger>
            <TabsTrigger value="reviews">Avis</TabsTrigger>
            <TabsTrigger value="settings">Paramètres</TabsTrigger>
          </TabsList>

          {/* Vue d'ensemble */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Commandes récentes */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5" />
                    Commandes récentes
                  </CardTitle>
                  <CardDescription>Vos dernières commandes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {orders.slice(0, 3).map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex-1">
                        <div className="font-medium">{order.item}</div>
                        <div className="text-sm text-muted-foreground">{order.type} • {order.date}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{order.amount}</div>
                        <Badge variant="secondary" className="text-xs">{order.status}</Badge>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full" onClick={() => navigate('/mes-commandes')}>
                    Voir toutes les commandes
                  </Button>
                </CardContent>
              </Card>

              {/* Réservations à venir */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Réservations à venir
                  </CardTitle>
                  <CardDescription>Vos prochains rendez-vous</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {reservations.map((reservation) => (
                    <div key={reservation.id} className="flex items-center gap-3 p-3 rounded-lg border">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <reservation.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{reservation.name}</div>
                        <div className="text-sm text-muted-foreground">{reservation.date} • {reservation.time}</div>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">
                    Voir toutes les réservations
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Abonnements actifs */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Abonnements actifs
                </CardTitle>
                <CardDescription>Vos abonnements en cours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {subscriptions.map((sub) => (
                    <div key={sub.id} className="flex items-center gap-4 p-4 rounded-lg border">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <sub.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{sub.name}</div>
                        <div className="text-sm text-muted-foreground">{sub.type}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {sub.expires ? `Expire le ${sub.expires}` : sub.remaining}
                        </div>
                      </div>
                      <Button size="sm" variant="outline">Gérer</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profil */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Informations personnelles</CardTitle>
                <CardDescription>Gérez vos informations de profil</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {isEditing ? (
                  <>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullname">Nom complet</Label>
                        <Input
                          id="fullname"
                          value={fullname}
                          onChange={(e) => setFullname(e.target.value)}
                          placeholder="Jean Dupont"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          disabled
                          className="bg-muted"
                        />
                        <p className="text-xs text-muted-foreground">L'email ne peut pas être modifié</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+229 XX XX XX XX"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleSaveProfile} disabled={loading}>
                        <Save className="w-4 h-4 mr-2" />
                        {loading ? 'Enregistrement...' : 'Enregistrer'}
                      </Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        <X className="w-4 h-4 mr-2" />
                        Annuler
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-muted-foreground">Nom complet</Label>
                        <p className="text-lg font-medium">{user.fullname}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Email</Label>
                        <p className="text-lg font-medium">{user.email}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Téléphone</Label>
                        <p className="text-lg font-medium">{user.phone || 'Non renseigné'}</p>
                      </div>
                    </div>
                    <Button onClick={() => setIsEditing(true)}>
                      <Edit2 className="w-4 h-4 mr-2" />
                      Modifier le profil
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Commandes */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Historique des commandes</CardTitle>
                <CardDescription>Toutes vos commandes passées</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <ShoppingBag className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{order.item}</div>
                          <div className="text-sm text-muted-foreground">{order.type} • {order.date}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="font-semibold">{order.amount}</div>
                          <Badge variant="secondary">{order.status}</Badge>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDownloadInvoice(order)}
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Facture
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Réservations */}
          <TabsContent value="reservations">
            <Card>
              <CardHeader>
                <CardTitle>Mes réservations</CardTitle>
                <CardDescription>Gérez vos réservations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reservations.map((reservation) => (
                    <div key={reservation.id} className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <reservation.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{reservation.name}</div>
                          <div className="text-sm text-muted-foreground">{reservation.type}</div>
                          <div className="text-sm text-muted-foreground">{reservation.date} • {reservation.time}</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Modifier</Button>
                        <Button size="sm" variant="outline">Annuler</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Abonnements */}
          <TabsContent value="subscriptions">
            <Card>
              <CardHeader>
                <CardTitle>Mes abonnements</CardTitle>
                <CardDescription>Gérez vos abonnements et forfaits</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subscriptions.map((sub) => (
                    <div key={sub.id} className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <sub.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{sub.name}</div>
                          <div className="text-sm text-muted-foreground">{sub.type}</div>
                          <div className="text-sm text-muted-foreground">
                            {sub.expires ? `Expire le ${sub.expires}` : sub.remaining}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Renouveler</Button>
                        <Button size="sm" variant="outline">Annuler</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Avis */}
          <TabsContent value="reviews">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Mes avis</CardTitle>
                  <CardDescription>Vos avis et notations sur les produits et services</CardDescription>
                </div>
                <Dialog open={showReviewForm} onOpenChange={setShowReviewForm}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Ajouter un avis
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Ajouter un avis</DialogTitle>
                      <DialogDescription>
                        Partagez votre expérience avec nos services
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="review-item">Produit / Service</Label>
                        <Input
                          id="review-item"
                          value={reviewItem}
                          onChange={(e) => setReviewItem(e.target.value)}
                          placeholder="Ex: Menu Découverte, Suite Vue Mer..."
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Note</Label>
                        <div className="flex gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => setReviewRating(i + 1)}
                              className="focus:outline-none transition-transform hover:scale-110"
                            >
                              <Star
                                className={`w-8 h-8 ${
                                  i < reviewRating
                                    ? 'fill-amber-400 text-amber-400'
                                    : 'text-muted-foreground'
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="review-comment">Commentaire</Label>
                        <Textarea
                          id="review-comment"
                          value={reviewComment}
                          onChange={(e) => setReviewComment(e.target.value)}
                          placeholder="Partagez votre expérience..."
                          rows={4}
                        />
                      </div>
                    </div>
                    
                    <div className="flex gap-2 justify-end">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setShowReviewForm(false);
                          setReviewItem('');
                          setReviewComment('');
                          setReviewRating(5);
                        }}
                      >
                        Annuler
                      </Button>
                      <Button onClick={handleAddReview} disabled={loading}>
                        {loading ? 'Ajout...' : 'Ajouter'}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                {reviews.length === 0 ? (
                  <div className="text-center py-12">
                    <Star className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground mb-4">Vous n'avez pas encore laissé d'avis</p>
                    <Button onClick={() => setShowReviewForm(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Ajouter votre premier avis
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review.id} className="p-4 rounded-lg border">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="font-medium">{review.item}</div>
                            <div className="text-sm text-muted-foreground">{review.date}</div>
                          </div>
                          <div className="flex gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? 'fill-amber-400 text-amber-400'
                                    : 'text-muted-foreground'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{review.comment}</p>
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" variant="outline" onClick={() => toast.info('Fonctionnalité à venir')}>
                            <Edit2 className="w-3 h-3 mr-2" />
                            Modifier
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleDeleteReview(review.id)}>
                            <Trash2 className="w-3 h-3 mr-2" />
                            Supprimer
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Paramètres */}
          <TabsContent value="settings">
            <div className="space-y-6">
              {/* Changement de mot de passe */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="w-5 h-5" />
                    Mot de passe
                  </CardTitle>
                  <CardDescription>Changez votre mot de passe</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!showPasswordChange ? (
                    <Button variant="outline" onClick={() => setShowPasswordChange(true)}>
                      Changer le mot de passe
                    </Button>
                  ) : (
                    <div className="space-y-4">
                      <Alert>
                        <AlertCircle className="w-4 h-4" />
                        <AlertDescription>
                          Le mot de passe doit contenir au moins 6 caractères
                        </AlertDescription>
                      </Alert>
                      
                      <div className="space-y-2">
                        <Label htmlFor="new-password">Nouveau mot de passe</Label>
                        <Input
                          id="new-password"
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="••••••••"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
                        <Input
                          id="confirm-password"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="••••••••"
                        />
                      </div>
                      
                      <div className="flex gap-2">
                        <Button onClick={handleChangePassword} disabled={loading}>
                          {loading ? 'Changement...' : 'Changer le mot de passe'}
                        </Button>
                        <Button variant="outline" onClick={() => {
                          setShowPasswordChange(false);
                          setNewPassword('');
                          setConfirmPassword('');
                        }}>
                          Annuler
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Notifications
                  </CardTitle>
                  <CardDescription>Gérez vos préférences de notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Notifications par email</div>
                      <div className="text-sm text-muted-foreground">Recevoir les notifications par email</div>
                    </div>
                    <Button variant="outline" size="sm">Activer</Button>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Promotions et offres</div>
                      <div className="text-sm text-muted-foreground">Recevoir les offres spéciales</div>
                    </div>
                    <Button variant="outline" size="sm">Activer</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Sécurité */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Sécurité
                  </CardTitle>
                  <CardDescription>Gérez la sécurité de votre compte</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start" onClick={() => toast.info('Fonctionnalité à venir')}>
                    Activer l'authentification à deux facteurs
                  </Button>
                  <Separator />
                  <Alert variant="destructive">
                    <AlertCircle className="w-4 h-4" />
                    <AlertDescription>
                      La suppression de votre compte est irréversible. Toutes vos données seront perdues.
                    </AlertDescription>
                  </Alert>
                  <Button variant="destructive" className="w-full" onClick={handleDeleteAccount}>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Supprimer mon compte
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ClientProfile;
