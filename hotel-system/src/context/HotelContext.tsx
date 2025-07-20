"use client";

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Room, Reservation, Guest, RoomFilter } from '@/types/hotel';
import { initialRooms } from '@/data/rooms';

interface HotelState {
  rooms: Room[];
  reservations: Reservation[];
}

type HotelAction =
  | { type: 'ADD_RESERVATION'; payload: Reservation }
  | { type: 'CANCEL_RESERVATION'; payload: string }
  | { type: 'UPDATE_ROOM'; payload: { roomId: string; updates: Partial<Room> } }
  | { type: 'RESET_DATA' };

interface HotelContextType {
  state: HotelState;
  addReservation: (guest: Omit<Guest, 'id'>, roomFilter: RoomFilter) => Promise<Reservation>;
  cancelReservation: (reservationId: string) => void;
  getAvailableRooms: (filter?: Partial<RoomFilter>) => Room[];
  getRoomStats: () => {
    total: number;
    occupied: number;
    available: number;
    byType: Record<string, { total: number; occupied: number; available: number }>;
  };
}

const HotelContext = createContext<HotelContextType | undefined>(undefined);

function hotelReducer(state: HotelState, action: HotelAction): HotelState {
  switch (action.type) {
    case 'ADD_RESERVATION':
      const reservation = action.payload;
      return {
        ...state,
        reservations: [...state.reservations, reservation],
        rooms: state.rooms.map(room =>
          room.id === reservation.room.id
            ? { ...room, occupied: true }
            : room
        )
      };

    case 'CANCEL_RESERVATION':
      const reservationToCancel = state.reservations.find(r => r.id === action.payload);
      if (!reservationToCancel) return state;

      return {
        ...state,
        reservations: state.reservations.filter(r => r.id !== action.payload),
        rooms: state.rooms.map(room =>
          room.id === reservationToCancel.room.id
            ? { ...room, occupied: false }
            : room
        )
      };

    case 'UPDATE_ROOM':
      return {
        ...state,
        rooms: state.rooms.map(room =>
          room.id === action.payload.roomId
            ? { ...room, ...action.payload.updates }
            : room
        )
      };

    case 'RESET_DATA':
      return {
        rooms: initialRooms,
        reservations: []
      };

    default:
      return state;
  }
}

export function HotelProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(hotelReducer, {
    rooms: initialRooms,
    reservations: []
  });

  const addReservation = async (
    guestData: Omit<Guest, 'id'>,
    roomFilter: RoomFilter
  ): Promise<Reservation> => {
    // Buscar habitación disponible que cumpla con los criterios
    const availableRoom = state.rooms.find(room =>
      !room.occupied &&
      room.type === roomFilter.type &&
      room.hasAC === roomFilter.hasAC
    );

    if (!availableRoom) {
      throw new Error(`No hay habitaciones ${roomFilter.type} ${roomFilter.hasAC ? 'con aire acondicionado' : 'con ventilador'} disponibles`);
    }

    // Crear guest con ID único
    const guest: Guest = {
      ...guestData,
      id: `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };

    // Crear reservación
    const reservation: Reservation = {
      id: `res_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      guest,
      room: availableRoom,
      status: 'active',
      createdAt: new Date()
    };

    dispatch({ type: 'ADD_RESERVATION', payload: reservation });
    return reservation;
  };

  const cancelReservation = (reservationId: string) => {
    dispatch({ type: 'CANCEL_RESERVATION', payload: reservationId });
  };

  const getAvailableRooms = (filter?: Partial<RoomFilter>): Room[] => {
    return state.rooms.filter(room => {
      if (room.occupied) return false;
      if (filter?.type && room.type !== filter.type) return false;
      if (filter?.hasAC !== undefined && room.hasAC !== filter.hasAC) return false;
      return true;
    });
  };

  const getRoomStats = () => {
    const total = state.rooms.length;
    const occupied = state.rooms.filter(room => room.occupied).length;
    const available = total - occupied;

    const byType = state.rooms.reduce((acc, room) => {
      if (!acc[room.type]) {
        acc[room.type] = { total: 0, occupied: 0, available: 0 };
      }
      acc[room.type].total++;
      if (room.occupied) {
        acc[room.type].occupied++;
      } else {
        acc[room.type].available++;
      }
      return acc;
    }, {} as Record<string, { total: number; occupied: number; available: number }>);

    return { total, occupied, available, byType };
  };

  return (
    <HotelContext.Provider
      value={{
        state,
        addReservation,
        cancelReservation,
        getAvailableRooms,
        getRoomStats
      }}
    >
      {children}
    </HotelContext.Provider>
  );
}

export function useHotel() {
  const context = useContext(HotelContext);
  if (context === undefined) {
    throw new Error('useHotel must be used within a HotelProvider');
  }
  return context;
}
