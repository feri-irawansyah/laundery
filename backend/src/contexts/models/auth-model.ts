export type Claims = {
    username: string,
    email: string
}

export type User = {
    user_id: number,
    username: string,
    password: string,
    email: string,
    handphone: string,
    register_date: Date,
    role_user: number,
    disable_login: boolean,
    activate_code: string,
    activate_time: Date,
    last_login: Date,
    last_resend_otp: Date,
    otp_generated_link: string,
    reset_password_key: string,
    reset_password_flag: boolean,
    reset_password_date: Date,
    otp_generated_link_date: Date,
    count_resend_activation: number,
    picture: string,
    google_id: string,
}

export type RegisterUserRequest = {
    username: string;
    password: string;
    email: string;
    handphone: string;
}

export type LoginUserRequest = {
    email: string;
    password: string;
}

export type UpdateUserRequest = {
    password?: string;
    name?: string;
}

export type UserResponse = {
    username: string;
    email: string;
    token?: string;
}

export function toUserResponse(user: User): UserResponse {
    return {
        email: user.email,
        username: user.username
    }
}