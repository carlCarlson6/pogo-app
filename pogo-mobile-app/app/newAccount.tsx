import { useRouter } from "expo-router";
import { View, Text, Image, TextInput, Pressable, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, StyleSheet } from "react-native";

export default function NewAccount() {
  return (
    <View className="bg-black h-screen pt-14 border-2 border-red-500">
      <GoBackButton />

      <View className="border-4 w-52 h-52 -inset-x-10 border-white rounded-full flex items-center justify-center">
        <Image source={require("@/assets/images/photo-camera.png")}/>
      </View>

      <TextInput 
        className="bg-zinc-900 text-white"
        style={[{fontSize: 20}]}
      />

    </View>
  );
}

const GoBackButton = () => {
  const router = useRouter();
  return (
    <Pressable
      className="pl-8 pb-6"
      onPress={router.back}
    >
      <Image source={require("@/assets/images/Chevron.png")} /> 
    </Pressable>
  );
}