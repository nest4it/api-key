import { z } from "zod";

export const authenticatedClient = z.object({
  exp: z.number(),
  jti: z.string(),
  iat: z.number(),
}).passthrough();

export type AuthenticatedClient = z.infer<typeof authenticatedClient>;
