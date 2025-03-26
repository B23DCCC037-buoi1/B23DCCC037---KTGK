import { Room } from "../../models/Room";
const STORAGE_KEY = "rooms";

export const getRooms = (): Room[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveRooms = (rooms: Room[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(rooms));
};

export const addRoom = (room: Room) => {
  const rooms = getRooms();
  rooms.push(room);
  saveRooms(rooms);
};

export const updateRoom = (updatedRoom: Room) => {
  let rooms = getRooms();
  rooms = rooms.map((room) => (room.id === updatedRoom.id ? updatedRoom : room));
  saveRooms(rooms);
};

export const deleteRoom = (roomId: string) => {
  let rooms = getRooms();
  rooms = rooms.filter((room) => room.id !== roomId);
  saveRooms(rooms);
};
