import { Request, Response } from "express";
import User from "../model/user";
import signInInterface from "../interface/signIn";

const signIn = async (req: Request, res: Response) => {
  const { username, password } = (await req.body) as signInInterface;

  const checkUserName = await User.findOne({ username: username });

  if (!checkUserName) {
    return res.status(404).json({ message: "User not found" });
  }
};
