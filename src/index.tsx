import { Hono } from 'hono'
import { renderer } from './renderer'

import api from './routes/api/health'
import ssrPage from './routes/view/page'

const app = new Hono()

// Global renderer untuk semua route SSR
app.use('*', renderer)

// API route
app.route('/api', api)

// SSR page
app.route('/', ssrPage)

export default app
