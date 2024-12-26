import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import { AzureFunctionsContextOption, createAzureFunctionsHandler } from "trpc-azure-functions-adapter";
import { connectToDB } from "../drizzle";
import { validateJwt } from "../../auth/validate-jwt";
import { blobServiceClient } from "../azure-storage-account";
import { AzFuncLogger } from "../../common";

export const createContext = (opts: AzureFunctionsContextOption) => ({ 
  request: opts.request,
  invocation: opts.context,
  db: connectToDB(),
  blobServiceClient,
  logger: new AzFuncLogger(opts.context),
});

const t = initTRPC
  .context<inferAsyncReturnType<typeof createContext>>()
  .create();

export const publicProcedure = t.procedure.use(async (opts) => {
  opts.ctx.logger.info("executing procedure", opts.type, opts.path);
  const result = await opts.next();
  opts.ctx.logger.info("completed procedure", opts.type, opts.path, "with result", result.ok);  
  return result;
});

export const protectedProcedure = publicProcedure.use(({ next, ctx }) => next({
  ctx: { user: validateJwt({request: ctx.request, context: ctx.invocation}) }
}));

export const router = t.router;