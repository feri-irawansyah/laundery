import { Claims } from "@contexts/models/auth-model"
import { Context, Next } from "hono"
import { getCookie } from "hono/cookie"
import { HTTPException } from "hono/http-exception"
import { sign, verify } from "hono/jwt"

const JWT_SECRET = 'secret'

export async function generateToken(payload: Claims) {
  return await sign(payload, JWT_SECRET)
}

export async function checkSession(c: Context, next: Next) {

  const token = getCookie(c, 'laundery')

  if (!token) {
    throw new HTTPException(401, {
      message: 'Unauthorized'
    })
  }

  try {
    const user = await verify(token, JWT_SECRET)
    c.set('jwtPayload', user)
    await next()
  } catch (e) {
    throw new HTTPException(401, {
      message: 'Invalid token'
    })
  }
}