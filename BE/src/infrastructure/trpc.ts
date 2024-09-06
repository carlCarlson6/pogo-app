import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import { AzureFunctionsContextOption, createAzureFunctionsHandler } from "trpc-azure-functions-adapter";
import { validateJwt } from "./auth";
import { connectToDB } from "./drizzle";
import { z } from "zod";

const createContext = (opts: AzureFunctionsContextOption) => ({ ...opts, db: connectToDB() });

const t = initTRPC
  .context<inferAsyncReturnType<typeof createContext>>()
  .meta<{ procedureName: string; }>()
  .create();

const loggerProcedure = t.procedure.use(async ({next, ctx: {context}, meta}) => {
  context.info("executing procedure", meta?.procedureName ?? "UNKNOWN");
  const result = await next();
  context.info("completed procedure", meta?.procedureName ?? "UNKNOWN", "with result:", `${result.ok ? "OK" : "KO"}`);
  return result;
});

const publicProcedure = loggerProcedure;

const protectedProcedure = publicProcedure.use(({ next, ctx }) => next({
  ctx: { user: validateJwt(ctx) }
}));

export const tprcAzFuncHandler = createAzureFunctionsHandler({ 
  router: t.router({
    me: protectedProcedure
      .meta({ procedureName: "me" })
      .query(({ctx: {user}}) => user),
    helloWorld: publicProcedure
      .meta({ procedureName: "hello-world" })
      .input(z.object({name: z.string().nullable()}))
      .query(({input: {name}}) => name ? `hello world ${name}` : "hello world"),
  }), 
  createContext,
});