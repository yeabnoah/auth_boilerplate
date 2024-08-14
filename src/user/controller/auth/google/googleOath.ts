import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

const googleOauth = (req: Request, res: Response) => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const callbackUrl = process.env.GOOGLE_CALLBACK_URL;

  if (!clientId || !callbackUrl) {
    return res
      .status(500)
      .send("Google OAuth environment variables are not set.");
  }

  // Generate and store state parameter for CSRF protection
  const state = uuidv4();
  res.cookie("oauth_state", state, { httpOnly: true, secure: true });

  const redirectUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${callbackUrl}&scope=email%20profile&response_type=code&state=${state}&access_type=offline`;

  res.redirect(redirectUrl);
};

export default googleOauth;
