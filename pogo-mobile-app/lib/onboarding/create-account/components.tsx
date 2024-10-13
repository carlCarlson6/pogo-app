import { useState } from "react";
import { View, Text, Pressable, Image as NativeImage } from "react-native";
import { Router } from "expo-router";
import { match, P } from "ts-pattern";
import { Image as ExpoImage } from "expo-image";
import { Flow } from "react-native-animated-spinkit";

export const GoToNewAccountButton = ({router}: {router: Router}) => {
  return (
    <Pressable
      className="bg-white rounded-3xl px-32 py-3"
      onPress={() => router.replace("/newAccount")}
    >
      <Text className="text-xl">Crear cuenta</Text>
    </Pressable>
  );
}

export const CreateAccountButton = (
  {canExecute, execute}: {canExecute: boolean, execute: () => Promise<void>}
) => {
  const [executing, setExecuting] = useState(false);
  return (
    <View className="px-4 pb-20">{match({canExecute, executing})
      .with({executing: true, canExecute: P.boolean}, () => (
        <Flow color="#ffffff" size={100} />
      ))
      .with({executing: false, canExecute: false}, () => (
        <Pressable
          className="bg-zinc-900 rounded-3xl px-32 py-3"
        >
          <Text className="text-xl text-zinc-500">Crear cuenta</Text>
        </Pressable>
      ))
      .with({executing: false, canExecute: true}, () => (
        <Pressable
          className="bg-white rounded-3xl px-32 py-3"
          onPress={async () => {
            setExecuting(true);
            await execute();
            setExecuting(false)
          }}
        >
          <Text className="text-xl">Crear cuenta</Text>
        </Pressable>
      ))
      .exhaustive()
    }</View>
  );
}



export const CreateAccountError = ({error}:{error:boolean}) => (error ?
  <Text className="text-red-500 pb-2">Hubo un problema creando su cuenta</Text> :
  <Text>no-error-should-not-be-see</Text>
);
