import axios from "axios";
import { Request, Response } from "express";

const githubCallback = async (req: Request, res: Response) => {
  const code = req.query.code as string;
  const clientId = process.env.GITHUB_CLIENT_ID;
  const secretKey = process.env.GITHUB_CLIENT_SECRET;

  try {
    const response = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: clientId,
        client_secret: secretKey,
        code,
      },
      {
        headers: {
          accept: "application/json",
        },
      }
    );

    const { access_token } = response.data;

    const userResponse = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const user = userResponse.data;

    console.log(user);
  } catch {
    console.log("something went wrong");
  }
};

export default githubCallback;

// client_id: clientId,
//       client_secret: clientSecret,
//       code,
