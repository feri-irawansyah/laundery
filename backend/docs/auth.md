# Authentication Specification

This is the authentication specification for the Laundery app.

## Login

Endpoint: `/api/auth/login`

Method: **`POST`**

Request Body:
```json
{
    "email": "admin",
    "password": "password",
    "role_user": 1
}
```
Description: This endpoint is used to login a user.
`1` for admin, `2` for customer & `3` for kurir

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