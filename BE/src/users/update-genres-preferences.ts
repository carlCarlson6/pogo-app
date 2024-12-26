import { z } from "zod";
import { protectedProcedure } from "../infrastructure/trpc";
import { musicGenres } from "../common/music-genres";
import { usersTable } from "./user.drizzle.schema";
import { eq } from "drizzle-orm";

export const updateGenresPreferences = protectedProcedure
.input(z.array(z.enum(musicGenres)))
.mutation(({input, ctx: {db, user}}) => db
  .update(usersTable)
  .set({
    genresPreferences: JSON.stringify(input),
  })
  .where(eq(usersTable.id, user.id))
  .execute()
  .then(_ => "ok" as const)
);