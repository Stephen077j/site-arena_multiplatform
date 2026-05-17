import { useState } from 'react';
import { useCyberStations, useCyberBookings, cyberStore, CYBERCAFE_DURATIONS, CYBERCAFE_SERVICES, formatPrice } from '@/client/lib/clientStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Plus, Trash2, Clock, Printer, Monitor } from 'lucide-react';

const ClientCybercafe = () => {
  const stations = useCyberStations();
  const bookings = useCyberBookings();
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [selectedStation, setSelectedStation] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<string>('1h');
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [showServiceDialog, setShowServiceDialog] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [serviceQuantity, setServiceQuantity] = useState(1);

  const activeBookings = bookings.filter(b => b.status === 'active');
  const completedBookings = bookings.filter(b => b.status === 'completed');

  const handleBook = () => {
    if (!customerName || !customerPhone || !selectedStation) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    const durationDef = CYBERCAFE_DURATIONS.find(d => d.id === selectedDuration);
    const station = stations.find(s => s.id === selectedStation);
    if (!durationDef || !station) return;

    const booking = cyberStore.book({
      customer: { name: customerName, phone: customerPhone },
      stationId: selectedStation,
      stationNumber: station.number,
      durationId: selectedDuration,
      durationMinutes: durationDef.minutes,
      durationPrice: durationDef.price,
      services: [],
      servicesTotal: 0,
      total: durationDef.price,
      paid: false,
    });

    if (booking) {
      setSelectedBooking(booking.id);
      setShowBookingDialog(false);
      setCustomerName('');
      setCustomerPhone('');
      setSelectedStation(null);
    }
  };

  const handleAddService = () => {
    if (!selectedBooking || !selectedService) return;

    const serviceDef = CYBERCAFE_SERVICES.find(s => s.id === selectedService);
    if (!serviceDef) return;

    cyberStore.addService(selectedBooking, selectedService, serviceQuantity);
    setSelectedService(null);
    setServiceQuantity(1);
    setShowServiceDialog(false);
  };

  const currentBooking = selectedBooking ? bookings.find(b => b.id === selectedBooking) : null;

  return (
    <div className="flex-1 space-y-6 p-6 max-w-7xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Cybercafé</h1>
        <p className="text-muted-foreground">Réservez un poste informatique et commandez des services d'impression ou scan.</p>
      </div>

      {/* Stations Overview */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Postes disponibles</h2>
          <Badge variant="outline" className="bg-green-50 text-green-700">
            {stations.filter(s => s.status === 'available').length}/{stations.length} disponibles
          </Badge>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {stations.map(station => (
            <Card
              key={station.id}
              className={`p-4 cursor-pointer transition ${
                station.status === 'available'
                  ? 'border-green-200 bg-green-50 hover:border-green-400'
                  : 'border-red-200 bg-red-50 opacity-60'
              } ${selectedStation === station.id ? 'ring-2 ring-primary' : ''}`}
              onClick={() => setSelectedStation(station.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="text-lg font-bold">Poste {station.number}</div>
                <Badge
                  variant={station.status === 'available' ? 'default' : 'destructive'}
                  className={station.status === 'available' ? 'bg-green-600' : ''}
                >
                  {station.status === 'available' ? 'Libre' : 'Occupé'}
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground">{station.specs}</div>
            </Card>
          ))}
        </div>
      </div>

      {/* Booking Section */}
      {!currentBooking && (
        <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Monitor className="w-5 h-5" />
            Nouvelle réservation
          </h3>

          <div className="grid gap-4 mb-6">
            <div>
              <label className="text-sm font-medium mb-1 block">Nom</label>
              <Input
                placeholder="Votre nom"
                value={customerName}
                onChange={e => setCustomerName(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Téléphone</label>
              <Input
                placeholder="Votre numéro"
                value={customerPhone}
                onChange={e => setCustomerPhone(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Durée</label>
              <div className="grid gap-2">
                {CYBERCAFE_DURATIONS.map(duration => (
                  <Button
                    key={duration.id}
                    variant={selectedDuration === duration.id ? 'default' : 'outline'}
                    className="justify-between h-auto p-3"
                    onClick={() => setSelectedDuration(duration.id)}
                  >
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {duration.label}
                    </span>
                    <span className="font-semibold">{formatPrice(duration.price)}</span>
                  </Button>
                ))}
              </div>
            </div>

            <Button
              onClick={handleBook}
              disabled={!selectedStation || !customerName || !customerPhone}
              size="lg"
              className="w-full"
            >
              Réserver le poste {selectedStation ? stations.find(s => s.id === selectedStation)?.number : '...'}
            </Button>
          </div>
        </Card>
      )}

      {/* Active Booking Details */}
      {currentBooking && (
        <Card className="p-6 border-primary bg-primary/5">
          <div className="space-y-6">
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">Client</p>
                <p className="font-semibold">{currentBooking.customer.name}</p>
                <p className="text-sm text-muted-foreground">{currentBooking.customer.phone}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Poste</p>
                <p className="font-semibold">Poste {currentBooking.stationNumber}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Durée</p>
                <p className="font-semibold">{currentBooking.durationMinutes} minutes</p>
                <p className="text-sm">{formatPrice(currentBooking.durationPrice)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Statut</p>
                <Badge className="bg-blue-600">{currentBooking.status}</Badge>
              </div>
            </div>

            {/* Services */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold flex items-center gap-2">
                  <Printer className="w-4 h-4" />
                  Services
                </h4>
                <Dialog open={showServiceDialog} onOpenChange={setShowServiceDialog}>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline">
                      <Plus className="w-4 h-4 mr-1" />
                      Ajouter service
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Ajouter un service</DialogTitle>
                      <DialogDescription>Sélectionnez un service et la quantité</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Service</label>
                        <select
                          className="w-full px-3 py-2 border border-border rounded-md"
                          value={selectedService || ''}
                          onChange={e => setSelectedService(e.target.value)}
                        >
                          <option value="">Choisir un service</option>
                          {CYBERCAFE_SERVICES.map(service => (
                            <option key={service.id} value={service.id}>
                              {service.label} — {formatPrice(service.price)}/{service.unit}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Quantité</label>
                        <Input
                          type="number"
                          min="1"
                          value={serviceQuantity}
                          onChange={e => setServiceQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        />
                      </div>
                      <Button onClick={handleAddService} className="w-full">
                        Ajouter
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {currentBooking.services.length === 0 ? (
                <p className="text-sm text-muted-foreground py-2">Aucun service ajouté</p>
              ) : (
                <div className="space-y-2">
                  {currentBooking.services.map(service => (
                    <div key={service.id} className="flex items-center justify-between p-3 bg-card rounded-lg border">
                      <div>
                        <p className="font-medium text-sm">{service.label}</p>
                        <p className="text-xs text-muted-foreground">{service.quantity} × {formatPrice(service.priceUnit)}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <p className="font-semibold">{formatPrice(service.total)}</p>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8"
                          onClick={() => cyberStore.removeService(currentBooking.id, service.id)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Total and Actions */}
            <div className="pt-4 border-t border-border space-y-3">
              <div className="flex items-center justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">{formatPrice(currentBooking.total)}</span>
              </div>

              <div className="flex gap-2">
                {!currentBooking.paid ? (
                  <Button
                    onClick={() => cyberStore.markPaid(currentBooking.id)}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    Payer {formatPrice(currentBooking.total)}
                  </Button>
                ) : (
                  <Badge className="flex-1 justify-center bg-green-600">Payé</Badge>
                )}

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="flex-1">
                      Terminer session
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Terminer la session</AlertDialogTitle>
                      <AlertDialogDescription>
                        Êtes-vous sûr ? La session ne pourra pas être modifiée après.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        cyberStore.endSession(currentBooking.id);
                        setSelectedBooking(null);
                      }}
                    >
                      Terminer
                    </AlertDialogAction>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Active Sessions */}
      {activeBookings.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Sessions actives</h2>
          <div className="grid gap-4">
            {activeBookings.map(booking => (
              <Card key={booking.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-semibold">{booking.customer.name} — Poste {booking.stationNumber}</p>
                    <p className="text-sm text-muted-foreground">{booking.durationMinutes} min • {booking.services.length} service(s)</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">{formatPrice(booking.total)}</p>
                    <Badge variant={booking.paid ? 'default' : 'outline'}>{booking.paid ? 'Payé' : 'Impayé'}</Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Completed Sessions */}
      {completedBookings.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Sessions complétées</h2>
          <div className="grid gap-4">
            {completedBookings.slice(0, 5).map(booking => (
              <Card key={booking.id} className="p-4 opacity-60">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-semibold">{booking.customer.name} — Poste {booking.stationNumber}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(booking.createdAt).toLocaleString('fr-FR')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">{formatPrice(booking.total)}</p>
                    <Badge variant="secondary">Complétée</Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientCybercafe;
