import { Hono } from 'hono'
import { renderer } from './renderer'
import api from '@routes/api/health'
import ssrPage from '@routes/view/page'
import { ZodError } from 'zod'
import { HTTPException } from 'hono/http-exception'
import { authController } from '@routes/api/auth'

export type ApplicationVariables = {
  DATABASE_URL: string
}

const app = new Hono<{ Bindings: ApplicationVariables }>()

// Global renderer untuk semua route SSR
app.use('*', renderer);

// API route endpoint
app.route('/api', api);

// API Auth route endpoint
app.route('/api', authController);

// Handler fallback untuk semua route /api/* yang gak ketemu
app.all('/api/*', (c) => {
  const url = c.req.url
  return c.json(
    { error: `URL ${url} not found` },
    400
  )
})

// Error handler
app.onError(async (err, c) => {
    if (err instanceof HTTPException) {
        c.status(err.status)
        return c.json({
            errors: err.message
        })
    } else if (err instanceof ZodError) {
        c.status(400)
        return c.json({
            errors: err.message
        })
    } else {
        c.status(500)
        return c.json({
            errors: err.message
        })
    }
})

// SSR page
app.route('/', ssrPage)

export default app
