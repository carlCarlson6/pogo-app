import { app } from "@azure/functions";
import { tprcAzFuncHandler } from "../infrastructure/trpc/router";

app.http("trpc", {
  methods: ["GET", "POST"],
  route: "trpc/{params}",
  handler: tprcAzFuncHandler,
});