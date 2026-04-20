import { Schema } from "mongoose";
import { User } from "../interfaces/user.type";
import { permissionSchema } from "./permission.schema";

export const userSchema = new Schema<User>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    permissions: { type: [[permissionSchema], Boolean], required: false, default: false },
})