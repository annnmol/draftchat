import { Response } from "express";
import User, { getUserByUserId } from "../models/user.model";
import mongoose from "mongoose";


const getUser = async (req: any, res: Response) => {
	try {
		const { id } = req.params;

		const user = await getUserByUserId(id);

		if (!user) {
			return res.status(400).json({ error: "no user found" });
		}

		res.status(200).json(user);

	} catch (error) {
		console.log("Error in login controller", error);
		res.status(500).json({ error: "Internal Server Error" });

	}

}

const getAllUsers = async (req: any, res: Response) => {
	try {
		const userId: string = req?.user?._id;
		const objectId = new mongoose.Types.ObjectId(userId);

		const filteredUsers = await User.find({ _id: { $ne: objectId } }).select("-password");

		res.status(200).json(filteredUsers);
	} catch (error: any) {
		console.error("Error in getAllUsers: ", error?.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

const getMyProfile = async (req: any, res: Response) => {
	try {
		const loggedInUser = req?.user;
		res.status(200).json(loggedInUser);
	} catch (error: any) {
		console.error("Error in getMyProfile: ", error?.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export { getMyProfile, getAllUsers, getUser };

