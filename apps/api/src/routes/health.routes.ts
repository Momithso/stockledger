import { Router } from 'express';
import { checkMongoDB } from '../controllers/health.controller';
import { healthDocs } from './docs/health.docs';
import {RouterRoute} from "../interfaces/router.type";

const router = Router();

router.get('/health', checkMongoDB);

const RouterRoute:RouterRoute = {
    router,
    docs: healthDocs
}

export default RouterRoute;