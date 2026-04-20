import { Request, Response, NextFunction } from "express";
import { userModel } from "../models/user.model";
import { permissionCheck, permissionError } from "../interfaces/permission.type";
import { api } from "../utils/logger";
import { JwtPayloadUser } from "../interfaces/authenticate.type";
import jwt from 'jsonwebtoken'
import { app } from "..";
import { User } from "../interfaces/user.type";
import { hasRequiredPermissions } from "../utils/validate";

declare global { namespace Express { interface Request { decoded?: JwtPayloadUser, issuer?: User }}}

export const CheckToken = (req: Request, res: Response, next: NextFunction) => {
    const _token = req.headers.authorization?.split(" ")[1];

    let err = {
        status: 401,
        message: "Missing Token"
    };

    if (!_token) {
        res.status(err.status).json(err);
        return undefined;
    }

    let verifyErr;
    let decoded: JwtPayloadUser | undefined;
    if (!_token) {
        res.status(err.status).json(err);
        return undefined;
    }
    jwt.verify(_token, app.locals.jwt.privateKey, { algorithms: ['RS256'] } ,(_err: any, _decoded: any) => {
        verifyErr = _err;
        decoded = _decoded;
    })
    if (verifyErr || !decoded) {
        res.status(err.status).json(err);
        return undefined;
    }

    req.decoded = decoded;
    next();
}

export const CheckPermission = async (required: permissionCheck) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        let err: permissionError = {
            status: 401,
            message: "Insufficient permissions"
        };

        if (!req.decoded) {
            return res.status(500).json({ status: 500, message: "Internal Server Error" });
        }
        const decoded = req.decoded;
        
        try {

            // get user data
            const _user = await userModel.findOne({ email: decoded.email });
            err.status = 400;
            err.message = "Missmatch";
            if (!_user) return res.status(err.status).json(err);

            // check permissions
            let check = false;
            if (_user.permissions) {
                for (const _permission of _user.permissions) {
                    if (_permission.databaseName != required.databaseName || !_permission.options) continue;
                        
                    if (hasRequiredPermissions(required.options, _permission.options)) {
                        check = true;
                        break;
                    }
                }
            }
            err.status = 401;
            err.message = "Insufficient permissions"
            if (!check) return res.status(err.status).json(err);

            // go to callback
            req.issuer = _user;
            next();
        } catch (err) {
            api.error(err)
            res.status(500).json({
                status: 500,
                message: err
            })
        }
    }
}