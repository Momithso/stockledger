import { OpenAPIV3_1 } from 'openapi-types';

export const userDocs: OpenAPIV3_1.PathsObject = {
    "/create": {
        post: {
            tags: ['User'],
            summary: 'Create a new user',
            description: 'Creates a new user account. Requires authentication with a valid JWT token and appropriate permissions.',
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            required: ['name', 'email', 'password'],
                            properties: {
                                name: {
                                    type: 'string',
                                    description: 'User full name',
                                    example: 'John Doe'
                                },
                                email: {
                                    type: 'string',
                                    format: 'email',
                                    description: 'User email address (must be unique)',
                                    example: 'john@example.com'
                                },
                                password: {
                                    type: 'string',
                                    format: 'password',
                                    description: 'User password (will be hashed with bcrypt)',
                                    example: 'securePassword123'
                                },
                                permissions: {
                                    description: 'User permissions - can be a boolean or array of permission objects',
                                    default: false,
                                    oneOf: [
                                        {
                                            type: 'boolean'
                                        },
                                        {
                                            type: 'array',
                                            items: {
                                                type: 'object'
                                            }
                                        }
                                    ]
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                '200': {
                    description: 'User successfully created',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'number', example: 200 },
                                    message: { type: 'string', example: 'User successfully created' }
                                }
                            }
                        }
                    }
                },
                '400': {
                    description: 'Bad Request - Missing required fields or email already exists',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'number', example: 400 },
                                    message: { type: 'string', enum: ['Bad Request', 'Missing Arguments', 'There is already a user with this email'] }
                                }
                            }
                        }
                    }
                },
                '401': {
                    description: 'Unauthorized - Invalid token or insufficient permissions',
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
