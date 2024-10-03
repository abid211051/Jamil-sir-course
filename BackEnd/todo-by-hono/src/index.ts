import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

let todos: any[] = [{
  "title": "abid"
}];

app.get('/todos', (c) => {
  return c.json(todos)
})



const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
