"use client";

import { useState } from "react";
import { useHotel } from "@/context/HotelContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import Link from "next/link";

export default function HuespedesPage() {
  const { state, cancelReservation } = useHotel();
  const [searchTerm, setSearchTerm] = useState("");
  const [cancelMessage, setCancelMessage] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  // Filtrar reservas por término de búsqueda
  const filteredReservations = state.reservations.filter((reservation) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      reservation.guest.name.toLowerCase().includes(searchLower) ||
      reservation.guest.contact.toLowerCase().includes(searchLower) ||
      reservation.room.number.toString().includes(searchLower)
    );
  });

  const handleCancelReservation = (reservationId: string, guestName: string) => {
    try {
      cancelReservation(reservationId);
      setCancelMessage({
        type: 'success',
        message: `Reserva de ${guestName} cancelada exitosamente`
      });
      // Limpiar mensaje después de 5 segundos
      setTimeout(() => setCancelMessage(null), 5000);
    } catch (error) {
      setCancelMessage({
        type: 'error',
        message: 'Error al cancelar la reserva'
      });
      setTimeout(() => setCancelMessage(null), 5000);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(price);
  };

  const getRoomTypeLabel = (type: string) => {
    switch (type) {
      case "sencilla": return "Sencilla";
      case "doble": return "Doble";
      case "triple": return "Triple";
      default: return type;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestión de Huéspedes</h1>
          <p className="text-muted-foreground mt-2">
            Lista completa de reservas activas y gestión de huéspedes
          </p>
        </div>
        <Link href="/reservas">
          <Button size="lg">Nueva Reserva</Button>
        </Link>
      </div>

      {/* Search and Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Buscar Huéspedes</CardTitle>
            <CardDescription>
              Busque por nombre, contacto o número de habitación
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="search">Término de búsqueda</Label>
              <Input
                id="search"
                placeholder="Nombre, contacto o habitación..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Reservas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {state.reservations.length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Resultados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {filteredReservations.length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cancel Message */}
      {cancelMessage && (
        <Alert variant={cancelMessage.type === 'error' ? 'destructive' : 'default'}>
          <AlertDescription>{cancelMessage.message}</AlertDescription>
        </Alert>
      )}

      {/* Reservations List */}
      {state.reservations.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No hay reservas registradas
            </h3>
            <p className="text-muted-foreground mb-6">
              Comience creando la primera reserva para un huésped
            </p>
            <Link href="/reservas">
              <Button size="lg">Crear Primera Reserva</Button>
            </Link>
          </CardContent>
        </Card>
      ) : filteredReservations.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">
              No se encontraron reservas que coincidan con la búsqueda
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => setSearchTerm("")}
            >
              Limpiar Búsqueda
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredReservations
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .map((reservation) => (
              <Card key={reservation.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">
                        {reservation.guest.name}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {reservation.guest.contact}
                      </CardDescription>
                    </div>
                    <Badge variant="default" className="bg-green-600 hover:bg-green-700">
                      Activa
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Room Information */}
                  <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">
                        Habitación
                      </p>
                      <p className="text-lg font-bold text-foreground">
                        {reservation.room.number}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">
                        Tipo
                      </p>
                      <Badge variant="outline" className="capitalize">
                        {getRoomTypeLabel(reservation.room.type)}
                      </Badge>
                    </div>
                  </div>

                  {/* Additional Details */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Climatización:</span>
                      <Badge variant={reservation.room.hasAC ? "default" : "secondary"}>
                        {reservation.room.hasAC ? "Aire Acondicionado" : "Ventilador"}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Precio por noche:</span>
                      <span className="font-semibold text-foreground">
                        {formatPrice(reservation.room.price)}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Fecha de entrada:</span>
                      <span className="text-sm font-medium">
                        {formatDate(reservation.guest.checkInDate)}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Reserva creada:</span>
                      <span className="text-sm font-medium">
                        {formatDate(reservation.createdAt)}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-border">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" className="w-full">
                          Cancelar Reserva
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>¿Cancelar reserva?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta acción cancelará la reserva de <strong>{reservation.guest.name}</strong> y 
                            liberará la habitación <strong>{reservation.room.number}</strong>. 
                            Esta acción no se puede deshacer.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Mantener Reserva</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleCancelReservation(reservation.id, reservation.guest.name)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Cancelar Reserva
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      )}
    </div>
  );
}
