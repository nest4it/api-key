import { randomUUID } from "node:crypto";
import { sign } from "jsonwebtoken";
import { DEFAULTS } from "../constants/defaults";

export const createJwtData = <T extends Record<string, unknown>>(data: T) => ({
  ...data,
  jti: randomUUID(),
});

export const createSignJwtToken = (secret: string) => <T extends Record<string, unknown>>(data: T, expiresIn: string | number) => {
  return sign(createJwtData(data), secret, {
    expiresIn: expiresIn ?? DEFAULTS.expiresIn,
  });
};
