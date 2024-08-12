import { Request, Response } from "express";
import emailVerifyToken from "../token/emailVerifyToken";
import User from "../model/user";

const verifyEmail = async (req: Request, res: Response) => {
  const token = req.query.token as string;

  if (!token) {
    return res.status(400).json({
      message: "Token is required",
    });
  }

  try {
    const checkIfEmailTokenIsValid = emailVerifyToken(token);

    if (checkIfEmailTokenIsValid.status) {
      const email = checkIfEmailTokenIsValid.payload?.email;

      if (!email) {
        return res.status(400).json({
          message: "Invalid token payload",
        });
      }

      const user = await User.findOneAndUpdate(
        { email: email },
        { emailActivated: true },
        { new: true } // Return the updated document
      );

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      res.json({
        message: "Congrats! Your email is successfully authenticated :)",
        // token: token,
      });
    } else {
      res.status(400).json({
        message: "Email verification link expired",
      });
    }
  } catch (error) {
    console.error("Error during email verification:", error);
    res.status(500).json({
      message: "Unexpected error occurred",
    });
  }
};

export default verifyEmail;
