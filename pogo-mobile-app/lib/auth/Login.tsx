import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Router, useRouter } from "expo-router";
import { Flow } from 'react-native-animated-spinkit'
import { match, P } from 'ts-pattern';
import { hasFieldsInput } from "@/lib/utils";
import { supabase } from "@/lib/auth/session";

export const useLogin = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const canLogin = hasFieldsInput([email, password]);
  const [error, setError] = useState(false);
  
  const executeLogin = async () => {
    if (!canLogin) {
      return;
    } 

    setError(false);
    const result = await supabase.auth.signInWithPassword({email, password});
    const isErrorResult = result.error !== null;
    setError(isErrorResult);
    if (isErrorResult) {
      return;
    }

    router.replace("/protected");
  }
  
  return {
    credentials: { email, password },
    canLogin, error,
    set: {
      email: setEmail,
      password: setPassword,
    },
    executeLogin
  }
}

export const GoToLoginButton = ({router}: {router: Router}) => {
  return (
    <Pressable
      className="bg-white rounded-3xl px-32 py-3"
      onPress={() => router.replace("/login")}
    >
      <Text className="text-xl">Iniciar sesión</Text>  
    </Pressable>
  );
}

export const LoginButton = (
  {canLogin, execute}: {canLogin: boolean, execute: () => Promise<void>}
) => {
  const [executing, setExecuting] = useState(false);
  return (
    <View className="px-4 pb-20">{match({canLogin, executing})
      .with({executing: true, canLogin: P.boolean}, () => (
        <Flow color="#ffffff" size={100} />
      ))
      .with({executing: false, canLogin: false}, () => (
        <Pressable
          className="bg-zinc-900 rounded-3xl px-32 py-3"
        >
          <Text className="text-xl text-zinc-500">
            Iniciar sesion
          </Text>
        </Pressable>
      ))
      .with({executing: false, canLogin: true}, () => (
        <Pressable
          className="bg-white rounded-3xl px-32 py-3"
          onPress={async () => {
            setExecuting(true);
            await execute();
            setExecuting(false);
          }}
        >
          <Text className="text-xl">
            Iniciar sesion
          </Text>
        </Pressable>
      ))
      .exhaustive()
    }</View>
  );
}