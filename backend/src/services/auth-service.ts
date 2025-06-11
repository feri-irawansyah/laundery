import { LoginUserRequest, RegisterUserRequest, toUserResponse, User, UserResponse } from '@contexts/models/auth-model';
import { AuthValidation } from '@contexts/validations/auth-validation';
import { Pool } from '@neondatabase/serverless';
import { HTTPException } from 'hono/http-exception';
import { hashSync, compareSync } from 'bcrypt-edge';

export class UserService {

    static async login(request: LoginUserRequest, connection: Pool): Promise<UserResponse> {
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

    static async register(request: RegisterUserRequest, connection: Pool, salt: number): Promise<{ message: string }> {
      request = AuthValidation.REGISTER.parse(request)

      let user: any = await connection.query('SELECT COUNT(*) FROM users WHERE email = $1', [request.email])
      
      if (user.rows[0].count > 0) {
        throw new HTTPException(400, {
          message: 'Username already exists'
        })
      }
      
      const hashedPassword = hashSync(request.password, salt);

      request.password = hashedPassword;

      const result = await connection.query(
        `INSERT INTO users (username, password, email, handphone, role_user) 
        VALUES ($1, $2, $3, $4, $5)`,
        [request.username, request.password, request.email, request.handphone, 1]
      ).then((res) => {
        console.log(res)
        return res
      }).catch((err) => {
        console.log(err)
        throw new HTTPException(500, {
          message: err.message
        })
      })

      return {
        message: 'User registered successfully'
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