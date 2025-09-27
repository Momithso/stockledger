import { Schema } from "mongoose";

export const permissionSchema = new Schema({
    databaseName: { type: String, required: true },
    displayName: { type: String, required: false },
    description: { type: String, required: false },
    options: {
        read: { type: Boolean },
        write: {
            create: { type: Boolean },
            update: { type: Boolean },
            delete: { type: Boolean }
        },
        execute: { type: Boolean }
    },
})