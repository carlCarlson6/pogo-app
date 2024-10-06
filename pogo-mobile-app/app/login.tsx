import { GoBackButton } from "@/lib/utils/GoBackButton";
import { PogoLogoImage } from "@/lib/utils/PogoLogoImg";
import React from "react";
import { Text, View } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TextField } from "@/lib/utils/TextField";
import { LoginButton, useLogin } from "@/lib/auth/Login";


export default function Login() {
  const { canLogin, set, credentials, executeLogin, isLoging, error } = useLogin();
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
            />
          </View>
        </View>
      
        <View className="flex justify-between items-center">
          { error ?
            <Text className="text-red-500 pb-2">Credenciales incorrectos</Text> :
            <Text>no-error-should-not-be-see</Text>
          }
          <LoginButton 
            canLogin={canLogin} 
            isLoging={isLoging}
            executeLogin={executeLogin}
          />
        </View>

      </View>
    </KeyboardAwareScrollView>
  );
}

