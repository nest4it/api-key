import { z } from "zod";

export const apiKeyConfig = z.object({
  secret: z.string(),
  apiKeyHeader: z.string(),
  apiKeyHeaderPrefix: z.string().default(""),
});

export type ApiKeyModuleConfig = z.infer<typeof apiKeyConfig>;
