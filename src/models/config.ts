import { z } from "zod";

export const apiKeyConfig = z.object({
  secret: z.string(),
  apiKeyHeader: z.string(),
  apiKeyHeaderPrefix: z.string().default(""),
});

export type ApiKeyModuleConfig = {
  secret: string;
  apiKeyHeader: string;
  apiKeyHeaderPrefix?: string;
};