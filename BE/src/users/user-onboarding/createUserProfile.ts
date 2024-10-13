import { z } from "zod";
import { protectedProcedure } from "../../infrastructure/trpc";

const createUserProfileProcedure = protectedProcedure
  .input(z.object({}))
  .mutation(() => {

  });

  