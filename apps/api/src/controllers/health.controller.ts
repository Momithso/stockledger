import { Request, Response, NextFunction } from "express"
import mongoose from "mongoose";

export const checkMongoDB = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (mongoose.connection.readyState == 1) {
            return res.status(200).send({
                status: 200,
                services: {
                    webserver: "running",
                    database: "running"
                }
            });
        }
        throw Error("MongoDB not connected");
    } catch(err) {
        res.status(503).send({
            status: 503,
            message: err
        });
        next(err);
    }
}