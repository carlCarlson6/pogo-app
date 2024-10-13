import { useFetchSession } from "@/lib/auth";
import { env } from "@/lib/utils/env";
import { tprc } from "@/lib/utils/tprc";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/react-query";
import { Stack } from "expo-router";
import { useState } from "react";

const screenOptions = { headerShown: false, gestureEnabled: false };

export default function RootLayout() {
  const session = useFetchSession();
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() => tprc.createClient({
    links: [
      httpBatchLink({
        url: env.BackendUrl,
        async headers() {
          console.log("creating trpc client");
          console.log("session", session);
          return {
            authorization: `Bearer ${session?.access_token}`
          }
        },
      })
    ],
  }));

  return (
    <tprc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Stack>
          <Stack.Screen name="index" options={screenOptions} />
          <Stack.Screen name="newAccount" options={screenOptions} />
          <Stack.Screen name="login" options={screenOptions} />
          <Stack.Screen name="protected" options={screenOptions} />
        </Stack>
      </QueryClientProvider>
    </tprc.Provider>
  );
}