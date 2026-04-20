import { Router } from 'express';
import {getDocs} from "../controllers/docs.controller";
import { docsDocs } from "./docs/docs.docs";
import {RouterRoute} from "../interfaces/router.type";

const router = Router();

router.get('/json', getDocs)

const RouterRoute:RouterRoute = {
    router,
    docs: docsDocs
}

export default RouterRoute;