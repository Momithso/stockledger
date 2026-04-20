import { OpenAPIV3_1 } from 'openapi-types';

export const healthDocs: OpenAPIV3_1.PathsObject = {
    "health": {
        get: {
            tags: ['Health'],
            summary: 'Check application health and database status',
            description: 'Returns the status of the webserver and database connection',
            responses: {
                '200': {
                    description: 'Services are running',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'number', example: 200 },
                                    services: {
                                        type: 'object',
                                        properties: {
                                            webserver: { type: 'string', example: 'running' },
                                            database: { type: 'string', example: 'running' }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                '503': {
                    description: 'Service Unavailable - Database is not connected',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'number', example: 503 },
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

