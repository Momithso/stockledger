import { Router } from 'express';
import healthRoutes from './health.routes';
import authenticateRoutes from './authenticate.route';
import userRoutes from './user.route';
import { Request, Response } from "express";
import docsRoute from "./docs.route";

const router = Router();

/**
 * Routes
 */
router.get("/", (req: Request, res: Response) => {
    res.json({ message: "Welcome to the Express + TypeScript Server!" });
})
router.use('/', healthRoutes);
router.use('/authenticate', authenticateRoutes);
router.use('/user', userRoutes);
router.use('/docs', docsRoute)

export default router;