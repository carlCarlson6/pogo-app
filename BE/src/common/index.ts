import { z } from "zod";
import { InvocationContext } from "@azure/functions";

export const envSchema = z.object({
  dbConnStr: z.string().min(1),
  jwtSecret: z.string().min(1),
  storageConnStr: z.string().min(1),
});

export type Env = z.infer<typeof envSchema>;

interface Logger {
  info(...args: any[]): void;
  warning(...args: any[]): void;
  error(...args: any[]): void;
}

export class AzFuncLogger implements Logger {
  constructor(
    private readonly invocationCtx: InvocationContext
  ) {}

  info(...args: any[]): void {
    this.invocationCtx.info(...args);
  }
  warning(...args: any[]): void {
    this.invocationCtx.warn(...args);
  }
  error(...args: any[]): void {
    this.invocationCtx.error(...args);
  }
}