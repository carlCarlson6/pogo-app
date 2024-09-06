import { app } from "@azure/functions";
import { tprcAzFuncHandler } from "../infrastructure/trpc";

app.http("trpc", {
  methods: ["GET", "POST"],
  route: "trpc/{params}",
  handler: tprcAzFuncHandler,
});