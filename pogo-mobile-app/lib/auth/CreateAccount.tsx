import { useState } from "react";
import { View, Text, Pressable, Image as NativeImage } from "react-native";
import { hasFieldsInput } from "../utils";
import { Router, useRouter } from "expo-router";
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker';
import { match, P } from "ts-pattern";
import { Image as ExpoImage } from "expo-image";
import { supabase } from "./session";
import { Flow } from "react-native-animated-spinkit";

const pickImageOptions = {
  mediaTypes: MediaTypeOptions.Images,
  allowsEditing: true,
  quality: 1,
};

export const useCreateNewAccount = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const canCreateAccount = hasFieldsInput([name, handle, email, password]);
  const [error, setError] = useState(false);
  const [pickedImage, setPickedImage] = useState<string|undefined>(undefined);

  const createAccount = async () => {
    if (!canCreateAccount) {
      return;
    }

    setError(false);
    const result = await supabase.auth.signUp({email, password});
    const isErrorResult = result.error !== null;
    setError(isErrorResult);
    if (isErrorResult) {
      return;
    }

    router.replace("/protected");
  }
  
  return {
    fields: {
      name, handle, email, password,
      setName, setHandle, setEmail, setPassword,
    },
    error, canCreateAccount,
    pickImage: () => launchImageLibraryAsync(pickImageOptions).then(result => setPickedImage(result.canceled ? undefined : result.assets[0].uri)),
    createAccount,
    profileImage: (<CreateAccountProfileImage profileImg={pickedImage} />),
  }
}

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
          onPress={() => {
            setExecuting(true);
            execute();
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

export const CreateAccountProfileImage = (
  {profileImg}: {profileImg: string|undefined}
) => match(profileImg)
  .with(P.nullish, _ => (
    <NativeImage 
      source={require("@/assets/images/photo-camera.png")} 
    />
  ))
  .with(P.string, (uri) => (
    <View
      className="flex-1 w-full overflow-hidden rounded-full"
    >
      <ExpoImage 
        className="flex-1"
        source={{uri}} 
      />
    </View>
  ))
  .exhaustive();