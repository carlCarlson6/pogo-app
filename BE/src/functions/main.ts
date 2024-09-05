import { app } from "@azure/functions";
import { tprcAzFuncHandler } from "../infrastructure/trpc";

app.http("trpc", {
  route: "trpc/{params}",
  handler: tprcAzFuncHandler,
});