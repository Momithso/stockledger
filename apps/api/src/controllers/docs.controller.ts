import m2s from "mongoose-to-swagger";
import { Request, Response } from "express";
import { userModel } from "../models/user.model";

export const getDocs = (req: Request, res: Response) => {

    const schema = m2s(userModel)

    const answer = schema;
    return res.status(200).json(answer);
}