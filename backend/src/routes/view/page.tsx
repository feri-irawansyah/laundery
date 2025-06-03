import { App } from '@lib/App'
import { Hono } from 'hono'

const page = new Hono()

page.get('/', (c) => {
  return c.render(<App />)
})

export default page
