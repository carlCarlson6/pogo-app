import { useFetchSession } from "@/lib/auth";
import { Stack } from "expo-router";

export default function RootLayout() {
  useFetchSession();
  

  return (
    <Stack>
      <Stack.Screen name="index" options={{headerShown: false, gestureEnabled: false}} />
      <Stack.Screen name="newAccount" options={{headerShown: false, gestureEnabled: false}} />
      <Stack.Screen name="login" options={{headerShown: false, gestureEnabled: false}} />
      <Stack.Screen name="protected" options={{headerShown: false, gestureEnabled: false}} />
    </Stack>
  );
}