import { Request, Response } from "express";
import User from "../model/user";
import signInInterface from "../interface/signIn";
import bcrypt from "bcrypt";
import generateToken from "../token/generateToken";

const signIn = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body as signInInterface;

    const checkUserName = await User.findOne({ username }).select("password");

    if (!checkUserName?.emailActivated) {
      return res.status(400).json({
        message:
          "your email is not activated please check your email and activate it :)",
      });
    }

    if (!checkUserName) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const checkPassword = await bcrypt.compare(
      password,
      checkUserName.password
    );

    if (!checkPassword) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const generatedTokenValue = generateToken({ id: checkUserName._id });
    res.json({ message: "Logged in successfully", token: generatedTokenValue });
  } catch (error) {
    console.error("Error during sign in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default signIn;
