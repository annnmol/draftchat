import { Request, Response } from "express";
import generateTokenAndSetCookie from "../lib/generate-jwt-token";
import { comparePasswordFn, hashedPasswordFn } from "../lib/hashed-password";
import User from "../models/user.model";

let a = {
	"fullName": "string",
	"username": "string",
	"email": "a@a.com",
	"password": "string"
}

export const signup = async (req: Request, res: Response) => {
	try {
		const { fullName, username, email, password } = req.body;

		if (!fullName || !username || !email || !password) {
			return res.status(400).json({ error: "Please fill all the fields" });
		}

		// Check if username or email already exists
		const userWithSameUsername = await User.findOne({ username });
		const userWithSameEmail = await User.findOne({ email });

		if (userWithSameUsername) {
			return res.status(400).json({ error: "Username already exists" });
		}

		if (userWithSameEmail) {
			return res.status(400).json({ error: "Email already exists" });
		}

		// HASH PASSWORD HERE
		const hashedPassword = await hashedPasswordFn(password);

		// Generate random profile pic here
		const nameWithoutSpaces = fullName.replace(/\s/g, "%20");
		const randomProfilePic = `https://avatar.iran.liara.run/username?username=${nameWithoutSpaces}`;

		const newUser = new User({
			fullName,
			username,
			email,
			password: hashedPassword,
			profilePic: randomProfilePic,
		});

		if (newUser) {
			// Generate JWT token here
			generateTokenAndSetCookie(newUser._id.toString(), res); // Convert newUser._id to string
			await newUser.save();

			res.status(201).json({
				_id: newUser._id.toString(),
				fullName: newUser.fullName,
				username: newUser.username,
				profilePic: newUser.profilePic,
				email: newUser.email,
			});
			res.end();
		} else {
			res.status(400).json({ error: "Invalid user data" });
			res.end();
		}
	} catch (error) {
		console.log("Error in signup controller", error);
		res.status(500).json({ error: "Internal Server Error" });
		res.end();
	}
};

export const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		const isPasswordCorrect = await comparePasswordFn(password, user?.password ?? "");

		if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid username or password" });
		}

		generateTokenAndSetCookie(user._id.toString(), res);

		res.status(200).json({
			_id: user._id.toString(),
			fullName: user.fullName,
			username: user.username,
			email: user.email,
			profilePic: user.profilePic,
		});
		res.end();
	} catch (error) {
		console.log("Error in login controller", error);
		res.status(500).json({ error: "Internal Server Error" });
		res.end();
	}
};

export const logout = (req: Request, res: Response) => {
	try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
		res.end();
	} catch (error) {
		console.log("Error in logout controller", error);
		res.status(500).json({ error: "Internal Server Error" });
		res.end();
	}
};


