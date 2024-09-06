import { type Config } from "drizzle-kit";
import { env } from "./src/utils/env";

export default {
  out: "./drizzle-migrations",
  schema: "./src/**/*.drizzle.schema.ts",
  dialect: "postgresql",
  dbCredentials: { url: env.dbConnStr }
} satisfies Config;