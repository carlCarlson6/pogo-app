import { app } from "@azure/functions";
import { createAzureFunctionsHandler } from "trpc-azure-functions-adapter";
import { appRouter } from "../infrastructure/trpc/_app";
import { createContext } from "../infrastructure/trpc";
import { customJwtHook } from "../auth/custom-jwt-hook";

app.http("trpc", {
  methods: ["GET", "POST"],
  route: "trpc/{params}",
  handler: createAzureFunctionsHandler({ 
    router: appRouter, 
    createContext,
  }),
});

app.http("custom-access-token-claims-hook", customJwtHook);