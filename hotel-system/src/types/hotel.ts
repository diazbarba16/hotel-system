export interface Room {
  id: string;
  number: number;
  type: "sencilla" | "doble" | "triple";
  hasAC: boolean;
  occupied: boolean;
  price: number;
}

export interface Guest {
  id: string;
  name: string;
  contact: string;
  checkInDate: Date;
  checkOutDate?: Date;
}

export interface Reservation {
  id: string;
  guest: Guest;
  room: Room;
  status: "active" | "completed" | "cancelled";
  createdAt: Date;
}

export type RoomType = "sencilla" | "doble" | "triple";
export type ClimateType = "ac" | "fan";

export interface RoomFilter {
  type: RoomType;
  hasAC: boolean;
}
