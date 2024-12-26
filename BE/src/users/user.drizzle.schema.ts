import { json, jsonb, pgTable, text, uuid } from "drizzle-orm/pg-core";

const defaultUserProfilePic = ""; // TODO

export const usersTable = pgTable("users", {
  id:                 uuid("id").primaryKey(),
  handle:             text("handle").unique().notNull(),
  displayName:        text("display_name"),
  genresPreferences:  jsonb("genres_preferences").default("[]").notNull()
});

