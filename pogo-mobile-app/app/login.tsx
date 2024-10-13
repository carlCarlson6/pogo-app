import { GoBackButton } from "@/lib/utils/GoBackButton";
import { PogoLogoImage } from "@/lib/utils/PogoLogoImg";
import React from "react";
import { Text, View } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TextField } from "@/lib/utils/TextField";
import { LoginButton, LoginError, useLogin } from "@/lib/onboarding/login/Login";

export default function Login() {
  const { canLogin, set, credentials, executeLogin, error } = useLogin();
  return (
    <KeyboardAwareScrollView
      className="bg-black"
      scrollEnabled={true}
    >
      <View className="h-screen pt-14 flex justify-between items-center">
        <View className="w-full">
          <GoBackButton goBackTo="/"/>
        </View>
        
        <View className="pb-10">
          <PogoLogoImage />  
        </View>
          
        <View className="py-6 px-4 gap-4 w-full pb-36">
          <View>
            <TextField 
              get={credentials.email}
              set={set.email}
              placeholder="Email"
            />
          </View>
          <View>
            <TextField 
              get={credentials.password}
              set={set.password}
              placeholder="Contraseña"
              secureInput={true}
            />
          </View>
        </View>
      
        <View className="flex justify-between items-center">
          <LoginError error={error} />
          <LoginButton canLogin={canLogin} execute={executeLogin} />
        </View>

      </View>
    </KeyboardAwareScrollView>
  );
}
