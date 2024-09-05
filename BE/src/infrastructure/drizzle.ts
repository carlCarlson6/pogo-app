import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'

export const connectToDB = () => drizzle(postgres(process.env.SUPABASE_DB_CONN_STR!, {prepare: false}));
export type DB = ReturnType<typeof connectToDB>