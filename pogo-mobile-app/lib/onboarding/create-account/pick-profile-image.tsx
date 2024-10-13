import { launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker";
import { useState } from "react";
import { View, Image as NativeImage } from "react-native";
import { match, P } from "ts-pattern";
import { Image as ExpoImage } from "expo-image";

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

const pickImageOptions = {
  mediaTypes: MediaTypeOptions.Images,
  allowsEditing: true,
  quality: 1,
};

export const usePickProfileImage = () => {
  const [pickedImage, setPickedImage] = useState<string | undefined>(undefined);
  return {
    pickedImage,
    picker: () => launchImageLibraryAsync(pickImageOptions).then(result => setPickedImage(result.canceled ? undefined : result.assets[0].uri)),
    component: (<CreateAccountProfileImage profileImg={pickedImage} />)
  };
};
