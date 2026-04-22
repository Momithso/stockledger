import { Router } from 'express';
import healthRoutes from './health.routes';
import authenticateRoutes from './authenticate.route';
import userRoutes from './user.route';
import { Request, Response } from "express";
import docsRoute from "./docs.route";
import {RouterRoute} from "../interfaces/router.type";

/**
 * Assignments
 */
export const routes = {
    "/": healthRoutes,
    "/authenticate": authenticateRoutes,
    "/user": userRoutes,
    "/docs": docsRoute
} as { [key: string]: RouterRoute };

/**
 * Routes
 */
const router = Router();

router.get("/", (req: Request, res: Response) => {
    res.json({ message: "Welcome to the Express + TypeScript Server!" });
})

for (const path in routes) {
    const route = routes[path];
    router.use(path, route.router);
}

export default router;