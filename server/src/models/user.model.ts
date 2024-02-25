import mongoose, { Document, Schema, Types } from 'mongoose';

interface IUser extends Document<Types.ObjectId> {
  fullName: string;
  email: string;
  username: string;
  password: string;
  profilePic: string;
}

const userSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true } // createdAt, updatedAt => Member since <createdAt>
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;


// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
// 	{
// 		fullName: {
// 			type: String,
// 			required: true,
// 		},
// 		email: {
// 			type: String,
// 			required: true,
// 			unique: true,
// 			email: true,
// 		},
// 		username: {
// 			type: String,
// 			required: true,
// 			unique: true,
// 		},
// 		password: {
// 			type: String,
// 			required: true,
// 			minlength: 6,
// 		},
// 		profilePic: {
// 			type: String,
// 			default: "",
// 		},
// 		// createdAt, updatedAt => Member since <createdAt>
// 	},
// 	{ timestamps: true } // createdAt, updatedAt
// );

// const User = mongoose.model("User", userSchema);

// export default User;
