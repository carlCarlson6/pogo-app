import { Image, Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  return (
    <View className="flex-1 items-center bg-black" >
      
      <View className="pt-64">
        <Image source={require("@/assets/images/pogo-logo.png")}/>
      </View>
      
      <View className="pt-32 gap-2">
        <View>
          <NewAccountButton />
        </View>
        
        <View>
          <LoginButton />    
        </View>
      </View>

      <View className="pt-20">
        <Image source={require("@/assets/images/social-login-icons.png")}/>
      </View>

    </View>
  );
}

const NewAccountButton = () => {
  const router = useRouter();
  return (
    <Pressable
      className="bg-white rounded-3xl px-32 py-3"
      onPress={() => router.replace("/newAccount")}
    >
      <Text className="text-xl">Crear cuenta</Text>
    </Pressable>
  );
}

const LoginButton = () => {
  return (
    <Pressable
      className="bg-white rounded-3xl px-32 py-3"
    >
      <Text className="text-xl">Iniciar sesión</Text>  
    </Pressable>
  );
}

