import { useRouter } from "expo-router";
import { View, Text, Image, TextInput, Pressable, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";


export default function NewAccount() {
  const { goBack } = useNewAccount();

  return (
    <View className="flex-1 flex-col bg-black gap-5 pt-20">
      
      <View className="pl-5">
        <Pressable
          className="w-16 -inset-x-5"
          onPress={goBack}
        >
          <View className="pl-5">
            <Image source={require("@/assets/images/Chevron.png")} />
          </View>
        </Pressable>  
      </View>  
  
      <View className="border-4 w-52 h-52 -inset-x-10 border-white rounded-full flex items-center justify-center">
        <Image source={require("@/assets/images/photo-camera.png")}/>
      </View>
  
      <View className="gap-4 pr-4">
        <View className="bg-zinc-800 py-2">
          <TextInput
            className="text-lg pl-4 text-white" 
            placeholder="Nombre"
          />
        </View>

        <View className="bg-zinc-800 py-2">
          <TextInput 
            className="text-lg pl-4"
            placeholder="Apellido"
          />
        </View>

        <View className="bg-zinc-800 py-2">
          <TextInput 
            className="text-lg pl-4"
            placeholder="E-mail"
          />
        </View>

        <View className="bg-zinc-800 py-2">
          <TextInput 
            className="text-lg pl-4"
            placeholder="Password"
            secureTextEntry={true}
          />
        </View>
      </View>
  
    </View>
  );
}

const useNewAccount = () => {
  const router = useRouter();

  return {
    goBack: router.back
  };
}