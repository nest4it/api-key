import { UnauthorizedException } from "@nestjs/common";
import { verify } from "jsonwebtoken";
import { authenticatedClient, type AuthenticatedClient } from "../models/authenticated-client";

export const toSeconds = (time: number) => Math.floor(time / 1000);

export const getCurrentTimeInSeconds = () => toSeconds(Date.now());

export const isJwtTokenExpired = (token: AuthenticatedClient) =>
  token.exp < getCurrentTimeInSeconds();

export const createVerifyJwtToken =
  (secret: string) => async (token: string) => {
    const payload = verify(token, secret, { ignoreExpiration: false });

    const parsedToken = await authenticatedClient.parseAsync(payload);

    if (isJwtTokenExpired(parsedToken)) {
      throw new UnauthorizedException("Token has expired");
    }

    return parsedToken;
  };
