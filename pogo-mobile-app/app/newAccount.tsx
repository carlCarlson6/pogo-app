import { CreateAccountButton, useCreateNewAccount } from "@/lib/auth/CreateAccount";
import { GoBackButton } from "@/lib/components/GoBackButton";
import { TextField } from "@/lib/components/TextField";
import { View, Image, KeyboardAvoidingView } from "react-native";

export default function NewAccount() {
  const { canCreateAccount, fields } = useCreateNewAccount();
  
  return (
    <View className="bg-black h-screen pt-14 flex justify-between">
      <View>
        <GoBackButton goBackTo="/" />

        <View className="border-4 w-52 h-52 -inset-x-10 border-white rounded-full flex items-center justify-center">
          <Image source={require("@/assets/images/photo-camera.png")}/>
        </View>

        <KeyboardAvoidingView className="py-6 px-4 gap-4">
          <TextField 
            get={fields.name}
            set={fields.setName}
            placeholder="Nombre"
          />
          <TextField 
            get={fields.handle}
            set={fields.setHandle}
            placeholder="Handle"
          />
          <TextField 
            get={fields.email}
            set={fields.setEmail}
            placeholder="Email"
          />
          <TextField 
            get={fields.password}
            set={fields.setPassword}
            placeholder="Contraseña"
          />
        </KeyboardAvoidingView>
      </View>

      <CreateAccountButton canCreateAccount={canCreateAccount}/>
    </View>
  );
}

