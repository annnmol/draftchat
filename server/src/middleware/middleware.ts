import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { getUserByUserId } from "../models/user.model";



const JWT_SECRET = process.env.JWT_SECRET!;

const middleware = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      res.cookie("jwt", "", { maxAge: 0 });
      return res.status(401).json({ error: "Unauthorized - No Token Provided" });
    }

    const decoded: any = jwt.verify(token, JWT_SECRET);

    if (!decoded || !decoded?.userId) {
      return res.status(401).json({ error: "Unauthorized - Invalid Token" });
    }

    const user = await getUserByUserId(decoded.userId);

    if (!user) {
      res.cookie("jwt", "", { maxAge: 0 });
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;
    
    next();
  } catch (error: any) {
    console.log("Error in middleware: ", error?.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default middleware;

