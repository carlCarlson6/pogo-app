import { CommonActions } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View, Text, Image, TextInput, Pressable, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, StyleSheet, Button } from "react-native";

export default function NewAccount() {
  const {canCreateAccount, command} = useCreateNewAccount();
  return (
    <View className="bg-black h-screen pt-14 flex justify-between">
      <View>
        <GoBackButton />

        <View className="border-4 w-52 h-52 -inset-x-10 border-white rounded-full flex items-center justify-center">
          <Image source={require("@/assets/images/photo-camera.png")}/>
        </View>

        <KeyboardAvoidingView className="py-6 px-4 gap-4">
          <TextInput 
            className="bg-zinc-900 text-white pl-4 py-2"
            style={[{fontSize: 20}]}
            placeholder="Nombre"
            clearButtonMode={"always"}
            value={command.name}
          />
          <TextInput 
            className="bg-zinc-900 text-white pl-4 py-2"
            style={[{fontSize: 20}]}
            placeholder="Handle"
            clearButtonMode={"always"}
            value={command.handle}
          />
          <TextInput 
            className="bg-zinc-900 text-white pl-4 py-2"
            style={[{fontSize: 20}]}
            placeholder="Email"
            clearButtonMode={"always"}
            value={command.email}
          />
          <TextInput 
            className="bg-zinc-900 text-white pl-4 py-2"
            style={[{fontSize: 20}]}
            placeholder="Password"
            clearButtonMode={"always"}
            secureTextEntry={true}
            value={command.password}
          />
        </KeyboardAvoidingView>
      </View>

      <CreateAccountButton canCreateAccount={canCreateAccount}/>
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

const CreateAccountButton = ({canCreateAccount}: {canCreateAccount: boolean}) => {
  return (
    <View className="px-4 pb-20">
        { canCreateAccount ?
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
        }
    </View>
  );
}

const useCreateNewAccount = () => {
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return {
    command: {
      name, handle, email, password
    },
    setName, setHandle, setEmail, setPassword,
    canCreateAccount: false
  }
}