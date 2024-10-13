import { HttpFunctionOptions } from "@azure/functions"

export const customJwtHook = {
  methods: ["POST"],
  route: "auth/custom-jwt-hook",
  handler: () => {
    throw new Error("not-implemented")
  }
} satisfies HttpFunctionOptions;