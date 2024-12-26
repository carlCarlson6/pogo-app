import { z } from "zod";
import { protectedProcedure } from "../../infrastructure/trpc";
import { usersTable } from "../user.drizzle.schema";
import { TRPCError } from "@trpc/server";

export const createUserProfile = protectedProcedure
.input(z.object({
  handle: z.string().min(5),
  displayName: z.string(),
}))
.mutation(async ({input, ctx: {db, logger, user}}) => {
  const maybeUser = await db.query.users.findFirst({
    where: (users, {or, eq}) => or(eq(users.id, user.id), eq(users.handle, input.handle)),
    columns: {
      id: true,
      handle: true
    }
  });
  if (!maybeUser) {
    throw new UserProfileCretionFailed();
  }

  try {
    const result = await db.insert(usersTable).values({
      id: user.id,
      handle: input.handle,
      displayName: input.displayName
    })
    .returning({
      id: usersTable.id
    });
  } catch(error) {
    logger.error("error inserting new user profile", error)
    throw new UserProfileCretionFailed();
  }
});

class UserProfileCretionFailed extends TRPCError {
  constructor() {
    super({
      code: "CONFLICT",
    });
  }
}