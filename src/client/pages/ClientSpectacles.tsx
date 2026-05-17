import { useState } from 'react';
import { useShows, useShowBookings, showStore, formatPrice } from '@/client/lib/clientStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Ticket, MapPin, Clock, User, Download, X } from 'lucide-react';

const ClientSpectacles = () => {
  const shows = useShows();
  const bookings = useShowBookings();
  const [selectedShowId, setSelectedShowId] = useState<string | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<{ row: string; number: number }[]>([]);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [showCheckoutDialog, setShowCheckoutDialog] = useState(false);
  const [completedBooking, setCompletedBooking] = useState<string | null>(null);

  const selectedShow = selectedShowId ? shows.find(s => s.id === selectedShowId) : null;
  const currentSeats = selectedShowId ? showStore.seats(selectedShowId) : [];
  const seatTotal = selectedSeats.reduce((sum, sel) => {
    const seat = currentSeats.find(s => s.row === sel.row && s.number === sel.number);
    return sum + (seat?.price || 0);
  }, 0);

  const handleToggleSeat = (row: string, number: number) => {
    const exists = selectedSeats.some(s => s.row === row && s.number === number);
    if (exists) {
      setSelectedSeats(selectedSeats.filter(s => !(s.row === row && s.number === number)));
    } else {
      setSelectedSeats([...selectedSeats, { row, number }]);
    }
  };

  const handleCheckout = () => {
    if (!customerName || !customerPhone || selectedSeats.length === 0 || !selectedShow) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    const booking = showStore.checkout({
      customer: { name: customerName, phone: customerPhone },
      showId: selectedShow.id,
      showTitle: selectedShow.title,
      date: selectedShow.date,
      time: selectedShow.time,
      seats: selectedSeats.map(sel => {
        const seat = currentSeats.find(s => s.row === sel.row && s.number === sel.number)!;
        return { row: sel.row, number: sel.number, type: seat.type, price: seat.price };
      }),
      total: seatTotal,
      paid: false,
      status: 'pending',
    });

    setCompletedBooking(booking.id);
    setShowCheckoutDialog(false);
    setSelectedSeats([]);
    setCustomerName('');
    setCustomerPhone('');
    setSelectedShowId(null);
  };

  const myBookings = bookings.filter(b => b.status !== 'cancelled');
  const myTickets = myBookings.flatMap(b => b.tickets).filter(t => t.status === 'valid');

  return (
    <div className="flex-1 space-y-6 p-6 max-w-7xl mx-auto">
      <Tabs defaultValue="browse" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="browse">Parcourir</TabsTrigger>
          <TabsTrigger value="my-tickets" className="relative">
            Mes billets
            {myTickets.length > 0 && (
              <Badge className="absolute -top-2 -right-2 rounded-full w-5 h-5 p-0 flex items-center justify-center">
                {myTickets.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        {/* Browse Shows */}
        <TabsContent value="browse" className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Spectacles & Concerts</h1>
            <p className="text-muted-foreground">Découvrez nos événements et réservez vos billets en ligne.</p>
          </div>

          {/* Shows Grid */}
          {!selectedShowId && (
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
              {shows.map(show => {
                const availableSeats = currentSeats.filter(s => s.status === 'available').length;
                return (
                  <Card key={show.id} className="overflow-hidden hover:shadow-lg transition">
                    <div className="aspect-video overflow-hidden bg-muted">
                      <img
                        src={show.image}
                        alt={show.title}
                        className="w-full h-full object-cover hover:scale-105 transition"
                      />
                    </div>
                    <div className="p-4 space-y-3">
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="font-bold text-lg">{show.title}</h3>
                          <Badge variant="outline">{show.category}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{show.artist}</p>
                      </div>

                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          {new Date(`${show.date}T${show.time}`).toLocaleDateString('fr-FR', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          {show.venue}
                        </div>
                        <p className="text-xs text-muted-foreground">{show.duration}</p>
                      </div>

                      <p className="text-sm text-foreground">{show.description}</p>

                      <div className="flex items-center justify-between pt-2">
                        <div>
                          <p className="text-xs text-muted-foreground">À partir de</p>
                          <p className="font-bold text-lg">{formatPrice(show.basePrice)}</p>
                        </div>
                        <Button onClick={() => setSelectedShowId(show.id)}>
                          <Ticket className="w-4 h-4 mr-2" />
                          Réserver
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}

          {/* Seat Selection */}
          {selectedShowId && selectedShow && (
              <div className="space-y-6">
                <Button variant="outline" onClick={() => setSelectedShowId(null)} className="mb-4">
                  ← Retour aux spectacles
                </Button>

                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Seat Map */}
                  <div className="lg:col-span-2 space-y-4">
                    <Card className="p-6 space-y-4">
                      <div className="text-center space-y-1">
                        <h2 className="text-2xl font-bold">{selectedShow.title}</h2>
                        <p className="text-muted-foreground">{selectedShow.venue}</p>
                      </div>

                      <div className="space-y-1 text-center text-sm">
                        <p className="text-muted-foreground">
                          {new Date(`${selectedShow.date}T${selectedShow.time}`).toLocaleDateString('fr-FR', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>

                      {/* Legend */}
                      <div className="flex justify-center gap-6 text-xs pt-4 pb-4 border-t border-b">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-green-500 rounded" />
                          <span>Disponible</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-yellow-500 rounded" />
                          <span>Sélectionné</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-gray-300 rounded" />
                          <span>Vendu</span>
                        </div>
                      </div>

                      {/* Stage */}
                      <div className="text-center py-3 bg-muted rounded font-semibold text-sm">
                        🎭 SCÈNE
                      </div>

                      {/* Seat Grid */}
                      <div className="flex flex-col gap-3">
                        {Array.from({ length: 8 }).map((_, rowIndex) => {
                          const row = String.fromCharCode(65 + rowIndex);
                          const rowSeats = currentSeats.filter(s => s.row === row);

                          return (
                            <div key={row} className="flex items-center justify-center gap-1">
                              <span className="w-6 text-right text-xs font-semibold text-muted-foreground">{row}</span>
                              <div className="flex gap-1 flex-wrap justify-center flex-1 max-w-lg">
                                {rowSeats.map(seat => {
                                  const isSelected = selectedSeats.some(s => s.row === seat.row && s.number === seat.number);
                                  const isAvailable = seat.status === 'available';

                                  return (
                                    <button
                                      key={seat.id}
                                      onClick={() => isAvailable && handleToggleSeat(seat.row, seat.number)}
                                      disabled={!isAvailable}
                                      className={`w-7 h-7 rounded text-xs font-semibold transition ${
                                        !isAvailable
                                          ? 'bg-gray-300 cursor-not-allowed'
                                          : isSelected
                                          ? 'bg-yellow-500 text-white'
                                          : 'bg-green-500 hover:bg-green-600 text-white'
                                      }`}
                                      title={`${seat.row}${seat.number} - ${seat.type}`}
                                    >
                                      {seat.number}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </Card>
                  </div>

                  {/* Cart */}
                  <div className="space-y-4">
                    <Card className="p-4 sticky top-6 space-y-4">
                      <h3 className="font-semibold">Résumé</h3>

                      {selectedSeats.length === 0 ? (
                        <p className="text-sm text-muted-foreground py-4">Sélectionnez des sièges</p>
                      ) : (
                        <div className="space-y-3">
                          {selectedSeats.map(sel => {
                            const seat = currentSeats.find(s => s.row === sel.row && s.number === sel.number)!;
                            return (
                              <div key={`${sel.row}${sel.number}`} className="flex items-center justify-between text-sm p-2 bg-muted rounded">
                                <div>
                                  <p className="font-medium">
                                    {sel.row}{sel.number}
                                  </p>
                                  <p className="text-xs text-muted-foreground">{seat.type}</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-semibold">{formatPrice(seat.price)}</p>
                                  <button
                                    onClick={() => handleToggleSeat(sel.row, sel.number)}
                                    className="text-xs text-destructive hover:underline"
                                  >
                                    Retirer
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      <div className="border-t pt-3 space-y-3">
                        <div className="flex justify-between font-bold">
                          <span>Total</span>
                          <span className="text-primary text-lg">{formatPrice(seatTotal)}</span>
                        </div>

                        <Dialog open={showCheckoutDialog} onOpenChange={setShowCheckoutDialog}>
                          <DialogTrigger asChild>
                            <Button
                              className="w-full"
                              disabled={selectedSeats.length === 0}
                            >
                              Commander
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Finaliser la commande</DialogTitle>
                              <DialogDescription>Entrez vos informations pour recevoir vos billets</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <label className="text-sm font-medium mb-1 block">Nom</label>
                                <Input
                                  placeholder="Votre nom complet"
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

                              <div className="bg-muted p-3 rounded-lg space-y-1">
                                <p className="text-sm text-muted-foreground">Montant à payer</p>
                                <p className="text-2xl font-bold">{formatPrice(seatTotal)}</p>
                              </div>

                              <Button onClick={handleCheckout} className="w-full bg-green-600 hover:bg-green-700">
                                Payer {formatPrice(seatTotal)}
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            )}
        </TabsContent>

        {/* My Tickets */}
        <TabsContent value="my-tickets" className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Mes billets</h2>
            <p className="text-muted-foreground">Vos e-tickets et codes QR</p>
          </div>

          {myTickets.length === 0 ? (
            <Card className="p-12 text-center">
              <Ticket className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground">Aucun billet pour le moment</p>
            </Card>
          ) : (
            <div className="grid gap-4">
              {myTickets.map(ticket => (
                <Card key={ticket.id} className="p-6 border-2 border-primary">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs text-muted-foreground">BILLET #{ticket.ticketId}</p>
                        <h3 className="text-2xl font-bold">{ticket.showTitle}</h3>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-primary" />
                          <span>
                            {new Date(`${ticket.date}T${ticket.time}`).toLocaleDateString('fr-FR', {
                              weekday: 'long',
                              day: 'numeric',
                              month: 'long',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">Siège:</span>
                          <Badge>{ticket.seatRow}{ticket.seatNumber}</Badge>
                          <Badge variant="outline">{ticket.seatType}</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-primary" />
                          <span>{ticket.customer.name}</span>
                        </div>
                      </div>

                      <div className="pt-2">
                        <Badge
                          className={
                            ticket.status === 'valid'
                              ? 'bg-green-600'
                              : ticket.status === 'used'
                              ? 'bg-gray-600'
                              : 'bg-red-600'
                          }
                        >
                          {ticket.status === 'valid' ? '✓ Valide' : ticket.status === 'used' ? '✓ Utilisé' : 'Annulé'}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-4">
                      <div className="bg-white p-4 rounded-lg border-2 border-primary">
                        <svg
                          viewBox="0 0 200 200"
                          className="w-40 h-40"
                          dangerouslySetInnerHTML={{
                            __html: `
                              <rect fill="white" width="200" height="200"/>
                              <text x="100" y="100" text-anchor="middle" dy=".3em" font-size="12" font-family="monospace" fill="black">
                                ${ticket.ticketId}
                              </text>
                              <text x="100" y="130" text-anchor="middle" dy=".3em" font-size="10" font-family="monospace" fill="black">
                                ${ticket.seatRow}${ticket.seatNumber}
                              </text>
                            `,
                          }}
                        />
                      </div>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Télécharger
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientSpectacles;
