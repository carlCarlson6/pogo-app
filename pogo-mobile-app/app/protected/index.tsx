import { supabase, useSession } from "@/lib/auth";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const session = useSession();
  return (
    <View className="bg-black h-screen flex items-center justify-center">
      <Text className="text-white">
        hello from protected :)
        {session?.user.id}
      </Text>
      <Pressable
        className="bg-white rounded-3xl px-32 py-3"
        onPress={() => supabase.auth.signOut()}
      >
        <Text className="text-xl">salir</Text>
      </Pressable>
    </View>
  );
}