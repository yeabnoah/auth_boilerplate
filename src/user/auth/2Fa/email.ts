// here i am making a 2fa with active sessions on the users account

import { NextFunction, Request, Response } from "express";
import generateToken from "../../token/generateToken";

const twoFactorAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): boolean => {
  const beforeSignedIn = false;

  const checkIfUserIsLoggedIn = false;

  try {
    if (!checkIfUserIsLoggedIn) {
      res.status(400).json({ message: "you are not loggedIn" });
    }

    const backupEmail = "test@gmail.com";
  } catch {}

  return true;
};

// for two factor auth we gotta make sure the user is signed in with any of the options from the given routes

const generateTokenForGivenEmail = (email: string) => {
  const tokenForEmailAuth = generateToken;
};
