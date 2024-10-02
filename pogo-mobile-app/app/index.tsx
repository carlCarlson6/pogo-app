import { Image, Pressable, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  return (
    <View className="bg-black h-screen">
      <View className="flex items-center" >

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
    </View>
  );
}

const NewAccountButton = () => {
  const router = useRouter();
  return (
    <Pressable
      className="bg-white rounded-3xl px-32 py-3"
      onPress={() => router.push("/newAccount")}
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

