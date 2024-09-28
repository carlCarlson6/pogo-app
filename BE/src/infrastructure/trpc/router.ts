import { createAzureFunctionsHandler } from "trpc-azure-functions-adapter";
import { createContext, protectedProcedure, publicProcedure, trpc } from ".";
import { z } from "zod";

const router = trpc.router({
  me: protectedProcedure
    .meta({ procedureName: "me" })
    .query(({ctx: {user}}) => user),
  helloWorld: publicProcedure
    .meta({ procedureName: "hello-world" })
    .input(z.object({name: z.string().nullable()}))
    .query(({input: {name}}) => name ? `hello world ${name}` : "hello world"),
});

export const tprcAzFuncHandler = createAzureFunctionsHandler({ 
  router, 
  createContext,
});