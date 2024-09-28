import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const artistsTable = pgTable("artists", {
  id:           uuid("id").primaryKey(),
  handle:       text("handle").unique(),
  displayName:  text("display_name"),
  email:        text("email"),
});
