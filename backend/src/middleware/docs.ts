// src/docs.ts
import { swaggerUI } from "@hono/swagger-ui";
import { Hono } from "hono";
import { openAPISpecs } from "hono-openapi";

export const docsRoute = new Hono();

docsRoute.get('/docs', swaggerUI({ url: '/openapi' }));

docsRoute.get(
  '/openapi',
  openAPISpecs(docsRoute, {
    documentation: {
      info: {
        title: 'Laundery Hono API',
        version: '1.0.0',
        description: 'Dokumentasi API Laundery App With Hono',
      },
      tags: [
        {
          name: 'Authentication Endpoint',
          description: 'Endpoints related to user authentication'
        },
        {
          name: 'Order Endpoint',
          description: 'Endpoints related to order management'
        },
        {
          name: 'Generic Endpoint',
          description: 'Endpoints related to generic management'
        },
      ],
      paths: {
        '/api/auth/login': {
          post: {
            tags: ['Authentication Endpoint'],
            summary: 'Login endpoint',
            description: 'Authenticate user and generate token',
            requestBody: {
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      email: { type: 'string' },
                      password: { type: 'string' },
                    },
                    required: ['username', 'password'],
                  },
                },
              },
            },
            responses: {
              200: {
                description: 'Login Success',
                content: {
                  'application/json': {
                    example: { data: { message: 'Login Successfully' } },
                  },
                },
              },
              401: {
                description: 'Unauthorized',
                content: {
                  'application/json': {
                    example: { error: { message: 'Unauthorized' } },
                  },
                },
              },
            },
          },
        },

        '/api/auth/session': {
            get: {
                tags: ['Authentication Endpoint'],
                summary: 'Check User Session',
                description: 'Checks the current user session using JWT in Authorization header.',
                responses: {
                200: {
                    description: 'Session valid',
                    content: {
                    'application/json': {
                        example: { data: { email: 'ir15y4hh@gmail.com', username: 'Satria Baja Ringan', role_user: 1, picture: 'BHHJS846829hf2g2h9f247/profile.png', disable_login: false } },
                    },
                    },
                },
                401: {
                    description: 'Unauthorized - token missing or invalid',
                    content: {
                    'application/json': {
                        example: { error: { message: 'Unauthorized' } },
                    },
                    },
                },
                400: {
                    description: 'Invalid Token',
                    content: {
                    'application/json': {
                        example: { error: { message: 'Invalid Token' } },
                    },
                    },
                },
                },
            },
        },

        '/api/auth/logout': {
            post: {
                tags: ['Authentication Endpoint'],
                summary: 'Logout endpoint',
                description: 'Logout user and invalidate token',
                responses: {
                200: {
                    description: 'Logout Success',
                    content: {
                    'application/json': {
                        example: { data: { message: 'Logout Successfully' } },
                    },
                    },
                },
                },
            },
        },
        // Register
        '/api/auth/register': {
          post: {
            tags: ['Authentication Endpoint'], // Ini bikin judul "Authentication Endpoint"
            summary: 'Login endpoint',
            description: 'Authenticate user and generate token',
            requestBody: {
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      email: { type: 'string' },
                      password: { type: 'string' },
                      username: { type: 'string' },
                      handphone: { type: 'string' },
                      role_user: { type: 'number', enum: [1, 2, 3] },
                    },
                    required: ['username', 'password', 'email', 'handphone', 'role_user'],
                  },
                },
              },
            },
            responses: {
              200: {
                description: 'Register Success',
                content: {
                  'application/json': {
                    example: { data: { message: 'Register Successfully' } },
                  },
                },
              },
              400: {
                description: 'Bad Request',
                content: {
                  'application/json': {
                    example: { error: { message: 'String must contain at least 1 character(s)' } },
                  },
                },
              },
              500: {
                description: 'Internal Server Error',
                content: {
                  'application/json': {
                    example: { error: { "message": "Invalid coiumn 'user' in table 'users'" } },
                  },
                },
              },
            },
          },
        },

        '/api/auth/activation': {
            post: {
                tags: ['Authentication Endpoint'],
                summary: 'Activation endpoint',
                description: 'Activate user account',
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                email: { type: 'string' },
                                otp_code: { type: 'string' },
                                },
                                required: ['email', 'otp_code'],
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: 'Activation Success',
                        content: {
                        'application/json': {
                            example: { data: { message: 'Activation Successfully' } },
                        },
                        },
                    },
                    400: {
                        description: 'Bad Request',
                        content: {
                        'application/json': {
                            example: { error: { message: 'OTP code is invalid' } },
                        },
                        },
                    },
                    500: {
                        description: 'Internal Server Error',
                        content: {
                        'application/json': {
                            example: { error: { "message": "Invalid coiumn 'user' in table 'users'" } },
                        },
                        },
                    },
                },
            },
        },

        '/api/auth/forget-password': {
            post: {
                tags: ['Authentication Endpoint'],
                summary: 'Forget Password endpoint',
                description: 'Forget user password',
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                email: { type: 'string' },
                                },
                                required: ['email'],
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: 'Forget Password Success',
                        content: {
                        'application/json': {
                            example: { data: { message: 'Forget Password Successfully' } },
                        },
                        },
                    },
                    500: {
                        description: 'Internal Server Error',
                        content: {
                        'application/json': {
                            example: { error: { "message": "Invalid coiumn 'user' in table 'users'" } },
                        },
                        },
                    },
                },
            },
        },

        '/api/auth/reset-password': {
            post: {
                tags: ['Authentication Endpoint'],
                summary: 'Reset Password endpoint',
                description: 'Reset user password',
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                email: { type: 'string' },
                                otp: { type: 'string' },
                                token: { type: 'string' },
                                password: { type: 'string' },
                                },
                                required: ['email', 'otp', 'token', 'password'],
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: 'Reset Password Success',
                        content: {
                        'application/json': {
                            example: { data: { message: 'Reset Password Successfully' } },
                        },
                        },
                    },
                    400: {
                        description: 'Bad Request',
                        content: {
                        'application/json': {
                            example: { error: { message: 'OTP code is invalid' } },
                        },
                        },
                    },
                    500: {
                        description: 'Internal Server Error',
                        content: {
                        'application/json': {
                            example: { error: { "message": "Invalid coiumn 'user' in table 'users'" } },
                        },
                        },
                    },
                },
            },
        },

        // Generic Endpoint
        '/api/generic/layanan': {
            get: {
                tags: ['Generic Endpoint'],
                summary: 'Get Layanan',
                description: 'Get Layanan',
                responses: {
                200: {
                    description: 'Get Layanan Success',
                    content: {
                    'application/json': {
                        example: { data: [
                          { id: 1, name: 'Daily Kiloan' },
                          { id: 2, name: 'Cuci & Setrika' },
                        ] },
                    },
                    },
                },
                404: {
                    description: 'Not Found',
                    content: {
                      'application/json': {
                          example: { error: { message: 'Not Found' } },
                      },
                    },
                },
                
                500: {
                    description: 'Internal Server Error',
                    content: {
                    'application/json': {
                        example: { error: { "message": "Invalid coiumn 'nama' in table 'layanan'" } },
                    },
                    },
                },
                },
            },
        },
      },
    },
  })
);
