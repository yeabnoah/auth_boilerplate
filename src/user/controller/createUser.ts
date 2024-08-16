import User from "../model/user";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import UserInterface from "../interface/user";
import userSchema from "../validation/userSchema";
import smtpGenerateToken from "../token/emailGenerateToken";
import generateToken from "../token/generateToken";
import emailSender from "../mail/email";
import os from "os";
import DeviceInformation from "../utils/deviceInfo";

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

    const getDeviceInfo = DeviceInformation(req.ip as string);

    const newUserData: UserInterface = {
      name: name,
      email: email,
      username: username,
      role: role,
      password: newPassword,
    };

    const newUser = new User(newUserData);

    await newUser.save();

    const user = await User.updateOne(
      { _id: newUser._id },
      {
        $push: {
          activeSessions: getDeviceInfo,
        },
      },
      { new: true }
    );

    const token = generateToken({ id: newUser._id });

    const emailToken = smtpGenerateToken({ email: email });

    const verificationLink: string = `http://localhost:3000/user/verifyEmail/?token=${emailToken}`;

    const emailSendResponse = await emailSender(email, verificationLink);

    res.status(201).json({
      user: newUser,
      emailResponse: emailSendResponse,
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
