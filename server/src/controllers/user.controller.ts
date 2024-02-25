import { Response } from "express";
import User from "../models/user.model";
import { getUserByUserId } from "../lib/user-account";
import mongoose from "mongoose";


export const getUser = async (req: any, res: Response) => { 
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

export const getAllUsers = async (req: any, res: Response) => {
	try {
		const userId:string = req?.user?._id;
		const objectId = new mongoose.Types.ObjectId(userId);
		
		const filteredUsers = await User.find({ _id: { $ne: objectId } }).select("-password");

		res.status(200).json(filteredUsers);
	} catch (error: any) {
		console.error("Error in getAllUsers: ", error?.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const getMyProfile = async (req: any, res: Response) => {
	try {
		const loggedInUser = req?.user;
		res.status(200).json(loggedInUser);
	} catch (error: any) {
		console.error("Error in getMyProfile: ", error?.message);
		res.status(500).json({ error: "Internal server error" });
	}
};
