import {z, ZodType} from "zod";

export class AuthValidation {

    static readonly REGISTER: ZodType = z.object({
        username: z.string().min(1).max(100),
        password: z.string().min(1).max(100),
        email: z.string().min(1).max(100),
        handphone: z.string().min(1).max(100),
        role_user: z.number().min(1).max(3),
    })

    static readonly LOGIN: ZodType = z.object({
        email: z.string().min(1).max(100).email(),
        password: z.string().min(1).max(100)
    })

    static readonly TOKEN: ZodType = z.string().min(1)

    static readonly ACTIVATION: ZodType = z.object({
        token: z.string().min(1).max(100),
        otp: z.number().min(1).max(6999999),
    })

    static readonly RESET_PASSWORD: ZodType = z.object({
        email: z.string().min(1).max(100).email(),
        password: z.string().min(1).max(100),
        otp: z.number().min(1).max(999999),
        token: z.string().min(1).max(100),
    })

    static readonly FORGET_PASSWORD: ZodType = z.object({
        email: z.string().min(1).max(100).email(),
    })
}