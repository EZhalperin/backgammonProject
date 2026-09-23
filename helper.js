import Chance from "chance";

export function isInvalidName(name) {
  return name.length === 0 || name.length > 20;
}

export function generateCode() {
  const chance = Chance();
  return chance.string({ length: 6, pool: `ABCDEFGHJKLMNPQRSTUVWXYZ23456789` });
}
