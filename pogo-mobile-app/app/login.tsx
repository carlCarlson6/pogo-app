import { useSetSession } from "@/lib/auth";
import { supabase } from "@/lib/auth/supabase";
import { GoBackButton } from "@/lib/components/GoBackButton";
import { PogoLogoImage } from "@/lib/components/PogoLogoImg";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Flow } from 'react-native-animated-spinkit'
import { match, P } from 'ts-pattern';

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
          <TextInput 
            className="bg-zinc-900 text-white pl-4 py-2"
            style={[{fontSize: 20}]}
            placeholder="Email"
            clearButtonMode={"always"}
            value={credentials.email}
            onChangeText={set.email}
          />
          <TextInput 
            className="bg-zinc-900 text-white pl-4 py-2"
            style={[{fontSize: 20}]}
            placeholder="Password"
            clearButtonMode={"always"}
            secureTextEntry={true}
            value={credentials.password}
            onChangeText={set.password}
          />
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

const LoginButton = ({canLogin, isLoging, executeLogin}: {
  canLogin: boolean,
  isLoging: boolean,
  executeLogin: () => Promise<void>
}) => (
  <View className="px-4 pb-20">{match({ canLogin, isLoging })
    .with({ isLoging: true, canLogin: P.boolean }, () => (
      <Flow color="#ffffff" size={100} />
    ))
    .with({ isLoging: false, canLogin: false }, () => (
      <Pressable
        className="bg-zinc-900 rounded-3xl px-32 py-3"
      >
        <Text className="text-xl text-zinc-500">
          Iniciar sesion
        </Text>
      </Pressable>
    ))
    .with({ isLoging: false, canLogin: true }, () => (
      <Pressable
        className="bg-white rounded-3xl px-32 py-3"
        onPress={executeLogin}
      >
        <Text className="text-xl">
          Iniciar sesion
        </Text>
      </Pressable>
    ))
    .exhaustive()}</View>
)

const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isLoging, setIsLoging] = useState(false);
  const router = useRouter()

  const canLogin = !!email && email !== "" && !!password && password !== "";
  const executeLogin = async () => {
    if (!canLogin) {
      return;
    } 

    setError(false);
    setIsLoging(true);
    const result = await supabase.auth.signInWithPassword({
      email,
      password
    });

    setIsLoging(false);

    const isErrorResult = result.error !== null;
    setError(isErrorResult);
    
    if (isErrorResult) {
      return;
    }

    router.replace("/protected");
  }
  
  return {
    credentials: { email, password },
    canLogin, error, isLoging,
    set: {
      email: setEmail,
      password: setPassword,
    },
    executeLogin
  }
}