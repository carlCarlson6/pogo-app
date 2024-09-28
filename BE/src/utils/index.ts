import { InvocationContext } from "@azure/functions"

type Logger = {
  info:     (...args: any[]) => void,
  warning:  (...args: any[]) => void,
  error:    (...args: any[]) => void,
}

export const azFuncLogger = (context: InvocationContext) => ({
  info: context.info,
  warning: context.warn,
  error: context.error
}) satisfies Logger;