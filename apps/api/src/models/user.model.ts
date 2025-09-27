import mongoose from "mongoose";
import { userSchema } from "../schemes/user.schema";

export const userModel = mongoose.model("User", userSchema);