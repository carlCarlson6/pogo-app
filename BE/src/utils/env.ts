import { z } from "zod";

export const env = z.object({
  dbConnStr: z.string().min(1),
  jwtSecret: z.string().min(1),
}).parse({
  dbConnStr: process.env.SUPABASE_DB_CONN_STR,
  jwtSecret: process.env.SUPABASE_JWT_SECRET,
});