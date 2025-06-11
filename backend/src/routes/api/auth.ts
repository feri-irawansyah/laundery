import { getConnection } from "@contexts/connection/db";
import { ActivationRequest, ForgetPasswordRequest, LoginUserRequest, RegisterUserRequest, ResetPasswordRequest } from "@contexts/models/auth-model";
import { checkSession, generateToken } from "@middleware/session";
import { AuthService } from "@services/auth-service";
import { Hono } from "hono";
import { serialize } from "hono/utils/cookie";
import { ApplicationVariables } from "index";

export const authController = new Hono<{ Bindings: ApplicationVariables }>();

authController.post('/auth/register', async (c) => {
    const request = await c.req.json() as RegisterUserRequest;

    const connection = getConnection(c.env.DATABASE_URL);

    const response = await AuthService.register(request, connection, c.env);

    return c.json({
        data: response
    })
});

authController.post('/auth/activation', async (c) => {
    const request = await c.req.json() as ActivationRequest;

    const connection = getConnection(c.env.DATABASE_URL);

    const response = await AuthService.activation(request, connection);

    return c.json({
        data: response
    })
});

authController.post('/auth/forget-password', async (c) => {
    const request = await c.req.json() as ForgetPasswordRequest;

    const connection = getConnection(c.env.DATABASE_URL);

    const response = await AuthService.forgetPassword(request, connection, c.env);

    return c.json({
        data: response
    })
});

authController.post('/auth/reset-password', async (c) => {
    const request = await c.req.json() as ResetPasswordRequest;

    const connection = getConnection(c.env.DATABASE_URL);

    const response = await AuthService.resetPassword(request, connection, c.env);

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

    let response = await AuthService.login(request, getConnection(c.env.DATABASE_URL));

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
        data: "Login successfully"
    })
});