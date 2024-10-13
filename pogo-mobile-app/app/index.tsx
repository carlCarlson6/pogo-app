import { PogoLogoImage } from "@/lib/utils/PogoLogoImg";
import { View, Image } from "react-native";
import { useRouter } from "expo-router";
import { GoToNewAccountButton } from "@/lib/onboarding/create-account/components";
import { GoToLoginButton } from "@/lib/onboarding/login/Login";


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
            <GoToNewAccountButton router={router} />
          </View>
        
          <View>
            <GoToLoginButton router={router} />    
          </View>
        </View>

        <View className="pt-20">
          <Image source={require("@/assets/images/social-login-icons.png")}/>
        </View>
      </View>
    </View>
  );
}
