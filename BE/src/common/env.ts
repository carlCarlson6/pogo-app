import { z } from "zod";

export const env = z.object({
  dbConnStr: z.string().min(1),
  jwtSecret: z.string().min(1),
  storageConnStr: z.string().min(1),
}).parse({
  dbConnStr: process.env.SUPABASE_DB_CONN_STR,
  jwtSecret: process.env.SUPABASE_JWT_SECRET,
  storageConnStr: process.env.AZ_STORAGE_ACCOUNT_CONN_STR,
});