import { TextInput } from "react-native";

type TextFieldProps = {
  get: string,
  set: (value: string) => void,
  placeholder: string
  secureInput?: boolean
};

export const TextField = ({get, set, placeholder, secureInput}: TextFieldProps) => (
  <TextInput
    className="bg-zinc-900 text-white pl-4 py-2"
    style={[{fontSize: 20}]}
    placeholder={placeholder}
    clearButtonMode={"always"}
    value={get}
    onChangeText={set}
    secureTextEntry={secureInput ?? false}
  />
);