import { NextFunction, Request, Response } from "express";
import emailVerifyToken from "../token/emailVerifyToken";

const resetPasswordMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req;
    const token = req.query.token as string;

    if (!user?.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    const isValidToken = emailVerifyToken(token);
    if (!isValidToken.status) {
      return res.status(400).json({ message: "Invalid token" });
    }

    // If the token is valid, proceed to the next middleware/route handler
    return next();
  } catch (error) {
    console.error("Error in resetPasswordMiddleware:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default resetPasswordMiddleware;
