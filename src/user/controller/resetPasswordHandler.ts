import { Request, Response } from "express";
import bcrypt from "bcrypt";
import emailVerifyToken from "../token/emailVerifyToken";
import User from "../model/user";
import passwordSchema from "../validation/passwordSchema";

const resetPasswordHandler = async (req: Request, res: Response) => {
  const { user } = req;
  const { newPassword }: { newPassword: string } = req.body;

  if (!user?.id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const isValidPassword = passwordSchema.safeParse(newPassword);
  if (isValidPassword.error) {
    return res.status(400).json({ message: "Invalid password format" });
  }

  try {
    const userData = await User.findById(user.id);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    const newPasswordHashed = await bcrypt.hash(newPassword, 10);

    await User.findByIdAndUpdate(
      { _id: user.id },
      { password: newPasswordHashed },
      { status: true }
    );

    res.status(200).json({ message: "User password changed successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default resetPasswordHandler;
