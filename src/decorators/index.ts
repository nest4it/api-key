import type { AuthenticatedClient } from "../models/authenticated-client";
import {
  createParamDecorator,
  type ExecutionContext,
} from "@nestjs/common";

export const ApiKeyClient = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): AuthenticatedClient => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as AuthenticatedClient;
  },
);
