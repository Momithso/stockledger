import { permission } from "./permission.type"
import {Timestamp} from "./util.type";

export type UserId = string;

export interface User {
    name: string,
    email: string,
    password: string,
    createdAt: Timestamp,
    permissions?: [permission] | boolean
}

export type CreateUserError = {
    status: 401 | 400,
    message: "Unauthorized" | "Bad Request" | "Missing Arguments" | "There is already a user with this email"
}

export type CreateUserAnswer = {
    status: 200,
    message: "User successfully created"
}