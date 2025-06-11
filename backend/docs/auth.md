# Authentication Specification

This is the authentication specification for the Laundery app.

## Check Session User Endpoint

Endpoint: `/api/auth/session`

Method: **`GET`**

Request Headers `required token from cookies laundery`

#### Response 200 OK:
```json
{
    "data": {
        "email": "ir15y4hh@gmail.com",
        "username": "Satria Baja Ringan",
        "role_user": 1,
        "picture": "BHHJS846829hf2g2h9f247/profile.png",
        "disable_login": false
    }
}
```

#### Response 401 Unauthorized:
```json
{
    "error": {
        "message": "Token expired"
    }
}
```

#### Response 400 Bad Request:
```json
{
    "error": {
        "message": "Token not found"
    }
}
```

#### Response 500 Internal Server Error:
```json
{
    "error": {
        "message": "Internal server error"
    }
}
```

## Login User Endpoint

Endpoint: `/api/auth/login`

Method: **`POST`**

Request Body:
```json
{
    "email": "admin",
    "password": "password"
}
```

#### Response 200 OK:
```json
{
    "data": {
        "message": "Login successful"
    }
}
```

#### Response 401 Unauthorized:
```json
{
    "error": {
        "message": "Token expired"
    }
}
```

#### Response 400 Bad Request:
```json
{
    "error": {
        "message": "Invalid email or password"
    }
}
```

#### Response 500 Internal Server Error:
```json
{
    "error": {
        "message": "Invalid coiumn 'user' in table 'users'"
    }
}
```

## Register User Endpoint

Endpoint: `/api/auth/register`

Method: **`POST`**

Request Body:
```json
{
    "email": "example@gmail.com",
    "password": "54321",
    "username": "Satria Baja Ringan",
    "handphone": "0823235556473",
    "role_user": 1
}
```
Description: This endpoint is used to login a user.
`1` for admin, `2` for customer & `3` for kurir **bedain pake aplikasi aja, set defaultnya 1**

#### Response 200 OK:
```json
{
    "data": {
        "message": "Registration successful"
    }
}
```

#### Response 400 Bad Request:
```json
{
    "error": {
        "message": "Username already exists"
    }
}
```

#### Response 500 Internal Server Error:
```json
{
    "error": {
        "message": "Invalid coiumn 'user' in table 'users'"
    }
}
```

## Activation User Endpoint

Endpoint: `/api/auth/activation`

Method: **`POST`**

Request Body:
```json
{
    "token": "T4OGz4yicl6uxbV4I1HM2htaJN71QDaBMHtiCfj4mr6b4jBNTcoFLGOiPasKFyUldujYlT",
    "otp": 693904
}
```

#### Response 200 OK:
```json
{
    "data": {
        "message": "Activation successful"
    }
}
```

#### Response 400 Bad Request:
```json
{
    "error": {
        "message": "Invalid otp or token"
    }
}
```

#### Response 500 Internal Server Error:
```json
{
    "error": {
        "message": "Invalid coiumn 'user' in table 'users'"
    }
}
```

## Forget Password User Endpoint

Endpoint: `/api/auth/forget-password`

Method: **`POST`**

Request Body:
```json
{
    "email": "ir15y4hh@gmail.com"
}
```

#### Response 200 OK:
```json
{
    "data": {
        "message": "Forget password successful"
    }
}
```

#### Response 400 Bad Request:
```json
{
    "error": {
        "message": "Email not found"
    }
}
```

#### Response 500 Internal Server Error:
```json
{
    "error": {
        "message": "Invalid coiumn 'user' in table 'users'"
    }
}
```

## Reset Password User Endpoint

Endpoint: `/api/auth/reset-password`

Method: **`POST`**

Request Body:
```json
{
    "email": "ir15y4hh@gmail.com"
}
```

#### Response 200 OK:
```json
{
    "email": "ir15y4hh@gmail.com",
    "password": "12345",
    "otp": 868654,
    "token": "XVyMWrnhCCBJWEXMgUrzOnj60XHBATmOaKiAbrxJ9sm8LyQcEHXE6dC36TkeLBsjCbiJFPJD21F"
}
```
Description: This endpoint is used to reset password a user.
token: `XVyMWrnhCCBJWEXMgUrzOnj60XHBATmOaKiAbrxJ9sm8LyQcEHXE6dC36TkeLBsjCbiJFPJD21F`
otp: `868654`
Di kirim melalui email

#### Response 400 Bad Request:
```json
{
    "error": {
        "message": "User not found"
    }
}
```

#### Response 500 Internal Server Error:
```json
{
    "error": {
        "message": "Invalid coiumn 'user' in table 'users'"
    }
}
```