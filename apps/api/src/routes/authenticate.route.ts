import { Router } from 'express';
import { authenticateUser, authenticateToken } from '../controllers/authenticate.controller';

const router = Router();

router.get('/', authenticateToken)
router.get('/user', authenticateUser)

export default router;