import z from "zod";

export const env = z.object({
  Supabase: z.object({
    Url: z.string().url(),
    AnonKey: z.string().min(1),
  }),
  BackendUrl: z.string().url(),
}).parse({
  Supabase: {
    Url: process.env.EXPO_PUBLIC_SUPABASE_URL!,
    AnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
  },
  BackendUrl: process.env.EXPO_PUBLIC_BE_URL,
});