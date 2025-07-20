"use client";

import { useHotel } from "@/context/HotelContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Dashboard() {
  const { state, getRoomStats } = useHotel();
  const stats = getRoomStats();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard del Hotel</h1>
          <p className="text-muted-foreground mt-2">
            Gestión completa de habitaciones y reservas
          </p>
        </div>
        <Link href="/reservas">
          <Button size="lg" className="font-medium">
            Nueva Reserva
          </Button>
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Habitaciones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Ocupadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.occupied}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Disponibles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.available}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Ocupación
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {((stats.occupied / stats.total) * 100).toFixed(1)}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Room Types Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(stats.byType).map(([type, typeStats]) => (
          <Card key={type}>
            <CardHeader>
              <CardTitle className="capitalize text-lg">
                Habitaciones {type === 'sencilla' ? 'Sencillas' : type === 'doble' ? 'Dobles' : 'Triples'}
              </CardTitle>
              <CardDescription>
                Distribución de habitaciones por tipo
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total:</span>
                <Badge variant="outline">{typeStats.total}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Ocupadas:</span>
                <Badge variant="destructive">{typeStats.occupied}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Disponibles:</span>
                <Badge variant="default" className="bg-green-600 hover:bg-green-700">
                  {typeStats.available}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Reservations */}
      <Card>
        <CardHeader>
          <CardTitle>Reservas Recientes</CardTitle>
          <CardDescription>
            Últimas reservas realizadas en el sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          {state.reservations.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No hay reservas registradas</p>
              <Link href="/reservas" className="inline-block mt-4">
                <Button variant="outline">Crear Primera Reserva</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {state.reservations
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .slice(0, 5)
                .map((reservation) => (
                  <div
                    key={reservation.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg"
                  >
                    <div className="space-y-1">
                      <p className="font-medium text-foreground">
                        {reservation.guest.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {reservation.guest.contact}
                      </p>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="font-medium text-foreground">
                        Habitación {reservation.room.number}
                      </p>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="capitalize">
                          {reservation.room.type}
                        </Badge>
                        <Badge variant={reservation.room.hasAC ? "default" : "secondary"}>
                          {reservation.room.hasAC ? "A/C" : "Ventilador"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              {state.reservations.length > 5 && (
                <div className="text-center pt-4">
                  <Link href="/huespedes">
                    <Button variant="outline">Ver Todas las Reservas</Button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
