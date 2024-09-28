import { TRPCError } from "@trpc/server";
import { type JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import { AzureFunctionsContextOption } from "trpc-azure-functions-adapter";
import { env } from "../utils/env";

export const validateJwt = ({request, context}: AzureFunctionsContextOption) => {
  const maybeAuthHeader = request.headers.get("Authorization");
  if (!maybeAuthHeader) {
    context.error("unauthorized", "no header");
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  try {
    const token = maybeAuthHeader.replace("Bearer ", "");
    return jwt.verify(token, env.jwtSecret, { complete: true }) as JwtPayload;
  } catch (e) {
    context.error("unauthorized", "invalid token", e);
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
};