import { Room } from "@/types/hotel";

// Precios base por tipo de habitación
export const ROOM_PRICES = {
  sencilla: {
    withAC: 800,
    withFan: 600
  },
  doble: {
    withAC: 1200,
    withFan: 900
  },
  triple: {
    withAC: 1500,
    withFan: 1200
  }
};

// Números específicos de habitaciones según la configuración real
const ROOM_NUMBERS = {
  sencilla: {
    withFan: [3, 5, 6, 7, 8, 9, 10, 11, 12, 15, 107, 110, 210, 211, 302, 306, 307, 308, 309, 310, 311, 312, 313, 314, 316, 319, 320, 321, 323, 324, 330], // 31 habitaciones
    withAC: [13, 14, 106, 114, 203, 205] // 6 habitaciones
  },
  doble: {
    withFan: [108, 208, 303, 304, 305, 315, 317, 318, 322, 328, 329], // 11 habitaciones
    withAC: [101, 105, 109, 112, 113, 207, 212, 213, 214] // 9 habitaciones
  },
  triple: {
    withFan: [301], // 1 habitación
    withAC: [102, 103, 104, 111, 202, 204, 206, 325, 326, 327] // 10 habitaciones
  }
};

// Función para generar las habitaciones iniciales
export function generateInitialRooms(): Room[] {
  const rooms: Room[] = [];

  // Habitaciones sencillas con ventilador
  ROOM_NUMBERS.sencilla.withFan.forEach(roomNumber => {
    rooms.push({
      id: `S${roomNumber}`,
      number: roomNumber,
      type: "sencilla",
      hasAC: false,
      occupied: false,
      price: ROOM_PRICES.sencilla.withFan
    });
  });

  // Habitaciones sencillas con AC
  ROOM_NUMBERS.sencilla.withAC.forEach(roomNumber => {
    rooms.push({
      id: `S${roomNumber}`,
      number: roomNumber,
      type: "sencilla",
      hasAC: true,
      occupied: false,
      price: ROOM_PRICES.sencilla.withAC
    });
  });

  // Habitaciones dobles con ventilador
  ROOM_NUMBERS.doble.withFan.forEach(roomNumber => {
    rooms.push({
      id: `D${roomNumber}`,
      number: roomNumber,
      type: "doble",
      hasAC: false,
      occupied: false,
      price: ROOM_PRICES.doble.withFan
    });
  });

  // Habitaciones dobles con AC
  ROOM_NUMBERS.doble.withAC.forEach(roomNumber => {
    rooms.push({
      id: `D${roomNumber}`,
      number: roomNumber,
      type: "doble",
      hasAC: true,
      occupied: false,
      price: ROOM_PRICES.doble.withAC
    });
  });

  // Habitaciones triples con ventilador
  ROOM_NUMBERS.triple.withFan.forEach(roomNumber => {
    rooms.push({
      id: `T${roomNumber}`,
      number: roomNumber,
      type: "triple",
      hasAC: false,
      occupied: false,
      price: ROOM_PRICES.triple.withFan
    });
  });

  // Habitaciones triples con AC
  ROOM_NUMBERS.triple.withAC.forEach(roomNumber => {
    rooms.push({
      id: `T${roomNumber}`,
      number: roomNumber,
      type: "triple",
      hasAC: true,
      occupied: false,
      price: ROOM_PRICES.triple.withAC
    });
  });

  return rooms;
}

export const initialRooms = generateInitialRooms();
