import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { hasFieldsInput } from "../utils";

export const CreateAccountButton = ({canCreateAccount}: {canCreateAccount: boolean}) => {
  return (
    <View className="px-4 pb-20">{ canCreateAccount ?
        <Pressable
          className="bg-white rounded-3xl px-32 py-3"
        >
          <Text className="text-xl">Crear cuenta</Text>
        </Pressable> :
        <Pressable
          className="bg-zinc-900 rounded-3xl px-32 py-3"
        >
          <Text className="text-xl text-zinc-500">Crear cuenta</Text>
        </Pressable>
    }</View>
  );
}

export const useCreateNewAccount = () => {
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const canCreateAccount = hasFieldsInput([name, handle, email, password]);

  return {
    fields: {
      name, handle, email, password,
      setName, setHandle, setEmail, setPassword,
    },
    canCreateAccount: canCreateAccount
  }
}