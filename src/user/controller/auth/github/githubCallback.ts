import axios from "axios";
import { Request, Response } from "express";
import User from "../../../model/user";
import githubResponseInterface from "../../../interface/githubResponse";
import generateToken from "../../../token/generateToken";
import UserInterface from "../../../interface/user";

const githubCallback = async (req: Request, res: Response) => {
  const code = req.query.code as string;
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!code) {
    return res
      .status(400)
      .json({ message: "Code is missing from the query parameters." });
  }

  try {
    // Step 1: Exchange code for access token
    const tokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: clientId,
        client_secret: clientSecret,
        code,
      },
      {
        headers: {
          accept: "application/json",
        },
      }
    );

    const { access_token } = tokenResponse.data;

    if (!access_token) {
      return res
        .status(401)
        .json({ message: "Failed to get access token from GitHub." });
    }

    // Step 2: Fetch user data from GitHub using the access token
    const userResponse = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const user = userResponse.data as githubResponseInterface;

    if (!user) {
      return res
        .status(404)
        .json({ message: "Failed to fetch user data from GitHub." });
    }

    // Step 3: Check if user exists in the database
    let foundUser = await User.findOne({ githubId: user.id });

    // Step 4: If the user is not found, create a new user
    if (!foundUser) {
      foundUser = new User({
        name: user.name,
        username: user.login,
        email: user?.email,
        role: "user",
        emailActivated: true,
        githubId: user.id,
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
    console.error("An error occurred:", error);
    res
      .status(500)
      .json({ message: "An error occurred during GitHub authentication." });
  }
};

export default githubCallback;
