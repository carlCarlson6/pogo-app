import { router } from ".";
import { requestUploadUrlProfilePicQuery } from "../../users/upload-profile-pic";

export const appRouter = router({
  users: router({
    requestUploadUrlProfilePic: requestUploadUrlProfilePicQuery
  }),
});

export type AppRouter = typeof appRouter;