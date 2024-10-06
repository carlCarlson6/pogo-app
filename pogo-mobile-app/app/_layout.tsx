import { useFetchSession } from "@/lib/auth/session";
import { Stack } from "expo-router";

const screenOptions = { headerShown: false, gestureEnabled: false };

export default function RootLayout() {
  useFetchSession();
  
  return (
    <Stack>
      <Stack.Screen name="index" options={screenOptions} />
      <Stack.Screen name="newAccount" options={screenOptions} />
      <Stack.Screen name="login" options={screenOptions} />
      <Stack.Screen name="protected" options={screenOptions} />
    </Stack>
  );
}