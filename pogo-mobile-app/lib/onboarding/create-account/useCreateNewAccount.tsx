import { useState } from "react";
import { hasFieldsInput } from "../../utils";
import { useRouter } from "expo-router";
import { supabase } from "../../auth";
import { usePickProfileImage } from "./pick-profile-image";
import { tprc } from "@/lib/utils/tprc";
import * as FileSystem from 'expo-file-system';

export const useCreateNewAccount = () => {
  const router = useRouter();
  const [command, setCreateNewAccount] = useState<{
    name: string,
    handle: string,
    email: string,
    password: string
  }>({ name: "", handle: "", email: "", password: "" });

  const canCreateAccount = hasFieldsInput([command.name, command.handle, command.email, command.password]);
  const [error, setError] = useState(false);
  const {pickedImage, picker, component: profileImage} = usePickProfileImage();
  const requestUploadUrlProfilePic = tprc.users.uploadProfilePic.useMutation();
  const createUserProfile = tprc.users.createUserProfile.useMutation();
  
  const createAccount = async () => {
    if (!canCreateAccount) {
      setError(true);
      return;
    }

    setError(false);
    const result = await supabase.auth.signUp(command);
    
    const isErrorResult = result.error !== null;
    if (isErrorResult) {
      setError(true);
      return;
    }

    if (pickedImage) {
      try {
        const uploadUrl = await requestUploadUrlProfilePic.mutateAsync({
          pictureFileExtension: pickedImage.split(".").at(-1) ?? ""
        });
        console.log("url upload result", result);
        const uploadResult = await fetch(uploadUrl, {
          method: 'PUT',
          headers: {
            'x-ms-blob-type': 'BlockBlob'
          },
          body: await FileSystem.readAsStringAsync(pickedImage)
        });
        if (!uploadResult.ok)
          throw new Error("not ok result uploading image")
      } catch (error) {
        setError(true);
        console.error(error);
      }
    }

    try {
      await createUserProfile.mutateAsync({ ...command, displayName: command.name });
    } catch(error) {
      console.error(error)
      setError(true);
      return;
    }
    
    router.replace("/protected");
  }
  
  return {
    fields: {
      command,
      setName: (name: string) => setCreateNewAccount({
        ...command,
        name,
      }), 
      setHandle: (handle: string) => setCreateNewAccount({
        ...command,
        handle,
      }),  
      setEmail: (email: string) => setCreateNewAccount({
        ...command,
        email,
      }),  
      setPassword: (password: string) => setCreateNewAccount({
        ...command,
        password,
      }),
    },
    error, canCreateAccount,
    createAccount,
    pickImage: picker,
    profileImage,
  }
}