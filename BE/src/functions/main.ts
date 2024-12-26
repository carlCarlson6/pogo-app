import { app } from "@azure/functions";
import { tprcAzFuncHandler } from "../infrastructure/trpc/_app";
import { customJwtHook } from "../auth/custom-jwt-hook";

app.http("hello-world", {
  route: "",
  methods: ["GET"],
  handler: () => ({
    status: 200,
    text: () => Promise.resolve("hello-world")
  }),
});

app.http("trpc", tprcAzFuncHandler);
app.http("custom-access-token-claims-hook", customJwtHook);