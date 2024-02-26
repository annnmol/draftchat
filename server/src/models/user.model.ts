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

// Add indexes
userSchema.index({ email: 1 });

const User = mongoose.model<IUser>("User", userSchema);

export default User;

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

