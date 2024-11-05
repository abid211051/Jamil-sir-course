import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const todosTable = pgTable("todos", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title").notNull(),
  status: varchar("status").notNull(),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().defaultNow(),
});
