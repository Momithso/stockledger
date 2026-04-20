import { Router } from 'express';
import {getDocs} from "../controllers/docs.controller";

const router = Router();

router.get('/json', getDocs)

export default router;