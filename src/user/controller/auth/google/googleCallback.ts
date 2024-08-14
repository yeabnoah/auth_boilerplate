import axios from "axios";
import { Request, Response } from "express";
import User from "../../../model/user";
import UserInterface from "../../../interface/user";
import generateToken from "../../../token/generateToken";

const googleCallback = async (req: Request, res: Response) => {
  const code = req.query.code as string;
  const state = req.query.state as string;
  const storedState = req.cookies.oauth_state;

  if (!code || !state || state !== storedState) {
    return res.status(400).send("Invalid OAuth state or code.");
  }

  res.clearCookie("oauth_state");

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const callbackUrl = process.env.GOOGLE_CALLBACK_URL;

  if (!clientId || !clientSecret || !callbackUrl) {
    return res
      .status(500)
      .send("Google OAuth environment variables are not set.");
  }

  try {
    // Step 1: Exchange code for access token
    const tokenResponse = await axios.post(
      "https://oauth2.googleapis.com/token",
      null,
      {
        params: {
          client_id: clientId,
          client_secret: clientSecret,
          code,
          redirect_uri: callbackUrl,
          grant_type: "authorization_code",
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token } = tokenResponse.data;

    if (!access_token) {
      return res
        .status(401)
        .json({ message: "Failed to get access token from Google." });
    }

    // Step 2: Fetch user data from Google using the access token
    const userResponse = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const user = userResponse.data;

    if (!user) {
      return res
        .status(404)
        .json({ message: "Failed to fetch user data from Google." });
    }

    // Step 3: Check if user exists in the database
    let foundUser = await User.findOne({ googleId: user.sub });

    // Step 4: If the user is not found, create a new user
    if (!foundUser) {
      foundUser = new User({
        name: user.name,
        username: user.email.split("@")[0], // Assuming username is the part before '@' in email
        email: user.email,
        role: "user",
        emailActivated: true,
        googleId: user.sub,
      });

      await foundUser.save();
      res.status(201).json({
        message: "New user created and logged in successfully.",
        token: generateToken({ id: foundUser._id }),
      });
    } else {
      // User already exists, generate token
      res.status(200).json({
        message: "User logged in successfully.",
        token: generateToken({ id: foundUser._id }),
      });
    }
  } catch (error) {
    console.error("Error during Google OAuth:", error);
    res.status(500).send("An error occurred during Google OAuth.");
  }
};

export default googleCallback;
