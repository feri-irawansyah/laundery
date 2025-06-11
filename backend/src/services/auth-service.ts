import { ActivationRequest, ForgetPasswordRequest, LoginUserRequest, RegisterUserRequest, ResetPasswordRequest, toUserResponse, User, Claims } from '@contexts/models/auth-model';
import { AuthValidation } from '@contexts/validations/auth-validation';
import { Pool } from '@neondatabase/serverless';
import { HTTPException } from 'hono/http-exception';
import { hashSync, compareSync } from 'bcrypt-edge';
import { GenericService } from './generic-service';
import { ApplicationVariables } from 'index';

export class AuthService {

    static async login(request: LoginUserRequest, connection: Pool): Promise<Claims> {
        request = AuthValidation.LOGIN.parse(request)

        const user: any = await connection.query('SELECT * FROM users WHERE email = $1', [request.email])
        if (user.rowCount === 0) {
            throw new HTTPException(404, {
              message: 'User not registered'
            })
        }

        if (!compareSync(request.password, user.rows[0].password)) {
            throw new HTTPException(401, {
              message: 'Invalid password'
            })
        }

        if (user.rows[0].disable_login) {
            throw new HTTPException(500, {
              message: 'Unauthorized'
            })
        }

        const response = toUserResponse(user.rows[0]);
        return response
    }

    static async register(request: RegisterUserRequest, connection: Pool, application: ApplicationVariables): Promise<{ message: string }> {
        request = AuthValidation.REGISTER.parse(request)

        let user: any = await connection.query('SELECT COUNT(*) FROM users WHERE email = $1', [request.email])
        
        if (user.rows[0].count > 0) {
            throw new HTTPException(400, {
            message: 'Username already exists'
            })
        }
        
        const hashedPassword = hashSync(request.password, application.SALT);

        request.password = hashedPassword;

        const generateToken = await GenericService.generateRandomString(70);

        await connection.query(
            `INSERT INTO users (username, password, email, handphone, role_user, otp_generated_link, otp_generated_link_date = with_timezone()) 
            VALUES ($1, $2, $3, $4, $5, $6) 
            RETURNING otp_generated_link, otp_code`,
            [request.username, request.password, request.email, request.handphone, request.role_user, generateToken]
        ).then(async(res) => {
            const mail_req = {
                email: request.email,
                front_url: application.FRONT_URL,
                otp_code: res.rows[0].otp_code,
                username: request.username,
                company_name: 'PT Laundery Indonesia',
                subject: 'Activation Account',
                title: 'Activation Account Laundery',
                url_token: res.rows[0].otp_generated_link
            }

            await fetch(`${application.SNAKE_API}/api/v1/email/send/activation`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
            },
            body: JSON.stringify(mail_req)
            }).then((res) => {
                console.log(res)
                if (res.status !== 200) {
                    throw new HTTPException(500, {
                        message: 'Failed to send email'
                    })
                }
            }).catch((err) => {
                throw new HTTPException(500, {
                    message: err.message
                })
            })
            return res
        }).catch((err) => {
            throw new HTTPException(500, {
                message: err.message
            })
        })

        return {
            message: 'User registered successfully'
        }
    }

    static async activation(request: ActivationRequest, connection: Pool): Promise<{ message: string }> {

        request = AuthValidation.ACTIVATION.parse(request);

        const result = await connection.query(`
            UPDATE users SET disable_login = $1, activate_code = $2, activate_time = $3, count_resend_activation = $4 
            WHERE otp_generated_link = $5 AND otp_code = $6
            RETURNING user_id
            `, [false, request.otp, new Date(), 1, request.token, request.otp]).then((res) => {
                return res
            }).catch((err) => {
            throw new HTTPException(500, {
                message: err.message
            })
        })

        if (result.rowCount === 0) {
            throw new HTTPException(400, {
                message: 'Invalid token'
            })
        }

        return {
            message: 'Activation successfully'
        }
    }

    static async forgetPassword(request: ForgetPasswordRequest, connection: Pool, application: ApplicationVariables): Promise<{ message: string }> {

        request = AuthValidation.FORGET_PASSWORD.parse(request);

        const generateToken = await GenericService.generateRandomString(75);

        const result = await connection.query(`
            UPDATE users 
            SET reset_password_otp = floor((random() * 900000)::int + 100000), last_resend_otp = with_timezone(), 
            reset_password_key = $2, reset_password_date = with_timezone()
            WHERE email = $1 
            RETURNING reset_password_otp, username, reset_password_key
            `, [request.email, generateToken]).then(async(res) => {
                const mail_req = {
                email: request.email,
                front_url: application.FRONT_URL,
                otp_code: res.rows[0].reset_password_otp,
                username: res.rows[0].username,
                company_name: 'PT Laundery Indonesia',
                subject: 'Reset Password',
                title: 'Reset Password Laundery',
                url_token: res.rows[0].reset_password_key
            }

            console.log(mail_req)

            await fetch(`${application.SNAKE_API}/api/v1/email/send/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
            },
            body: JSON.stringify(mail_req)
            }).then((res) => {
                console.log(res)
                if (res.status !== 200) {
                    throw new HTTPException(500, {
                        message: 'Failed to send email'
                    })
                }
            }).catch((err) => {
                throw new HTTPException(500, {
                    message: err.message
                })
            })
                return res
            }).catch((err) => {
            throw new HTTPException(500, {
                message: err.message
            })
        })

        if (result.rowCount === 0) {
            throw new HTTPException(404, {
                message: 'User not registered'
            })
        }

        return {
            message: 'Forget password successfully'
        }
    }

    static async resetPassword(request: ResetPasswordRequest, connection: Pool, application: ApplicationVariables): Promise<{ message: string }> {

        console.log(request)

        request = AuthValidation.RESET_PASSWORD.parse(request);

        const hashedPassword = hashSync(request.password, application.SALT);

        const result = await connection.query(`
            UPDATE users SET password = $1
            WHERE email = $2 AND reset_password_otp = $3 AND reset_password_key = $4
            RETURNING user_id
            `, [hashedPassword, request.email, request.otp, request.token]).then((res) => {
                return res
            }).catch((err) => {
            throw new HTTPException(500, {
                message: err.message
            })
        })

        if (result.rowCount === 0) {
            throw new HTTPException(400, {
                message: 'Invalid token'
            })
        }

        return {
            message: 'Activation successfully'
        }
    }

    static async checkSession(token: string | undefined | null, connection: Pool): Promise<User> {
        const result = AuthValidation.TOKEN.safeParse(token)

        if (result.error) {
            throw new HTTPException(401, {
                message: "Unauthorized"
            })
        }

        token = result.data;

        const user = undefined

        if (!user) {
            throw new HTTPException(401, {
                message: "Unauthorized"
            })
        }

        return user;
    }
}