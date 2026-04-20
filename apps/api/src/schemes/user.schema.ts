import { Schema } from "mongoose";
import { User } from "../interfaces/user.type";

export const userSchema = new Schema<User>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    permissions: {
        type: Schema.Types.Mixed,
        required: false,
        default: false,
        validate: {
            validator: function(value: any) {
                if (typeof value === 'boolean') {
                    return true;
                }
                if (Array.isArray(value)) {
                    return value.every(item => {
                        return (
                            item &&
                            typeof item === 'object' &&
                            typeof item.databaseName === 'string' &&
                            item.options &&
                            typeof item.options === 'object'
                        );
                    });
                }
                return false;
            },
            message: 'permissions must be either a boolean or an array of permission objects with databaseName and options'
        }
    },
})