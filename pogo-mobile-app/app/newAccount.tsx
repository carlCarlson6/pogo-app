import { CreateAccountButton, useCreateNewAccount } from "@/lib/auth/CreateAccount";
import { GoBackButton } from "@/lib/utils/GoBackButton";
import { TextField } from "@/lib/utils/TextField";
import { View, KeyboardAvoidingView, Pressable, Text } from "react-native";

export default function NewAccount() {
  const { canCreateAccount, createAccount, fields, pickImage, profileImage, error } = useCreateNewAccount();
  return (
    <View className="bg-black h-screen pt-14 flex justify-between">
      <View>
        <GoBackButton goBackTo="/" />

        <Pressable 
          className="border-4 w-52 h-52 -inset-x-10 border-white rounded-full flex items-center justify-center"
          onPress={pickImage}
        >
          {profileImage}
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
              secureInput={true}
            />
          </View>
        </KeyboardAvoidingView>
      </View>

      <View className="flex justify-between items-center">
        { error ?
          <Text className="text-red-500 pb-2">Hubo un problema creando su cuenta</Text> :
          <Text>no-error-should-not-be-see</Text>
        }
        <CreateAccountButton canExecute={canCreateAccount} execute={createAccount}/>
      </View>
    </View>
  );
}
