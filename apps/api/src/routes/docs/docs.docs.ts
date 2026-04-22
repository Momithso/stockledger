import { OpenAPIV3_1 } from 'openapi-types';

export const docsDocs: OpenAPIV3_1.PathsObject = {
    "/json": {
        get: {
            tags: ['Documentation'],
            summary: 'Get OpenAPI documentation',
            description: 'Returns the complete OpenAPI 3.1.0 specification for all API endpoints',
            responses: {
                '200': {
                    description: 'OpenAPI specification successfully retrieved',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                description: 'OpenAPI 3.1.0 specification'
                            }
                        }
                    }
                }
            }
        }
    }
}

