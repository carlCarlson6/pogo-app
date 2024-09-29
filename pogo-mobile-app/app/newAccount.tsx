import { View, Text, Image, TextInput } from "react-native";

export default function NewAccount() {
  return (
    <View className="flex-1 flex-col bg-black gap-5 pt-20">
      <View className="pl-5">
        <Text className="text-white">go back</Text>  
      </View>  
  
      <View className="border-4 w-52 h-52 -inset-x-10 border-white rounded-full flex items-center justify-center">
        <Image source={require("@/assets/images/photo-camera.png")}/>
      </View>
  
      <View className="gap-4 pr-4">
        <View className="bg-zinc-800 py-2">
          <TextInput
            className="text-lg pl-4" 
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