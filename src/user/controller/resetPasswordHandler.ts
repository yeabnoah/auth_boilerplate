import { Request, Response } from "express";
import emailVerifyToken from "../token/emailVerifyToken";
import User from "../model/user";
import bcrypt from "bcrypt";
import passwordSchema from "../validation/passwordSchema";

const resetPasswordHandler = async (req: Request, res: Response) => {
  const user = req.user;
  const token = req.query.token as string;
  const { newPassword }: { newPassword: string } = req.body;

  if (!req.user?.id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (!token) {
    return res.status(400).json({ message: "Token is required" });
  }

  const checkPasswordValidity = passwordSchema.safeParse(newPassword);

  if (checkPasswordValidity.error) {
    return res
      .status(400)
      .json({ message: "Invalid type of password password" });
  }

  const newPasswordHashed = bcrypt.hash(newPassword, 10);

  const checkTokenValidity = emailVerifyToken(token);

  if (checkTokenValidity.status) {
    const userData = await User.findById(user?.id);

    if (!userData) {
      return res.status(400).json({ message: "User Not found !" });
    }

    const findUserAndUpdate = await User.findOneAndUpdate(
      { _id: user?.id },
      { password: newPasswordHashed },
      { new: true }
    );
  } else {
    return res.status(400).json({ message: "Invalid token" });
  }
};
