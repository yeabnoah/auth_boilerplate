import { NextFunction, Request, Response } from "express";
import verifyToken from "../token/verifyToken";
import { Types } from "mongoose";

declare global {
  namespace Express {
    interface Request {
      user?: { id: Types.ObjectId };
    }
  }
}

const authCheckerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "Authorization token is missing",
    });
  }

  try {
    const checkedVerification = verifyToken(token);

    if (checkedVerification && checkedVerification.status) {
      req.user = checkedVerification.payload;
      return next();
    } else {
      return res.status(401).json({
        message: "Invalid or expired token",
      });
    }
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(500).json({
      message: "An error occurred while verifying the token",
    });
  }
};

export default authCheckerMiddleware;
