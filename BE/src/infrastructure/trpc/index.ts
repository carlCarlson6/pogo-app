import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import { AzureFunctionsContextOption } from "trpc-azure-functions-adapter";
import { connectToDB } from "../drizzle";
import { azFuncLogger } from "../../utils/logger";
import { validateJwt } from "../auth";

export const createContext = (opts: AzureFunctionsContextOption) => ({ 
  ...opts, 
  db: connectToDB(),
  logger: azFuncLogger(opts.context)
});

export const trpc = initTRPC
  .context<inferAsyncReturnType<typeof createContext>>()
  .meta<{ procedureName: string; }>()
  .create();

export const publicProcedure = trpc.procedure.use(async ({next, ctx: { logger }, meta}) => {
  logger.info("executing procedure", meta?.procedureName ?? "UNKNOWN");
  const result = await next();
  logger.info("completed procedure", meta?.procedureName ?? "UNKNOWN", "with result:", `${result.ok ? "OK" : "KO"}`);
  return result;
});

export const protectedProcedure = publicProcedure.use(({ next, ctx }) => next({
  ctx: { user: validateJwt(ctx) }
}));