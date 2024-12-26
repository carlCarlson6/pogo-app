import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'
import { env } from '../common/env';
import { usersTable } from '../users/user.drizzle.schema';

export const connectToDB = () => drizzle(postgres(env.dbConnStr, {prepare: false}), {
  schema: {
    users: usersTable
  },
});

export type DB = ReturnType<typeof connectToDB>