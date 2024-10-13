import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import { AzureFunctionsContextOption, createAzureFunctionsHandler } from "trpc-azure-functions-adapter";
import { connectToDB } from "../drizzle";
import { validateJwt } from "../../auth/validate-jwt";
import { blobServiceClient } from "../azure-storage-account";

export const createContext = (opts: AzureFunctionsContextOption) => ({ 
  ...opts, 
  db: connectToDB(),
  blobServiceClient,
});

const t = initTRPC
  .context<inferAsyncReturnType<typeof createContext>>()
  .create();

export const publicProcedure = t.procedure;

export const protectedProcedure = publicProcedure.use(({ next, ctx }) => next({
  ctx: { user: validateJwt(ctx) }
}));

export const router = t.router;