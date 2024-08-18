import { createVerifyJwtToken } from "./decode";
import { createSignJwtToken } from "./encode";

export type JwtProvider = ReturnType<typeof createProviders>;

export const createProviders = (secret: string) => ({
  verifyJwtToken: createVerifyJwtToken(secret),
  createJwtToken: createSignJwtToken(secret),
}) 