import { useRouter } from "expo-router";
import { Pressable, Image } from "react-native";

export const GoBackButton = () => {
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