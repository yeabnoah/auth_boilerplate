import User from "../model/user";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import UserInterface from "../interface/user";
import userSchema from "../validation/userSchema";
import smtpGenerateToken from "../token/emailGenerateToken";
import generateToken from "../token/generateToken";

// lets add a token generation on successful user registration

const createUser = async (req: Request, res: Response) => {
  try {
    const { name, username, password, email, role } = req.body as UserInterface;
    const errorResponse: string[] = [];

    const validation = userSchema.safeParse(req.body);

    if (!validation.success) {
      validation.error.issues.forEach((issue) =>
        errorResponse.push(issue.message)
      );
      return res.status(400).json({ errorMessages: errorResponse });
    }

    const newPassword = await bcrypt.hash(password, 10);

    const checkUser = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });

    if (checkUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUserData: UserInterface = {
      name: name,
      email: email,
      username: username,
      role: role,
      password: newPassword,
    };

    const newUser = new User(newUserData);

    await newUser.save();

    const token = generateToken({ id: newUser._id });

    const emailToken = smtpGenerateToken({ email: email });

    res.status(201).json({
      user: newUser,
      emailVerificationToken: emailToken,
      authToken: token,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

export default createUser;
