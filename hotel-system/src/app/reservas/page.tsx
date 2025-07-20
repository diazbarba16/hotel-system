"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useHotel } from "@/context/HotelContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { RoomType } from "@/types/hotel";

const reservationSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  contact: z.string().min(5, "El contacto debe tener al menos 5 caracteres"),
  roomType: z.enum(["sencilla", "doble", "triple"], {
    required_error: "Debe seleccionar un tipo de habitación"
  }),
  climate: z.enum(["ac", "fan"], {
    required_error: "Debe seleccionar el tipo de climatización"
  }),
  checkInDate: z.string().min(1, "Debe seleccionar una fecha de entrada")
});

type ReservationForm = z.infer<typeof reservationSchema>;

export default function ReservasPage() {
  const { addReservation, getAvailableRooms } = useHotel();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset
  } = useForm<ReservationForm>({
    resolver: zodResolver(reservationSchema)
  });

  const watchedRoomType = watch("roomType");
  const watchedClimate = watch("climate");

  // Obtener habitaciones disponibles según filtros actuales
  const getAvailableCount = (type?: RoomType, hasAC?: boolean) => {
    if (!type) return 0;
    return getAvailableRooms({
      type,
      hasAC: hasAC !== undefined ? hasAC : undefined
    }).length;
  };

  const onSubmit = async (data: ReservationForm) => {
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const reservation = await addReservation(
        {
          name: data.name,
          contact: data.contact,
          checkInDate: new Date(data.checkInDate)
        },
        {
          type: data.roomType,
          hasAC: data.climate === "ac"
        }
      );

      setSubmitMessage({
        type: 'success',
        message: `Reserva creada exitosamente. Habitación ${reservation.room.number} asignada.`
      });
      reset();
    } catch (error) {
      setSubmitMessage({
        type: 'error',
        message: error instanceof Error ? error.message : 'Error al crear la reserva'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Nueva Reserva</h1>
        <p className="text-muted-foreground mt-2">
          Complete el formulario para registrar un nuevo huésped
        </p>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Información del Huésped</CardTitle>
          <CardDescription>
            Ingrese los datos del huésped y seleccione el tipo de habitación
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Guest Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre Completo</Label>
                <Input
                  id="name"
                  placeholder="Ej: Juan Pérez"
                  {...register("name")}
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact">Contacto</Label>
                <Input
                  id="contact"
                  placeholder="Teléfono o email"
                  {...register("contact")}
                  className={errors.contact ? "border-red-500" : ""}
                />
                {errors.contact && (
                  <p className="text-sm text-red-500">{errors.contact.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="checkInDate">Fecha de Entrada</Label>
              <Input
                id="checkInDate"
                type="date"
                {...register("checkInDate")}
                className={errors.checkInDate ? "border-red-500" : ""}
              />
              {errors.checkInDate && (
                <p className="text-sm text-red-500">{errors.checkInDate.message}</p>
              )}
            </div>

            {/* Room Selection */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Tipo de Habitación</Label>
                <Select onValueChange={(value) => setValue("roomType", value as RoomType)}>
                  <SelectTrigger className={errors.roomType ? "border-red-500" : ""}>
                    <SelectValue placeholder="Seleccione el tipo de habitación" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sencilla">
                      <div className="flex items-center justify-between w-full">
                        <span>Sencilla (1 cama matrimonial)</span>
                        <Badge variant="outline" className="ml-2">
                          {getAvailableCount("sencilla")} disponibles
                        </Badge>
                      </div>
                    </SelectItem>
                    <SelectItem value="doble">
                      <div className="flex items-center justify-between w-full">
                        <span>Doble (2 camas matrimoniales)</span>
                        <Badge variant="outline" className="ml-2">
                          {getAvailableCount("doble")} disponibles
                        </Badge>
                      </div>
                    </SelectItem>
                    <SelectItem value="triple">
                      <div className="flex items-center justify-between w-full">
                        <span>Triple (3 camas matrimoniales)</span>
                        <Badge variant="outline" className="ml-2">
                          {getAvailableCount("triple")} disponibles
                        </Badge>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.roomType && (
                  <p className="text-sm text-red-500">{errors.roomType.message}</p>
                )}
              </div>

              <div className="space-y-3">
                <Label>Climatización</Label>
                <RadioGroup
                  onValueChange={(value) => setValue("climate", value as "ac" | "fan")}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="flex items-center space-x-2 p-4 border border-border rounded-lg">
                    <RadioGroupItem value="ac" id="ac" />
                    <Label htmlFor="ac" className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <span>Aire Acondicionado</span>
                        {watchedRoomType && (
                          <Badge variant="outline">
                            {getAvailableCount(watchedRoomType, true)} disponibles
                          </Badge>
                        )}
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border border-border rounded-lg">
                    <RadioGroupItem value="fan" id="fan" />
                    <Label htmlFor="fan" className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <span>Ventilador</span>
                        {watchedRoomType && (
                          <Badge variant="outline">
                            {getAvailableCount(watchedRoomType, false)} disponibles
                          </Badge>
                        )}
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
                {errors.climate && (
                  <p className="text-sm text-red-500">{errors.climate.message}</p>
                )}
              </div>
            </div>

            {/* Availability Alert */}
            {watchedRoomType && watchedClimate && (
              <Alert>
                <AlertDescription>
                  Habitaciones {watchedRoomType} con {watchedClimate === 'ac' ? 'aire acondicionado' : 'ventilador'} disponibles: {' '}
                  <strong>{getAvailableCount(watchedRoomType, watchedClimate === 'ac')}</strong>
                </AlertDescription>
              </Alert>
            )}

            {/* Submit Message */}
            {submitMessage && (
              <Alert variant={submitMessage.type === 'error' ? 'destructive' : 'default'}>
                <AlertDescription>{submitMessage.message}</AlertDescription>
              </Alert>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creando Reserva..." : "Crear Reserva"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
