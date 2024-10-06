import { PogoLogoImage } from "@/lib/components/PogoLogoImg";
import { Image, Pressable, Text, View } from "react-native";
import { Router, useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();
  return (
    <View className="bg-black h-screen">
      <View className="flex items-center" >

        <View className="pt-64">
          <PogoLogoImage />
        </View>
      
        <View className="pt-32 gap-2">
          <View>
            <NewAccountButton router={router} />
          </View>
        
          <View>
            <LoginButton router={router} />    
          </View>
        </View>

        <View className="pt-20">
          <Image source={require("@/assets/images/social-login-icons.png")}/>
        </View>
      </View>
    </View>
  );
}

type PropsWithRouter = {
  router: Router
}

const NewAccountButton = ({router}: PropsWithRouter) => {
  return (
    <Pressable
      className="bg-white rounded-3xl px-32 py-3"
      onPress={() => router.replace("/newAccount")}
    >
      <Text className="text-xl">Crear cuenta</Text>
    </Pressable>
  );
}

const LoginButton = ({router}: PropsWithRouter) => {
  return (
    <Pressable
      className="bg-white rounded-3xl px-32 py-3"
      onPress={() => router.replace("/login")}
    >
      <Text className="text-xl">Iniciar sesión</Text>  
    </Pressable>
  );
}

