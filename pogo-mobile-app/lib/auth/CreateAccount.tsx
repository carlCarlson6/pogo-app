import { useState } from "react";
import { View, Text, Pressable, Image } from "react-native";
import { hasFieldsInput } from "../utils";
import { Router } from "expo-router";
import * as ImagePicker from 'expo-image-picker';
import { match, P } from "ts-pattern";

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

const imagePlaceholder = require("@/assets/images/photo-camera.png");

export const useCreateNewAccount = () => {
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pickedImage, setPickedImage] = useState<string|undefined>(undefined);
  const isImagePlaceholder = pickedImage === imagePlaceholder;
  const image = pickedImage === undefined ? imagePlaceholder : pickedImage;

  const canCreateAccount = hasFieldsInput([name, handle, email, password]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (result.canceled) {
      return;
    }
    setPickedImage(result.assets[0].uri);
  };

  return {
    fields: {
      name, handle, email, password,
      setName, setHandle, setEmail, setPassword,
    },
    canCreateAccount: canCreateAccount,
    pickImage,
    image: match(pickedImage)
      .with(P.nullish, () => (
        <Image source={imagePlaceholder} />
      ))
      .with(P.string, (uri) => (
        <Image source={{uri}} />
      ))
      .exhaustive()
  }
}