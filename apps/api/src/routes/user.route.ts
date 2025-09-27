import { Router } from 'express';
import { createUser } from '../controllers/user.controller';
import { CheckPermission, CheckToken } from '../middlewares/permission.middleware';
import { permissionCheck } from '../types/permission.type';

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

export default router;
