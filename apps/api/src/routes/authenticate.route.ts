import { Router } from 'express';
import { authenticateUser, authenticateToken } from '../controllers/authenticate.controller';
import { authenticateDocs } from './docs/authenticate.docs';
import {RouterRoute} from "../interfaces/router.type";

const router = Router();

router.get('/', authenticateToken)
router.get('/user', authenticateUser)

const RouterRoute:RouterRoute = {
    router,
    docs: authenticateDocs
}

export default RouterRoute;