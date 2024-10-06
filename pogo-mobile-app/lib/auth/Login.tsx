import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Flow } from 'react-native-animated-spinkit'
import { match, P } from 'ts-pattern';
import { hasFieldsInput } from "@/lib/utils";
import { supabase } from "@/lib/auth/session";
import { PropsWithRouter } from ".";

export const GoToLoginButton = ({router}: PropsWithRouter) => {
  return (
    <Pressable
      className="bg-white rounded-3xl px-32 py-3"
      onPress={() => router.replace("/login")}
    >
      <Text className="text-xl">Iniciar sesión</Text>  
    </Pressable>
  );
}

export const LoginButton = ({canLogin, isLoging, executeLogin}: {
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

export const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isLoging, setIsLoging] = useState(false);
  const router = useRouter()

  const canLogin = hasFieldsInput([email, password]);
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