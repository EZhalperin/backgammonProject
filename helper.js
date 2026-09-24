import Chance from "chance";
import { rooms } from "./server.js";

export function isInvalidName(name) {
  return name.length === 0 || name.length > 20;
}

export function generateCode() {
  const chance = Chance();
  return chance.string({ length: 6, pool: `ABCDEFGHJKLMNPQRSTUVWXYZ23456789` });
}

export function findRoom(roomCode) {
  return rooms.find((room) => room.roomId === roomCode);
}
