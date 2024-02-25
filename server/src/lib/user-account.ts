import mongoose from "mongoose";
import User from "../models/user.model";

export const getUserByUserId = async (userId: string) => {
    try {
        const objectId = new mongoose.Types.ObjectId(userId);
        const user = await User.findById(objectId).select("-password");
        
        return user ?? undefined;

    } catch (error) {
        console.log("error", error)
        return undefined
    }

};

export const getUserByUserEmail = async (email: string) => {
    const user = await User.findOne({ email }).select("-password");
    return user ?? undefined;
}