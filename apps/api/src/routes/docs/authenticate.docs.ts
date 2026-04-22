import { OpenAPIV3_1 } from 'openapi-types';

export const authenticateDocs: OpenAPIV3_1.PathsObject = {
    "/": {
        get: {
            tags: ['Authentication'],
            summary: 'Authenticate with JWT token',
            description: 'Creates a new JWT token if the provided token is valid. Used for refreshing user sessions.',
            parameters: [
                {
                    name: 'Authorization',
                    in: 'header',
                    description: 'Bearer token from previous authentication',
                    required: true,
                    schema: {
                        type: 'string',
                        example: 'Bearer eyJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCJ9...'
                    }
                }
            ],
            responses: {
                '200': {
                    description: 'Token successfully refreshed',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    token: { type: 'string', description: 'New JWT token (expires in 2 hours)' }
                                }
                            }
                        }
                    }
                },
                '401': {
                    description: 'Unauthorized - Invalid or expired token',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'number', example: 401 },
                                    message: { type: 'string', example: 'Unauthorized' }
                                }
                            }
                        }
                    }
                },
                '500': {
                    description: 'Internal Server Error',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'number', example: 500 },
                                    message: { type: 'string' }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "/user": {
        get: {
            tags: ['Authentication'],
            summary: 'Authenticate user with email and password',
            description: 'Authenticates a user by email and password, returns a JWT token for further requests',
            parameters: [
                {
                    name: 'email',
                    in: 'query',
                    description: 'User email address',
                    required: true,
                    schema: {
                        type: 'string',
                        example: 'user@example.com'
                    }
                },
                {
                    name: 'password',
                    in: 'query',
                    description: 'User password',
                    required: true,
                    schema: {
                        type: 'string',
                        example: 'password123'
                    }
                }
            ],
            responses: {
                '200': {
                    description: 'User successfully authenticated',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    token: { type: 'string', description: 'JWT token (expires in 2 hours)' }
                                }
                            }
                        }
                    }
                },
                '400': {
                    description: 'Bad Request - Missing arguments or user not found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'number', example: 400 },
                                    message: { type: 'string', enum: ['No known user with this email', 'Wrong password'] }
                                }
                            }
                        }
                    }
                },
                '401': {
                    description: 'Unauthorized - Invalid credentials',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'number', example: 401 },
                                    message: { type: 'string', example: 'Unauthorized' }
                                }
                            }
                        }
                    }
                },
                '500': {
                    description: 'Internal Server Error',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'number', example: 500 },
                                    message: { type: 'string' }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

