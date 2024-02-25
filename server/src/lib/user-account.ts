import User from "../models/user.model";

export const getUserByUserId = async (userId: string) => {
    const user = await User.findById(userId).select("-password");
    return user ?? undefined;
};

export const getUserByUserEmail = async (email: string) => {
    const user = await User.findOne({ email }).select("-password");
    return user ?? undefined;
}