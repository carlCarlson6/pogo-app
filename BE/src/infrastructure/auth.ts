import { HttpRequest, InvocationContext } from "@azure/functions";
import { TRPCError } from "@trpc/server";
import { type JwtPayload, verify as verifyToken } from 'jsonwebtoken';
import { AzureFunctionsContextOption } from "trpc-azure-functions-adapter";

export const validateJwt = ({request, context}: AzureFunctionsContextOption) => {
  const maybeAuthHeader = request.headers.get("Authorization");
  if (!maybeAuthHeader) {
    context.error("unauthorized", "no header");
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  try {
    const token = maybeAuthHeader.replace("Bearer ", "");
    return verifyToken(token, process.env.SUPABASE_JWT_SECRET!) as JwtPayload;
  } catch (e) {
    context.error("unauthorized", "invalid token", e);
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
};