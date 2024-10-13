import { json, jsonb, pgTable, text, uuid } from "drizzle-orm/pg-core";

const defaultUserProfilePic = ""; // TODO

export const usersTable = pgTable("users", {
  id:           uuid("id").primaryKey(),
  handle:       text("handle").unique(),
  displayName:  text("display_name"),
  profilePic:   text("profile_pic").default(defaultUserProfilePic),
  genresPreferences: jsonb("genres_preferences")
});

