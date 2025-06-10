import { getConnection } from "@contexts/connection/db";
import { LoginUserRequest, RegisterUserRequest } from "@contexts/models/auth-model";
import { checkSession, generateToken } from "@middleware/session";
import { UserService } from "@services/auth-service";
import { Hono } from "hono";
import { serialize } from "hono/utils/cookie";
import { ApplicationVariables } from "index";

export const authController = new Hono<{ Bindings: ApplicationVariables }>();

authController.post('/auth/register', async (c) => {
    const request = await c.req.json() as RegisterUserRequest;

    const connection = getConnection(c.env.DATABASE_URL);

    const response = await UserService.register(request, connection, c.env.SALT);

    return c.json({
        data: response
    })
});

authController.get('/auth/session', checkSession, (c) => {

  const data: any = c.get('jwtPayload')
  
  return c.json({ data: data })
});

authController.post('/auth/login', async (c) => {
    const request = await c.req.json() as LoginUserRequest;

    let response = await UserService.login(request, getConnection(c.env.DATABASE_URL));

    const token = await generateToken(response);

    const cookie = serialize('laundery', token, {
        httpOnly: true,
        secure: false, // ganti ke true kalo HTTPS
        sameSite: 'lax',
        path: '/',
        maxAge: 260000,
      })

    c.header('Set-Cookie', cookie)

    return c.json({
        data: "success"
    })
});