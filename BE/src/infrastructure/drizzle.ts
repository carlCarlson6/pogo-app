import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'
import { env } from '../utils/env';

export const connectToDB = () => drizzle(postgres(env.dbConnStr, {prepare: false}));

export type DB = ReturnType<typeof connectToDB>