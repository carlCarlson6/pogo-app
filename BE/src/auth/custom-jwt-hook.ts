import { HttpFunctionOptions } from "@azure/functions"

export const customJwtHook = {
  methods: ["POST"],
  route: "auth/custom-jwt-hook",
  handler: (request, ctx) => {
    const payload = request.json();


    throw new Error("not-implemented");
  }
} satisfies HttpFunctionOptions;

import { z } from "zod"

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const schema = z.object({
     phone: z.string().regex(phoneRegex, 'Invalid Number!'),
})

const customJwtHookRequestPayloadSchema = z.object({
  user_id: z.string().uuid(),
  claims: z.object({
    aud: z.string(),
    exp: z.number(),
    iat: z.number(),
    sub: z.string().uuid(),
    email: z.string().email(),
    phone: z.string().regex(phoneRegex, "invalid-phone-humber"),
    app_metadata: z.any(),
    user_metadata: z.any(),
    role: z.union([z.literal("anon"), z.literal("authenticated")]),
    aal: z.union([z.literal("aal1"), z.literal("aal2"), z.literal("aal3")]),
    amr: z.array(z.object({
      method: z.union([z.literal(""), z.literal("")])
    }))
  }) 
});