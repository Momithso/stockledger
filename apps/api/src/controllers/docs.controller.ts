import {Request, Response} from "express";
import {OpenAPIV3_1} from "openapi-types";
import { routes } from "../routes/routes";
import { app } from "../index";

export const getDocs = (req: Request, res: Response) => {

    const paths: OpenAPIV3_1.PathsObject = {
        "/": {
            get: {
                tags: ['Root'],
                summary: 'API Welcome',
                description: 'Welcome endpoint that provides basic information about the API',
                responses: {
                    '200': {
                        description: 'Welcome message',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        message: { type: 'string', example: 'Welcome to the Express + TypeScript Server!' }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };

    for (const key in routes) {
        const routeData = routes[key];
        if (routeData.docs) {
            for (const subroute in routeData.docs) {
                const pathItem = routeData.docs[subroute];
                if (!pathItem) {
                    continue;
                }

                const path = key + subroute;
                paths[path] = pathItem;
            }
        }
    }

    const docs: OpenAPIV3_1.Document = {
        openapi: "3.1.0",
        info: {
            title: "StockLedger API",
            version: "1.0.0",
            description: "API for the StockLedger application - manage users, authentication, and stock data"
        },
        paths,
        servers: [
            {
                url: `http://localhost:${process.env.PORT}/api`,
                description: "Local development server",
            },
        ],
        security: [
            {
                bearerAuth: []
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                    description: "JWT token obtained from the /authenticate/user endpoint"
                }
            }
        },
        tags: [
            {
                name: 'Root',
                description: 'Welcome endpoint'
            },
            {
                name: 'Health',
                description: 'Health check endpoints'
            },
            {
                name: 'Authentication',
                description: 'User authentication and token refresh endpoints'
            },
            {
                name: 'User',
                description: 'User management endpoints'
            },
            {
                name: 'Documentation',
                description: 'API documentation endpoints'
            }
        ]
    };

    return res.status(200).json(docs);
}
