(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/data/rooms.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "ROOM_PRICES": (()=>ROOM_PRICES),
    "generateInitialRooms": (()=>generateInitialRooms),
    "initialRooms": (()=>initialRooms)
});
const ROOM_PRICES = {
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
        withFan: [
            3,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            15,
            107,
            110,
            210,
            211,
            302,
            306,
            307,
            308,
            309,
            310,
            311,
            312,
            313,
            314,
            316,
            319,
            320,
            321,
            323,
            324,
            330
        ],
        withAC: [
            13,
            14,
            106,
            114,
            203,
            205
        ] // 6 habitaciones
    },
    doble: {
        withFan: [
            108,
            208,
            303,
            304,
            305,
            315,
            317,
            318,
            322,
            328,
            329
        ],
        withAC: [
            101,
            105,
            109,
            112,
            113,
            207,
            212,
            213,
            214
        ] // 9 habitaciones
    },
    triple: {
        withFan: [
            301
        ],
        withAC: [
            102,
            103,
            104,
            111,
            202,
            204,
            206,
            325,
            326,
            327
        ] // 10 habitaciones
    }
};
function generateInitialRooms() {
    const rooms = [];
    // Habitaciones sencillas con ventilador
    ROOM_NUMBERS.sencilla.withFan.forEach((roomNumber)=>{
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
    ROOM_NUMBERS.sencilla.withAC.forEach((roomNumber)=>{
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
    ROOM_NUMBERS.doble.withFan.forEach((roomNumber)=>{
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
    ROOM_NUMBERS.doble.withAC.forEach((roomNumber)=>{
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
    ROOM_NUMBERS.triple.withFan.forEach((roomNumber)=>{
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
    ROOM_NUMBERS.triple.withAC.forEach((roomNumber)=>{
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
const initialRooms = generateInitialRooms();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/context/HotelContext.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "HotelProvider": (()=>HotelProvider),
    "useHotel": (()=>useHotel)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$rooms$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/rooms.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
const HotelContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function hotelReducer(state, action) {
    switch(action.type){
        case 'ADD_RESERVATION':
            const reservation = action.payload;
            return {
                ...state,
                reservations: [
                    ...state.reservations,
                    reservation
                ],
                rooms: state.rooms.map((room)=>room.id === reservation.room.id ? {
                        ...room,
                        occupied: true
                    } : room)
            };
        case 'CANCEL_RESERVATION':
            const reservationToCancel = state.reservations.find((r)=>r.id === action.payload);
            if (!reservationToCancel) return state;
            return {
                ...state,
                reservations: state.reservations.filter((r)=>r.id !== action.payload),
                rooms: state.rooms.map((room)=>room.id === reservationToCancel.room.id ? {
                        ...room,
                        occupied: false
                    } : room)
            };
        case 'UPDATE_ROOM':
            return {
                ...state,
                rooms: state.rooms.map((room)=>room.id === action.payload.roomId ? {
                        ...room,
                        ...action.payload.updates
                    } : room)
            };
        case 'RESET_DATA':
            return {
                rooms: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$rooms$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initialRooms"],
                reservations: []
            };
        default:
            return state;
    }
}
function HotelProvider({ children }) {
    _s();
    const [state, dispatch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducer"])(hotelReducer, {
        rooms: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$rooms$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initialRooms"],
        reservations: []
    });
    const addReservation = async (guestData, roomFilter)=>{
        // Buscar habitación disponible que cumpla con los criterios
        const availableRoom = state.rooms.find((room)=>!room.occupied && room.type === roomFilter.type && room.hasAC === roomFilter.hasAC);
        if (!availableRoom) {
            throw new Error(`No hay habitaciones ${roomFilter.type} ${roomFilter.hasAC ? 'con aire acondicionado' : 'con ventilador'} disponibles`);
        }
        // Crear guest con ID único
        const guest = {
            ...guestData,
            id: `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        };
        // Crear reservación
        const reservation = {
            id: `res_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            guest,
            room: availableRoom,
            status: 'active',
            createdAt: new Date()
        };
        dispatch({
            type: 'ADD_RESERVATION',
            payload: reservation
        });
        return reservation;
    };
    const cancelReservation = (reservationId)=>{
        dispatch({
            type: 'CANCEL_RESERVATION',
            payload: reservationId
        });
    };
    const getAvailableRooms = (filter)=>{
        return state.rooms.filter((room)=>{
            if (room.occupied) return false;
            if (filter?.type && room.type !== filter.type) return false;
            if (filter?.hasAC !== undefined && room.hasAC !== filter.hasAC) return false;
            return true;
        });
    };
    const getRoomStats = ()=>{
        const total = state.rooms.length;
        const occupied = state.rooms.filter((room)=>room.occupied).length;
        const available = total - occupied;
        const byType = state.rooms.reduce((acc, room)=>{
            if (!acc[room.type]) {
                acc[room.type] = {
                    total: 0,
                    occupied: 0,
                    available: 0
                };
            }
            acc[room.type].total++;
            if (room.occupied) {
                acc[room.type].occupied++;
            } else {
                acc[room.type].available++;
            }
            return acc;
        }, {});
        return {
            total,
            occupied,
            available,
            byType
        };
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HotelContext.Provider, {
        value: {
            state,
            addReservation,
            cancelReservation,
            getAvailableRooms,
            getRoomStats
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/context/HotelContext.tsx",
        lineNumber: 157,
        columnNumber: 5
    }, this);
}
_s(HotelProvider, "vDUvPsv3KLAEZ3gc99PozgHopCk=");
_c = HotelProvider;
function useHotel() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(HotelContext);
    if (context === undefined) {
        throw new Error('useHotel must be used within a HotelProvider');
    }
    return context;
}
_s1(useHotel, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "HotelProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_e9cfd5f5._.js.map