import { useEffect, useState } from "react";
import { hasFieldsInput } from "../../utils";
import { Router, useRouter } from "expo-router";
import { supabase } from "../../auth";
import { usePickProfileImage } from "./pick-profile-image";
import { tprc } from "@/lib/utils/tprc";
import * as FileSystem from 'expo-file-system';

export const useCreateNewAccount = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const canCreateAccount = hasFieldsInput([name, handle, email, password]);
  const [error, setError] = useState(false);
  const {pickedImage, picker, component: profileImage} = usePickProfileImage();
  const requestUploadUrlProfilePic = tprc.users.requestUploadUrlProfilePic.useMutation();

  const createAccount = async () => {
    console.log("creating account");
    if (!canCreateAccount) {
      return;
    }

    setError(false);
    console.log("executing signup");
    const result = await supabase.auth.signUp({email, password});
    const isErrorResult = result.error !== null;
    setError(isErrorResult);
    if (isErrorResult) {
      return;
    }
    console.log("signup OK");

    if (pickedImage) {
      console.log("requesting profile upload");

      try {
        const uploadUrl = await requestUploadUrlProfilePic.mutateAsync(
          {pictureFileExtension: pickedImage.split(".").at(-1) ?? ""}, {
          
          });
        console.log("url upload result", result);
        fetch(uploadUrl, {
          method: 'PUT',
          headers: {
            'x-ms-blob-type': 'BlockBlob'
          },
          body: await FileSystem.readAsStringAsync(pickedImage)
        })  
      } catch (error) {
        console.log(error);
      }

      
    }

    router.replace("/protected");
  }
  
  return {
    fields: {
      name, handle, email, password,
      setName, setHandle, setEmail, setPassword,
    },
    error, canCreateAccount,
    createAccount,
    pickImage: picker,
    profileImage,
  }
}