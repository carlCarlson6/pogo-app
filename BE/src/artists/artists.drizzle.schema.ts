import { pgTable, serial, text, varchar, uuid } from "drizzle-orm/pg-core";

export const artistsTable = pgTable("artists", {
  id:           uuid("id").primaryKey(),
  handle:       text("handle"),
  displayName:  text("display_name"),
  email:        text("email"),
})