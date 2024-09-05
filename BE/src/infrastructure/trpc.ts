import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import { AzureFunctionsContextOption, createAzureFunctionsHandler } from "trpc-azure-functions-adapter";
import { validateJwt } from "./auth";
import { connectToDB } from "./drizzle";

const createContext = (opts: AzureFunctionsContextOption) => ({ ...opts, db: connectToDB() });

const t = initTRPC
  .context<inferAsyncReturnType<typeof createContext>>()
  .meta<{ procedureName: string; }>()
  .create();

const loggerProcedure = t.procedure.use(({next, ctx: {context}, meta}) => {
  context.info("executing procedure", meta?.procedureName ?? "UNKNOWN");
  return next();
});

const publicProcedure = loggerProcedure;

const protectedProcedure = publicProcedure.use(({ next, ctx }) => {
  return next({
    ctx: { user: validateJwt(ctx) }
  });
});

export const tprcAzFuncHandler = createAzureFunctionsHandler({ 
  router: t.router({
    me: protectedProcedure.query(({ctx: {user}}) => user)
  }), 
  createContext,
});