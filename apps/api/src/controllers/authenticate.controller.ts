import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { api } from "../utils/logger";
import { validateRequest } from "../utils/validate";
import { userModel } from "../models/user.model";
import bcrypt from 'bcrypt';
import { AuthenticateAnswer, AuthenticateError, AuthenticateUserRequest, JwtPayloadUser } from "../types/authenticate.type";
import { app } from "..";
import { User } from "../types/user.type";

const createJwtPayloadUser = (user: any | User) => {
    const jwtPayload: JwtPayloadUser = {
        type: "user",
        _id: user._id.toString(),
        email: user.email
    };
    let answer: AuthenticateAnswer = {
        token: jwt.sign(jwtPayload, app.locals.jwt.privateKey, { algorithm: 'RS256', expiresIn: '2h' })
    };
    return answer;
}

/**
 * Authenticates a user with email and password
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
    const data: AuthenticateUserRequest = {
        email: req.query?.email,
        password: req.query?.password
    }

    let err: AuthenticateError = {
        status: 401,
        message: "Unauthorized"
    }

    if (!validateRequest(data)) return res.status(err.status).json(err);

    try {
        // Find user with email
        const user = await userModel.findOne({ email: data.email });

        err.status = 400;
        err.message = "No known user with this email";
        if (!user) return res.status(err.status).json(err);

        // Compare passwords
        const comparePasswords = bcrypt.compareSync(data.password, user.password);

        err.message = "Wrong password"
        if (!comparePasswords) return res.status(err.status).json(err);

        // Create JWT Token for authentication
        const answer = createJwtPayloadUser(user);

        // send answer
        return res.status(200).json(answer);

    } catch(err) {
        api.warn(err);
        return res.status(500).json({
            status: 500,
            message: err
        })
    }
}

/**
 * Authenticates a user with jwt token
 * (used for creating new tokens while a user session)
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {

    const _token = req.headers.authorization?.split(" ")[1];

    let err: AuthenticateError = {
        status: 401,
        message: "Unauthorized"
    }

    try {
        // check token
        let verifyErr;
        let decoded: JwtPayloadUser | any;
        if (!_token) return res.status(err.status).json(err);
        jwt.verify(_token, app.locals.jwt.privateKey, { algorithms: ['RS256'] } ,(_err: any, _decoded: any) => {
            verifyErr = _err;
            decoded = _decoded;
        })
        if (verifyErr) return res.status(err.status).json(err);

        // Find user with _id
        if (!decoded) {
            api.warn("Might be a malicious request: " + req)
            return res.status(err.status).json(err);
        }
        const user = await userModel.findOne({ _id: decoded._id });
        if (!user) throw new Error("Internal Server Error");

        // Create JWT Token for authentication
        const answer = createJwtPayloadUser(user);

        // send answer
        return res.status(200).json(answer)

    } catch(err) {
        api.warn(err);
        return res.status(500).json({
            status: 500,
            message: err
        })
    }
}