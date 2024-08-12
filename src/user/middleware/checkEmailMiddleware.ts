import { NextFunction, Request, Response } from "express";
import User from "../model/user";

const checkEmailVerificationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;

  const findUser = await User.findById(user?.id);

  if (findUser?.emailActivated) {
    return next();
  } else {
    return res.status(401).json({ message: "Email not verified" });
  }
};

export default checkEmailVerificationMiddleware;
