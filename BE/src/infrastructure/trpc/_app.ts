import { HttpFunctionOptions } from "@azure/functions";
import { createContext, publicProcedure, router } from ".";
import { uploadProfilePic } from "../../users/upload-profile-pic";
import { createAzureFunctionsHandler } from "trpc-azure-functions-adapter";
import { createUserProfile } from "../../users/user-onboarding/createUserProfile";
import { updateGenresPreferences } from "../../users/update-genres-preferences";

const appRouter = router({
  error: publicProcedure.mutation(_ => { throw new Error("some error happened") }),
  users: router({
    createUserProfile,
    uploadProfilePic,
    updateGenresPreferences
  }),
});

export const tprcAzFuncHandler = {
  methods: ["GET", "POST"],
  route: "trpc/{params}",
  handler: createAzureFunctionsHandler({ 
    router: appRouter, 
    createContext,
    onError(opts) {
      opts.ctx?.invocation.error("produced error on", opts.type, opts.path);
      opts.ctx?.invocation.error("[CODE] -", opts.error.code)
      opts.ctx?.invocation.error("[MESSAGE] -", opts.error.message);
      opts.ctx?.invocation.error("[STACK] -", opts.error.stack);
      opts.ctx?.invocation.error("[CAUSE] -", opts.error.cause);
    }
  }),
} satisfies HttpFunctionOptions;

export type AppRouter = typeof appRouter;