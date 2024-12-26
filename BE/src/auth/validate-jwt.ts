import { TRPCError } from "@trpc/server";
import { type JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import { AzureFunctionsContextOption } from "trpc-azure-functions-adapter";
import { env } from "../common/env";

export const validateJwt = ({request, context: invocation}: AzureFunctionsContextOption) => {
  const maybeAuthHeader = request.headers.get("authorization");

  if (!maybeAuthHeader) {
    invocation.error("unauthorized", "no header");
    throw new UnauthorizedError();  
  }

  try {
    const token = maybeAuthHeader.replace("Bearer ", "");
    const jwtPayload = jwt.verify(token, env.jwtSecret) as JwtPayload;

    const userId = jwtPayload.sub;
    if (!userId || userId === "") {
      throw new UnauthorizedError();  
    }
    
    return {
      id: userId,
    }

  } catch (e) {
    invocation.error("unauthorized", "invalid token", e);
    throw new UnauthorizedError();  
  }
};

class UnauthorizedError extends TRPCError {
  constructor() {
    super({
      code: "UNAUTHORIZED"
    });  
  }
}