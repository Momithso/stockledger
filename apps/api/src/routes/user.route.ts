import { Router } from 'express';
import { createUser } from '../controllers/user.controller';
import { CheckPermission, CheckToken } from '../middlewares/permission.middleware';
import { permissionCheck } from '../interfaces/permission.type';
import { userModel } from '../models/user.model';
import { userDocs } from './docs/user.docs';
import {RouterRoute} from "../interfaces/router.type";

const router = Router();

const createPermission : permissionCheck = {
    databaseName: 'user',
    options: { write: { create: true }}
}
router.post(
    "/create",
    CheckToken,
    await CheckPermission(createPermission),
    (req, res, next) => createUser(req, res, next)
)

const RouterRoute:RouterRoute = {
    router,
    docs: userDocs
}

export default RouterRoute;