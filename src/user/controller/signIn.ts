import { Request, Response } from "express";
import User from "../model/user";
import signInInterface from "../interface/signIn";
import bcrypt from "bcrypt";
import generateToken from "../token/generateToken";
import DeviceInformation from "../utils/deviceInfo";

const signIn = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body as signInInterface;

    // Query the user and include emailActivated in the result
    const checkUserName = await User.findOne({ username }).select(
      "password emailActivated"
    );

    if (!checkUserName) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    if (!checkUserName.emailActivated) {
      return res.status(400).json({
        message:
          "Your email is not activated. Please check your email and activate it :)",
      });
    }

    const checkPassword = await bcrypt.compare(
      password,
      checkUserName.password!
    );

    if (!checkPassword) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const generatedTokenValue = generateToken({ id: checkUserName._id });
    res.json({ message: "Logged in successfully", token: generatedTokenValue });

    const getDeviceInfo = DeviceInformation(req.ip as string);

    const newUser = await User.updateOne(
      {
        _id: checkUserName._id,
      },
      {
        $push: {
          activeSessions: getDeviceInfo,
        },
      },
      { new: true }
    );
  } catch (error) {
    console.error("Error during sign in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default signIn;
