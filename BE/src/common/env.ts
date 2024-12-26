import { envSchema } from ".";

export const env = envSchema.parse({
  dbConnStr: process.env.SUPABASE_DB_CONN_STR,
  jwtSecret: process.env.SUPABASE_JWT_SECRET,
  storageConnStr: process.env.AZ_STORAGE_ACCOUNT_CONN_STR,
});