import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { Session } from '@supabase/supabase-js'

export default function Index() {
  return (
    <View className="flex-1 items-center bg-black" >
      
      <View className="pt-64">
        <Image source={require("@/assets/pogo-logo.png")}/>
      </View>
      
      
      <View className="pt-32 gap-2">
        <Pressable
          className="bg-white rounded-3xl px-32 py-3"
        >
          <Text className="text-xl">Crear cuenta</Text>
        </Pressable>
        
        <Pressable
          className="bg-white rounded-3xl px-32 py-3"
        >
          <Text className="text-xl">Iniciar sesión</Text>  
        </Pressable>

      </View>

      <View className="pt-20">
        <Image source={require("@/assets/social-login-icons.png")}/>
      </View>

    </View>
  );
}

const useSession = () => {
  const [session, setSession] = useState<Session|null>(null);
  
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, []);
}