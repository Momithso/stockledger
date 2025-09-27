import { Router } from 'express';
import { checkMongoDB } from '../controllers/health.controller';

const router = Router();

router.get('/health', checkMongoDB);

export default router;