import { GoBackButton } from "@/components/GoBackButton";
import { PogoLogoImage } from "@/components/PogoLogoImg";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function Login() {
  const { canLogin, set, credentials } = useLogin();
  return (
    <KeyboardAwareScrollView
      className="bg-black"
      scrollEnabled={true}
    >
      <View className="h-screen pt-14 flex justify-between items-center">
        <View className="w-full">
          <GoBackButton />
        </View>
        
        <View className="pb-10">
          <PogoLogoImage />  
        </View>
          
        <View className="py-6 px-4 gap-4 w-full pb-36">
          <TextInput 
            className="bg-zinc-900 text-white pl-4 py-2"
            style={[{fontSize: 20}]}
            placeholder="Email"
            clearButtonMode={"always"}
            value={credentials.email}
            onChangeText={set.email}
          />
          <TextInput 
            className="bg-zinc-900 text-white pl-4 py-2"
            style={[{fontSize: 20}]}
            placeholder="Password"
            clearButtonMode={"always"}
            secureTextEntry={true}
            value={credentials.password}
            onChangeText={set.password}
          />
        </View>
      
        <LoginButton 
          canLogin={canLogin} 
          executeLogin={() => Promise.resolve()}
        />

      </View>
    </KeyboardAwareScrollView>
  );
}

const LoginButton = ({canLogin, executeLogin}: {
  canLogin: boolean,
  executeLogin: () => Promise<void>
}) => {
  return (
    <View className="px-4 pb-20">
        { canLogin ?
          <Pressable
            className="bg-white rounded-3xl px-32 py-3"
            onPress={executeLogin}
          >
              <Text className="text-xl">
                Iniciar sesion
              </Text>
            </Pressable> :
          <Pressable
            className="bg-zinc-900 rounded-3xl px-32 py-3"
          >
            <Text className="text-xl text-zinc-500">
              Iniciar sesion
            </Text>
          </Pressable>
        }
    </View>
  );
}

const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log(email, password);

  const canLogin = !!email && email !== "" && !!password && password !== "";
  console.log(canLogin);

  return {
    credentials: { email, password },
    set: {
      email: setEmail,
      password: setPassword,
    },
    canLogin: canLogin
  }
}