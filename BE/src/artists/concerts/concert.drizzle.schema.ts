import { date, json, pgTable, uuid } from "drizzle-orm/pg-core";

export const concertsTable = pgTable("concerts", {
  id: uuid("id").primaryKey(),
  date: date("date"),
  invitedArtists: json("invited_artists"),
  createdBy: uuid("created_by"),
  createdAt: date("created_at"),
});