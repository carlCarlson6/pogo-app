import { CreateAccountButton, useCreateNewAccount } from "@/lib/auth/CreateAccount";
import { GoBackButton } from "@/lib/utils/GoBackButton";
import { TextField } from "@/lib/utils/TextField";
import { View, KeyboardAvoidingView, Pressable, Image } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { useState } from "react";
import { StyleSheet } from 'react-native';

const imagePlaceholder = require("@/assets/images/photo-camera.png");

export default function NewAccount() {
  const { canCreateAccount, fields, pickImage, image } = useCreateNewAccount();

  return (
    <View className="bg-black h-screen pt-14 flex justify-between">
      <View>
        <GoBackButton goBackTo="/" />

        <Pressable 
          className="border-4 w-52 h-52 -inset-x-10 border-white rounded-full flex items-center justify-center"
          onPress={pickImage}
        >
          {image}
        </Pressable>

        <KeyboardAvoidingView className="py-6 px-4 gap-4">
          <View>
            <TextField 
              get={fields.name}
              set={fields.setName}
              placeholder="Nombre"
            />
          </View>
          <View>
            <TextField 
              get={fields.handle}
              set={fields.setHandle}
              placeholder="Handle"
            />
          </View>
          <View>
            <TextField 
              get={fields.email}
              set={fields.setEmail}
              placeholder="Email"
            />
          </View>
          <View>
            <TextField 
              get={fields.password}
              set={fields.setPassword}
              placeholder="Contraseña"
            />
          </View>
        </KeyboardAvoidingView>
      </View>

      <CreateAccountButton canCreateAccount={canCreateAccount}/>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});