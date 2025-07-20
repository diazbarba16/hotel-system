"use client";

import { useState } from "react";
import { useHotel } from "@/context/HotelContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Room, RoomType } from "@/types/hotel";

type FilterType = "all" | RoomType;
type FilterStatus = "all" | "available" | "occupied";
type FilterClimate = "all" | "ac" | "fan";

export default function HabitacionesPage() {
  const { state } = useHotel();
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [filterClimate, setFilterClimate] = useState<FilterClimate>("all");
  const [searchNumber, setSearchNumber] = useState("");

  // Filtrar habitaciones
  const filteredRooms = state.rooms.filter((room) => {
    // Filtro por tipo
    if (filterType !== "all" && room.type !== filterType) return false;
    
    // Filtro por estado
    if (filterStatus === "available" && room.occupied) return false;
    if (filterStatus === "occupied" && !room.occupied) return false;
    
    // Filtro por climatización
    if (filterClimate === "ac" && !room.hasAC) return false;
    if (filterClimate === "fan" && room.hasAC) return false;
    
    // Filtro por número de habitación
    if (searchNumber && !room.number.toString().includes(searchNumber)) return false;
    
    return true;
  });

  const getRoomTypeLabel = (type: RoomType) => {
    switch (type) {
      case "sencilla": return "Sencilla";
      case "doble": return "Doble";
      case "triple": return "Triple";
      default: return type;
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(price);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Gestión de Habitaciones</h1>
        <p className="text-muted-foreground mt-2">
          Vista completa de todas las habitaciones del hotel
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
          <CardDescription>
            Filtre las habitaciones por tipo, estado o características
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Tipo de Habitación</Label>
              <Select value={filterType} onValueChange={(value) => setFilterType(value as FilterType)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="sencilla">Sencillas</SelectItem>
                  <SelectItem value="doble">Dobles</SelectItem>
                  <SelectItem value="triple">Triples</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Estado</Label>
              <Select value={filterStatus} onValueChange={(value) => setFilterStatus(value as FilterStatus)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="available">Disponibles</SelectItem>
                  <SelectItem value="occupied">Ocupadas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Climatización</Label>
              <Select value={filterClimate} onValueChange={(value) => setFilterClimate(value as FilterClimate)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="ac">Aire Acondicionado</SelectItem>
                  <SelectItem value="fan">Ventilador</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Número de Habitación</Label>
              <Input
                placeholder="Buscar por número..."
                value={searchNumber}
                onChange={(e) => setSearchNumber(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Mostrando {filteredRooms.length} de {state.rooms.length} habitaciones
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setFilterType("all");
                setFilterStatus("all");
                setFilterClimate("all");
                setSearchNumber("");
              }}
            >
              Limpiar Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredRooms.map((room) => (
          <Card key={room.id} className={`transition-all hover:shadow-md ${room.occupied ? 'bg-red-50 dark:bg-red-950/20' : 'bg-green-50 dark:bg-green-950/20'}`}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                  Habitación {room.number}
                </CardTitle>
                <Badge variant={room.occupied ? "destructive" : "default"} className={room.occupied ? "" : "bg-green-600 hover:bg-green-700"}>
                  {room.occupied ? "Ocupada" : "Disponible"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Tipo:</span>
                  <Badge variant="outline" className="capitalize">
                    {getRoomTypeLabel(room.type)}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Climatización:</span>
                  <Badge variant={room.hasAC ? "default" : "secondary"}>
                    {room.hasAC ? "A/C" : "Ventilador"}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Precio:</span>
                  <span className="font-semibold text-foreground">
                    {formatPrice(room.price)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Camas:</span>
                  <span className="text-sm font-medium">
                    {room.type === "sencilla" ? "1 matrimonial" : 
                     room.type === "doble" ? "2 matrimoniales" : 
                     "3 matrimoniales"}
                  </span>
                </div>
              </div>

              {room.occupied && (
                <div className="pt-2 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    Esta habitación está actualmente ocupada
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRooms.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">
              No se encontraron habitaciones que coincidan con los filtros seleccionados
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setFilterType("all");
                setFilterStatus("all");
                setFilterClimate("all");
                setSearchNumber("");
              }}
            >
              Limpiar Filtros
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
