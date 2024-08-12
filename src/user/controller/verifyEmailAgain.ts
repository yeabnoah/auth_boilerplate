import { Request, Response } from "express";
import User from "../model/user";
import smtpGenerateToken from "../token/emailGenerateToken";

const verifyEmailAgain = async (req: Request, res: Response) => {
  const id = req.user?.id;

  try {
    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({
        message: "user not found",
      });
    }

    const emailToken = smtpGenerateToken({ email: user?.email as string });

    // this is gonna be a protected route request

    res.status(201).json({
      email: user?.email,
      status: user?.emailActivated,
      id: user?.id,
    });
  } catch (error) {
    res.status(401).json({
      message: "something went wrong",
    });
  }
};

export default verifyEmailAgain;
