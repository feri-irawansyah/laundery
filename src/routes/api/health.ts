import { Hono } from 'hono'

const api = new Hono()

api.get('/health', (c) => {
  return c.json({ message: 'Hello from Hono API!' })
})

export default api
