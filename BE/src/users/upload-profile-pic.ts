import { ContainerSASPermissions } from "@azure/storage-blob";
import { protectedProcedure } from "../infrastructure/trpc";
import { z } from "zod";

const userProfilePicContainer = 'user-profile-pics';

export const requestUploadUrlProfilePicQuery = protectedProcedure
  .input(z.object({
    pictureFileExtension: z.string().min(1)
  }))
  .mutation(({input: {pictureFileExtension}, ctx: {blobServiceClient, user, context}}) => {
    context.info("requested upload url profile pic for", user.id);
    return blobServiceClient
      .getContainerClient(userProfilePicContainer)
      .getBlobClient(`${user.id}.${pictureFileExtension}`)
      .generateSasUrl({
        expiresOn: new Date(new Date(new Date().toUTCString()).getTime() + 5 * 60000), // 5 min expiration time
        permissions: ContainerSASPermissions.from({
          write: true,
          create: true,
        })
      });
  }
  );