import { randomUUID } from "node:crypto";
import { sign } from "jsonwebtoken";

const oneMonth = 60 * 60 * 24 * 30; 

export const createJwtData = (data: Record<string, unknown>) => ({
  ...data,
  jti: randomUUID(),
});

export const createSignJwtToken = (secret: string) => (data: Record<string, unknown>, expiresInSeconds = oneMonth) => {
  return sign(createJwtData(data), secret, {
    expiresIn: expiresInSeconds,
  });
};
