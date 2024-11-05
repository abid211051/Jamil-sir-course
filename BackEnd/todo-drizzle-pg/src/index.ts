import { Hono } from "hono";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { todosTable } from "./db/schema/schema";

const client = postgres(process.env.DATABASE_URL, { prepare: false });
const db = drizzle(client);

const app = new Hono();

app.post("/todos", async (c) => {
  try {
    const { title, status } = await c.req.json();
    const result = await db
      .insert(todosTable)
      .values({ title, status })
      .returning();
    return c.json({ message: "Todos created", todo: result });
  } catch (error) {
    return c.json({ message: "Server error", error: error });
  }
});

app.get("/todos", async (c) => {
  try {
    const alltodos = await db.select().from(todosTable);
    return c.json(alltodos);
  } catch (error) {
    return c.json({ message: "Server error", error: error });
  }
});

app.get("/todos/:id", async (c) => {
  try {
    const { id } = c.req.param();
    const singletodo = await db
      .select()
      .from(todosTable)
      .where(eq(todosTable.id, id));
    return c.json(singletodo);
  } catch (error) {
    return c.json({ message: "Server error", error: error });
  }
});

app.put("/todos/:id", async (c) => {
  try {
    const { id } = c.req.param();
    const data = await c.req.json();
    const updatedTodo = await db
      .update(todosTable)
      .set(data)
      .where(eq(todosTable.id, id))
      .returning();
    return c.json({
      message: "Todo updated",
      todo: updatedTodo,
    });
  } catch (error) {
    return c.json({ message: "Server error", error: error });
  }
});

app.delete("/todos/:id", async (c) => {
  try {
    const { id } = c.req.param();
    await db.delete(todosTable).where(eq(todosTable.id, id));
    return c.json({ message: "Todo deleted" });
  } catch (error) {
    return c.json({ message: "Server error", error: error });
  }
});

app.delete("/todos", async (c) => {
  try {
    await db.delete(todosTable);
    return c.json({ message: "All todos have been deleted" });
  } catch (error) {
    return c.json({ message: "Server error", error: error });
  }
});

export default app;
