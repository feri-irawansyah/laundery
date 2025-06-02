import { Hono } from 'hono'
import { App } from '../../lib/App'

const page = new Hono()

page.get('/', (c) => {
  return c.render(<App />)
})

export default page
