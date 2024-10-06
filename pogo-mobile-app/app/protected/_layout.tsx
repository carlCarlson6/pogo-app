import { useSession } from "@/lib/auth/session";
import { Redirect, Slot } from "expo-router";

export default function RootLayout() {
  const session = useSession();

  if (session === null) {
    return <Redirect href={"/"}/>
  }

  return (
    <Slot/>
  );
}