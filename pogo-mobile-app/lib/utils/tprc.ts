import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from "../../../BE/src/infrastructure/trpc/_app";

export const tprc = createTRPCReact<AppRouter>();