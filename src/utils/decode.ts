import { verify } from "jsonwebtoken";
import { validateAuthenticatedClient, type AuthenticatedClient } from "../models/authenticated-client";
import { ApiKeyExpiredError } from "../errors";

export const toSeconds = (time: number) => Math.floor(time / 1000);

export const getCurrentTimeInSeconds = () => toSeconds(Date.now());

export const isJwtTokenExpired = (token: AuthenticatedClient) =>
  token.exp < getCurrentTimeInSeconds();

export const createVerifyJwtToken =
  (secret: string) => async (token: string) => {
    const payload = verify(token, secret, { ignoreExpiration: false });

    const parsedToken = validateAuthenticatedClient<AuthenticatedClient>(payload);

    if (isJwtTokenExpired(parsedToken)) {
      throw new ApiKeyExpiredError("Token has expired");
    }

    return parsedToken;
  };
