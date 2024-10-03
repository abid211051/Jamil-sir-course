import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

let todos = {
  "1":{
    title:"name",
    status: "todo"
  },
  "2":{
    title:"age",
    status: "todo"
  }
}

app.get('/todos', (c) => {
  let alltodos=[];
  for (const key in todos) {
    alltodos.push({id:key, ...todos[key]});
  }
  return c.json(alltodos)
})

app.get('/todos/:id', (c) => {
  const {id} = c.req.param();
  if(!todos[id]) return c.json({message:"Not found"});

  return c.json({id, ...todos[id]});
})

app.post('/todos', async (c)=>{
  const {title} = await c.req.json();
  const id = `${new Date().getTime()}`;
  const newtodo = {
    title,
    status:"todo"
  }
  todos[id] = newtodo;
  return c.json({"message": "Todo created",todo:{id, ...newtodo}});
})

app.put('/todos/:id', async(c)=>{
  const {id} = c.req.param();
  if(!todos[id]) return c.json({message:"Id not matched"});
  const {title, status} = await c.req.json();

  todos[id].title = title || todos[id].title;
  todos[id].status = status || todos[id].status;

  return c.json({"message": "Todo updated", todo:{id, ...todos[id]}})
})

app.delete('/todos/:id', (c)=>{
  const {id} = c.req.param();
  if(!todos[id]) return c.json({message:"Id not matched"});
  delete todos[id];

  return c.json({"message": "Todo deleted"})
})

app.delete('/todos', (c)=>{
  todos ={};
  return c.json({"message": "All Todo deleted"})
})

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
