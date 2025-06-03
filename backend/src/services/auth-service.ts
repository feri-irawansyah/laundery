import { LoginUserRequest, RegisterUserRequest, toUserResponse, User, UserResponse } from '@contexts/models/auth-model';
import { AuthValidation } from '@contexts/validations/auth-validation';
import { Pool } from '@neondatabase/serverless';
import { HTTPException } from 'hono/http-exception';
import { genSaltSync, hashSync, compareSync } from 'bcrypt-edge';

export class UserService {

    static async login(request: LoginUserRequest, connection: Pool): Promise<UserResponse> {
        request = AuthValidation.LOGIN.parse(request)

        // const isPasswordValid = await Bun.password.verify(request.password, request.password, 'bcrypt')

        const user: any = await connection.query('SELECT * FROM users WHERE username = $1', [request.username])
        if (user.rowCount === 0) {
            throw new HTTPException(401, {
              message: 'Invalid username or password'
            })
        }

        const response = toUserResponse(user)
        // response.token = user.token!;
        return response
    }

    static async register(request: RegisterUserRequest, connection: Pool): Promise<{ message: string }> {
      request = AuthValidation.REGISTER.parse(request)

      let user: any = await connection.query('SELECT COUNT(*) FROM users WHERE email = $1', [request.email])
      
      if (user.rows[0].count > 0) {
        throw new HTTPException(400, {
          message: 'Username already exists'
        })
      }
      
      const saltRounds = 10; // Recommended salt rounds for bcrypt
      const salt = genSaltSync(saltRounds);
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