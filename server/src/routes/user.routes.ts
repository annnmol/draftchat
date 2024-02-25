// user.router.ts
import express from "express";
import { getAllUsers, getMyProfile, getUser } from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.get("/all", getAllUsers);
userRouter.get("/me", getMyProfile);
userRouter.get("/:id", getUser);

export default userRouter;

